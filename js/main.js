document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initTerminal();
  initTaglineTypebox();
  initStatsAnim();
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
