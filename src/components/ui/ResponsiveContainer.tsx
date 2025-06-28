'use client'

import React from 'react'

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export default function ResponsiveContainer({ 
  children, 
  className = '',
  maxWidth = 'xl',
  padding = 'md'
}: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md', 
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full'
  }

  const paddingClasses = {
    none: '',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12'
  }

  return (
    <div className={`mx-auto w-full ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  )
}

// Specialized containers
export function HeroContainer({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <ResponsiveContainer maxWidth="2xl" padding="lg" className={className}>
      {children}
    </ResponsiveContainer>
  )
}

export function SectionContainer({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <ResponsiveContainer maxWidth="xl" padding="md" className={className}>
      {children}
    </ResponsiveContainer>
  )
} 