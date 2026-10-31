/* ---- EDIT THESE VALUES, then every button and link updates ---- */
var REPO          = "Vishwasrai04/Aura-Farm-Downloads";
var DOWNLOAD_URL  = "https://github.com/" + REPO + "/releases/latest";   // fallback: the release page
// Optional: paste the exact .exe link to skip auto-detection, for example
// "https://github.com/Vishwasrai04/Aura-Farm-Downloads/releases/download/v0.1.0-beta/AuraFarm-Setup.exe"
var DIRECT_DOWNLOAD_URL = "";
var SUPPORT_EMAIL = "raivishwas.04@gmail.com";
// Paste a Google Form or Tally link to send feedback there.
// Leave it empty and the "Share feedback" button opens an email to SUPPORT_EMAIL instead.
var FEEDBACK_URL  = "";
/* ------------------------------------------------------------- */

function setDownload(url) {
  document.querySelectorAll("[data-download]").forEach(function (a) { a.href = url; });
}
setDownload(DIRECT_DOWNLOAD_URL || DOWNLOAD_URL);

/* Direct download: find the newest .exe in the GitHub releases and link straight to it.
   If anything goes wrong, the buttons keep pointing at the release page. */
(function () {
  if (DIRECT_DOWNLOAD_URL || !window.fetch) return;
  var KEY = "aurafarm-dl-v1", MAX_AGE = 10 * 60 * 1000;

  function apply(r) {
    setDownload(r.url);
    var info = document.querySelector("[data-dl-info]");
    if (info) {
      info.textContent = "Latest: " + r.tag + ". File: " + r.name + (r.mb ? ", " + r.mb + " MB" : "") + ".";
      info.hidden = false;
    }
  }
  try {
    var cached = JSON.parse(sessionStorage.getItem(KEY) || "null");
    if (cached && Date.now() - cached.t < MAX_AGE) { apply(cached.r); return; }
  } catch (e) {}

  fetch("https://api.github.com/repos/" + REPO + "/releases?per_page=10",
        { headers: { Accept: "application/vnd.github+json" } })
    .then(function (res) { return res.ok ? res.json() : Promise.reject(res.status); })
    .then(function (list) {
      for (var i = 0; i < list.length; i++) {
        var rel = list[i];
        if (rel.draft) continue;
        var asset = (rel.assets || []).filter(function (a) { return /\.exe$/i.test(a.name); })[0];
        if (asset) {
          var r = { url: asset.browser_download_url, name: asset.name, tag: rel.tag_name,
                    mb: asset.size ? Math.round(asset.size / 1048576) : 0 };
          apply(r);
          try { sessionStorage.setItem(KEY, JSON.stringify({ t: Date.now(), r: r })); } catch (e) {}
          return;
        }
      }
    })
    .catch(function () { /* keep the release-page fallback */ });
})();
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
