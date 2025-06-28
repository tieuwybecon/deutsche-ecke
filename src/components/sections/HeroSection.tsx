'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaArrowLeft, FaArrowRight, FaGraduationCap, FaCertificate, FaClock } from 'react-icons/fa'

interface HeroSlide {
  title: string
  subtitle: string
  bg: string
  features: readonly string[]
  image: string
}

interface HeroSectionProps {
  slides: readonly HeroSlide[]
}

export default function HeroSection({ slides }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Auto slide
  useEffect(() => {
    if (!isPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isPlaying, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900 dark:bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img 
              src={slides[currentSlide].image} 
              alt={slides[currentSlide].title} 
              className="w-full h-full object-cover" 
              style={{ maxHeight: '100vh' }}
            />
            <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        {/* Slide Indicators */}
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex space-x-2 ml-6">
          <button
            onClick={prevSlide}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all duration-300"
            aria-label="Previous slide"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all duration-300"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <FaPlay className={isPlaying ? 'opacity-50' : 'opacity-100'} />
          </button>
          <button
            onClick={nextSlide}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-full text-white transition-all duration-300"
            aria-label="Next slide"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-white text-center"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center mb-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </div>
          <p className="text-xs">Cuộn xuống</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow-lg">
            {currentSlideData.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
            {currentSlideData.subtitle}
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {currentSlideData.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium"
              >
                {feature}
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="btn-primary bg-white text-blue-600 hover:bg-gray-100"
            >
              Bắt Đầu Học Ngay
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="btn-secondary border-white text-white hover:bg-white hover:text-blue-600"
            >
              Xem Khóa Học
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Statistics - Fixed positioning */}
      <div className="absolute top-24 right-4 lg:right-8 z-20">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-2xl p-4 lg:p-6 text-white border border-white/20"
        >
          <div className="text-center min-w-[120px]">
            <div className="text-2xl lg:text-3xl font-bold mb-1">5,000+</div>
            <div className="text-xs lg:text-sm opacity-90 leading-tight">Học viên<br/>thành công</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}