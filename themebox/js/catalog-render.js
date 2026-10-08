const TB_BASE = (() => {
  try {
    const s = (document.currentScript && document.currentScript.src) || "";
    const i = s.indexOf("themebox/js/");
    if (i >= 0) return s.slice(0, i + "themebox/".length);
  } catch (e) {}
  return "";
})();

function formatRp(n) {
  return "Rp" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(".000", "rb");
}

function themeCard(t) {
  return `
    <div class="theme-card" data-file="${t.file}">
      <div class="phone-mock" onclick="selectTheme('${t.file}')">
        <div class="phone-frame">
          <img src="${TB_BASE}${t.preview}" alt="Preview ${t.name}" loading="lazy">
        </div>
        <span class="price-badge">${formatRp(t.price)}</span>
      </div>
      <div class="theme-info">
        <h3>${t.name}</h3>
        <div class="theme-cat">${t.cat}</div>
        <div class="theme-actions">
          <a class="btn-demo" href="${TB_BASE}demo/${t.file}" target="_blank" onclick="event.stopPropagation()">Lihat Demo</a>
          <button class="btn-order-sm" onclick="event.stopPropagation();selectTheme('${t.file}')">Pilih Theme →</button>
        </div>
      </div>
    </div>`;
}

function renderCatalogSections() {
  const wrap = document.getElementById("catalog-sections");
  if (!wrap || typeof THEMES === "undefined") return;
  const cats = ["Pernikahan", "Khitanan", "Aqiqah", "Ulang Tahun", "Wisuda"];
  const emojis = {"Pernikahan": "💒", "Khitanan": "🕌", "Aqiqah": "👶", "Ulang Tahun": "🎂", "Wisuda": "🎓"};
  wrap.innerHTML = cats.map(cat => {
    const list = THEMES.filter(t => t.cat === cat);
    const slug = cat.toLowerCase().replace(/ /g, "-");
    return `
    <div class="cat-section" id="cat-${slug}">
      <div class="cat-section-head">
        <span class="cat-section-emoji">${emojis[cat]}</span>
        <h3>${cat}</h3>
        <span class="cat-section-count">${list.length} theme</span>
      </div>
      <div class="theme-grid">${list.map(themeCard).join("")}</div>
    </div>`;
  }).join("");
}

function selectTheme(file) {
  const t = THEMES.find(x => x.file === file);
  if (!t) return;
  const url = "/themebox/order/?theme=" + encodeURIComponent(t.file);
  window.location.href = url;
}

function initFaq() {
  document.querySelectorAll(".faq-q").forEach(q => {
    q.addEventListener("click", () => {
      q.closest(".faq-item").classList.toggle("open");
    });
  });
}
