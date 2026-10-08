document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initFilters();
  initProjectModal();
  renderPortfolio("semua");
  initTerminal();
  initStatsAnim();
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
