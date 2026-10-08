async function loadOrders() {
  const list = document.getElementById("order-list");
  list.innerHTML = "<p class='section-sub'>Memuat...</p>";
  try {
    const orders = await fetchOrders();
    if (!orders.length) {
      list.innerHTML = "<p class='section-sub'>Belum ada order.</p>";
      return;
    }
    list.innerHTML = orders.map(orderCard).join("");
  } catch (e) {
    list.innerHTML = "<p class='section-sub'>Firebase belum dikonfigurasi.</p>";
  }
}

function orderCard(o) {
  return `<div class="order-card">
    <div class="head">
      <span class="code">${o.code}</span>
      <span class="status ${o.status}">${o.status}</span>
    </div>
    <div class="detail">
      <b>${o.name}</b> · ${o.wa}<br>
      Theme: ${o.theme} · ${formatRp(o.price)}<br>
      Acara: ${o.eventDate} · via ${o.source || "web"}
    </div>
    <div class="order-actions">
      <button class="btn-sm" onclick="setStatus('${o.code}','diproses')">Diproses</button>
      <button class="btn-sm" onclick="setStatus('${o.code}','selesai')">Selesai</button>
      <button class="btn-sm danger" onclick="removeOrder('${o.code}')">Hapus</button>
    </div>
  </div>`;
}

async function setStatus(code, status) {
  await updateOrderStatus(code, status);
  loadOrders();
}

async function removeOrder(code) {
  if (!confirm("Hapus order " + code + "?")) return;
  await deleteOrder(code);
  loadOrders();
}
