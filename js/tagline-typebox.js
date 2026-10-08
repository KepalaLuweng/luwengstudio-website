/* tagline-typebox.js — dialog box ala game, teks muncul huruf per huruf. Satu fungsi. */
function initTaglineTypebox() {
  var box = document.getElementById("tagline-box");
  if (!box) return;
  var txt = box.querySelector(".tagline-text");
  if (!txt) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    txt.textContent = txt.dataset.full;
    return;
  }
  var full = txt.dataset.full;
  txt.textContent = "";
  var i = 0;
  setTimeout(function tick() {
    if (i <= full.length) {
      txt.textContent = full.slice(0, i++);
      setTimeout(tick, 45);
    } else {
      box.classList.add("done");
    }
  }, 3000);
}
