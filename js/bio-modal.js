/* bio-modal.js — modal bio bergoyang + teks ketik ala hacker. Satu fungsi. */
function initBioModal() {
  var btn = document.getElementById("btn-bio");
  var bd = document.getElementById("bio-backdrop");
  var close = document.getElementById("bio-close");
  var txtEl = document.getElementById("bio-text");
  if (!btn || !bd || !txtEl) return;
  var fullText = txtEl.dataset.full || "";
  var typing = false;

  function typeText() {
    if (typing) return;
    typing = true;
    txtEl.textContent = "";
    var i = 0;
    (function tick() {
      if (i <= fullText.length) {
        txtEl.textContent = fullText.slice(0, i++);
        setTimeout(tick, 12);
      } else {
        typing = false;
      }
    })();
  }
  function open() {
    bd.hidden = false;
    document.body.style.overflow = "hidden";
    var card = bd.querySelector(".bio-card");
    if (card) {
      card.classList.remove("swing");
      void card.offsetWidth;
      card.classList.add("swing");
    }
    typeText();
  }
  function shut() {
    bd.hidden = true;
    document.body.style.overflow = "";
  }
  btn.addEventListener("click", open);
  if (close) close.addEventListener("click", shut);
  bd.addEventListener("click", function (e) { if (e.target === bd) shut(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !bd.hidden) shut(); });
}
document.addEventListener("DOMContentLoaded", initBioModal);
