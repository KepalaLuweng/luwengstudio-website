document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initFilters();
  initProjectModal();
  renderPortfolio("semua");
  initTerminal();
  document.getElementById("year").textContent = new Date().getFullYear();
});
