'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Liên Hệ Với Chúng Tôi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            Hãy liên hệ để được tư vấn miễn phí về khóa học phù hợp với bạn
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Điện thoại</h3>
              <p className="text-gray-600">077.024.240</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@dek.edu.vn</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Địa chỉ</h3>
              <p className="text-gray-600">123 Đường ABC, Hà Nội</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 