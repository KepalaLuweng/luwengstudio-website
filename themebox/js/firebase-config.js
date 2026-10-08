const firebaseConfig = {
  apiKey: "PASTE_DARI_CONSOLE",
  authDomain: "themebox.firebaseapp.com",
  projectId: "themebox",
  storageBucket: "themebox.firebasestorage.app",
  messagingSenderId: "1049018740860",
  appId: "PASTE_DARI_CONSOLE"
};

let db = null;

function initFirebase() {
  if (firebaseConfig.apiKey === "PASTE_DARI_CONSOLE") {
    console.warn("Firebase belum dikonfigurasi.");
    return;
  }
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
}

async function saveOrder(order) {
  if (!db) throw new Error("Firebase tidak aktif");
  await db.collection("orders").doc(order.code).set(order);
}

async function fetchOrders() {
  if (!db) throw new Error("Firebase tidak aktif");
  const snap = await db.collection("orders").orderBy("createdAt", "desc").get();
  return snap.docs.map(d => d.data());
}

async function updateOrderStatus(code, status) {
  if (!db) throw new Error("Firebase tidak aktif");
  await db.collection("orders").doc(code).update({ status });
}

async function deleteOrder(code) {
  if (!db) throw new Error("Firebase tidak aktif");
  await db.collection("orders").doc(code).delete();
}
