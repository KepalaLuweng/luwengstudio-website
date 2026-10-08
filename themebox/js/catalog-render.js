function renderCatalog(cat) {
  const grid = document.getElementById("theme-grid");
  const list = cat === "semua" ? THEMES : THEMES.filter(t => t.cat === cat);
  grid.innerHTML = list.map(t => `
    <div class="theme-card" data-file="${t.file}" onclick="selectTheme('${t.file}')">
      <div class="theme-thumb">${t.name}</div>
      <div class="theme-info">
        <h3>${t.name}</h3>
        <div class="cat">${t.cat}</div>
        <div class="price">${formatRp(t.price)}</div>
      </div>
    </div>`).join("");
}

function initCatalogTabs() {
  document.querySelectorAll(".cat-tabs .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cat-tabs .filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCatalog(btn.dataset.cat);
    });
  });
}

function selectTheme(file) {
  document.querySelectorAll(".theme-card").forEach(c => c.classList.remove("selected"));
  document.querySelector(`.theme-card[data-file="${file}"]`).classList.add("selected");
  const t = THEMES.find(x => x.file === file);
  document.getElementById("order-theme").value = t.name;
  document.getElementById("order-price").value = t.price;
  updateSummary();
  document.getElementById("form-order").scrollIntoView({ behavior: "smooth" });
}
