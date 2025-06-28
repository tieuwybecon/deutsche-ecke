'use client'

import React from 'react'
import { FaPhone, FaComments } from 'react-icons/fa'

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-40">
      <button className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
        <FaComments className="text-xl" />
      </button>
      <button className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
        <FaPhone className="text-xl" />
      </button>
    </div>
  )
} 