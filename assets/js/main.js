/* =====================================================================
   main.js: renderiza el contenido de data.js e implementa la interacción.
   Decisiones de seguridad:
   - Nunca se usa innerHTML: todo el texto entra con textContent, así que
     aunque data.js tuviera "<script>", se mostraría como texto (sin XSS).
   - Los links externos llevan rel="noopener noreferrer".
   - localStorage siempre dentro de try/catch (puede estar bloqueado).
   ===================================================================== */
(function () {
  "use strict";

  var D = window.PORTFOLIO;
  if (!D) return;

  var SVG_NS = "http://www.w3.org/2000/svg";
  var state = { lang: "en", filter: "all" };

  /* ---------------- Utilidades ---------------- */
  var store = {
    get: function (k) {
      try { return localStorage.getItem(k); } catch (e) { return null; }
    },
    set: function (k, v) {
      try { localStorage.setItem(k, v); } catch (e) { /* ignorar */ }
    }
  };

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /** Crea un elemento de forma segura. attrs.text usa textContent. */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else node.setAttribute(k, v === true ? "" : String(v));
    });
    [].concat(children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      node.append(c);
    });
    return node;
  }

  /** Texto con `código` entre backticks → nodos de texto + <code>. */
  function richText(str) {
    return String(str).split("`").map(function (part, i) {
      return i % 2 === 1 ? el("code", { text: part }) : document.createTextNode(part);
    });
  }

  function t(key, vars) {
    var dict = D.i18n[state.lang] || D.i18n.en;
    var s = dict[key] !== undefined ? dict[key] : (D.i18n.en[key] || key);
    if (vars) {
      Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    }
    return s;
  }

  /* ---------------- Íconos (datos constantes, sin innerHTML) ---------------- */
  var ICONS = {
    code: [["polyline", { points: "16 18 22 12 16 6" }], ["polyline", { points: "8 6 2 12 8 18" }]],
    layers: [
      ["polygon", { points: "12 2 2 7 12 12 22 7 12 2" }],
      ["polyline", { points: "2 17 12 22 22 17" }],
      ["polyline", { points: "2 12 12 17 22 12" }]
    ],
    shield: [["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }], ["polyline", { points: "9 12 11 14 15 10" }]],
    tool: [["path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" }]],
    github: [["path", { d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" }]],
    external: [
      ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }],
      ["polyline", { points: "15 3 21 3 21 9" }],
      ["line", { x1: "10", y1: "14", x2: "21", y2: "3" }]
    ]
  };

  function icon(name) {
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    (ICONS[name] || []).forEach(function (def) {
      var child = document.createElementNS(SVG_NS, def[0]);
      Object.keys(def[1]).forEach(function (k) { child.setAttribute(k, def[1][k]); });
      svg.appendChild(child);
    });
    return svg;
  }

  function extLink(href, label, iconName, cls) {
    return el("a", { class: cls || "btn btn-small", href: href, target: "_blank", rel: "noopener noreferrer" }, [
      icon(iconName),
      el("span", { text: label })
    ]);
  }

  /* ---------------- Perfil (datos fijos) ---------------- */
  function renderProfile() {
    var p = D.profile;
    $all("[data-bind]").forEach(function (n) {
      var v = p[n.getAttribute("data-bind")];
      if (v) n.textContent = v;
    });

    var emailLink = $("#email-link");
    if (emailLink) emailLink.href = "mailto:" + p.email;

    [["#github-link", p.github], ["#linkedin-link", p.linkedin], ["#source-link", p.repo]].forEach(function (pair) {
      var a = $(pair[0]);
      if (!a) return;
      if (pair[1]) {
        a.href = pair[1];
      } else {
        (a.closest("li") || a).hidden = true; // sin dato → se oculta
      }
    });

    var cv = $("#cv-link");
    if (cv && p.cvUrl) {
      cv.href = p.cvUrl;
      cv.setAttribute("download", "");
      cv.hidden = false;
    }

    if (p.showLearningHub === false) {
      $all("[data-learn-link]").forEach(function (n) { n.hidden = true; });
    }

    var year = $("#year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ---------------- Datos rápidos (Sobre mí) ---------------- */
  function renderFacts() {
    var list = $("#facts");
    if (!list) return;
    var facts = [
      [t("factLocation"), D.profile.location],
      [t("factTimezone"), t("factTimezoneValue")],
      [t("factAvailability"), t("factAvailabilityValue")],
      [t("factEducation"), t("factEducationValue")]
    ];
    list.replaceChildren.apply(list, facts.filter(function (f) { return f[1]; }).map(function (f) {
      return el("li", {}, [el("span", { class: "fact-label", text: f[0] }), el("span", { class: "fact-value", text: f[1] })]);
    }));
  }

  /* ---------------- Servicios ---------------- */
  function renderServices() {
    var grid = $("#services-grid");
    if (!grid) return;
    grid.replaceChildren.apply(grid, D.services.map(function (s) {
      var c = s[state.lang] || s.en;
      return el("article", { class: "card service" }, [
        el("div", { class: "service-icon" }, [icon(s.icon)]),
        el("h3", { text: c.title }),
        el("p", { text: c.text })
      ]);
    }));
  }

  /* ---------------- Proyectos + filtros ---------------- */
  var CATEGORY_LABELS = {
    en: { backend: "Backend", fullstack: "Full stack", frontend: "Frontend", devops: "DevOps" },
    es: { backend: "Backend", fullstack: "Full stack", frontend: "Frontend", devops: "DevOps" }
  };

  function renderFilters() {
    var bar = $("#project-filters");
    if (!bar) return;
    bar.setAttribute("aria-label", t("filterLabel"));
    var cats = [];
    D.projects.forEach(function (p) {
      p.categories.forEach(function (c) { if (cats.indexOf(c) === -1) cats.push(c); });
    });
    var options = ["all"].concat(cats);
    bar.replaceChildren.apply(bar, options.map(function (c) {
      var label = c === "all" ? t("filterAll") : (CATEGORY_LABELS[state.lang][c] || c);
      var b = el("button", { type: "button", class: "chip", "data-filter": c, "aria-pressed": String(state.filter === c), text: label });
      b.addEventListener("click", function () {
        state.filter = c;
        $all(".chip", bar).forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        applyFilter();
      });
      return b;
    }));
  }

  function renderProjects() {
    var grid = $("#projects-grid");
    if (!grid) return;
    grid.replaceChildren.apply(grid, D.projects.map(function (p) {
      var c = p[state.lang] || p.en;
      var links = [];
      if (p.links && p.links.repo) links.push(extLink(p.links.repo, t("code"), "github"));
      if (p.links && p.links.demo) links.push(extLink(p.links.demo, t("demo"), "external", "btn btn-small btn-primary"));

      var head = el("header", { class: "project-head" }, [
        el("div", { class: "project-meta" }, [
          p.featured ? el("span", { class: "pill pill-accent", text: t("featured") }) : null,
          el("span", { class: "project-year", text: String(p.year) })
        ]),
        el("h3", { text: c.title })
      ]);

      var body = el("div", { class: "project-body" }, [
        el("dl", { class: "project-story" }, [
          el("dt", { text: t("problem") }), el("dd", { text: c.problem }),
          el("dt", { text: t("solution") }), el("dd", { text: c.solution })
        ])
      ]);

      var side = el("div", { class: "project-side" }, [
        el("h4", { class: "mini-title", text: t("highlights") }),
        el("ul", { class: "checklist" }, c.highlights.map(function (h) { return el("li", {}, richText(h)); })),
        el("ul", { class: "tags", "aria-label": "Stack" }, p.tags.map(function (tag) { return el("li", { text: tag }); })),
        links.length ? el("div", { class: "project-links" }, links) : null
      ]);

      return el("article", {
        class: "card project" + (p.featured ? " project-featured" : ""),
        "data-categories": p.categories.join(" "),
        id: "project-" + p.id
      }, [head, el("div", { class: "project-content" }, [body, side])]);
    }));
    applyFilter();
  }

  function applyFilter() {
    var cards = $all("#projects-grid .project");
    var shown = 0;
    cards.forEach(function (card) {
      var cats = card.getAttribute("data-categories").split(" ");
      var visible = state.filter === "all" || cats.indexOf(state.filter) !== -1;
      card.hidden = !visible;
      if (visible) shown++;
    });
    var live = $("#projects-count");
    if (live) live.textContent = t("showing", { n: shown, total: cards.length });
  }

  /* ---------------- Habilidades ---------------- */
  function renderSkills() {
    var grid = $("#skills-grid");
    if (!grid) return;
    grid.replaceChildren.apply(grid, D.skills.map(function (g) {
      return el("div", { class: "skill-group" + (g.learning ? " skill-learning" : "") }, [
        el("h3", { text: g[state.lang] || g.en }),
        el("ul", { class: "tags" }, g.items.map(function (i) { return el("li", { text: i }); }))
      ]);
    }));
  }

  /* ---------------- Cómo trabajo ---------------- */
  function renderProcess() {
    var list = $("#process-list");
    if (!list) return;
    list.replaceChildren.apply(list, D.process.map(function (s, i) {
      var c = s[state.lang] || s.en;
      return el("li", { class: "step" }, [
        el("span", { class: "step-num", "aria-hidden": "true", text: String(i + 1).padStart(2, "0") }),
        el("div", {}, [el("h3", { text: c.title }), el("p", { text: c.text })])
      ]);
    }));
  }

  /* ---------------- Idioma ---------------- */
  function applyLang(lang) {
    state.lang = D.i18n[lang] ? lang : "en";
    document.documentElement.lang = state.lang;

    $all("[data-i18n]").forEach(function (n) { n.textContent = t(n.getAttribute("data-i18n")); });
    $all("[data-i18n-aria]").forEach(function (n) { n.setAttribute("aria-label", t(n.getAttribute("data-i18n-aria"))); });
    $all("[data-i18n-title]").forEach(function (n) { n.setAttribute("title", t(n.getAttribute("data-i18n-title"))); });

    document.title = D.profile.name + " · " + t("metaRole");
    var desc = $('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("metaDescription"));

    var langBtn = $("#lang-toggle");
    if (langBtn) langBtn.textContent = state.lang === "en" ? "ES" : "EN";

    renderFacts();
    renderServices();
    renderFilters();
    renderProjects();
    renderSkills();
    renderProcess();
    clearFormErrors();
    store.set("lang", state.lang);
  }

  function initLang() {
    var saved = store.get("lang");
    var nav = (navigator.language || "en").toLowerCase();
    applyLang(saved || (nav.indexOf("es") === 0 ? "es" : "en"));
    var btn = $("#lang-toggle");
    if (btn) btn.addEventListener("click", function () { applyLang(state.lang === "en" ? "es" : "en"); });
  }

  /* ---------------- Tema claro / oscuro ---------------- */
  function initTheme() {
    var btn = $("#theme-toggle");
    if (!btn) return;
    var root = document.documentElement;
    function sync() {
      var dark = root.getAttribute("data-theme") === "dark";
      btn.setAttribute("aria-pressed", String(dark));
      var meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", dark ? "#0b1016" : "#f7f8fa");
    }
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      store.set("theme", next);
      sync();
    });
    sync();
  }

  /* ---------------- Menú móvil y sección activa ---------------- */
  function initNav() {
    var btn = $("#menu-toggle");
    var nav = $("#site-nav");
    if (btn && nav) {
      var setOpen = function (open) {
        nav.classList.toggle("is-open", open);
        btn.setAttribute("aria-expanded", String(open));
      };
      btn.addEventListener("click", function () { setOpen(!nav.classList.contains("is-open")); });
      $all("a", nav).forEach(function (a) { a.addEventListener("click", function () { setOpen(false); }); });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); btn.focus(); }
      });
    }

    if (!("IntersectionObserver" in window)) return;
    var links = $all('#site-nav a[href^="#"]');
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute("aria-current"); });
        var a = byId[entry.target.id];
        if (a) a.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }

  /* ---------------- Copiar email ---------------- */
  function initCopy() {
    var btn = $("#copy-email");
    var status = $("#copy-status");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var done = function (ok) { if (status) status.textContent = t(ok ? "copied" : "copyFail"); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(D.profile.email).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
  }

  /* ---------------- Formulario de contacto (mailto, sin backend) ---------------- */
  function fieldError(input, msg) {
    var err = document.getElementById(input.id + "-error");
    if (msg) {
      input.setAttribute("aria-invalid", "true");
      if (err) err.textContent = msg;
    } else {
      input.removeAttribute("aria-invalid");
      if (err) err.textContent = "";
    }
  }

  function clearFormErrors() {
    $all("#contact-form [aria-invalid]").forEach(function (i) { fieldError(i, ""); });
    var status = $("#form-status");
    if (status) status.textContent = "";
  }

  function validate(input) {
    var v = input.validity;
    if (v.valueMissing) return t("errRequired");
    if (v.typeMismatch) return t("errEmail");
    if (v.tooShort || (input.minLength > 0 && input.value.trim().length < input.minLength)) return t("errShort");
    return "";
  }

  function initForm() {
    var form = $("#contact-form");
    if (!form) return;
    var inputs = $all("input, textarea", form);

    inputs.forEach(function (i) {
      i.addEventListener("blur", function () { if (i.value) fieldError(i, validate(i)); });
      i.addEventListener("input", function () { if (i.getAttribute("aria-invalid")) fieldError(i, validate(i)); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      inputs.forEach(function (i) {
        var msg = validate(i);
        fieldError(i, msg);
        if (msg && !firstBad) firstBad = i;
      });
      if (firstBad) { firstBad.focus(); return; }

      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var typeSel = form.elements.type;
      var type = typeSel.options[typeSel.selectedIndex].text;
      var msg = form.elements.message.value.trim();

      var subject = t("emailSubject") + ": " + type + " (" + name + ")";
      var body = msg + "\n\n— " + name + " <" + email + ">";
      window.location.href =
        "mailto:" + D.profile.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      var status = $("#form-status");
      if (status) status.textContent = t("formOk", { email: D.profile.email });
    });
  }

  /* ---------------- Arranque ---------------- */
  renderProfile();
  initLang();
  initTheme();
  initNav();
  initCopy();
  initForm();
  document.documentElement.classList.add("js");
})();
