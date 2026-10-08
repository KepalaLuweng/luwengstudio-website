function cardHtml(p) {
  const chips = p.tech.map(t => `<span class="chip">${t}</span>`).join("");
  const action = p.url
    ? `<a class="link-arrow" href="${p.url}" ${p.url.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>Lihat →</a>`
    : `<span class="badge-soon">Segera rilis</span>`;
  return `<article class="card" data-cat="${p.cat}">
    <h3>${p.name}</h3>
    <p class="desc">${p.desc}</p>
    <div class="meta"><span class="chip gold">${labelCat(p.cat)}</span>${chips}</div>
    <div class="actions">${action}</div>
  </article>`;
}

function labelCat(c) {
  return { kernel: "Kernel", modul: "Modul Root", aplikasi: "Aplikasi", data: "Data & Util" }[c] || c;
}

function renderPortfolio(filter) {
  const grid = document.getElementById("portfolio-grid");
  const list = filter === "semua" ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === filter);
  grid.innerHTML = list.map(cardHtml).join("");
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
