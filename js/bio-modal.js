/* bio-modal.js — modal bio multi-halaman ala dialog game. Satu fungsi. */
var BIO_PAGES = [
  {
    title: "Perkenalan",
    text: "Halo, aku Darmawan Aditya\u2014di dunia maya lebih dikenal sebagai KepalaLuweng. Aku adalah seorang Android systems engineer yang punya cara kerja cukup unik. Saat sedang tidak ngoprek Custom ROM, meracik modules (Magisk, KernelSU, APatch), atau membangun LuwengKernel, kamu mungkin menemukanku sedang mengaspal sebagai driver ojol di sekitaran Medan dan Deli Serdang."
  },
  {
    title: "Prinsip",
    text: "Pengalaman harian di jalanan inilah yang membentuk prinsip utamaku: software itu harus kencang, jujur, dan benar-benar bisa diandalkan. Untuk mewujudkan standar itu dan menjaga ritme kerjaku tetap cepat, aku mengintegrasikan AI secara penuh dalam setiap alur kerja. Mulai dari brainstorming kode, merancang root tools seperti LuwengSense, sampai mengeksekusi ide-ide baru, AI adalah asisten andalan yang membuat proses engineering-ku jauh lebih efisien."
  },
  {
    title: "Ekosistem",
    text: "Semua karyaku bernaung di bawah satu ekosistem. Lewat LuwengStudio, aku membangun solusi digital seperti undangan online (ThemeBox) dan aplikasi Android. Di YouTube, aku berbagi insight teknologi dan konten kreatif lewat LuwengTechId\u2014yang dapur redaksinya (dari skrip hingga riset affiliate) juga didukung erat oleh kecerdasan buatan. Sementara untuk urusan perbaikan langsung, aku mengelola Luweng Home Services\u2014layanan servis teknis rumahan yang praktis, di mana semua pengerjaan dilakukan fleksibel tanpa mengharuskan klien repot menunggu di lokasi."
  }
];
var BIO_KEYS = ["LuwengKernel", "LuwengSense", "ThemeBox", "LuwengTechId", "Luweng Home Services", "Magisk", "KernelSU", "APatch", "KepalaLuweng", "Darmawan Aditya"];

function bioHighlight(t) {
  var out = t;
  BIO_KEYS.forEach(function (k) {
    out = out.split(k).join("\u0001" + k + "\u0002");
  });
  out = out.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  out = out.split("\u0001").join('<b class="bio-hl">').split("\u0002").join("</b>");
  return out;
}

function initBioModal() {
  var btn = document.getElementById("btn-bio");
  var bd = document.getElementById("bio-backdrop");
  var close = document.getElementById("bio-close");
  var txtEl = document.getElementById("bio-text");
  var pgTitle = document.getElementById("bio-page-title");
  var pgNum = document.getElementById("bio-page-num");
  var prev = document.getElementById("bio-prev");
  var next = document.getElementById("bio-next");
  if (!btn || !bd || !txtEl) return;
  var page = 0;
  var typing = false;
  var timer = null;

  function typePage() {
    if (timer) clearTimeout(timer);
    typing = true;
    var full = BIO_PAGES[page].text;
    txtEl.innerHTML = "";
    if (pgTitle) pgTitle.textContent = BIO_PAGES[page].title;
    if (pgNum) pgNum.textContent = (page + 1) + " / " + BIO_PAGES.length;
    if (prev) prev.disabled = page === 0;
    if (next) next.disabled = page === BIO_PAGES.length - 1;
    var i = 0;
    (function tick() {
      if (!typing) return;
      if (i <= full.length) {
        txtEl.innerHTML = bioHighlight(full.slice(0, i++)) + '<span class="bio-cursor">\u258B</span>';
        timer = setTimeout(tick, 10);
      } else {
        typing = false;
        txtEl.innerHTML = bioHighlight(full);
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
    page = 0;
    typePage();
  }
  function shut() {
    typing = false;
    if (timer) clearTimeout(timer);
    bd.hidden = true;
    document.body.style.overflow = "";
  }
  function go(d) {
    var np = page + d;
    if (np < 0 || np >= BIO_PAGES.length) return;
    page = np;
    typePage();
  }
  btn.addEventListener("click", open);
  if (close) close.addEventListener("click", shut);
  if (prev) prev.addEventListener("click", function () { go(-1); });
  if (next) next.addEventListener("click", function () { go(1); });
  bd.addEventListener("click", function (e) { if (e.target === bd) shut(); });
  document.addEventListener("keydown", function (e) {
    if (bd.hidden) return;
    if (e.key === "Escape") shut();
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  });
}
document.addEventListener("DOMContentLoaded", initBioModal);
