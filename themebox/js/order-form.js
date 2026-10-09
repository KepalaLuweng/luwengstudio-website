let ORDER_THEME = null;
let ORDER_CAT = "";
let IS_WEDDING = false;
const galleryFiles = [];

const EVENT_NAME_LABEL = {
  Pernikahan: ["Nama kedua mempelai", "cth: Rina & Dimas"],
  Khitanan: ["Nama anak", "cth: Muhammad Rizky"],
  Aqiqah: ["Nama bayi", "cth: Aisyah Humaira"],
  Ultah: ["Nama yang berulang tahun", "cth: Budi Santoso"],
  Wisuda: ["Nama wisudawan", "cth: Dewi Lestari, S.Kom"]
};

const FOTO_UTAMA_LABEL = {
  Khitanan: "Foto anak",
  Aqiqah: "Foto bayi",
  Ultah: "Foto yang berulang tahun",
  Wisuda: "Foto wisudawan"
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


function validateGallery(){
  var n = galleryFiles.length;
  var errEl = document.querySelector('#box-foto-gallery + .err-msg, #gallery-thumbs + .err-msg');
  if(n < 6){
    alert('Foto galeri minimal 6 foto (saat ini '+n+').');
    return false;
  }
  if(n > 10){
    alert('Foto galeri maksimal 10 foto (saat ini '+n+').');
    return false;
  }
  if(n % 2 !== 0){
    alert('Jumlah foto galeri harus genap agar layout rapi (saat ini '+n+'). Tambah atau kurangi 1 foto.');
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
  let first = null;
  const need = (id, cond) => {
    const bad = cond();
    setInvalid(id, bad);
    if (bad) { ok = false; first = first || document.getElementById(id); }
  };
  const val = id => (document.getElementById(id).value || "").trim();
  need("buyer-name", () => !val("buyer-name"));
  need("buyer-wa", () => !val("buyer-wa"));
  need("event-name", () => !val("event-name"));
  need("event-date", () => !val("event-date"));
  need("event-time", () => !val("event-time"));
  need("event-venue", () => !val("event-venue"));
  need("event-address", () => !val("event-address"));
  need("amplop-info", () => !val("amplop-info"));
  if (IS_WEDDING) {
    need("foto-pria", () => !document.getElementById("foto-pria").files.length);
    need("foto-wanita", () => !document.getElementById("foto-wanita").files.length);
  } else {
    need("foto-utama", () => !document.getElementById("foto-utama").files.length);
  }
  if (document.getElementById("amplop-method").value === "qris") {
    need("foto-qris", () => !document.getElementById("foto-qris").files.length);
  }
  if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
  return ok;
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
}
