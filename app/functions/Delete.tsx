import React from 'react'
const deleteItem=async (id:number|null)=>{
const request=indexedDB.open("barcodeDB",1);
request.onsuccess=(event:any)=>{
const db=event.target.result;
const transaction=db.transaction("scannedItems",'readwrite');
const store =transaction.objectStore("scannedItems");
store.delete(id);
transaction.oncomplete=()=>{ console.log(`Item with key "${id}" deleted successfully`);}
transaction.onerror=()=>{console.error("Error deleting item");}
}
}
export default deleteItem;