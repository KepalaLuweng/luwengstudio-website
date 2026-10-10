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

function openWA(order) {
  const lines = [
    "Halo LuwengStudio! Saya order undangan digital.",
    "",
    `Kode: ${order.code}`,
    `Theme: ${order.temaNama} (${order.kategori})`,
    `Harga: ${formatRp(order.harga)}`,
    `Nama: ${order.namaPemesan}`,
    `Acara: ${order.namaAcara}`,
    `Tanggal: ${order.tanggalAcara} ${order.waktuAcara}`,
    `Tempat: ${order.tempat}`,
    "",
    "Bukti pembayaran & detail terlampir di sistem."
  ];
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
}

function showSuccess(order) {
  document.getElementById("form-order").innerHTML = `
    <div class="success-card">
      <div class="ok-ring">✓</div>
      <h2>Order Diterima!</h2>
      <div class="code">${order.code}</div>
      <p>Data dan foto pesanan Anda telah tersimpan rapi.<br>Silakan lanjutkan konfirmasi pembayaran via WhatsApp yang sudah terbuka.</p>
      <a class="btn btn-dark" href="../">Kembali ke Katalog</a>
    </div>`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function submitOrder() {
  if (!validateOrderForm()) return;
  if (typeof validateGallery === "function" && !validateGallery()) return;
  const btn = document.getElementById("btn-submit");
  btn.disabled = true;
  btn.textContent = "Mengompres foto...";
  const order = collectOrder();
  try {
    await ensureAuth();
    btn.textContent = "Menyimpan data pesanan...";
    await saveOrder(order);
    btn.textContent = "Menyimpan foto...";
    await processOrderPhotos(order);
  } catch (e) {
    console.warn("Simpan error:", e);
    btn.disabled = false;
    btn.textContent = "Kirim Order via WhatsApp";
    alert("Gagal menyimpan data: " + e.message + "\n\nPastikan koneksi internet aktif lalu coba lagi.");
    return;
  }
  openWA(order);
  showSuccess(order);
}
