function modalButtons(p) {
  const btns = [];
  if (p.internal) {
    btns.push(`<a class="btn btn-gold" href="${p.url}">Buka Katalog</a>`);
  } else {
    if (p.dl) btns.push(`<a class="btn btn-gold" href="${p.dl}" target="_blank" rel="noopener">Download</a>`);
  }
  if (p.url && !p.internal) {
    btns.push(`<a class="btn btn-ghost" href="${p.url}" target="_blank" rel="noopener">Source Code</a>`);
  }
  if (!p.url) {
    btns.push(`<span class="badge-soon">Segera rilis</span>`);
  }
  return btns.join("");
}

function openProjectModal(p) {
  const backdrop = document.getElementById("pf-backdrop");
  const content = document.getElementById("pf-modal-content");
  const feats = (p.features || []).map(f => `<li>${f}</li>`).join("");
  const chips = (p.tech || []).map(t => `<span class="chip">${t}</span>`).join("");
  content.innerHTML = `
    <div class="pf-modal-visual">${mockupHtml(p.mock)}</div>
    <div class="pf-modal-body">
      <span class="chip gold">${labelCat(p.cat)}</span>
      <h2 id="pf-modal-title">${p.name}</h2>
      <p class="pf-modal-desc">${p.detail || p.desc}</p>
      ${feats ? `<ul class="pf-feats">${feats}</ul>` : ""}
      <div class="pf-modal-meta">${chips}</div>
      <div class="pf-modal-actions">${modalButtons(p)}</div>
    </div>`;
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("pf-close").focus();
}

function closeProjectModal() {
  document.getElementById("pf-backdrop").hidden = true;
  document.body.style.overflow = "";
}

function initProjectModal() {
  const backdrop = document.getElementById("pf-backdrop");
  document.getElementById("pf-close").addEventListener("click", closeProjectModal);
  backdrop.addEventListener("click", e => {
    if (e.target === backdrop) closeProjectModal();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !backdrop.hidden) closeProjectModal();
  });
}
