'use client'
import { useState } from "react";
 import { Camera } from "lucide-react";
 import { ShoppingCart } from "lucide-react";
/*import { Button } from "@/components/ui/button"; */
import { X } from "lucide-react";
import Link from "next/link";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { saveScannedItem, getScannedItems } from "@/lib/db";
import { useRouter } from "next/navigation";

export default function Scanner() {
  const [scanning, setScanning] = useState(false);
  const router = useRouter();
const [data, setData] = useState("");
  return (
    <div className="relative h-screen w-full">
    
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('images/illustration.jpeg')" }}
      />

      {/* Scanner Overlay */}
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-between">
        {/* Top Bar */}
        <div className="flex justify-between items-center p-4">
        <button className="bg-white rounded-md shadow w-fit p-2 text-2xl"> <X size={24} /></button>
          <button className="bg-blue-800 text-white rounded-lg px-4 py-2 flex items-center space-x-2">
            <span><ShoppingCart color="white" size={24} /></span>
            <span>{/* NGN 16732.70 */}   <Link href={'/checkout'}>checkout</Link></span>
          </button>
        </div>

        {/* Scanner Box */}
        <div className="flex flex-col items-center">
          <p className="text-white mb-4">Place the barcode in the center of the scanner</p>
          <div className="w-24 h-24 border-4 border-white rounded-lg flex items-center justify-center">
        <Camera className="text-white w-8 h-8" /> 

        
        <div className="flex flex-col items-center gap-4 p-4">
        {scanning && (
        <BarcodeScannerComponent
          width={300}
          height={300}
          facingMode="environment" // Use back camera
          onUpdate={(err, result) => {
            if (result) {
              const product=JSON.parse(result.getText())
              setData(product);
              setScanning(false); // Stop scanning when barcode is detected
             saveScannedItem(product);
              router.push("/checkout");
            }
          }}
        />
      )}
      {data && (
        <p className="text-lg font-medium">
          ✅ Scan Complete! Code: <strong>{data}</strong>
        </p>
      )}
      {!scanning && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setScanning(true)}
        >
          Scan Again
        </button>
      )}
    </div>
        

          </div>
        </div>

        {/* Spacer */}
        <div className="h-20" />
      </div>
    </div>
  );
}

