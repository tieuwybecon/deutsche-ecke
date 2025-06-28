'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Testimonial {
  name: string
  role: string
  avatar: string
  content: string
  rating: number
  verified: boolean
}

interface TestimonialsSectionProps {
  testimonials: readonly Testimonial[]
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Học Viên Nói Gì Về Chúng Tôi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hàng nghìn học viên đã thành công với Deutsche Ecke
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{testimonial.content}</p>
              <div className="flex items-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
                {testimonial.verified && (
                  <span className="ml-2 text-green-500 text-sm">✓ Đã xác minh</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 