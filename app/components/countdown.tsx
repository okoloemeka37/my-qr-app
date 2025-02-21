"use client";

import { useState, useEffect } from "react";

export default function TelegramCountdown({
  seconds = 5,
  onComplete,
}: {
  seconds?: number;
  onComplete?: () => void;
}) {
  const [count, setCount] = useState(seconds);
  const [progress, setProgress] = useState(283); // Full circle length (2πr)

  useEffect(() => {
    if (count <= 0) {
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
      setProgress((prev) => prev - 283 / seconds); // Reduce progress smoothly
    }, 1000);

    return () => clearInterval(interval);
  }, [count, onComplete, seconds]);

  return (
    <div className="flex items-center justify-center space-y-4 p-4">
      {/* Message */}
      <p className="text-gray-700 text-lg font-medium animate-pulse mt-4">Deleting in {count} seconds...</p>

      {/* Circular Countdown Timer */}
      <div className="relative w-8 h-8">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle className="text-gray-300" cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="8" fill="none" />
          {/* Animated Progress Circle */}
          <circle
            className="text-blue-500 transition-all duration-1000 ease-linear"
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset={progress}
            strokeLinecap="round"
          />
        </svg>

        {/* Countdown Number */}
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-600">
          {count}
        </div>
      </div>
    
    </div>
  );
}
