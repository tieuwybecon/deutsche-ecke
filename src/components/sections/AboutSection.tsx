'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Về Deutsche Ecke
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Deutsche Ecke là trung tâm học tiếng Đức hàng đầu tại Việt Nam với hơn 10 năm kinh nghiệm.
            Chúng tôi tự hào mang đến cho học viên những khóa học chất lượng cao với đội ngũ giáo viên
            bản ngữ giàu kinh nghiệm và phương pháp giảng dạy hiện đại.
          </p>
        </motion.div>
      </div>
    </section>
  )
} 