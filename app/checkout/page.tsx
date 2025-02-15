"use client";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { useDrag } from "@use-gesture/react";
import Link from "next/link";
import Button from "../components/Button";


const cartItems = [
  {
    id: 1,
    sub:'Braeburn',
    name: "Braeburn Apple",
    price: 836.63,
    image: "images/apple.png",
    quantity: 3,
  },
  {
    id: 2,
    sub:'minor figures',
    name: "Barista Oat Organic (1 Litre)",
    price: 5856.44,
    image: "images/apple.png",
    quantity: 2,
  },
  {
    id: 3,
    sub:'valley Isle',
    name: "Local Lilikoi Kombucha",
    price: 11696.16,
    image: "images/apple.png",
    quantity: 2,
  },
];

export default function Checkout() { 





  const [items, setItems] = useState(cartItems);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);



  // Calculate subtotal
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxes = subtotal * 0.05; // Assuming 5% tax
  const total = subtotal + taxes;

  // Handle quantity change
  const updateQuantity = (id: number, change: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  // Handle swipe gesture
  const bind = useDrag(({ args: [index], movement: [mx], down, event }) => {
    const swipedDiv = event.currentTarget as HTMLDivElement;

   

    if (!down && mx < -50) {
      swipedDiv.classList.remove("p-6")
      swipedDiv.querySelector(".MT")!.classList.remove("hidden");
      setActiveIndex(index);

      if (activeIndex !== index && activeIndex !== null) {
        const parentDiv = swipedDiv.parentElement as HTMLDivElement;
        parentDiv.querySelector(".in" + activeIndex)?.querySelector(".MT")!.classList.add("hidden");
      }
    } else if (down) {
   
     if (!(event.target instanceof SVGElement)) {
      swipedDiv.classList.add("p-6")
      swipedDiv.querySelector(".MT")!.classList.add("hidden");
     }
    }
  });

  // Remove item
  const trash = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };


  const handlePayment = () => {
    // Passing the total as a query parameter in the URL
    const query = new URLSearchParams({ total: total.toFixed(2) }).toString();

  };
  return (


    <div className="bg-white min-h-screen text-black">
       <div className="flex items-center justify-between mb-6 p-6">
        <button className="text-2xl"><Link href={"/"}>✖</Link> </button>
        <h1 className="text-xl font-semibold">Checkout</h1>
        <button className="text-2xl text-blue-800">☰</button>
      </div>

   <div className="space-y-4 sm:space-y-6">
    {items.map((item,index) => (
      <div key={item.id}  className={`flex w-full items-stretch border-b border-gray-300  py-1 p-6  touch-none  in${index}`} {...bind(index)} >
        {/* Image */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 border border-gray-500 rounded-md">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between ml-3 sm:ml-4">
          <p className="text-sm text-black">{item.sub}</p>
          <p className="text-black text-lg font-bold sm:text-base whitespace-normal break-words">
            {item.name}
          </p>
          <p className="text-blue-800 font-bold text-sm sm:text-base">
            NGN {item.price.toFixed(2)}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center ml-24 space-x-2 mt-1">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              className="w-8 h-8 bg-blue-700 text-white rounded-full text-lg flex items-center justify-center"
            >
              −
            </button>
            <input
              type="text"
              className="w-12 h-8 text-center border rounded-md"
              value={item.quantity}
              readOnly
            />
            <button
              onClick={() => updateQuantity(item.id, 1)}
              className="w-8 h-8 bg-blue-700 text-white rounded-full text-lg flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        {/* Trash Button (Full Height) */}
        <div className="bg-blue-800 flex items-center MT hidden justify-center px-4 w-14 sm:w-16" ><Trash size={24} color="white" onClick={() => trash(item.id)} /></div>
      </div>

    ))}

      <div className="mt-6 space-y-2 text-lg p-6">
        <div className="flex justify-between">
          <span className="font-bold">Subtotal:</span>
          <span>NGN {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Taxes (5%):</span>
          <span>NGN {taxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-xl">
          <span className="font-bold">TOTAL</span>
          <span className="text-blue-800">NGN {total.toFixed(2)}</span>
        </div>
      </div>
</div>
      {/* Payment Button */}
   <Button Name="Proceed To Payment" url={{pathname:"/payment",query:{total:total}}}/>
  
  </div>
  );
}
