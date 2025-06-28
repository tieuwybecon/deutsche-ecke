'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaCheck, FaGraduationCap, FaBook, FaCertificate, FaGlobe, FaStar, FaRocket } from 'react-icons/fa'

const learningPath = [
  {
    level: "A1",
    title: "Beginner - Người Mới Bắt Đầu",
    duration: "2-3 tháng",
    description: "Làm quen với tiếng Đức cơ bản",
    skills: [
      "Bảng chữ cái và phát âm",
      "Chào hỏi và giới thiệu bản thân", 
      "Số đếm, thời gian, ngày tháng",
      "Gia đình và bạn bè",
      "Mua sắm và đặt món ăn"
    ],
    vocabulary: "600+ từ vựng",
    grammar: "Hiện tại đơn, Danh từ, Tính từ",
    color: "red",
    icon: FaBook
  },
  {
    level: "A2", 
    title: "Elementary - Sơ Cấp",
    duration: "3-4 tháng",
    description: "Giao tiếp trong tình huống thường ngày",
    skills: [
      "Viết email và tin nhắn đơn giản",
      "Mô tả quá khứ và kế hoạch tương lai",
      "Đặt phòng khách sạn, mua vé",
      "Nói về sở thích và công việc",
      "Xin lỗi và phàn nàn lịch sự"
    ],
    vocabulary: "1,200+ từ vựng", 
    grammar: "Quá khứ, Tương lai, Trợ động từ",
    color: "green",
    icon: FaGraduationCap
  },
  {
    level: "B1",
    title: "Intermediate - Trung Cấp", 
    duration: "4-5 tháng",
    description: "Thể hiện ý kiến và thảo luận",
    skills: [
      "Thảo luận về chủ đề phức tạp",
      "Viết thư chính thức và báo cáo",
      "Hiểu tin tức và phim ảnh",
      "Thuyết trình ngắn",
      "Xử lý tình huống bất ngờ"
    ],
    vocabulary: "2,500+ từ vựng",
    grammar: "Câu điều kiện, Bị động, Liên từ",
    color: "blue", 
    icon: FaCertificate
  },
  {
    level: "B2",
    title: "Upper-Intermediate - Trung Cao",
    duration: "5-6 tháng", 
    description: "Sử dụng tiếng Đức thành thạo",
    skills: [
      "Viết luận và phân tích",
      "Tranh luận và bảo vệ quan điểm", 
      "Hiểu văn học và báo chí",
      "Giao tiếp trong môi trường chuyên nghiệp",
      "Chuẩn bị du học và làm việc"
    ],
    vocabulary: "4,000+ từ vựng",
    grammar: "Câu phức, Văn phong chính thức",
    color: "orange",
    icon: FaGlobe
  }
] as const

const milestones = [
  {
    title: "Tuần 1-2: Làm quen",
    description: "Học bảng chữ cái, phát âm cơ bản",
    completed: true
  },
  {
    title: "Tháng 1: Giao tiếp cơ bản", 
    description: "Chào hỏi, giới thiệu, mua sắm",
    completed: true
  },
  {
    title: "Tháng 2-3: Ngữ pháp nền tảng",
    description: "Chia động từ, cấu trúc câu",
    completed: true
  },
  {
    title: "Tháng 4-6: Mở rộng từ vựng",
    description: "Chủ đề đa dạng, luyện nghe-nói",
    completed: false
  },
  {
    title: "Tháng 7-12: Thành thạo",
    description: "Viết, thảo luận, thi chứng chỉ",
    completed: false
  }
] as const

export default function LearningPathSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Lộ Trình Học Tiếng Đức Từ A Đến Z
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Phát triển kỹ năng tiếng Đức một cách có hệ thống từ người mới bắt đầu đến thành thạo
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <FaRocket className="text-blue-500" />
            <span>Tiến độ rõ ràng</span>
            <span>•</span>
            <FaStar className="text-yellow-500" />
            <span>Đánh giá định kỳ</span>
            <span>•</span>
            <FaCertificate className="text-green-500" />
            <span>Chứng chỉ quốc tế</span>
          </div>
        </motion.div>

        {/* Learning Path Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {learningPath.map((level, index) => {
            const IconComponent = level.icon
            return (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`
                  relative bg-white rounded-2xl shadow-lg p-8 border-2 hover:shadow-xl transition-all duration-300
                  ${level.color === 'green' && 'border-green-200 hover:border-green-300'}
                  ${level.color === 'blue' && 'border-blue-200 hover:border-blue-300'}
                  ${level.color === 'orange' && 'border-orange-200 hover:border-orange-300'}
                  ${level.color === 'red' && 'border-red-200 hover:border-red-300'}
                `}
              >
                {/* Level Badge */}
                <div className={`
                  absolute -top-4 left-8 px-4 py-2 rounded-full text-white font-bold text-sm
                  ${level.color === 'green' && 'bg-green-500'}
                  ${level.color === 'blue' && 'bg-blue-500'}
                  ${level.color === 'orange' && 'bg-orange-500'}
                  ${level.color === 'red' && 'bg-red-500'}
                `}>
                  {level.level}
                </div>

                {/* Content */}
                <div className="mt-4">
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className={`
                      text-2xl
                      ${level.color === 'green' && 'text-green-500'}
                      ${level.color === 'blue' && 'text-blue-500'}
                      ${level.color === 'orange' && 'text-orange-500'}
                      ${level.color === 'red' && 'text-red-500'}
                    `} />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{level.title}</h3>
                      <p className="text-sm text-gray-500">{level.duration}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{level.description}</p>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Kỹ năng đạt được:</h4>
                    <ul className="space-y-2">
                      {level.skills.map((skill, skillIndex) => (
                        <li key={skillIndex} className="flex items-start gap-2">
                          <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Từ vựng</p>
                      <p className="font-bold text-gray-800">{level.vocabulary}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Ngữ pháp</p>
                      <p className="font-bold text-gray-800">{level.grammar}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Timeline Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Cột Mốc Quan Trọng Trong Hành Trình Học
          </h3>
          
          <div className="relative">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-4 mb-8 last:mb-0">
                <div className={`
                  w-6 h-6 rounded-full flex-shrink-0 border-2 flex items-center justify-center
                  ${milestone.completed 
                    ? 'bg-green-500 border-green-500' 
                    : 'bg-white border-gray-300'
                  }
                `}>
                  {milestone.completed && <FaCheck className="text-white text-xs" />}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold mb-1 ${
                    milestone.completed ? 'text-green-700' : 'text-gray-600'
                  }`}>
                    {milestone.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}