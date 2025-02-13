'use client'
import { useState } from "react";
import { Minus, Pi, Plus } from "lucide-react";
import { Menu } from "lucide-react";
import { useDrag } from "@use-gesture/react";

//import { Button } from "@/components/ui/button";

const cartItems = [
  {
    id: 1,
    'pi':'Braeburn',
    name: "Braeburn Apple",
    price: 836.63,
    image: "images/apple.png",
    quantity: 3,
  },
  {
    id: 2,
    'pi':'Braeburn',
    name: "Barista Oat Organic (1 Litre)",
    price: 5856.44,
    image: "images/apple.png",
    quantity: 2,
  },
  {
    id: 3,
    'pi':'Braeburn',
    name: "Local Lilikoi Kombucha",
    price: 11696.16,
    image: "images/apple.png",
    quantity: 2,
  },
];

export default function Checkout() {
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (id: number, delta: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = 5019.81;
  const total = subtotal + taxes;

  //adding dragiing functionality
  const bind=useDrag(({movement:[mx],down})=>{
if (!down && mx>100) {
    alert('menu opened')
}
  })


  return (
    <div className="bg-white text-black min-h-screen p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <button className="text-black text-2xl">✕</button>
        <h1 className="text-lg sm:text-xl font-semibold">Checkout</h1>
        <button className="text-blue-800 text-2xl"><Menu color={'darkblue'} size={24}/></button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 sm:space-y-6">
        {items.map((item) => (
          <div  key={item.id} className="flex items-center border-b border-gray-300 pb-3 sm:pb-4" {...bind()}>
            <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 border border-gray-500 rounded-md">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="ml-3 sm:ml-4 flex-1">
            <p className="text-black font-light text-sm sm:text-base">{item.pi}</p>   
              <p className="text-black font-bold text-sm sm:text-base">{item.name}</p>
              <p className="text-blue-800 font-semibold text-sm sm:text-base">
                NGN {item.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-700 text-white flex items-center justify-center rounded-full"
              >
                <Minus size={16} />
              </button>
              <div className="w-12 h-8 sm:w-16 sm:h-10 flex items-center  border  border-blue-800 justify-center  bg-white text-black rounded-md">
                {item.quantity}
              </div>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-700 text-white flex items-center justify-center rounded-full"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="mt-6 sm:mt-8 space-y-2 text-gray-300 text-sm sm:text-base">
        <div className="flex justify-between">
          <span className="text-black font-bold">Subtotal:</span>
          <span className="text-black font-medium">NGN {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black font-bold">Taxes:</span>
          <span className="text-black font-medium">NGN {taxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-base sm:text-lg ">
          <span className="text-black font-bold">TOTAL</span>
          <span className="text-blue-800">NGN {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Proceed to Payment Button */}
      <div className="mt-6">
        <button className="w-full bg-blue-800 text-white text-base sm:text-lg py-3 rounded-lg">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
