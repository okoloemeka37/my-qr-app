'use client'
import { useState,useEffect } from "react";
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
  const [data, setData] = useState<string | null>(null);
  const [cart, setcart] = useState(0)

    useEffect(() => {
      async function fetchData() {
        const items = await getScannedItems();
       setcart(items.length)
      }
      fetchData();
    }, []);
  


  return (
    <div>
    
    {scanning && (    
    <>
    <div className="flex justify-between items-center p-4">
  <button className="bg-white rounded-md shadow w-fit p-2 text-2xl" onClick={()=>{setScanning(false)}}> <X size={24} /></button>
    <button className="bg-blue-800 text-white rounded-lg px-4 py-2 flex items-center space-x-2">
      <span><ShoppingCart color="white" size={24} /></span>
      <span>{/* NGN 16732.70 */}   <Link href={'/checkout'}>checkout</Link></span>
    </button>
  </div>
  <div>
        
        <BarcodeScannerComponent
          width={500}
          height={500}
          facingMode="environment" // Use back camera
          onUpdate={(err, result) => {
            if (result) {
              console.log(result)
              const pros={productId:0};

          
          setData(result.getText());
              setScanning(false); // Stop scanning when barcode is detected
              pros.productId=Number(result.getText());
             saveScannedItem(pros);
              router.push("/checkout"); // Navigate to checkout page
            }
            else if (err) {
              console.log(err);
            }
          }}
        />    
    </div>
    </>
      )}
 
       
      {!scanning && (
        <div className="relative h-screen w-full">
              {/* Background Image */}
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('images/illustration.jpeg')" }}/>

{/* Scanner Overlay */}
<div className="absolute inset-0 bg-black/50 flex flex-col justify-between">
  {/* Top Bar */}
  <div className="flex justify-between items-center p-4">
  <button className="bg-white rounded-md shadow w-fit p-2 text-2xl"> <X size={24} /></button>
    <button className="bg-blue-800 text-white rounded-lg px-4 py-2 flex items-center space-x-2">
      <span><ShoppingCart color="white" size={24} /></span><sup>{cart}</sup>
      <span> <Link href={'/checkout'}>checkout</Link></span>
    </button>
  </div>

  {/* Scanner Box */}
  <div className="flex flex-col items-center">
    <p className="text-white mb-4">Click The Icon To Scan</p>
     <Camera className="text-white w-24 h-24 cursor-pointer"  onClick={() => setScanning(true)}/> 
  </div>

  {/* Spacer */}
  <div className="h-20" />

</div>
        </div>
    
      )}
        
        




    </div>
  );
}

