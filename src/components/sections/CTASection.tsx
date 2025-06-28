'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="section-padding bg-gradient-to-r from-primary-600 to-primary-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sẵn Sàng Bắt Đầu Hành Trình Học Tiếng Đức?
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Đăng ký ngay hôm nay và nhận ưu đãi 20% cho khóa học đầu tiên
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-secondary bg-white text-primary-600 hover:bg-gray-50">
              Đăng Ký Ngay
            </button>
            <button className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
              Tư Vấn Miễn Phí
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 