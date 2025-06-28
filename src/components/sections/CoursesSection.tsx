'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Course {
  level: string
  title: string
  price: string
  originalPrice: string
  duration: string
  lessons: string
  description: string
  features: readonly string[]
  color: string
  popular: boolean
}

interface CoursesSectionProps {
  courses: readonly Course[]
}

export default function CoursesSection({ courses }: CoursesSectionProps) {
  return (
    <section id="courses" className="section-padding bg-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Các Khóa Học Tiếng Đức
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Chọn khóa học phù hợp với trình độ và mục tiêu của bạn
          </p>
        </motion.div>

        {/* Swiper Slide Courses */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, pauseOnMouseEnter: true, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
          className="pb-12"
        >
          {courses.map((course, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  course.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''
                }`}
              >
                {course.popular && (
                  <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Phổ biến nhất
                  </div>
                )}
                <div className="p-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${course.color}-100 flex items-center justify-center`}>
                    <span className={`text-2xl font-bold text-${course.color}-600`}>
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                    {course.title}
                  </h3>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-gray-900">
                      {parseInt(course.price).toLocaleString()}đ
                    </div>
                    <div className="text-lg text-gray-500 line-through">
                      {parseInt(course.originalPrice).toLocaleString()}đ
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Thời gian:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bài học:</span>
                      <span className="font-medium">{course.lessons}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">
                    {course.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full btn-primary ${
                    course.popular ? 'bg-primary-600 hover:bg-primary-700' : 'bg-gray-800 hover:bg-gray-900'
                  } text-white`}>
                    Đăng Ký Ngay
                  </button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
} 