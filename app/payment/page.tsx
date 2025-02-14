"use client";
import { useState } from "react";
import {  ArrowLeft,CreditCard, PlusCircle } from "lucide-react";
import Button from "../components/Button";
import { useSearchParams } from "next/navigation";
import Link from "next/link";





export default function PaymentPage() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const total=searchParams.get("total");


  const cards = [
    { id: 1, type: "MasterCard", last4: "4873", icon: "images/master.png" },
    { id: 2, type: "Visa", last4: "1245", icon: "images/visa.png" },
  ];



  return (
    <div className="min-h-screen bg-white px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button className="text-2xl"><Link href={"/checkout"}>{<ArrowLeft/>}</Link></button>
        <h1 className="text-xl font-semibold">Payment</h1>
        <div className="w-6"></div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {["Credit/Debit", "Transfer", "Cash"].map((tab, index) => (
          <button
            key={index}
            className={`flex-1 pb-2 text-center ${
              index === 0 ? "border-b-2 border-blue-800 text-blue-800" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="mt-6 space-y-4">
        {cards.map((card) => (
          <div key={card.id} className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment"
              className="w-5 h-5 accent-blue-800"
              checked={selectedCard === card.id}
              onChange={() => setSelectedCard(card.id)}
            />
            <span className="text-lg">{card.type} {card.last4}</span>
            <img src={card.icon} alt={card.type} className="h-6 w-10" />
          </div>
        ))}

        {/* New Card Option */}
        <button className="flex items-center text-blue-800 space-x-2">
          <PlusCircle size={20} />
          <span className="text-lg font-semibold">New Card</span>
        </button>
      </div>
        <Button Name={`Pay `+total } url="/" />
    </div>
  );
}
