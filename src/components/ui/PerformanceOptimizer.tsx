'use client'

import React, { memo, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'

// Memoized motion components for better performance
export const MemoizedMotionDiv = memo(motion.div)
export const MemoizedMotionSection = memo(motion.section)
export const MemoizedMotionButton = memo(motion.button)

// Custom hooks for performance optimization
export function useScrollPerformance() {
  const [scrollY, setScrollY] = React.useState(0)
  
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    if (Math.abs(currentScrollY - scrollY) > 10) {
      setScrollY(currentScrollY)
    }
  }, [scrollY])

  React.useEffect(() => {
    const throttledScroll = throttle(handleScroll, 16) // 60fps
    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [handleScroll])

  return scrollY
}

// Throttle function for performance
function throttle(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0
  
  return function (this: any, ...args: any[]) {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

// Intersection Observer hook
export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = React.useState(false)
  const targetRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, ...options }
    )

    const current = targetRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [options])

  return [targetRef, isIntersecting] as const
}

// Lazy loading wrapper
interface LazyWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  className?: string
}

export function LazyWrapper({ children, fallback = null, className = '' }: LazyWrapperProps) {
  const [ref, isIntersecting] = useIntersectionObserver()

  return (
    <div ref={ref} className={className}>
      {isIntersecting ? children : fallback}
    </div>
  )
} 