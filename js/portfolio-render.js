function cardHtml(p, idx) {
  const chips = p.tech.map(t => `<span class="chip">${t}</span>`).join("");
  return `<article class="pf-card" data-idx="${idx}" data-cat="${p.cat}" tabindex="0" role="button" aria-label="Detail ${p.name}">
    <div class="pf-visual">${mockupHtml(p.mock)}</div>
    <div class="pf-body">
      <span class="chip gold">${labelCat(p.cat)}</span>
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>
      <div class="meta">${chips}</div>
      <span class="link-arrow">Lihat Detail →</span>
    </div>
  </article>`;
}

function renderPortfolio(filter) {
  const grid = document.getElementById("portfolio-grid");
  const list = PORTFOLIO.map((p, i) => ({ p, i }))
    .filter(({ p }) => filter === "semua" || p.cat === filter);
  grid.innerHTML = list.map(({ p, i }) => cardHtml(p, i)).join("");
  grid.querySelectorAll(".pf-card").forEach(card => {
    const open = () => openProjectModal(PORTFOLIO[parseInt(card.dataset.idx, 10)]);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });
}

function initFilters() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderPortfolio(btn.dataset.filter);
    });
  });
}
