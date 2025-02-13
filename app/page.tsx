'use client'
import { useState } from "react";
 import { Camera } from "lucide-react";
 import { ShoppingCart } from "lucide-react";
/*import { Button } from "@/components/ui/button"; */
import { X } from "lucide-react";
import Link from "next/link";

export default function Scanner() {
  const [isScanning, setIsScanning] = useState(false);

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
          </div>
        </div>

        {/* Spacer */}
        <div className="h-20" />
      </div>
    </div>
  );
}
