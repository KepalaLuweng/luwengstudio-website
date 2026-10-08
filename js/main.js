document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initTerminal();
  initTaglineParticles();
  initStatsAnim();
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
