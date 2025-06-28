'use client'

import React, { useState } from 'react'
import { FaEnvelope, FaUser, FaPhone, FaPaperPlane, FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaGraduationCap, FaCalendarAlt, FaClock, FaUsers, FaComments } from 'react-icons/fa'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'

const defaultCompanyEmail = 'contact@dek.edu.vn'

// Danh sách khóa học
const courses = [
  { id: 'a1', name: 'Khóa A1 - Người mới bắt đầu', duration: '3 tháng', price: '2.500.000đ' },
  { id: 'a2', name: 'Khóa A2 - Sơ cấp', duration: '3 tháng', price: '2.700.000đ' },
  { id: 'b1', name: 'Khóa B1 - Trung cấp', duration: '4 tháng', price: '3.200.000đ' },
  { id: 'b2', name: 'Khóa B2 - Trung cấp cao', duration: '4 tháng', price: '3.500.000đ' },
  { id: 'intensive', name: 'Khóa cấp tốc - Luyện thi', duration: '2 tháng', price: '4.000.000đ' },
  { id: 'conversation', name: 'Khóa giao tiếp - Thực hành', duration: '2 tháng', price: '2.200.000đ' },
  { id: 'consultation', name: 'Tư vấn du học Đức', duration: 'Linh hoạt', price: 'Liên hệ' }
]

// Thời gian học
const scheduleOptions = [
  { id: 'morning', name: 'Buổi sáng (8:00 - 11:00)', icon: '🌅' },
  { id: 'afternoon', name: 'Buổi chiều (14:00 - 17:00)', icon: '☀️' },
  { id: 'evening', name: 'Buổi tối (18:30 - 21:30)', icon: '🌙' },
  { id: 'weekend', name: 'Cuối tuần (9:00 - 12:00)', icon: '🎯' }
]

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    schedule: '',
    experience: '',
    motivation: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    // Validate form
    if (!form.name || !form.email || !form.phone || !form.course) {
      setStatus('error')
      setError('Vui lòng điền đầy đủ thông tin bắt buộc!')
      return
    }

    try {
      // Gửi dữ liệu đến API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Có lỗi xảy ra khi gửi thông tin')
      }

      // Thành công
      setStatus('success')
      setForm({
        name: '',
        email: '',
        phone: '',
        course: '',
        schedule: '',
        experience: '',
        motivation: '',
        message: ''
      })

    } catch (err) {
      setStatus('error')
      setError('Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaGraduationCap className="text-6xl mx-auto mb-6 animate-bounce" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Đăng Ký Khóa Học Tiếng Đức</h1>
          <p className="text-lg sm:text-xl opacity-90 mb-6">
            Bắt đầu hành trình chinh phục tiếng Đức cùng Deutsche Ecke! 
            <br />Điền thông tin để được tư vấn miễn phí và đăng ký khóa học phù hợp.
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <a 
              href={`mailto:${defaultCompanyEmail}`} 
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2"
            >
              <FaEnvelope /> {defaultCompanyEmail}
            </a>
            <a 
              href="tel:0777024240" 
              className="bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-all shadow-lg flex items-center gap-2"
            >
              <FaPhone /> 0777.024.240
            </a>
          </div>
          
          <div className="flex justify-center">
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
              <FaMapMarkerAlt /> 123 Đường Đức, Quận 1, TP.HCM
            </span>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                📋 Form Đăng Ký Khóa Học
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Vui lòng điền đầy đủ thông tin để chúng tôi có thể tư vấn và hỗ trợ bạn tốt nhất!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Thông tin cá nhân */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaUser className="mr-2 text-blue-600" />
                  Thông Tin Cá Nhân
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Nhập họ tên đầy đủ"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="0xxx xxx xxx"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Thông tin khóa học */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaGraduationCap className="mr-2 text-green-600" />
                  Thông Tin Khóa Học
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="course" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                      Khóa học quan tâm <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="course"
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                      required
                    >
                      <option value="">Chọn khóa học</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>
                          {course.name} - {course.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="schedule" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                      Thời gian học mong muốn
                    </label>
                    <select
                      id="schedule"
                      name="schedule"
                      value={form.schedule}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    >
                      <option value="">Chọn thời gian học</option>
                      {scheduleOptions.map(option => (
                        <option key={option.id} value={option.id}>
                          {option.icon} {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Thông tin bổ sung */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FaComments className="mr-2 text-purple-600" />
                  Thông Tin Bổ Sung
                </h3>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="experience" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                      Kinh nghiệm học tiếng Đức
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={form.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    >
                      <option value="">Chọn trình độ hiện tại</option>
                      <option value="beginner">Mới bắt đầu - chưa học bao giờ</option>
                      <option value="basic">Đã học cơ bản - biết một ít</option>
                      <option value="intermediate">Trung cấp - đã có nền tảng</option>
                      <option value="advanced">Nâng cao - muốn hoàn thiện</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="motivation" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                      Mục tiêu học tiếng Đức
                    </label>
                    <select
                      id="motivation"
                      name="motivation"
                      value={form.motivation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    >
                      <option value="">Chọn mục tiêu của bạn</option>
                      <option value="study">Du học Đức</option>
                      <option value="work">Làm việc tại Đức</option>
                      <option value="travel">Du lịch và khám phá</option>
                      <option value="hobby">Sở thích cá nhân</option>
                      <option value="certificate">Lấy chứng chỉ quốc tế</option>
                      <option value="other">Mục tiêu khác</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                      Ghi chú thêm
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="Có câu hỏi hoặc yêu cầu đặc biệt nào không? Chia sẻ với chúng tôi..."
                    />
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              {status === 'error' && (
                <div className="flex items-center gap-3 text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-6 py-4">
                  <FaTimesCircle className="text-xl" />
                  <span className="font-medium">{error}</span>
                </div>
              )}

              {status === 'success' && (
                <div className="flex items-center gap-3 text-green-600 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-6 py-4">
                  <FaCheckCircle className="text-xl" />
                  <div>
                    <p className="font-medium">Đăng ký thành công! 🎉</p>
                    <p className="text-sm mt-1">Chúng tôi sẽ liên hệ lại với bạn trong vòng 24h. Cảm ơn bạn đã tin tưởng Deutsche Ecke!</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-700 hover:via-purple-700 hover:to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                  disabled={status === 'sending'}
                >
                  <FaPaperPlane className={`${status === 'sending' ? 'animate-pulse' : ''}`} />
                  {status === 'sending' ? (
                    <>
                      <span className="animate-pulse">Đang gửi...</span>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                    </>
                  ) : (
                    'Đăng Ký Ngay! 🚀'
                  )}
                </button>
              </div>

              {/* Additional Info */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  💡 Lưu ý quan trọng:
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Thông tin của bạn sẽ được bảo mật tuyệt đối</li>
                  <li>• Chúng tôi sẽ liên hệ tư vấn miễn phí trong vòng 24h</li>
                  <li>• Bạn có thể đổi khóa học hoặc thời gian học sau khi tư vấn</li>
                  <li>• Hotline hỗ trợ 24/7: <strong>0777.024.240</strong></li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              📚 Các Khóa Học Tại Deutsche Ecke
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Tìm hiểu thêm về các khóa học phù hợp với mục tiêu của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 6).map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <FaGraduationCap className="text-2xl text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {course.name.split(' - ')[0]}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {course.name.split(' - ')[1] || 'Khóa học chuyên biệt'}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center text-green-600">
                    <FaClock className="mr-1" />
                    {course.duration}
                  </span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {course.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/courses"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaGraduationCap className="mr-2" />
              Xem Tất Cả Khóa Học
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ContactPage 