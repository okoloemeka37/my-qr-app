import React from 'react'
import Link from 'next/link'


interface ButtonProps {
  Name: string;
  url: string;
}

export default function Button({ Name,url }: ButtonProps) {
  return (
    <button className="w-full mt-6 bg-blue-800 text-white py-3 text-lg rounded-lg">
    <Link href={url}>{Name}</Link>
   </button>
  )
}
