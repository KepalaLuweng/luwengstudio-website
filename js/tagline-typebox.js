/* tagline-typebox.js — dialog box ala game, teks muncul huruf per huruf. Satu fungsi. */
var TAGLINE_TEXT = "Studio independen \u2014 kernel, modul root, aplikasi & jasa digital";

function initTaglineTypebox() {
  var box = document.getElementById("tagline-box");
  if (!box) return;
  var txt = box.querySelector(".tagline-text");
  if (!txt) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    txt.textContent = TAGLINE_TEXT;
    return;
  }
  txt.textContent = "";
  var i = 0;
  setTimeout(function tick() {
    if (i <= TAGLINE_TEXT.length) {
      txt.textContent = TAGLINE_TEXT.slice(0, i++);
      setTimeout(tick, 45);
    } else {
      box.classList.add("done");
    }
  }, 3000);
}
