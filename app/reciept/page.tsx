"use client";

import { getScannedItems } from "@/lib/db";
import { useEffect, useState } from "react";


export default function OrderSummary() {
  const [data, setdata] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const items = await getScannedItems();
     setdata(items)
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white px-6 py-6">
      {/* Header */}
      <div className="flex justify-center mb-4">
        <div className="h-1 w-16 bg-gray-400 rounded-full"></div>
      </div>

      {/* Order Details */}
      <div className="space-y-3">
        <p className="font-semibold text-black">Order Number:</p>
        <p className="text-gray-700">43690447883401897</p>

        <p className="font-semibold text-black">Transaction Date:</p>
        <p className="text-gray-700">May 21, 2024 at 16:55</p>

        <p className="font-semibold text-black">Payment Method:</p>
        <div className="flex items-center space-x-2">
          <p className="text-gray-700">MasterCard 4873</p>
          <img src= "images/master.png" alt="MasterCard" width={30} height={20} />
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Order Summary */}
      <p className="font-semibold text-lg text-black">Order Summary:</p>
      <div className="space-y-4 mt-2">
        {/* First Item */}
     {data.length !==0?   <div className="flex items-center space-x-4">
          <div className="border rounded-lg p-1">
            <img src="images/apple.png" alt="Apple" width={50} height={50} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Braeburn</p>
            <p className="font-semibold text-black">Braeburn Apple</p>
            <p className="text-blue-800 font-semibold">NGN 836.63</p>
          </div>
          <p className="text-gray-600">x3</p>
        </div>:'' }

    
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Billing Information */}
      <p className="font-semibold text-lg text-black">Billing Information:</p>
      <div className="mt-2 space-y-2">
        <div className="flex justify-between">
          <p className="text-gray-700">Subtotal:</p>
          <p className="text-gray-700">NGN 26122.65</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-700">Taxes:</p>
          <p className="text-gray-700">NGN 5062.53</p>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <p className="text-black">TOTAL</p>
          <p className="text-blue-800">NGN 31185.18</p>
        </div>
      </div>
    </div>
  );
}
