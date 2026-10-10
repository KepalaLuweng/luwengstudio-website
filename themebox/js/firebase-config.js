const firebaseConfig = {
  apiKey: "AIzaSyCCbi-a6GWswi5yL1XA6h5u605wLezK60A",
  authDomain: "themebox.firebaseapp.com",
  projectId: "themebox",
  storageBucket: "themebox.firebasestorage.app",
  messagingSenderId: "1049018740860",
  appId: "1:1049018740860:web:0878cbead04d8e4fd7d9f9"
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

async function ensureAuth() {
  const auth = firebase.auth();
  if (auth.currentUser) return;
  await auth.signInAnonymously();
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

/* ============ GUESTBOOK REAL-TIME ============ */
function guestbookRef(themeFile) {
  if (!db) throw new Error("Firebase tidak aktif");
  return db.collection("guestbook").doc(themeFile).collection("messages");
}

async function kirimUcapanFB(themeFile, nama, ucapan, kehadiran) {
  const ref = guestbookRef(themeFile);
  await ref.add({
    nama: nama,
    ucapan: ucapan,
    kehadiran: kehadiran || "",
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function listenUcapan(themeFile, callback) {
  const ref = guestbookRef(themeFile);
  // Opsi B: hanya tampilkan ucapan 30 hari terakhir
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  return ref.where("createdAt", ">", cutoff).orderBy("createdAt", "desc").limit(50).onSnapshot(snap => {
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(list);
  }, err => {
    // Fallback jika index belum ada: ambil semua lalu filter di client
    ref.orderBy("createdAt", "desc").limit(50).onSnapshot(snap2 => {
      const list = snap2.docs.map(d => ({ id: d.id, ...d.data() })).filter(w => {
        if (!w.createdAt) return true;
        const t = w.createdAt.toDate ? w.createdAt.toDate() : new Date(w.createdAt);
        return (Date.now() - t.getTime()) < 30 * 24 * 60 * 60 * 1000;
      });
      callback(list);
    });
  });
}
