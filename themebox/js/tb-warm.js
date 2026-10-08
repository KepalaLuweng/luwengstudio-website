/* tb-warm.js — katalog, filter, faq, burger untuk landing ThemeBox hangat. */
(function () {
  function formatRp(n) {
    return "Rp" + Number(n).toLocaleString("id-ID");
  }
  function card(t) {
    return '<div class="tb-card">' +
      '<img src="' + t.preview + '" alt="' + t.name + '" loading="lazy">' +
      '<div class="tb-card-body">' +
      '<h3>' + t.name + '</h3>' +
      '<div class="price">' + formatRp(t.price) + '</div>' +
      '<div class="tb-card-actions">' +
      '<a class="tb-btn tb-btn-demo" href="demo/' + t.file + '" target="_blank">Lihat Demo</a>' +
      '<a class="tb-btn tb-btn-order" href="order/?theme=' + t.file + '">Pilih Theme</a>' +
      '</div></div></div>';
  }
  function render(cat) {
    var grid = document.getElementById("tb-grid");
    if (!grid || typeof THEMES === "undefined") return;
    var list = cat === "semua" ? THEMES : THEMES.filter(function (t) { return t.cat === cat; });
    var shown = list.slice(0, 6);
    grid.innerHTML = shown.map(card).join("");
    var more = document.getElementById("tb-more");
    if (more) {
      if (list.length > 6) {
        more.style.display = "block";
        var link = more.querySelector("a");
        var slug = { "Pernikahan": "pernikahan", "Khitanan": "khitanan", "Aqiqah": "aqiqah", "Ulang Tahun": "ultah", "Wisuda": "wisuda" }[cat];
        link.href = slug ? slug + "/" : "#katalog";
        link.textContent = "Lihat Semua " + list.length + " Theme →";
      } else {
        more.style.display = "none";
      }
    }
  }
  function initChips() {
    var chips = document.querySelectorAll("#tb-chips .tb-chip");
    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        chips.forEach(function (x) { x.classList.remove("active"); });
        c.classList.add("active");
        render(c.dataset.cat);
      });
    });
  }
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
    initChips();
    initFaq();
    initBurger();
    render("semua");
  });
})();
