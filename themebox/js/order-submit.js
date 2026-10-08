const WA_NUMBER = "6281809029677";

function genOrderCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return "TB-" + code;
}

function collectOrder() {
  return {
    code: genOrderCode(),
    theme: document.getElementById("order-theme").value,
    price: parseInt(document.getElementById("order-price").value || "0"),
    name: document.getElementById("buyer-name").value.trim(),
    wa: document.getElementById("buyer-wa").value.trim(),
    eventDate: document.getElementById("event-date").value,
    address: document.getElementById("buyer-address").value.trim(),
    payMethod: document.getElementById("pay-method").value,
    status: "baru",
    source: "web",
    createdAt: new Date().toISOString()
  };
}

async function submitOrder() {
  if (!validateForm()) return;
  const order = collectOrder();
  try {
    await saveOrder(order);
  } catch (e) {
    console.warn("Firestore save skipped:", e.message);
  }
  openWA(order);
  showSuccess(order);
}

function openWA(order) {
  const msg = `Halo LuwengStudio! Saya order undangan digital.\n\nKode: ${order.code}\nTheme: ${order.theme}\nHarga: ${formatRp(order.price)}\nNama: ${order.name}\nTanggal acara: ${order.eventDate}\n\nBukti pembayaran terlampir.`;
  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
}

function showSuccess(order) {
  document.getElementById("form-order").innerHTML = `
    <h2>Order diterima!</h2>
    <p>Kode order Anda: <b style="color:var(--gold2)">${order.code}</b></p>
    <p class="section-sub">Simpan kode ini. Silakan lanjutkan kirim bukti pembayaran via WhatsApp yang sudah terbuka.</p>`;
}
