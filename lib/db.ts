import { openDB } from "idb";

const DB_NAME = "barcodeDB";
const STORE_NAME = "scannedItems";

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

export async function saveScannedItem(data: {productId:number}) {
  const db = await initDB();
  await db.add(STORE_NAME, { ...data, date: new Date().toISOString() });
}

export async function getScannedItems() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}
