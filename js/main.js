document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initFilters();
  renderPortfolio("semua");
  document.getElementById("year").textContent = new Date().getFullYear();
});
