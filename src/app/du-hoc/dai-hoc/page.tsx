'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaUniversity, FaGraduationCap, FaMicroscope, FaEuroSign, FaCheck, FaCalendarAlt, FaBookOpen, FaGlobe, FaAward, FaUsers, FaChartLine, FaMapMarkedAlt } from 'react-icons/fa'
import Header from '../../../components/sections/Header'
import Footer from '../../../components/sections/Footer'

const programs = [
  {
    level: "Bachelor (Cử nhân)",
    duration: "3-4 năm",
    tuition: "0 - 300€/học kỳ",
    language: "Tiếng Đức B2 hoặc Tiếng Anh B2",
    description: "Chương trình đại học cho học sinh tốt nghiệp THPT",
    majors: ["Kỹ thuật", "Kinh tế", "Khoa học tự nhiên", "Y khoa", "Luật", "Nghệ thuật"],
    color: "blue"
  },
  {
    level: "Master (Thạc sĩ)",
    duration: "1.5-2 năm", 
    tuition: "0 - 500€/học kỳ",
    language: "Tiếng Đức C1 hoặc Tiếng Anh C1",
    description: "Chương trình sau đại học cho sinh viên đã có bằng cử nhân",
    majors: ["MBA", "Kỹ thuật nâng cao", "Nghiên cứu", "Quản lý", "IT", "Thiết kế"],
    color: "green"
  },
  {
    level: "PhD (Tiến sĩ)",
    duration: "3-5 năm",
    tuition: "Miễn phí + Lương nghiên cứu",
    language: "Tiếng Đức C1 hoặc Tiếng Anh C1",
    description: "Chương trình nghiên cứu cao nhất, có lương trong quá trình học",
    majors: ["Nghiên cứu cơ bản", "Ứng dụng", "Liên ngành", "Công nghệ", "Y sinh", "Xã hội"],
    color: "purple"
  }
]

const topUniversities = [
  {
    name: "Technical University of Munich (TUM)",
    ranking: "#50 thế giới",
    strengths: ["Kỹ thuật", "Khoa học máy tính", "Kinh tế"],
    students: "45,000 sinh viên"
  },
  {
    name: "Ludwig-Maximilians-Universität München",
    ranking: "#63 thế giới", 
    strengths: ["Y khoa", "Luật", "Khoa học xã hội"],
    students: "52,000 sinh viên"
  },
  {
    name: "Heidelberg University",
    ranking: "#64 thế giới",
    strengths: ["Y khoa", "Khoa học tự nhiên", "Nhân văn"],
    students: "30,000 sinh viên"
  },
  {
    name: "Humboldt University Berlin",
    ranking: "#87 thế giới",
    strengths: ["Nhân văn", "Khoa học xã hội", "Luật"],
    students: "35,000 sinh viên"
  }
]

const benefits = [
  {
    icon: FaEuroSign,
    title: "Học Phí Thấp",
    description: "Trường công lập miễn phí hoặc chỉ 150-350€/học kỳ"
  },
  {
    icon: FaAward,
    title: "Chất Lượng Cao",
    description: "Nhiều trường top 100 thế giới, bằng cấp được công nhận toàn cầu"
  },
  {
    icon: FaUsers,
    title: "Môi Trường Quốc Tế",
    description: "Hơn 400,000 sinh viên quốc tế từ khắp nơi trên thế giới"
  },
  {
    icon: FaChartLine,
    title: "Cơ Hội Nghề Nghiệp",
    description: "Tỷ lệ có việc làm 95% sau tốt nghiệp với mức lương cạnh tranh"
  }
]

const requirements = [
  {
    title: "Yêu Cầu Học Vấn",
    items: [
      "Tốt nghiệp THPT với điểm trung bình từ 7.0 (Bachelor)",
      "Bằng cử nhân chuyên ngành liên quan (Master)",
      "Bằng thạc sĩ với điểm cao (PhD)",
      "Chứng chỉ tiếng Đức B2-C1 hoặc IELTS 6.5-7.0"
    ]
  },
  {
    title: "Hồ Sơ Cần Thiết",
    items: [
      "Bằng tốt nghiệp và bảng điểm đã dịch thuật",
      "Chứng chỉ tiếng Đức/Anh",
      "CV và thư động lực",
      "Thư giới thiệu (nếu có)",
      "Portfolio (đối với một số ngành)"
    ]
  }
]

const timeline = [
  {
    month: "Tháng 1-3",
    tasks: ["Tư vấn chọn trường", "Chuẩn bị hồ sơ", "Học tiếng Đức"]
  },
  {
    month: "Tháng 4-6", 
    tasks: ["Nộp hồ sơ trường", "Thi tiếng Đức", "Chuẩn bị visa"]
  },
  {
    month: "Tháng 7-8",
    tasks: ["Nhận kết quả", "Làm visa", "Chuẩn bị bay"]
  },
  {
    month: "Tháng 9-10",
    tasks: ["Bay sang Đức", "Nhập học", "Ổn định cuộc sống"]
  }
]

export default function DaiHocPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20">
        <section className="section-padding bg-blue-600 text-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Du Học Đại Học - Sau Đại Học
            </h1>
            <p className="text-xl opacity-90">
              Theo học tại các trường đại học hàng đầu châu Âu
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Các Bậc Học Tại Đức
            </h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">Bachelor</h3>
                <p className="text-gray-600 mb-4">3-4 năm | 0-300€/học kỳ</p>
                <p>Chương trình đại học cho học sinh tốt nghiệp THPT</p>
              </div>

              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-green-800 mb-4">Master</h3>
                <p className="text-gray-600 mb-4">1.5-2 năm | 0-500€/học kỳ</p>
                <p>Chương trình sau đại học cho sinh viên đã có bằng cử nhân</p>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">PhD</h3>
                <p className="text-gray-600 mb-4">3-5 năm | Miễn phí + Lương</p>
                <p>Chương trình nghiên cứu cao nhất, có lương trong quá trình học</p>
              </div>
            </div>
          </div>
        </section>

        {/* Top Universities */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Trường Đại Học Hàng Đầu
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Các trường đại học top đầu thế giới tại Đức
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {topUniversities.map((university, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{university.name}</h3>
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {university.ranking}
                      </span>
                    </div>
                    <FaAward className="text-2xl text-yellow-500" />
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold text-gray-900 mb-2">Điểm mạnh:</h4>
                    <div className="flex flex-wrap gap-2">
                      {university.strengths.map((strength, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <FaUsers />
                    <span>{university.students}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Lợi Ích Du Học Đại Học Tại Đức
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
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

        {/* Requirements */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Điều Kiện & Hồ Sơ
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {requirements.map((req, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{req.title}</h3>
                  <div className="space-y-3">
                    {req.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Lộ Trình Chuẩn Bị
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Timeline chi tiết để chuẩn bị du học từ A-Z
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {timeline.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{phase.month}</h3>
                  
                  <div className="space-y-2">
                    {phase.tasks.map((task, idx) => (
                      <div key={idx} className="text-gray-600 text-sm">
                        • {task}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bắt Đầu Hành Trình Du Học Đại Học
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Được tư vấn miễn phí về chương trình và trường học phù hợp
            </p>
            <button className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
              Đăng Ký Tư Vấn Ngay
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
} 