/* =====================================================================
   learn.js: lógica del hub de aprendizaje.
   - Progreso en localStorage (clave "learn-v1"), siempre con try/catch.
   - Todo se renderiza con textContent (sin innerHTML).
   - Repaso espaciado: si sacás < 80 % el quiz vuelve en 1 día, si no en 7.
   ===================================================================== */
(function () {
  "use strict";

  var L = window.LEARN;
  if (!L) return;

  var KEY = "learn-v1";
  var PASS = 0.8;
  var DAY = 24 * 60 * 60 * 1000;

  /* ---------------- Utilidades ---------------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else n.setAttribute(k, v === true ? "" : String(v));
    });
    [].concat(children || []).forEach(function (c) { if (c !== null && c !== undefined) n.append(c); });
    return n;
  }

  /* Reemplaza los hijos ignorando null (replaceChildren mostraría "null") */
  function fill(node, children) {
    node.replaceChildren.apply(node, children.filter(function (c) { return c !== null && c !== undefined; }));
  }

  /* Texto con `código` entre backticks */
  function rich(str) {
    return String(str).split("`").map(function (p, i) {
      return i % 2 ? el("code", { text: p }) : document.createTextNode(p);
    });
  }

  function todayStr(d) {
    d = d || new Date();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }
  function parseDay(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function addDays(s, n) { return todayStr(new Date(parseDay(s).getTime() + n * DAY)); }
  function fmt(s) { var p = s.split("-"); return p[2] + "/" + p[1]; }
  function weekStart() {
    var d = new Date();
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // lunes
    return todayStr(d);
  }

  /* ---------------- Estado ---------------- */
  function emptyState() {
    return { topics: {}, tasks: {}, library: {}, certs: {}, quizzes: {}, week: { start: weekStart(), days: {} } };
  }

  function load() {
    var s = emptyState();
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) s = sanitize(JSON.parse(raw));
    } catch (e) { /* almacenamiento bloqueado o JSON inválido */ }
    if (s.week.start !== weekStart()) s.week = { start: weekStart(), days: {} };
    return s;
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignorar */ }
  }

  /* Acepta solo claves y valores conocidos: un archivo importado
     no puede meter datos inesperados. */
  function sanitize(obj) {
    var s = emptyState();
    if (!obj || typeof obj !== "object") return s;
    var topicIds = L.topics.map(function (t) { return t.id; });
    var taskIds = [];
    L.stages.forEach(function (st) { st.tasks.forEach(function (t) { taskIds.push(t.id); }); });
    var libIds = L.library.map(function (b) { return b.id; });
    var certIds = L.certs.map(function (c) { return c.id; });
    var dayIds = L.week.map(function (d) { return d.id; });
    var dateRe = /^\d{4}-\d{2}-\d{2}$/;

    if (obj.topics) topicIds.forEach(function (id) {
      var v = obj.topics[id];
      if (v === "doing" || v === "done") s.topics[id] = v;
    });
    if (obj.tasks) taskIds.forEach(function (id) { if (obj.tasks[id] === true) s.tasks[id] = true; });
    if (obj.library) libIds.forEach(function (id) { if (obj.library[id] === true) s.library[id] = true; });
    if (obj.certs) certIds.forEach(function (id) { if (obj.certs[id] === true) s.certs[id] = true; });
    if (obj.quizzes) Object.keys(L.quizzes).forEach(function (id) {
      var q = obj.quizzes[id];
      if (!q || typeof q !== "object") return;
      var best = Number(q.best), last = Number(q.last);
      if (isFinite(best) && isFinite(last) && dateRe.test(q.date) && dateRe.test(q.next)) {
        s.quizzes[id] = { best: Math.max(0, Math.min(1, best)), last: Math.max(0, Math.min(1, last)), date: q.date, next: q.next };
      }
    });
    if (obj.week && obj.week.start === weekStart() && obj.week.days) {
      dayIds.forEach(function (id) { if (obj.week.days[id] === true) s.week.days[id] = true; });
    }
    return s;
  }

  var state = load();
  var ui = { track: "all" };

  /* ---------------- Métricas ---------------- */
  function allTasks() {
    var out = [];
    L.stages.forEach(function (st) { st.tasks.forEach(function (t) { out.push({ task: t, stage: st }); }); });
    return out;
  }

  function dueQuizzes() {
    var today = todayStr();
    return Object.keys(L.quizzes).filter(function (id) {
      var q = state.quizzes[id];
      return q && q.next <= today;
    });
  }

  function renderStats() {
    var topicsDone = L.topics.filter(function (t) { return state.topics[t.id] === "done"; }).length;
    var tasks = allTasks();
    var tasksDone = tasks.filter(function (x) { return state.tasks[x.task.id]; }).length;
    var quizIds = Object.keys(L.quizzes);
    var quizPassed = quizIds.filter(function (id) { return state.quizzes[id] && state.quizzes[id].best >= PASS; }).length;
    var due = dueQuizzes().length;

    $("#stat-topics").textContent = topicsDone + "/" + L.topics.length;
    $("#stat-tasks").textContent = tasksDone + "/" + tasks.length;
    $("#stat-quizzes").textContent = quizPassed + "/" + quizIds.length;
    $("#stat-due").textContent = String(due);
    $("#stat-due").classList.toggle("is-alert", due > 0);

    var total = L.topics.length + tasks.length + quizIds.length;
    var done = topicsDone + tasksDone + quizPassed;
    var pct = total ? Math.round((done / total) * 100) : 0;
    $("#overall-pct").textContent = pct + "%";
    $("#overall-ring").setAttribute("aria-label", "Progreso total: " + pct + " %");
    var circ = 2 * Math.PI * 52;
    var fg = $("#ring-fg");
    fg.style.strokeDasharray = String(circ);
    fg.style.strokeDashoffset = String(circ * (1 - pct / 100));
  }

  function examBanner() {
    var today = todayStr();
    var banner = $("#exam-banner");
    if (today <= L.examsEnd) {
      banner.hidden = false;
      $("#exam-banner-text").textContent =
        " Hasta el " + fmt(L.examsEnd) + " la prioridad es la facultad. Del plan remoto, solo lectura liviana (Etapa 0).";
    }
  }

  /* ---------------- Ruta ---------------- */
  function renderStages() {
    var wrap = $("#stages");
    var current = currentStageIndex();
    wrap.replaceChildren.apply(wrap, L.stages.map(function (st, idx) {
      var done = st.tasks.filter(function (t) { return state.tasks[t.id]; }).length;
      var pct = Math.round((done / st.tasks.length) * 100);
      var isCurrent = idx === current;

      var list = el("ul", { class: "task-list" }, st.tasks.map(function (t) {
        var cb = el("input", { type: "checkbox", id: "task-" + t.id });
        cb.checked = !!state.tasks[t.id];
        cb.addEventListener("change", function () {
          if (cb.checked) state.tasks[t.id] = true; else delete state.tasks[t.id];
          save(); renderStages(); renderStats();
          var again = document.getElementById("task-" + t.id); // conservar el foco (teclado)
          if (again) again.focus();
        });
        var row = [cb, el("label", { for: "task-" + t.id }, rich(t.text))];
        if (t.topic) {
          var go = el("a", { class: "task-link", href: "#topic-" + t.topic, text: "Ver tema →" });
          go.addEventListener("click", function (e) { e.preventDefault(); openTopic(t.topic); });
          row.push(go);
        }
        return el("li", { class: "task" + (state.tasks[t.id] ? " is-done" : ""), id: "row-" + t.id }, row);
      }));

      var details = el("details", { class: "card stage" + (isCurrent ? " is-current" : "") }, [
        el("summary", {}, [
          el("div", { class: "stage-title" }, [
            el("h3", { text: st.title }),
            isCurrent ? el("span", { class: "pill pill-accent", text: "Etapa actual" }) : null
          ]),
          el("p", { class: "muted stage-sub", text: st.subtitle }),
          el("div", { class: "bar", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": String(pct), "aria-label": "Progreso de " + st.title }, [
            barFill(pct)
          ]),
          el("span", { class: "stage-count", text: done + " de " + st.tasks.length + " tareas" })
        ]),
        list
      ]);
      if (isCurrent || openStages[st.id]) details.open = true;
      details.addEventListener("toggle", function () { openStages[st.id] = details.open; });
      return details;
    }));
  }
  var openStages = {}; // recuerda qué etapas abriste al re-renderizar

  function barFill(pct) {
    var s = el("span");
    s.style.width = pct + "%";
    return s;
  }

  /* Etapa actual: la etapa 0 mientras dure la época de parciales;
     después, la primera etapa con tareas sin completar. */
  function currentStageIndex() {
    var start = todayStr() <= L.examsEnd ? 0 : 1;
    for (var i = start; i < L.stages.length; i++) {
      var st = L.stages[i];
      if (st.tasks.some(function (t) { return !state.tasks[t.id]; })) return i;
    }
    return L.stages.length - 1;
  }

  /* ---------------- Temas ---------------- */
  var STATUS = [
    { id: "todo", label: "Pendiente" },
    { id: "doing", label: "En curso" },
    { id: "done", label: "Dominado" }
  ];

  function renderTrackFilters() {
    var bar = $("#track-filters");
    var opts = [{ id: "all", name: "Todos" }].concat(L.tracks);
    bar.replaceChildren.apply(bar, opts.map(function (o) {
      var b = el("button", { type: "button", class: "chip", "aria-pressed": String(ui.track === o.id), text: o.name });
      b.addEventListener("click", function () {
        ui.track = o.id;
        $all(".chip", bar).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        filterTopics();
      });
      return b;
    }));
  }

  function trackName(id) {
    var t = L.tracks.filter(function (x) { return x.id === id; })[0];
    return t ? t.name : id;
  }

  function renderTopics() {
    var wrap = $("#topics");
    wrap.replaceChildren.apply(wrap, L.topics.map(function (t) {
      var status = state.topics[t.id] || "todo";

      var seg = el("div", { class: "segmented", role: "radiogroup", "aria-label": "Estado de " + t.title },
        STATUS.map(function (s) {
          var id = "st-" + t.id + "-" + s.id;
          var input = el("input", { type: "radio", name: "st-" + t.id, id: id, value: s.id, class: "sr-only" });
          input.checked = status === s.id;
          input.addEventListener("change", function () {
            if (s.id === "todo") delete state.topics[t.id]; else state.topics[t.id] = s.id;
            save();
            $("#topic-" + t.id).setAttribute("data-status", s.id);
            renderStats();
          });
          return el("span", {}, [input, el("label", { for: id, class: "seg-" + s.id, text: s.label })]);
        }));

      var resources = el("ul", { class: "resources" }, t.resources.map(function (r) {
        return el("li", {}, [
          el("a", { href: r.url, target: "_blank", rel: "noopener noreferrer", text: r.name }),
          el("span", { class: "pill " + (r.free ? "pill-free" : "pill-paid"), text: r.free ? "Gratis" : "Pago" })
        ]);
      }));

      var quizBtn = null;
      if (t.quiz && L.quizzes[t.quiz]) {
        quizBtn = el("button", { type: "button", class: "btn btn-small btn-primary", text: "Hacer el quiz" });
        quizBtn.addEventListener("click", function () { startQuiz(t.quiz); });
      }

      return el("article", { class: "card topic", id: "topic-" + t.id, "data-track": t.track, "data-status": status }, [
        el("div", { class: "topic-meta" }, [
          el("span", { class: "pill pill-track", text: trackName(t.track) }),
          el("span", { class: "muted small", text: t.level + " · " + t.hours })
        ]),
        el("h3", { text: t.title }),
        el("p", { class: "topic-what", text: t.what }),
        el("div", { class: "start-box" }, [
          el("p", { class: "start-label", text: "Empezá así (≈ 20 min)" }),
          el("p", {}, rich(t.start))
        ]),
        el("details", { class: "topic-more" }, [
          el("summary", { text: "Por qué importa, desafío y recursos" }),
          el("p", { class: "mini-title", text: "Por qué importa" }),
          el("p", {}, rich(t.why)),
          el("p", { class: "mini-title", text: "Mini desafío" }),
          el("p", { class: "challenge" }, rich(t.challenge)),
          el("p", { class: "mini-title", text: "Recursos" }),
          resources
        ]),
        el("div", { class: "topic-foot" }, [seg, quizBtn])
      ]);
    }));
    filterTopics();
  }

  function filterTopics() {
    var shown = 0;
    $all("#topics .topic").forEach(function (c) {
      var v = ui.track === "all" || c.getAttribute("data-track") === ui.track;
      c.hidden = !v;
      if (v) shown++;
    });
    $("#topics-count").textContent = "Mostrando " + shown + " temas";
  }

  function openTopic(id) {
    ui.track = "all";
    renderTrackFilters();
    filterTopics();
    var card = $("#topic-" + id);
    if (!card) return;
    var more = $(".topic-more", card);
    if (more) more.open = true;
    card.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    card.classList.add("is-highlight");
    setTimeout(function () { card.classList.remove("is-highlight"); }, 1800);
    var h = $("h3", card);
    if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }

  /* ---------------- Lista de quizzes ---------------- */
  function renderQuizList() {
    var wrap = $("#quiz-list");
    var today = todayStr();
    wrap.replaceChildren.apply(wrap, Object.keys(L.quizzes).map(function (id) {
      var qz = L.quizzes[id];
      var rec = state.quizzes[id];
      var statusText, cls;
      if (!rec) { statusText = "Sin hacer"; cls = "pill-neutral"; }
      else if (rec.next <= today) { statusText = "Repaso pendiente"; cls = "pill-alert"; }
      else if (rec.best >= PASS) { statusText = "Aprobado · repaso el " + fmt(rec.next); cls = "pill-free"; }
      else { statusText = "Repetir el " + fmt(rec.next); cls = "pill-paid"; }

      var btn = el("button", { type: "button", class: "btn btn-small" + (!rec || rec.next <= today ? " btn-primary" : ""), text: rec ? "Repetir" : "Empezar" });
      btn.addEventListener("click", function () { startQuiz(id); });

      return el("article", { class: "card quiz-card" }, [
        el("span", { class: "pill " + cls, text: statusText }),
        el("h3", { text: qz.title }),
        el("p", { class: "muted small", text: qz.questions.length + " preguntas" + (rec ? " · mejor: " + Math.round(rec.best * 100) + " % · último: " + Math.round(rec.last * 100) + " %" : "") }),
        btn
      ]);
    }));
  }

  /* ---------------- Motor del quiz ---------------- */
  var dialog = $("#quiz-dialog");
  var run = null;

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function startQuiz(id) {
    var qz = L.quizzes[id];
    if (!qz) return;
    run = { id: id, quiz: qz, i: 0, correct: 0, wrong: [], answered: false };
    $("#quiz-title").textContent = qz.title;
    if (!dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }
    showQuestion(); // después de abrir, para que el foco quede en la primera opción
  }

  function closeQuiz() {
    if (dialog.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  }

  function setBar(fraction) {
    $("#quiz-bar-fill").style.width = Math.round(fraction * 100) + "%";
  }

  function showQuestion() {
    var q = run.quiz.questions[run.i];
    var total = run.quiz.questions.length;
    run.answered = false;
    $("#quiz-step").textContent = "Pregunta " + (run.i + 1) + " de " + total;
    setBar(run.i / total);

    var opts = shuffle(q.options.map(function (text, idx) { return { text: text, idx: idx }; }));
    var feedback = el("div", { class: "feedback", role: "status", "aria-live": "polite" });
    var next = el("button", { type: "button", class: "btn btn-primary", hidden: true, text: run.i + 1 < total ? "Siguiente" : "Ver resultado" });
    next.addEventListener("click", function () {
      run.i++;
      if (run.i < total) showQuestion(); else showResult();
    });

    var list = el("div", { class: "options", role: "group", "aria-label": "Opciones" }, opts.map(function (o) {
      var b = el("button", { type: "button", class: "option", text: o.text });
      b.addEventListener("click", function () {
        if (run.answered) return;
        run.answered = true;
        var ok = o.idx === q.answer;
        if (ok) run.correct++; else run.wrong.push(q);
        $all(".option", list).forEach(function (x, k) {
          x.disabled = true;
          if (opts[k].idx === q.answer) x.classList.add("is-correct");
        });
        if (!ok) b.classList.add("is-wrong");
        feedback.replaceChildren(
          el("p", { class: ok ? "fb-ok" : "fb-bad", text: ok ? "¡Correcto!" : "No es esa." }),
          el("p", {}, rich(q.why))
        );
        next.hidden = false;
        next.focus();
      });
      return b;
    }));

    var body = $("#quiz-body");
    fill(body, [
      run.i === 0 && run.quiz.intro ? el("p", { class: "quiz-intro" }, rich(run.quiz.intro)) : null,
      el("p", { class: "question" }, rich(q.q)),
      q.code ? el("pre", { class: "code" }, [el("code", { text: q.code })]) : null,
      list,
      feedback,
      el("div", { class: "quiz-actions" }, [next])
    ]);
    var first = $(".option", body);
    if (first) first.focus();
  }

  function showResult() {
    var total = run.quiz.questions.length;
    var score = run.correct / total;
    var today = todayStr();
    var prev = state.quizzes[run.id];
    var next = addDays(today, score >= PASS ? 7 : 1);
    state.quizzes[run.id] = {
      best: Math.max(score, prev ? prev.best : 0),
      last: score,
      date: today,
      next: next
    };
    save();
    setBar(1);
    $("#quiz-step").textContent = "Resultado";

    var pct = Math.round(score * 100);
    var msg = score === 1 ? "Perfecto. Lo tenés dominado: el repaso queda para dentro de 7 días."
      : score >= PASS ? "Aprobado. Leé de nuevo la explicación de lo que fallaste: el repaso queda para dentro de 7 días."
      : "Todavía no. Es normal: equivocarse y leer el porqué es como se aprende. Mañana vuelve a aparecer como repaso.";

    var review = run.wrong.length
      ? el("div", { class: "review" }, [el("p", { class: "mini-title", text: "Repasá lo que fallaste" })].concat(
          run.wrong.map(function (q) {
            return el("div", { class: "review-item" }, [
              el("p", { class: "question" }, rich(q.q)),
              q.code ? el("pre", { class: "code" }, [el("code", { text: q.code })]) : null,
              el("p", {}, [el("strong", { text: "Respuesta: " }), document.createTextNode(q.options[q.answer])]),
              el("p", { class: "muted" }, rich(q.why))
            ]);
          })))
      : null;

    var again = el("button", { type: "button", class: "btn", text: "Repetir ahora" });
    again.addEventListener("click", function () { startQuiz(run.id); });
    var close = el("button", { type: "button", class: "btn btn-primary", text: "Listo" });
    close.addEventListener("click", closeQuiz);

    fill($("#quiz-body"), [
      el("div", { class: "result" }, [
        el("p", { class: "result-score" + (score >= PASS ? " is-pass" : ""), text: run.correct + " / " + total + " · " + pct + " %" }),
        el("p", { text: msg })
      ]),
      review,
      el("div", { class: "quiz-actions" }, [again, close])
    ]);
    close.focus();
    renderQuizList();
    renderStats();
  }

  function initDialog() {
    $("#quiz-close").addEventListener("click", closeQuiz);
    dialog.addEventListener("click", function (e) { if (e.target === dialog) closeQuiz(); });
  }

  /* ---------------- Biblioteca y certificaciones ---------------- */
  function checkList(sel, items, bucket, build) {
    var wrap = $(sel);
    wrap.replaceChildren.apply(wrap, items.map(function (it) {
      var id = bucket + "-" + it.id;
      var cb = el("input", { type: "checkbox", id: id });
      cb.checked = !!state[bucket][it.id];
      var li = el("li", { class: "lib-item" + (cb.checked ? " is-done" : "") });
      cb.addEventListener("change", function () {
        if (cb.checked) state[bucket][it.id] = true; else delete state[bucket][it.id];
        li.classList.toggle("is-done", cb.checked);
        save();
      });
      li.append(cb, build(it, id));
      return li;
    }));
  }

  function renderLibrary() {
    checkList("#library", L.library, "library", function (b, id) {
      var title = b.url
        ? el("a", { href: b.url, target: "_blank", rel: "noopener noreferrer", text: b.title })
        : el("span", { class: "lib-title", text: b.title });
      return el("div", { class: "lib-body" }, [
        el("label", { for: id, class: "lib-head" }, [
          el("span", { class: "pill pill-track", text: b.type }),
          el("span", { class: "sr-only", text: b.title })
        ]),
        el("p", { class: "lib-line" }, [title, el("span", { class: "muted", text: " · " + b.author })]),
        el("p", { class: "muted small", text: b.note })
      ]);
    });
  }

  function renderCerts() {
    checkList("#certs", L.certs, "certs", function (c, id) {
      return el("div", { class: "lib-body" }, [
        el("label", { for: id, class: "lib-head" }, [
          el("span", { class: "pill " + (c.free ? "pill-free" : "pill-paid"), text: c.free ? "Gratis" : "Pago" }),
          el("span", { class: "sr-only", text: "Obtenida: " + c.name })
        ]),
        el("p", { class: "lib-line" }, [el("a", { href: c.url, target: "_blank", rel: "noopener noreferrer", text: c.name })]),
        el("p", { class: "muted small", text: c.when })
      ]);
    });
  }

  /* ---------------- Plan semanal ---------------- */
  function renderWeek() {
    $("#week-label").textContent = "Semana del " + fmt(state.week.start);
    var wrap = $("#week");
    var todayIdx = (new Date().getDay() + 6) % 7; // 0 = lunes
    var order = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"];
    wrap.replaceChildren.apply(wrap, L.week.map(function (d) {
      var id = "day-" + d.id;
      var cb = el("input", { type: "checkbox", id: id });
      cb.checked = !!state.week.days[d.id];
      var li = el("li", { class: "day" + (cb.checked ? " is-done" : "") + (order.indexOf(d.id) === todayIdx ? " is-today" : "") });
      cb.addEventListener("change", function () {
        if (cb.checked) state.week.days[d.id] = true; else delete state.week.days[d.id];
        li.classList.toggle("is-done", cb.checked);
        save();
      });
      li.append(cb, el("label", { for: id }, [
        el("span", { class: "day-name", text: d.day }),
        el("span", { class: "day-task", text: d.task }),
        el("span", { class: "day-hours", text: d.hours })
      ]));
      return li;
    }));
  }

  /* ---------------- ¿Qué hago hoy? ---------------- */
  function suggest() {
    var out = $("#today-result");
    var parts = [];
    var due = dueQuizzes();
    var exams = todayStr() <= L.examsEnd;

    if (exams) {
      parts.push(el("p", {}, [el("strong", { text: "Primero la facultad. " }),
        document.createTextNode("Estás en época de parciales: dedicá tu tiempo de estudio a las materias. Si te sobran 20 minutos, hacé lo de abajo.")]));
    }

    if (due.length) {
      var id = due[0];
      var b = el("button", { type: "button", class: "btn btn-small btn-primary", text: "Repasar " + L.quizzes[id].title });
      b.addEventListener("click", function () { startQuiz(id); });
      parts.push(el("p", { text: "Tenés " + due.length + (due.length === 1 ? " repaso pendiente" : " repasos pendientes") + ". Los repasos van antes que lo nuevo:" }), b);
      out.replaceChildren.apply(out, parts);
      return;
    }

    var idx = currentStageIndex();
    var stage = L.stages[idx];
    var task = stage.tasks.filter(function (t) { return !state.tasks[t.id]; })[0];
    if (!task) {
      parts.push(el("p", { text: "¡Completaste toda la ruta! Elegí un tema \"En curso\" y hacé su mini desafío." }));
      out.replaceChildren.apply(out, parts);
      return;
    }

    parts.push(el("p", {}, [el("strong", { text: stage.title + ": " })].concat(rich(task.text))));

    if (task.topic) {
      var topic = L.topics.filter(function (t) { return t.id === task.topic; })[0];
      if (topic) {
        parts.push(el("p", { class: "today-step" }, [el("strong", { text: "Primer paso: " })].concat(rich(topic.start))));
        var go = el("button", { type: "button", class: "btn btn-small", text: "Abrir el tema " + topic.title });
        go.addEventListener("click", function () { openTopic(topic.id); });
        parts.push(go);
      }
    } else {
      var row = el("button", { type: "button", class: "btn btn-small", text: "Ir a la tarea" });
      row.addEventListener("click", function () {
        var r = $("#row-" + task.id);
        if (r) {
          r.closest("details").open = true;
          r.scrollIntoView({ block: "center" });
          r.classList.add("is-highlight");
          setTimeout(function () { r.classList.remove("is-highlight"); }, 1800);
          var cb = $("input", r); if (cb) cb.focus({ preventScroll: true });
        }
      });
      parts.push(row);
    }
    out.replaceChildren.apply(out, parts);
  }

  /* ---------------- Exportar / importar / reiniciar ---------------- */
  function initData() {
    var status = $("#data-status");

    $("#export-btn").addEventListener("click", function () {
      var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = el("a", { href: url, download: "progreso-aprendizaje-" + todayStr() + ".json" });
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      status.textContent = "Progreso exportado. Guardá el archivo para importarlo en otro dispositivo.";
    });

    $("#import-file").addEventListener("change", function (e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      if (file.size > 200000) { status.textContent = "El archivo es demasiado grande para ser un progreso válido."; return; }
      var reader = new FileReader();
      reader.onload = function () {
        try {
          state = sanitize(JSON.parse(String(reader.result)));
          save();
          renderAll();
          status.textContent = "Progreso importado.";
        } catch (err) {
          status.textContent = "No se pudo leer el archivo: tiene que ser un .json exportado desde acá.";
        }
        e.target.value = "";
      };
      reader.readAsText(file);
    });

    var armed = false;
    var resetBtn = $("#reset-btn");
    resetBtn.addEventListener("click", function () {
      if (!armed) {
        armed = true;
        resetBtn.textContent = "¿Seguro? Tocá de nuevo para borrar todo";
        status.textContent = "Esto borra todo tu progreso en este navegador.";
        setTimeout(function () { armed = false; resetBtn.textContent = "Reiniciar todo"; }, 5000);
        return;
      }
      armed = false;
      resetBtn.textContent = "Reiniciar todo";
      state = emptyState();
      save();
      renderAll();
      status.textContent = "Progreso reiniciado.";
    });
  }

  /* ---------------- Tema y menú ---------------- */
  function initChrome() {
    var root = document.documentElement;
    var tbtn = $("#theme-toggle");
    function sync() {
      var dark = root.getAttribute("data-theme") === "dark";
      tbtn.setAttribute("aria-pressed", String(dark));
      var meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", dark ? "#0b1016" : "#f7f8fa");
    }
    tbtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* ignorar */ }
      sync();
    });
    sync();

    var mbtn = $("#menu-toggle");
    var nav = $("#site-nav");
    function setOpen(o) { nav.classList.toggle("is-open", o); mbtn.setAttribute("aria-expanded", String(o)); }
    mbtn.addEventListener("click", function () { setOpen(!nav.classList.contains("is-open")); });
    $all("a", nav).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); mbtn.focus(); }
    });
  }

  /* ---------------- Arranque ---------------- */
  function renderAll() {
    renderStats();
    renderStages();
    renderTrackFilters();
    renderTopics();
    renderQuizList();
    renderLibrary();
    renderCerts();
    renderWeek();
    $("#today-result").replaceChildren();
  }

  examBanner();
  initChrome();
  initDialog();
  initData();
  $("#today-btn").addEventListener("click", suggest);
  renderAll();
})();
