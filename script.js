/* ---- EDIT THESE THREE VALUES, then every button updates ---- */
var DOWNLOAD_URL = "https://github.com/Vishwasrai04/Aura-Farm-Downloads/releases/latest";
var FEEDBACK_URL = "https://forms.gle/YOUR_FORM_ID";
var SUPPORT_EMAIL = "YOUR_EMAIL@example.com";
/* ------------------------------------------------------------ */
document.querySelectorAll("[data-download]").forEach(function(a){a.href=DOWNLOAD_URL});
document.querySelectorAll("[data-feedback]").forEach(function(a){a.href=FEEDBACK_URL});
document.querySelectorAll("[data-email]").forEach(function(a){a.href="mailto:"+SUPPORT_EMAIL;a.textContent=SUPPORT_EMAIL});
document.getElementById("yr").textContent = new Date().getFullYear();
