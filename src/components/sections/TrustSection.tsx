'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaCertificate, FaUniversity, FaHandshake, FaAward } from 'react-icons/fa'

const partners = [
  {
    name: 'Goethe Institut',
    logo: '/images/partners/goethe.svg',
    description: 'Đối tác chính thức',
    type: 'institute'
  },
  {
    name: 'ÖSD',
    logo: '/images/partners/osd.svg',
    description: 'Chứng chỉ tiếng Đức quốc tế',
    type: 'certification'
  }
]

const certifications = [
  {
    icon: FaCertificate,
    title: 'ISO 9001:2015',
    description: 'Chứng nhận chất lượng quốc tế'
  },
  {
    icon: FaUniversity,
    title: 'Giấy phép giáo dục',
    description: 'Được cấp bởi Sở GD&ĐT'
  },
  {
    icon: FaHandshake,
    title: 'Đối tác Goethe',
    description: 'Trung tâm ủy quyền chính thức'
  },
  {
    icon: FaAward,
    title: 'Top 10 trung tâm',
    description: 'Giảng dạy tiếng Đức tại VN'
  }
]

export default function TrustSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Đối Tác & {' '}
            <span className="glow-text">Chứng Nhận</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Deutsche Ecke được tin tưởng và công nhận bởi các tổ chức giáo dục hàng đầu thế giới
          </p>
        </motion.div>

        {/* Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group"
            >
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white mb-4"
                >
                  <cert.icon className="text-2xl" />
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {cert.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {cert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl"
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 italic">
            "Deutsche Ecke là trung tâm đào tạo tiếng Đức uy tín, đáp ứng các tiêu chuẩn quốc tế về chất lượng giáo dục và được các tổ chức giáo dục Đức công nhận."
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1 + i * 0.1 }}
                className="text-yellow-400 text-xl"
              >
                ⭐
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 