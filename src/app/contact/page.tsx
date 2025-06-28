'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ContactRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to Vietnamese contact page
    router.replace('/lien-he')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Đang chuyển hướng...</p>
      </div>
    </div>
  )
} 