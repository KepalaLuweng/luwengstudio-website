const firebaseConfig = {
  apiKey: "AIzaSyCCbi-a6GWswi5yL1XA6h5u605wLezK60A",
  authDomain: "themebox.firebaseapp.com",
  projectId: "themebox",
  storageBucket: "themebox.firebasestorage.app",
  messagingSenderId: "1049018740860",
  appId: "1:1049018740860:web:0878cbead04d8e4fd7d9f9"
};

let db = null;

function firebaseReady() {
  return typeof firebase !== "undefined" && firebase.apps.length > 0;
}

function initFirebase() {
  if (typeof firebase === "undefined") return;
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  db = firebase.firestore();
}

initFirebase();

async function ensureAuth() {
  if (typeof firebase === "undefined") return;
  const auth = firebase.auth();
  if (auth.currentUser) return auth.currentUser;
  const cred = await auth.signInAnonymously();
  return cred.user;
}

function cleanSlug(str) {
  return (str || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "dan")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function saveOrder(order) {
  if (!db) initFirebase();
  if (!db) throw new Error("Database belum siap");
  await db.collection("orders").doc(order.code).set(order);
  if (order.slug && order.catSlug) {
    const slugId = order.catSlug + "_" + order.slug;
    await db.collection("slugs").doc(slugId).set({
      code: order.code,
      cat: order.catSlug,
      slug: order.slug
    });
  }
}

async function saveOrderPhotos(code, photos) {
  if (!db) initFirebase();
  if (!db) throw new Error("Database belum siap");
  const batch = db.batch();
  const col = db.collection("orders").doc(code).collection("photos");
  for (const key of Object.keys(photos)) {
    if (photos[key]) {
      const docRef = col.doc(key);
      batch.set(docRef, { key: key, data: photos[key] });
    }
  }
  await batch.commit();
}

async function fetchOrder(code) {
  if (!db) initFirebase();
  if (!db) throw new Error("Database belum siap");
  const doc = await db.collection("orders").doc(code).get();
  return doc.exists ? doc.data() : null;
}

async function fetchOrderBySlug(catSlug, slug) {
  if (!db) initFirebase();
  if (!db) throw new Error("Database belum siap");
  const slugId = catSlug + "_" + slug;
  const sDoc = await db.collection("slugs").doc(slugId).get();
  if (sDoc.exists) {
    return fetchOrder(sDoc.data().code);
  }
  const snap = await db.collection("orders").where("slug", "==", slug).limit(1).get();
  if (!snap.empty) {
    return snap.docs[0].data();
  }
  return null;
}

async function fetchOrderPhotos(code) {
  if (!db) initFirebase();
  if (!db) throw new Error("Database belum siap");
  const snap = await db.collection("orders").doc(code).collection("photos").get();
  const photos = {};
  snap.forEach(doc => {
    photos[doc.id] = doc.data().data;
  });
  return photos;
}

async function fetchOrders() {
  if (!db) initFirebase();
  if (!db) throw new Error("Database belum siap");
  const snap = await db.collection("orders").orderBy("createdAt", "desc").get();
  return snap.docs.map(d => d.data());
}

async function updateOrderStatus(code, status) {
  if (!db) initFirebase();
  if (!db) throw new Error("Database belum siap");
  await db.collection("orders").doc(code).update({ status: status });
}

async function deleteOrder(code) {
  if (!db) initFirebase();
  if (!db) throw new Error("Database belum siap");
  await db.collection("orders").doc(code).delete();
}

function wishesRef(orderCode) {
  if (!db) initFirebase();
  if (!db) throw new Error("Database belum siap");
  return db.collection("orders").doc(orderCode).collection("wishes");
}

async function sendWish(orderCode, nama, ucapan, kehadiran) {
  const ref = wishesRef(orderCode);
  await ref.add({
    nama: nama,
    ucapan: ucapan,
    kehadiran: kehadiran || "Hadir",
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function listenWishes(orderCode, callback) {
  const ref = wishesRef(orderCode);
  return ref.orderBy("createdAt", "desc").limit(100).onSnapshot(snap => {
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(list);
  }, err => {
    console.warn("Snapshot error:", err);
  });
}

function guestbookRef(themeFile) {
  if (!db) initFirebase();
  if (!db) throw new Error("Database belum siap");
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
  return ref.orderBy("createdAt", "desc").limit(50).onSnapshot(snap => {
    const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(list);
  }, err => {
    console.warn("Ucapan error:", err);
  });
}
