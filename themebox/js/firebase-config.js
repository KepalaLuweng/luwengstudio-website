const firebaseConfig = {
  apiKey: "PASTE_DARI_CONSOLE",
  authDomain: "themebox.firebaseapp.com",
  projectId: "themebox",
  storageBucket: "themebox.firebasestorage.app",
  messagingSenderId: "1049018740860",
  appId: "PASTE_DARI_CONSOLE"
};

let db = null;
let storage = null;

function firebaseReady() {
  return firebaseConfig.apiKey !== "PASTE_DARI_CONSOLE";
}

function initFirebase() {
  if (!firebaseReady()) {
    console.warn("Firebase belum dikonfigurasi.");
    return;
  }
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  try { storage = firebase.storage(); } catch (e) { storage = null; }
}

function storageReady() {
  return !!storage;
}

async function uploadPhoto(code, field, file, idx) {
  if (!storage) throw new Error("Storage tidak aktif");
  const name = idx != null ? `${field}_${idx}.jpg` : `${field}.jpg`;
  const ref = storage.ref().child(`orders/${code}/${name}`);
  await ref.put(file, { contentType: file.type || "image/jpeg" });
  return ref.getDownloadURL();
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
