'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
  placeholder?: string
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false,
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyN0M2LjE5MjI1IDI3IDUgMjUuODA3OCA1IDI0VjE2QzUgMTQuMTkyMiA2LjE5MjI1IDEzIDggMTNIMzJDMzMuODA3OCAxMyAzNSAxNC4xOTIyIDM1IDE2VjI0QzM1IDI1LjgwNzggMzMuODA3OCAyNyAzMiAyN0gyMFoiIGZpbGw9IiNFNUU3RUIiLz4KPHBhdGggZD0iTTI0IDIwQzI0IDIxLjEwNDYgMjMuMTA0NiAyMiAyMiAyMkMyMC44OTU0IDIyIDE5IDIxLjEwNDYgMjAgMjBDMjAgMTguODk1NCAyMC44OTU0IDE4IDIyIDE4QzIzLjEwNDYgMTggMjQgMTguODk1NCAyNCAyMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
        <div className="text-gray-400 dark:text-gray-500 text-center p-4">
          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <p className="text-xs">Không thể tải ảnh</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse">
          <img
            src={placeholder}
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
        </div>
      )}
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isLoading ? 0 : 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />
    </div>
  )
} 