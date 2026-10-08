/* portfolio-page.js — init khusus halaman portofolio. Satu fungsi. */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initFilters();
  initProjectModal();
  renderPortfolio("semua");
});
