const WA_NUMBER = "6281809029677";

function genOrderCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return "TB-" + code;
}

function val(id) {
  const el = document.getElementById(id);
  return el ? (el.value || "").trim() : "";
}

function fileOf(id) {
  const el = document.getElementById(id);
  return el && el.files.length ? el.files[0] : null;
}

function compressImage(file, maxDim = 900, quality = 0.75) {
  return new Promise((resolve) => {
    if (!file) return resolve("");
    const reader = new FileReader();
    reader.onerror = () => resolve("");
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => resolve("");
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        let dataUrl = canvas.toDataURL("image/webp", quality);
        if (!dataUrl || dataUrl.indexOf("data:image/webp") !== 0) {
          dataUrl = canvas.toDataURL("image/jpeg", quality);
        }
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function collectOrder() {
  const methodLabels = { bank: "Rekening Bank", ewallet: "E-Wallet", qris: "QRIS" };
  const method = val("amplop-method");
  const rawLink = val("link-name");
  const catSlug = (ORDER_CAT || "acara").toLowerCase().replace(/\s+/g, "");
  const slug = typeof cleanSlug === "function" ? cleanSlug(rawLink) : rawLink.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return {
    code: genOrderCode(),
    kategori: ORDER_CAT,
    catSlug: catSlug,
    slug: slug,
    temaNama: ORDER_THEME ? ORDER_THEME.name : "",
    temaFile: ORDER_THEME ? ORDER_THEME.file : "",
    harga: ORDER_THEME ? ORDER_THEME.price : 0,
    namaPemesan: val("buyer-name"),
    waPemesan: val("buyer-wa"),
    tanggalAcara: val("event-date"),
    waktuAcara: val("event-time"),
    namaAcara: val("event-name"),
    linkName: val("link-name"),
    tempat: val("event-venue"),
    alamat: val("event-address"),
    mapsLink: val("event-maps"),
    amplopMetode: methodLabels[method] || method,
    amplopInfo: val("amplop-info"),
    alamatKado: val("gift-address"),
    dressCode: val("dress-code"),
    liveStream: val("live-stream"),
    catatan: val("order-notes"),
    galCount: galleryFiles.length,
    status: "baru",
    source: "web",
    createdAt: new Date().toISOString()
  };
}

async function processOrderPhotos(order) {
  const photos = {};
  if (IS_WEDDING) {
    const pria = await compressImage(fileOf("foto-pria"));
    if (pria) photos.fotoPria = pria;
    const wanita = await compressImage(fileOf("foto-wanita"));
    if (wanita) photos.fotoWanita = wanita;
  } else {
    const utama = await compressImage(fileOf("foto-utama"));
    if (utama) photos.fotoUtama = utama;
  }
  if (val("amplop-method") === "qris") {
    const qris = await compressImage(fileOf("foto-qris"));
    if (qris) photos.fotoQris = qris;
  }
  for (let i = 0; i < galleryFiles.length; i++) {
    const gal = await compressImage(galleryFiles[i]);
    if (gal) photos["gal_" + i] = gal;
  }
  await saveOrderPhotos(order.code, photos);
}

function getWAMessage(order) {
  const lines = [
    "Halo LuwengStudio! 👋",
    "Saya sudah menyelesaikan order undangan digital dan melakukan pembayaran.",
    "",
    "📋 *Detail Pesanan:*",
    `• Kode: ${order.code}`,
    `• Tema: ${order.temaNama} (${order.kategori})`,
    `• Total Bayar: ${formatRp(order.harga)}`,
    `• Nama Pemesan: ${order.namaPemesan}`,
    `• Acara: ${order.namaAcara}`,
    `• Tanggal: ${order.tanggalAcara} ${order.waktuAcara}`,
    `• Tempat: ${order.tempat}`,
    "",
    "Bukti pembayaran dan data telah tersimpan di sistem.",
    "Mohon dicek dan diverifikasi pembayarannya untuk proses selanjutnya ya. Terima kasih! 🙏"
  ];
  return lines.join("\n");
}

function getWAUrl(order) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(getWAMessage(order))}`;
}

function startOrderProcess() {
  if (!validateOrderForm()) return;
  if (typeof validateGallery === "function" && !validateGallery()) return;
  const modal = document.getElementById("modal-pay");
  if (!modal) return;
  document.getElementById("pay-modal-step-ask").style.display = "block";
  document.getElementById("pay-modal-step-loading").style.display = "none";
  document.getElementById("pay-modal-step-success").style.display = "none";
  modal.style.display = "flex";
}

function closePayModal() {
  const modal = document.getElementById("modal-pay");
  if (modal) modal.style.display = "none";
}

async function confirmAndSubmitOrder() {
  document.getElementById("pay-modal-step-ask").style.display = "none";
  document.getElementById("pay-modal-step-loading").style.display = "block";
  const statusTxt = document.getElementById("loading-status-text");
  if (statusTxt) statusTxt.textContent = "Sedang menyiapkan pesanan...";

  const order = collectOrder();
  try {
    await ensureAuth();
    if (statusTxt) statusTxt.textContent = "Menyimpan data pesanan ke sistem...";
    await saveOrder(order);
    if (statusTxt) statusTxt.textContent = "Mengompres foto dan menyimpan...";
    await processOrderPhotos(order);
  } catch (e) {
    closePayModal();
    alert("Gagal memproses pesanan: " + e.message + "\n\nPastikan koneksi internet aktif lalu coba lagi.");
    return;
  }

  if (typeof clearDraft === "function") clearDraft();

  document.getElementById("pay-modal-step-loading").style.display = "none";
  document.getElementById("pay-modal-step-success").style.display = "block";
  const codeEl = document.getElementById("modal-order-code");
  if (codeEl) codeEl.textContent = order.code;

  const waUrl = getWAUrl(order);
  const waLink = document.getElementById("modal-wa-link");
  if (waLink) waLink.href = waUrl;
}

function submitOrder() {
  startOrderProcess();
}
