'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaUsers, FaStar, FaGraduationCap, FaGlobe, FaTrophy, FaHeart } from 'react-icons/fa'
import AnimatedCounter, { PercentageCounter, PlusCounter } from '../ui/AnimatedCounter'
import { CSSParticles } from '../ui/ParticleBackground'

const stats = [
  {
    icon: FaUsers,
    number: 5000,
    suffix: '+',
    label: 'Học Viên Thành Công',
    description: 'Đã đạt chứng chỉ quốc tế',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: FaGraduationCap,
    number: 98,
    suffix: '%',
    label: 'Tỷ Lệ Đậu',
    description: 'Kỳ thi quốc tế',
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: FaTrophy,
    number: 15,
    suffix: '+',
    label: 'Năm Kinh Nghiệm',
    description: 'Giảng dạy tiếng Đức',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: FaGlobe,
    number: 25,
    suffix: '+',
    label: 'Quốc Gia',
    description: 'Học viên đến từ',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: FaStar,
    number: 4.9,
    suffix: '/5',
    label: 'Đánh Giá',
    description: 'Từ học viên',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: FaHeart,
    number: 95,
    suffix: '%',
    label: 'Hài Lòng',
    description: 'Học viên giới thiệu bạn bè',
    color: 'from-indigo-500 to-purple-600'
  }
] as const

export default function StatsSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <CSSParticles />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern opacity-30 dark:opacity-10"></div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 text-white"
          >
            <FaStar className="text-2xl" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Những Con Số{' '}
            <span className="glow-text">Ấn Tượng</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hơn 15 năm kinh nghiệm giảng dạy, Deutsche Ecke tự hào mang đến chất lượng giáo dục hàng đầu
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="group"
            >
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10`}></div>
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl text-white mb-6 shadow-lg`}
                >
                  <stat.icon className="text-2xl" />
                </motion.div>

                {/* Number */}
                <div className="mb-4">
                  <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.suffix === '+' ? (
                      <PlusCounter end={stat.number} />
                    ) : stat.suffix === '%' ? (
                      <PercentageCounter end={stat.number} />
                    ) : (
                      <AnimatedCounter 
                        end={stat.number} 
                        suffix={stat.suffix}
                        duration={2.5}
                      />
                    )}
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Tham Gia Cộng Đồng Học Viên Deutsche Ecke
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Bắt đầu hành trình học tiếng Đức cùng hàng nghìn học viên đã thành công
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Đăng Ký Ngay
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 