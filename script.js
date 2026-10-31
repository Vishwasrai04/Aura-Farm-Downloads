/* ---- EDIT THESE VALUES, then every button and link updates ---- */
var DOWNLOAD_URL  = "https://github.com/Vishwasrai04/Aura-Farm-Downloads/releases/latest";
var SUPPORT_EMAIL = "raivishwas.04@gmail.com";
// Paste a Google Form or Tally link to send feedback there.
// Leave it empty and the "Share feedback" button opens an email to SUPPORT_EMAIL instead.
var FEEDBACK_URL  = "";
/* ------------------------------------------------------------- */

document.querySelectorAll("[data-download]").forEach(function (a) { a.href = DOWNLOAD_URL; });
document.querySelectorAll("[data-email]").forEach(function (a) {
  a.href = "mailto:" + SUPPORT_EMAIL;
  a.textContent = SUPPORT_EMAIL;
});
document.querySelectorAll("[data-feedback]").forEach(function (a) {
  a.href = FEEDBACK_URL ? FEEDBACK_URL
    : "mailto:" + SUPPORT_EMAIL + "?subject=" + encodeURIComponent("Aura Farm beta feedback");
});
document.getElementById("yr").textContent = new Date().getFullYear();

/* Product stage: cards start scattered, settle into project lanes once visible */
(function () {
  var stage = document.getElementById("stage");
  if (!stage) return;
  var buttons = stage.parentNode.querySelectorAll("[data-set]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function set(state) {
    stage.setAttribute("data-state", state);
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-set") === state ? "true" : "false");
    });
  }
  buttons.forEach(function (b) {
    b.addEventListener("click", function () { set(b.getAttribute("data-set")); });
  });

  if (reduce || !("IntersectionObserver" in window)) { set("ordered"); return; }
  set("scattered");
  var done = false;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !done) {
        done = true;
        io.disconnect();
        setTimeout(function () { set("ordered"); }, 900);
      }
    });
  }, { threshold: 0.55 });
  io.observe(stage);
})();

/* Real screenshot: shown only if assets/hero.png exists */
(function () {
  var img = new Image();
  img.onload = function () {
    document.getElementById("realimg").src = "assets/hero.png";
    document.getElementById("real").hidden = false;
  };
  img.src = "assets/hero.png";
})();

/* Stars in the hero sky (fixed seed, so the sky looks the same on every visit) */
(function () {
  var g = document.getElementById("stars");
  if (!g) return;
  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
  var NS = "http://www.w3.org/2000/svg";
  for (var i = 0; i < 70; i++) {
    var c = document.createElementNS(NS, "circle");
    c.setAttribute("cx", (rnd() * 1440).toFixed(0));
    c.setAttribute("cy", (rnd() * 330).toFixed(0));
    c.setAttribute("r", (0.5 + rnd() * 1.2).toFixed(2));
    c.setAttribute("opacity", (0.25 + rnd() * 0.65).toFixed(2));
    g.appendChild(c);
  }
})();
