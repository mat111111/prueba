/* Se carga en el <head> (sin defer) para aplicar el tema antes de pintar
   la página y evitar el "flash" de color. Archivo externo porque la CSP
   no permite scripts inline. */
(function () {
  "use strict";
  var saved = null;
  try {
    saved = localStorage.getItem("theme");
  } catch (e) {
    /* almacenamiento bloqueado: seguimos con la preferencia del sistema */
  }
  var prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = saved === "light" || saved === "dark" ? saved : prefersDark ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
})();
