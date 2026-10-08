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
  function initSlideshow() {
    if (typeof TESTIMONIS === "undefined" || !TESTIMONIS.length) return;
    var card = document.getElementById("tb-slide");
    var txt = document.getElementById("tb-slide-text");
    var nama = document.getElementById("tb-slide-nama");
    var dotsWrap = document.getElementById("tb-dots");
    if (!card || !txt) return;
    var idx = 0, timer = null;
    // buat 5 dots indikator (bukan 100)
    for (var d = 0; d < 5; d++) {
      var dot = document.createElement("span");
      dot.className = "tb-dot" + (d === 0 ? " active" : "");
      dot.dataset.i = d;
      dot.addEventListener("click", function () {
        idx = parseInt(this.dataset.i) * 20 % TESTIMONIS.length;
        show(idx); restart();
      });
      dotsWrap.appendChild(dot);
    }
    function show(i) {
      card.classList.add("fade");
      setTimeout(function () {
        var t = TESTIMONIS[i];
        txt.textContent = '"' + t.text + '"';
        nama.textContent = t.nama + " — " + t.acara + ", " + t.kota;
        card.classList.remove("fade");
        var dots = dotsWrap.querySelectorAll(".tb-dot");
        dots.forEach(function (x, xi) {
          x.classList.toggle("active", xi === Math.floor(i / 20) % 5);
        });
      }, 400);
    }
    function next() { idx = (idx + 1) % TESTIMONIS.length; show(idx); }
    function restart() { if (timer) clearInterval(timer); timer = setInterval(next, 5000); }
    show(0); restart();
  }
  document.addEventListener("DOMContentLoaded", function () {
    initFaq();
    initBurger();
    initSlideshow();
  });
})();
