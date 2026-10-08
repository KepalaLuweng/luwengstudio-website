document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initFilters();
  initProjectModal();
  renderPortfolio("semua");
  document.getElementById("year").textContent = new Date().getFullYear();
});
