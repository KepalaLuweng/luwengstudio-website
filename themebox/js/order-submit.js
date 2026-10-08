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

function collectOrder() {
  const methodLabels = { bank: "Rekening Bank", ewallet: "E-Wallet", qris: "QRIS" };
  const method = val("amplop-method");
  return {
    code: genOrderCode(),
    kategori: ORDER_CAT,
    temaNama: ORDER_THEME ? ORDER_THEME.name : "",
    temaFile: ORDER_THEME ? ORDER_THEME.file : "",
    harga: ORDER_THEME ? ORDER_THEME.price : 0,
    namaPemesan: val("buyer-name"),
    waPemesan: val("buyer-wa"),
    tanggalAcara: val("event-date"),
    waktuAcara: val("event-time"),
    namaAcara: val("event-name"),
    tempat: val("event-venue"),
    alamat: val("event-address"),
    mapsLink: val("event-maps"),
    amplopMetode: methodLabels[method] || method,
    amplopInfo: val("amplop-info"),
    alamatKado: val("gift-address"),
    dressCode: val("dress-code"),
    liveStream: val("live-stream"),
    catatan: val("order-notes"),
    fotoPria: "",
    fotoWanita: "",
    fotoUtama: "",
    fotoGallery: "",
    fotoQris: "",
    status: "baru",
    source: "web",
    createdAt: new Date().toISOString()
  };
}

async function uploadOrderPhotos(order) {
  if (!storageReady()) return;
  const code = order.code;
  const put = async (field, file, idx) => {
    if (!file) return "";
    try { return await uploadPhoto(code, field, file, idx); }
    catch (e) { console.warn("Upload gagal:", field, e.message); return ""; }
  };
  if (IS_WEDDING) {
    order.fotoPria = await put("fotoPria", fileOf("foto-pria"));
    order.fotoWanita = await put("fotoWanita", fileOf("foto-wanita"));
  } else {
    order.fotoUtama = await put("fotoUtama", fileOf("foto-utama"));
  }
  if (val("amplop-method") === "qris") {
    order.fotoQris = await put("fotoQris", fileOf("foto-qris"));
  }
  const galUrls = [];
  for (let i = 0; i < galleryFiles.length; i++) {
    galUrls.push(await put("fotoGallery", galleryFiles[i], i));
  }
  order.fotoGallery = galUrls.filter(Boolean).join(",");
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
    "Bukti pembayaran & foto terlampir."
  ];
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
}

function showSuccess(order, photosSent) {
  const note = photosSent
    ? "Foto berhasil diupload. Silakan lanjutkan kirim bukti pembayaran via WhatsApp yang sudah terbuka."
    : "Firebase belum dikonfigurasi — silakan kirim SEMUA foto via WhatsApp yang sudah terbuka.";
  document.getElementById("form-order").innerHTML = `
    <div class="success-card">
      <div class="ok-ring">✓</div>
      <h2>Order Diterima!</h2>
      <div class="code">${order.code}</div>
      <p>Simpan kode order di atas.<br>${note}</p>
      <a class="btn btn-dark" href="../">Kembali ke Katalog</a>
    </div>`;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function submitOrder() {
  if (!validateOrderForm()) return;
  const btn = document.getElementById("btn-submit");
  btn.disabled = true;
  btn.textContent = "Mengirim order...";
  const order = collectOrder();
  let photosSent = false;
  try {
    if (storageReady()) {
      btn.textContent = "Mengupload foto...";
      await uploadOrderPhotos(order);
      photosSent = true;
    }
    await saveOrder(order);
  } catch (e) {
    console.warn("Firestore save skipped:", e.message);
  }
  openWA(order);
  showSuccess(order, photosSent);
}
