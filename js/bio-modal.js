/* bio-modal.js — buka/tutup modal bio. Satu fungsi. */
function initBioModal() {
  var btn = document.getElementById("btn-bio");
  var bd = document.getElementById("bio-backdrop");
  var close = document.getElementById("bio-close");
  if (!btn || !bd) return;
  function open() { bd.hidden = false; document.body.style.overflow = "hidden"; }
  function shut() { bd.hidden = true; document.body.style.overflow = ""; }
  btn.addEventListener("click", open);
  if (close) close.addEventListener("click", shut);
  bd.addEventListener("click", function (e) { if (e.target === bd) shut(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !bd.hidden) shut(); });
}
document.addEventListener("DOMContentLoaded", initBioModal);
