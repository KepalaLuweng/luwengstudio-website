let ORDER_THEME = null;
let ORDER_CAT = "";
let IS_WEDDING = false;
const galleryFiles = [];

const EVENT_NAME_LABEL = {
  Pernikahan: ["Nama kedua mempelai", "cth: Rina & Dimas"],
  Khitanan: ["Nama anak", "cth: Muhammad Rizky"],
  Aqiqah: ["Nama bayi", "cth: Aisyah Humaira"],
  Ultah: ["Nama yang berulang tahun", "cth: Budi Santoso"],
  Wisuda: ["Nama wisudawan", "cth: Dewi Lestari, S.Kom"],
  Keagamaan: ["Nama acara / majelis", "cth: Pengajian Akbar Maulid Nabi"]
};

const FOTO_UTAMA_LABEL = {
  Khitanan: "Foto anak",
  Aqiqah: "Foto bayi",
  Ultah: "Foto yang berulang tahun",
  Wisuda: "Foto wisudawan",
  Keagamaan: "Foto pamflet / penceramah"
};

function setInvalid(inputId, invalid) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const wrap = input.closest("[data-field]");
  input.classList.toggle("err", invalid);
  if (wrap) wrap.classList.toggle("invalid", invalid);
  if (!invalid) return;
  input.addEventListener("input", () => setInvalid(inputId, false), { once: true });
  input.addEventListener("change", () => setInvalid(inputId, false), { once: true });
}

function setupPhotoBox(boxId, inputId, onPick) {
  const box = document.getElementById(boxId);
  const input = document.getElementById(inputId);
  if (!box || !input) return;
  box.addEventListener("click", () => input.click());
  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    box.classList.add("has-img");
    box.querySelectorAll("img").forEach(i => i.remove());
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Preview foto";
    box.prepend(img);
    setInvalid(inputId, false);
    if (onPick) onPick(file);
  });
}


function validateGallery() {
  const n = galleryFiles.length;
  if (n > 10) {
    alert("Foto galeri maksimal 10 foto.");
    return false;
  }
  return true;
}


function setupMusik(){
  var cb = document.getElementById('pakai-musik');
  var field = document.getElementById('field-judul-lagu');
  var warn = document.getElementById('warn-musik');
  if(!cb) return;
  cb.addEventListener('change', function(){
    if(cb.checked){
      field.style.display = 'block';
      warn.style.display = 'block';
    } else {
      field.style.display = 'none';
      warn.style.display = 'none';
    }
  });
}

function setupGallery() {
  const box = document.getElementById("box-foto-gallery");
  const input = document.getElementById("foto-gallery");
  const thumbs = document.getElementById("gallery-thumbs");
  if (!box || !input) return;
  box.addEventListener("click", () => input.click());
  input.addEventListener("change", () => {
    for (const file of input.files) {
      if (galleryFiles.length >= 10) break;
      galleryFiles.push(file);
      const idx = galleryFiles.length - 1;
      const d = document.createElement("div");
      d.className = "thumb";
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      const del = document.createElement("button");
      del.type = "button";
      del.textContent = "×";
      del.setAttribute("aria-label", "Hapus foto");
      del.addEventListener("click", e => {
        e.stopPropagation();
        galleryFiles.splice(galleryFiles.indexOf(file), 1);
        d.remove();
      });
      d.append(img, del);
      thumbs.append(d);
    }
    input.value = "";
  });
}

function onAmplopMethodChange() {
  const method = document.getElementById("amplop-method").value;
  const labels = { bank: "Nomor rekening", ewallet: "Nomor e-wallet", qris: "Nama / nomor QRIS" };
  document.getElementById("label-amplop-info").textContent = labels[method] || "Nomor rekening";
  document.getElementById("wrap-foto-qris").classList.toggle("hidden", method !== "qris");
}

function applyCategory(cat) {
  ORDER_CAT = cat || "";
  IS_WEDDING = ORDER_CAT === "Pernikahan";
  const ev = EVENT_NAME_LABEL[ORDER_CAT] || ["Nama acara", ""];
  document.getElementById("label-event-name").textContent = ev[0];
  document.getElementById("event-name").placeholder = ev[1];
  document.getElementById("couple-photos").hidden = !IS_WEDDING;
  document.getElementById("wrap-foto-utama").hidden = IS_WEDDING;
  if (!IS_WEDDING) {
    document.getElementById("label-foto-utama").textContent = FOTO_UTAMA_LABEL[ORDER_CAT] || "Foto utama";
  }
  document.getElementById("wrap-dresscode").classList.toggle("hidden", ORDER_CAT !== "Ultah");
  updateLinkPreview();
}

function slugKategori(cat) {
  return (cat || "acara").toLowerCase().replace(/\s+/g, "");
}

function updateLinkPreview() {
  const name = (document.getElementById("link-name").value || "").trim() || "(nama)";
  const el = document.getElementById("link-preview-url");
  if (el) el.textContent = "luwengstudio.my.id/" + slugKategori(ORDER_CAT) + "/" + name;
}

function setupLinkName() {
  const input = document.getElementById("link-name");
  if (!input) return;
  input.addEventListener("input", () => {
    updateLinkPreview();
    setInvalid("link-name", false);
  });
}

function renderOrderThemeCard() {
  const card = document.getElementById("order-theme-card");
  let base = "";
  try {
    for (const sc of document.scripts) {
      const i = sc.src.indexOf("themebox/js/");
      if (i >= 0) { base = sc.src.slice(0, i + "themebox/".length); break; }
    }
  } catch (e) {}
  if (ORDER_THEME) {
    document.getElementById("sum-theme").textContent = ORDER_THEME.name;
    document.getElementById("sum-price").textContent = formatRp(ORDER_THEME.price);
    document.getElementById("sum-total").textContent = formatRp(ORDER_THEME.price);
    card.innerHTML = `
      <div class="order-theme-card">
        <img src="${base}${ORDER_THEME.preview}" alt="${ORDER_THEME.name}">
        <div>
          <div class="ot-cat">${ORDER_THEME.cat}</div>
          <div class="ot-name">${ORDER_THEME.name}</div>
          <div class="ot-price">${formatRp(ORDER_THEME.price)}</div>
        </div>
      </div>`;
  } else {
    card.innerHTML = `<p style="color:var(--muted);margin:1.4rem 0">Belum pilih theme. <a href="../" style="color:var(--ink)">Kembali ke katalog →</a></p>`;
  }
}

function validateOrderForm() {
  let ok = true;
  let firstEl = null;
  let firstInput = null;
  const missing = [];
  const need = (id, cond, label) => {
    const bad = cond();
    setInvalid(id, bad);
    if (bad) {
      ok = false;
      missing.push(label);
      if (!firstEl) {
        const inp = document.getElementById(id);
        firstInput = inp;
        firstEl = inp ? (inp.closest("[data-field]") || inp) : null;
      }
    }
  };
  const val = id => (document.getElementById(id).value || "").trim();
  need("buyer-name", () => !val("buyer-name"), "Nama pemesan");
  need("buyer-wa", () => !val("buyer-wa"), "No. WhatsApp aktif");
  need("event-name", () => !val("event-name"), IS_WEDDING ? "Nama kedua mempelai" : "Nama acara");
  need("link-name", () => !val("link-name"), "Nama untuk link undangan");
  need("event-date", () => !val("event-date"), "Tanggal acara");
  need("event-time", () => !val("event-time"), "Waktu acara");
  need("event-venue", () => !val("event-venue"), "Tempat / gedung");
  need("event-address", () => !val("event-address"), "Alamat lengkap");
  need("amplop-info", () => !val("amplop-info"), "Nomor rekening / e-wallet");
  if (!ok) {
    if (firstEl && typeof firstEl.scrollIntoView === "function") {
      firstEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (firstInput && typeof firstInput.focus === "function") {
      try { firstInput.focus(); } catch (e) {}
    }
    alert("Mohon lengkapi formulir wajib berikut sebelum mengirim:\n\n• " + missing.join("\n• "));
    return false;
  }
  return true;
}

const DRAFT_KEY = "luweng_order_draft";

function saveDraft() {
  const gVal = id => {
    const el = document.getElementById(id);
    return el ? el.value : "";
  };
  const data = {
    buyerName: gVal("buyer-name"),
    buyerWa: gVal("buyer-wa"),
    eventName: gVal("event-name"),
    linkName: gVal("link-name"),
    eventDate: gVal("event-date"),
    eventTime: gVal("event-time"),
    eventVenue: gVal("event-venue"),
    eventAddress: gVal("event-address"),
    eventMaps: gVal("event-maps"),
    amplopMethod: gVal("amplop-method"),
    amplopInfo: gVal("amplop-info"),
    giftAddress: gVal("gift-address"),
    dressCode: gVal("dress-code"),
    liveStream: gVal("live-stream"),
    pakaiMusik: document.getElementById("pakai-musik") ? document.getElementById("pakai-musik").checked : false,
    judulLagu: gVal("judul-lagu")
  };
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  } catch (e) {}
}

function restoreDraft() {
  let data = null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) data = JSON.parse(raw);
  } catch (e) {}
  if (!data) return;
  const setV = (id, v) => {
    const el = document.getElementById(id);
    if (el && v !== undefined && v !== null && v !== "") el.value = v;
  };
  setV("buyer-name", data.buyerName);
  setV("buyer-wa", data.buyerWa);
  setV("event-name", data.eventName);
  setV("link-name", data.linkName);
  setV("event-date", data.eventDate);
  setV("event-time", data.eventTime);
  setV("event-venue", data.eventVenue);
  setV("event-address", data.eventAddress);
  setV("event-maps", data.eventMaps);
  if (data.amplopMethod) {
    const el = document.getElementById("amplop-method");
    if (el) { el.value = data.amplopMethod; onAmplopMethodChange(); }
  }
  setV("amplop-info", data.amplopInfo);
  setV("gift-address", data.giftAddress);
  setV("dress-code", data.dressCode);
  setV("live-stream", data.liveStream);
  if (data.pakaiMusik) {
    const cb = document.getElementById("pakai-musik");
    if (cb) {
      cb.checked = true;
      const field = document.getElementById("field-judul-lagu");
      const warn = document.getElementById("warn-musik");
      if (field) field.style.display = "block";
      if (warn) warn.style.display = "block";
    }
  }
  setV("judul-lagu", data.judulLagu);
  updateLinkPreview();
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (e) {}
}

function initOrderPage() {
  const params = new URLSearchParams(location.search);
  const f = params.get("theme");
  ORDER_THEME = (typeof THEMES !== "undefined") ? THEMES.find(x => x.file === f) || null : null;
  applyCategory(ORDER_THEME ? ORDER_THEME.cat : "");
  renderOrderThemeCard();
  document.getElementById("amplop-method").addEventListener("change", onAmplopMethodChange);
  onAmplopMethodChange();
  setupPhotoBox("box-foto-pria", "foto-pria");
  setupPhotoBox("box-foto-wanita", "foto-wanita");
  setupPhotoBox("box-foto-utama", "foto-utama");
  setupPhotoBox("box-foto-qris", "foto-qris");
  setupGallery();
  setupMusik();
  setupLinkName();
  updateLinkPreview();
  restoreDraft();
  const formWrap = document.getElementById("form-order");
  if (formWrap) {
    formWrap.addEventListener("input", saveDraft);
    formWrap.addEventListener("change", saveDraft);
  }
}
