"use client";

import {Suspense, useState,useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getScannedItems } from "@/lib/db";
import { Router } from "lucide-react";


function PassContent() {
  const router=useRouter()
  const [date] = useState("May 21, 2024 at 16:55");
  
  const [cart, setcart] = useState(0)
  const searchParams = useSearchParams();
  const total=searchParams.get("total")

    useEffect(() => {
      async function fetchData() {
        const items = await getScannedItems();
       setcart(items.length);

      }
      fetchData();
    }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-6">
      {/* Close Button */}
      <div className="absolute top-6 right-6 text-gray-500 text-xl cursor-pointer" onClick={()=>{router.push("/checkout")}}>✖</div>

      {/* Title */}
      <h1 className="text-lg font-semibold text-center text-blue-900">
        Thanks for using Paystride!
      </h1>
      <p className="text-gray-500 text-sm font-semibold">EXIT PASS</p>

      {/* QR Code */}
      <div className="mt-4">
        <QRCodeSVG value="https://paystride.com/receipt/12345" size={140} />
      </div>

      {/* Date */}
      <p className="text-blue-800 font-medium mt-3">{date}</p>

      {/* eReceipt */}
      <div className="w-full mt-6">
        <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg">
        <Link href={`/reciept`}>
          <div>
            <p className="text-gray-600 font-semibold">View eReceipt</p>
            <p className="text-sm text-gray-500">{cart} items <span className="text-blue-800 font-semibold">NGN {total}</span></p>
          </div>
         
          </Link> <span className="text-gray-500">›</span>
        </button>
      </div>

      {/* Feedback */}
      <p className="text-gray-700 text-sm mt-6">How was your Paystride experience today?</p>

      {/* Tell Us Button */}
      <button className="bg-blue-900 text-white font-semibold w-full py-3 rounded-lg mt-3">
        Tell us
      </button>
    </div>
  );
}


export default function exitPass(){
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <PassContent/>
      </Suspense>
  )
};