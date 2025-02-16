import React, { useState } from 'react'
import {  ArrowLeft,CreditCard, PlusCircle } from "lucide-react";

export default function Card() {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);


    const cards = [
        { id: 1, type: "MasterCard", last4: "4873", icon: "images/master.png" },
        { id: 2, type: "Visa", last4: "1245", icon: "images/visa.png" },
      ];
    

  return (
    <div>
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
            <span className="text-lg text-black">{card.type} {card.last4}</span>
            <img src={card.icon} alt={card.type} className="h-6 w-10" />
          </div>
        ))}

        {/* New Card Option */}
        <button className="flex items-center text-blue-800 space-x-2">
          <PlusCircle size={20} />
          <span className="text-lg font-semibold">New Card</span>
        </button>
      </div>
       
    </div>
  )
}
