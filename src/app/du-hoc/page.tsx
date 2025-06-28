'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaUniversity, FaTools, FaGlobe, FaArrowRight, FaCheck, FaUsers, FaAward, FaMapMarkedAlt, FaCalendarAlt, FaEuroSign, FaPassport, FaPlane } from 'react-icons/fa'
import Header from '../../components/sections/Header'
import Footer from '../../components/sections/Footer'
import Link from 'next/link'

const studyPrograms = [
  {
    title: "Du Học Đại Học - Sau Đại Học",
    description: "Chương trình học bậc đại học, thạc sĩ và tiến sĩ tại các trường đại học hàng đầu Đức",
    icon: FaUniversity,
    features: ["Học phí thấp", "Chương trình toàn cầu", "Cơ hội nghiên cứu", "Bằng cấp quốc tế"],
    color: "blue",
    link: "/du-hoc/dai-hoc"
  },
  {
    title: "Du Học Nghề Tại CHLB Đức",
    description: "Học nghề chuyên sâu với hệ thống Ausbildung nổi tiếng, cam kết có việc làm sau tốt nghiệp",
    icon: FaTools,
    features: ["Học và làm", "Lương trong quá trình học", "Tỷ lệ có việc cao", "Định cư dễ dàng"],
    color: "green",
    link: "/du-hoc/nghe"
  },
  {
    title: "Đất Nước & Con Người Đức",
    description: "Tìm hiểu về văn hóa, lịch sử và cuộc sống tại Đức để chuẩn bị tốt nhất cho hành trình du học",
    icon: FaGlobe,
    features: ["Văn hóa Đức", "Cuộc sống hàng ngày", "Lịch sử phong phú", "Cộng đồng quốc tế"],
    color: "purple",
    link: "/du-hoc/dat-nuoc"
  }
]

const benefits = [
  {
    icon: FaEuroSign,
    title: "Chi Phí Hợp Lý",
    description: "Học phí thấp hoặc miễn phí tại các trường công lập"
  },
  {
    icon: FaAward,
    title: "Chất Lượng Giáo Dục",
    description: "Hệ thống giáo dục hàng đầu thế giới được công nhận toàn cầu"
  },
  {
    icon: FaUsers,
    title: "Cơ Hội Việc Làm",
    description: "Tỷ lệ có việc làm cao và mức lương cạnh tranh sau tốt nghiệp"
  },
  {
    icon: FaMapMarkedAlt,
    title: "Định Cư Lâu Dài",
    description: "Cơ hội định cư và phát triển sự nghiệp tại châu Âu"
  }
]

const process = [
  {
    step: "01",
    title: "Tư Vấn Miễn Phí",
    description: "Đánh giá năng lực và tư vấn chương trình phù hợp",
    icon: FaUsers
  },
  {
    step: "02", 
    title: "Học Tiếng Đức",
    description: "Đạt trình độ B1-B2 với khóa học chuyên sâu",
    icon: FaGraduationCap
  },
  {
    step: "03",
    title: "Chuẩn Bị Hồ Sơ",
    description: "Hỗ trợ làm hồ sơ và thủ tục xin visa",
    icon: FaPassport
  },
  {
    step: "04",
    title: "Bay Sang Đức",
    description: "Đón tiếp và hỗ trợ ổn định cuộc sống ban đầu",
    icon: FaPlane
  }
]

const stats = [
  { number: "500+", label: "Học viên thành công" },
  { number: "95%", label: "Tỷ lệ đỗ visa" },
  { number: "50+", label: "Trường đại học đối tác" },
  { number: "10+", label: "Năm kinh nghiệm" }
]

export default function DuHocPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container-custom relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Du Học Đức - Chìa Khóa Tương Lai
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                Mở ra cơ hội học tập và phát triển sự nghiệp tại một trong những quốc gia có nền giáo dục hàng đầu thế giới
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-yellow-400">{stat.number}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                  Tư Vấn Miễn Phí
                </button>
                <button className="btn-secondary border-white text-white hover:bg-white hover:text-blue-600">
                  Xem Chương Trình
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Chương Trình Du Học
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/du-hoc/dai-hoc">
                <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <FaUniversity className="text-4xl text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Du Học Đại Học - Sau Đại Học</h3>
                  <p className="text-gray-600 mb-4">Chương trình học bậc đại học, thạc sĩ và tiến sĩ tại các trường đại học hàng đầu Đức</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Tìm hiểu thêm <FaArrowRight className="ml-2" />
                  </div>
                </div>
              </Link>

              <Link href="/du-hoc/nghe">
                <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <FaTools className="text-4xl text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Du Học Nghề Tại CHLB Đức</h3>
                  <p className="text-gray-600 mb-4">Học nghề chuyên sâu với hệ thống Ausbildung nổi tiếng, cam kết có việc làm sau tốt nghiệp</p>
                  <div className="flex items-center text-green-600 font-medium">
                    Tìm hiểu thêm <FaArrowRight className="ml-2" />
                  </div>
                </div>
              </Link>

              <Link href="/du-hoc/dat-nuoc">
                <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <FaGlobe className="text-4xl text-purple-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Đất Nước & Con Người Đức</h3>
                  <p className="text-gray-600 mb-4">Tìm hiểu về văn hóa, lịch sử và cuộc sống tại Đức để chuẩn bị tốt nhất cho hành trình du học</p>
                  <div className="flex items-center text-purple-600 font-medium">
                    Tìm hiểu thêm <FaArrowRight className="ml-2" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tại Sao Chọn Du Học Đức?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Đức là điểm đến lý tưởng cho những ai muốn phát triển học thuật và sự nghiệp
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      <IconComponent className="text-2xl text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Quy Trình Du Học
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                4 bước đơn giản để bắt đầu hành trình du học Đức của bạn
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => {
                const IconComponent = step.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className="text-center relative"
                  >
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="text-2xl text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-900">{step.step}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    
                    {index < process.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full">
                        <FaArrowRight className="text-gray-300 text-2xl transform -translate-x-4" />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Bắt Đầu Hành Trình Du Học Ngay Hôm Nay
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Đăng ký tư vấn miễn phí để được hỗ trợ chi tiết về chương trình phù hợp
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                  Đăng Ký Tư Vấn
                </button>
                <button className="btn-secondary border-white text-white hover:bg-white hover:text-blue-600">
                  Tải Brochure
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
} 