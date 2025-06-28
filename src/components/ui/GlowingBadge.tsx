'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface GlowingBadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'success' | 'warning' | 'purple'
  size?: 'sm' | 'md' | 'lg'
  glow?: boolean
  pulse?: boolean
  className?: string
}

export default function GlowingBadge({
  children,
  variant = 'primary',
  size = 'md',
  glow = true,
  pulse = false,
  className = ''
}: GlowingBadgeProps) {
  const variants = {
    primary: {
      bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
      glow: 'shadow-lg shadow-blue-500/50',
      text: 'text-white'
    },
    success: {
      bg: 'bg-gradient-to-r from-green-500 to-emerald-600',
      glow: 'shadow-lg shadow-green-500/50',
      text: 'text-white'
    },
    warning: {
      bg: 'bg-gradient-to-r from-orange-500 to-red-500',
      glow: 'shadow-lg shadow-orange-500/50',
      text: 'text-white'
    },
    purple: {
      bg: 'bg-gradient-to-r from-purple-500 to-pink-500',
      glow: 'shadow-lg shadow-purple-500/50',
      text: 'text-white'
    }
  }

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  const currentVariant = variants[variant]
  const currentSize = sizes[size]

  return (
    <motion.span
      className={`
        inline-flex items-center justify-center
        ${currentVariant.bg}
        ${currentVariant.text}
        ${currentSize}
        ${glow ? currentVariant.glow : ''}
        rounded-full font-semibold
        relative overflow-hidden
        ${className}
      `}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        animate={pulse ? { x: '100%' } : {}}
        transition={pulse ? {
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'linear'
        } : {}}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.span>
  )
}

// Specialized badges
export function NewBadge({ className = '' }: { className?: string }) {
  return (
    <GlowingBadge variant="success" size="sm" pulse className={className}>
      MỚI
    </GlowingBadge>
  )
}

export function PopularBadge({ className = '' }: { className?: string }) {
  return (
    <GlowingBadge variant="warning" size="sm" pulse className={className}>
      PHỔ BIẾN
    </GlowingBadge>
  )
}

export function PremiumBadge({ className = '' }: { className?: string }) {
  return (
    <GlowingBadge variant="purple" size="sm" glow className={className}>
      PREMIUM
    </GlowingBadge>
  )
} 