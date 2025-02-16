"use client";

import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function BarcodeScanner() {
  const [data, setData] = useState("");

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-xl font-bold">Scan a Barcode</h1>
      <BarcodeScannerComponent
        width={300}
        height={300}
        onUpdate={(err, result) => {
          if (result) {
            setData(result.getText());
          }
        }}
      />
      {data && <p className="text-lg font-medium">Scanned Code: {data}</p>}
    </div>
  );
}
