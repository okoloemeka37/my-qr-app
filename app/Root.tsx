'use client'
import React, { useEffect, useState } from 'react';

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope
          );
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  const [isOnline, setOnline] = useState<boolean>(
    typeof window !== 'undefined' && navigator.onLine
  );


  return (
    <>
        {children}

    </>
  );
}
