"use client";
import { Suspense, useState } from "react";
import {  ArrowLeft,CreditCard, PlusCircle } from "lucide-react";
import Button from "../components/Button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Card from "../components/payMethod/card";
import Transer from "../components/payMethod/transer";
import { useDrag } from "@use-gesture/react";






 function PaymentContent() {
  

  const searchParams = useSearchParams();
  const total=searchParams.get("total");
  const [tab, settab] = useState<number>(0)


  const changeTab=(index:number)=>()=>{
    console.log(index)
    settab(index)
  }




  return (
    <div className="min-h-screen bg-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
      <div>
          <button className="text-2xl text-black"><Link href={"/checkout"}>{<ArrowLeft/>}</Link></button>
        <h1 className="text-xl text-black font-semibold">Payment</h1>
    </div>
          <div className="w-6"></div>
      </div>

      {/* Tabs */}
      <div className="flex border-b ">
        {["Credit/Debit", "Transfer", "Cash"].map((tabName, index) => (
          <button
            key={index}  className={`flex-1 pb-2 text-center ${index == tab ? "border-b-2 border-blue-800 text-blue-800" : "text-gray-500"}`} onClick={changeTab(index)}>
            {tabName}
          </button>
        ))}
      </div>

      {/* Payment Methods */}

      {tab === 0 && <Card/>}
      {tab === 1 && <Transer/>}
      {tab === 2 && <><p className="text-black">Proceed to the  queue</p></>}

      <Button Name={`Pay `+total } url={{ pathname: "/exitPass", query: {total: Number(total)?.toFixed(2) } }} />
    </div>
  );
}

export default function Payment(){
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent/>
      </Suspense>
  )
};