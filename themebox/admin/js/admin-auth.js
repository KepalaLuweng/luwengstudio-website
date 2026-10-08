const ADMIN_PIN = "36284744882";

function checkPin() {
  const val = document.getElementById("pin-input").value.trim();
  if (val === ADMIN_PIN) {
    document.getElementById("pin-gate").classList.add("hidden");
    document.getElementById("admin-panel").classList.remove("hidden");
    loadOrders();
  } else {
    alert("PIN salah.");
  }
}

function initAdminAuth() {
  document.getElementById("pin-btn").addEventListener("click", checkPin);
  document.getElementById("pin-input").addEventListener("keydown", e => {
    if (e.key === "Enter") checkPin();
  });
}
