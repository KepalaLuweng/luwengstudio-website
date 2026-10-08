function updateSummary() {
  const theme = document.getElementById("order-theme").value || "-";
  const price = parseInt(document.getElementById("order-price").value || "0");
  document.getElementById("sum-theme").textContent = theme;
  document.getElementById("sum-price").textContent = formatRp(price);
  document.getElementById("sum-total").textContent = formatRp(price);
}

function onPayMethodChange() {
  const method = document.getElementById("pay-method").value;
  document.getElementById("qris-section").classList.toggle("hidden", method !== "qris");
}

function validateForm() {
  const required = ["buyer-name", "buyer-wa", "event-date", "order-theme"];
  for (const id of required) {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.focus();
      alert("Mohon lengkapi: " + el.previousElementSibling.textContent);
      return false;
    }
  }
  return true;
}

function initOrderForm() {
  document.getElementById("pay-method").addEventListener("change", onPayMethodChange);
  ["order-theme", "order-price"].forEach(id =>
    document.getElementById(id).addEventListener("input", updateSummary)
  );
  updateSummary();
}
