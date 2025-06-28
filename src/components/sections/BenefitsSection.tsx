'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaGlobe, FaGraduationCap, FaBusinessTime, FaHeart, FaBrain, FaRocket } from 'react-icons/fa'

const benefits = [
  {
    icon: FaGlobe,
    title: "Cơ Hội Du Học Đức",
    description: "Mở ra con đường du học tại đất nước có nền giáo dục hàng đầu thế giới với học phí thấp",
    color: "blue"
  },
  {
    icon: FaBusinessTime,
    title: "Cơ Hội Việc Làm",
    description: "Tiếng Đức là ngôn ngữ thứ 2 quan trọng trong kinh doanh châu Âu, mở ra nhiều cơ hội việc làm",
    color: "green"
  },
  {
    icon: FaGraduationCap,
    title: "Học Bổng Du Học",
    description: "Đức cung cấp nhiều học bổng hấp dẫn cho sinh viên quốc tế có trình độ tiếng Đức tốt",
    color: "purple"
  },
  {
    icon: FaBrain,
    title: "Phát Triển Trí Tuệ",
    description: "Học tiếng Đức giúp cải thiện khả năng tư duy logic và sáng tạo đáng kể",
    color: "orange"
  },
  {
    icon: FaHeart,
    title: "Khám Phá Văn Hóa",
    description: "Tiếp cận trực tiếp với văn hóa, âm nhạc, văn học phong phú của các nước nói tiếng Đức",
    color: "red"
  },
  {
    icon: FaRocket,
    title: "Nâng Cao Sự Nghiệp",
    description: "Tiếng Đức là lợi thế cạnh tranh trong môi trường làm việc quốc tế và đa quốc gia",
    color: "indigo"
  }
] as const

export default function BenefitsSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Tại Sao Nên Học Tiếng Đức?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tiếng Đức không chỉ là ngôn ngữ - đó là chìa khóa mở ra vô vàn cơ hội trong tương lai
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300
                  ${benefit.color === 'blue' && 'bg-blue-100 text-blue-600'}
                  ${benefit.color === 'green' && 'bg-green-100 text-green-600'}
                  ${benefit.color === 'purple' && 'bg-purple-100 text-purple-600'}
                  ${benefit.color === 'orange' && 'bg-orange-100 text-orange-600'}
                  ${benefit.color === 'red' && 'bg-red-100 text-red-600'}
                  ${benefit.color === 'indigo' && 'bg-indigo-100 text-indigo-600'}
                `}>
                  <IconComponent className="text-2xl" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">#4</div>
              <div className="text-gray-600">Nền kinh tế lớn nhất châu Âu</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">100M+</div>
              <div className="text-gray-600">Người nói tiếng Đức trên thế giới</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">0€</div>
              <div className="text-gray-600">Học phí tại các trường ĐH công lập Đức</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 