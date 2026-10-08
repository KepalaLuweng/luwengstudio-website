/* bio-modal.js — modal bio bergoyang + teks ketik ala hacker. Satu fungsi. */
var BIO_TEXT = "Halo, aku Darmawan Aditya\u2014di dunia maya lebih dikenal sebagai KepalaLuweng. Aku adalah seorang Android systems engineer yang punya cara kerja cukup unik. Saat sedang tidak ngoprek Custom ROM, meracik modules (Magisk, KernelSU, APatch), atau membangun LuwengKernel, kamu mungkin menemukanku sedang mengaspal sebagai driver ojol di sekitaran Medan dan Deli Serdang.\n\nPengalaman harian di jalanan inilah yang membentuk prinsip utamaku: software itu harus kencang, jujur, dan benar-benar bisa diandalkan. Untuk mewujudkan standar itu dan menjaga ritme kerjaku tetap cepat, aku mengintegrasikan AI secara penuh dalam setiap alur kerja. Mulai dari brainstorming kode, merancang root tools seperti LuwengSense, sampai mengeksekusi ide-ide baru, AI adalah asisten andalan yang membuat proses engineering-ku jauh lebih efisien.\n\nSemua karyaku bernaung di bawah satu ekosistem. Lewat LuwengStudio, aku membangun solusi digital seperti undangan online (ThemeBox) dan aplikasi Android. Di YouTube, aku berbagi insight teknologi dan konten kreatif lewat LuwengTechId\u2014yang dapur redaksinya (dari skrip hingga riset affiliate) juga didukung erat oleh kecerdasan buatan. Sementara untuk urusan perbaikan langsung, aku mengelola Luweng Home Services\u2014layanan servis teknis rumahan yang praktis, di mana semua pengerjaan dilakukan fleksibel tanpa mengharuskan klien repot menunggu di lokasi.";

function initBioModal() {
  var btn = document.getElementById("btn-bio");
  var bd = document.getElementById("bio-backdrop");
  var close = document.getElementById("bio-close");
  var txtEl = document.getElementById("bio-text");
  if (!btn || !bd || !txtEl) return;
  var typing = false;

  function typeText() {
    if (typing) return;
    typing = true;
    txtEl.textContent = "";
    var i = 0;
    (function tick() {
      if (i <= BIO_TEXT.length) {
        txtEl.textContent = BIO_TEXT.slice(0, i++);
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
