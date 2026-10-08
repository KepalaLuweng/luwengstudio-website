/* tb-warm.js — faq accordion + burger menu untuk landing ThemeBox. */
(function () {
  function initFaq() {
    document.querySelectorAll(".tb-qa .tb-q").forEach(function (q) {
      q.addEventListener("click", function () {
        var item = q.closest(".tb-qa");
        var wasOpen = item.classList.contains("open");
        document.querySelectorAll(".tb-qa.open").forEach(function (o) { o.classList.remove("open"); });
        if (!wasOpen) item.classList.add("open");
      });
    });
  }
  function initBurger() {
    var b = document.getElementById("tb-burger");
    var l = document.getElementById("tb-links");
    if (!b || !l) return;
    b.addEventListener("click", function () { l.classList.toggle("open"); });
    l.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { l.classList.remove("open"); });
    });
  }
  document.addEventListener("DOMContentLoaded", function () {
    initFaq();
    initBurger();
  });
})();
