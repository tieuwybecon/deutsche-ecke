'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaUsers, FaStar, FaGraduationCap, FaHeart, FaAward, FaBookOpen, FaTrophy, 
  FaRocket, FaGlobe, FaCertificate, FaPlay, FaChevronDown, FaChevronUp,
  FaHome, FaChevronRight, FaQuoteLeft, FaCalendarAlt, FaUserTie, FaChalkboardTeacher,
  FaEye, FaBullseye, FaHandshake, FaLightbulb, FaCheckCircle, FaPhone, FaEnvelope
} from 'react-icons/fa'
import Header from '../../components/sections/Header'
import Footer from '../../components/sections/Footer'

const stats = [
  { number: "2019", label: "Thành lập D.E.K", icon: FaTrophy, color: "text-yellow-600", bg: "from-yellow-50 to-yellow-100", darkBg: "dark:from-yellow-900 dark:to-yellow-800" },
  { number: "1,000+", label: "Học viên thành công", icon: FaUsers, color: "text-blue-600", bg: "from-blue-50 to-blue-100", darkBg: "dark:from-blue-900 dark:to-blue-800" },
  { number: "Cực chất", label: "Thầy cô kinh nghiệm", icon: FaGraduationCap, color: "text-green-600", bg: "from-green-50 to-green-100", darkBg: "dark:from-green-900 dark:to-green-800" },
  { number: "100%", label: "Kiến thức thực tế", icon: FaHeart, color: "text-red-600", bg: "from-red-50 to-red-100", darkBg: "dark:from-red-900 dark:to-red-800" },
  { number: "Du học", label: "Đại học & Nghề", icon: FaCertificate, color: "text-purple-600", bg: "from-purple-50 to-purple-100", darkBg: "dark:from-purple-900 dark:to-purple-800" },
  { number: "24/7", label: "Tư vấn tận tâm", icon: FaRocket, color: "text-orange-600", bg: "from-orange-50 to-orange-100", darkBg: "dark:from-orange-900 dark:to-orange-800" }
] as const

const visionMission = [
  {
    icon: FaEye,
    title: "Tầm nhìn",
    description: "Trở thành cái tên đi đầu trong ngành đào tạo tiếng Đức, nơi học viên được khơi dậy đam mê và tự tin hội nhập quốc tế. Nâng tầm tri thức cho thế hệ trẻ và đóng góp phát triển cộng đồng.",
    color: "text-blue-600",
    bg: "from-blue-50 to-blue-100",
    darkBg: "dark:from-blue-900/20 dark:to-blue-800/20"
  },
  {
    icon: FaBullseye,
    title: "Sứ mệnh",
    description: "Cung cấp chương trình đào tạo ngoại ngữ chất lượng cao, trang bị kỹ năng nghe-nói-đọc-viết vững chắc cùng kiến thức văn hóa cần thiết, mở ra cánh cửa thành công trong học tập và cuộc sống.",
    color: "text-green-600",
    bg: "from-green-50 to-green-100",
    darkBg: "dark:from-green-900/20 dark:to-green-800/20"
  },
  {
    icon: FaLightbulb,
    title: "Giá trị cốt lõi",
    description: "Chất lượng và hiệu quả đào tạo lên hàng đầu. Đội ngũ tận tâm, nhiệt huyết. Đổi mới phương pháp giảng dạy tiên tiến. Môi trường thân thiện, cởi mở, an toàn và tinh thần công bằng.",
    color: "text-purple-600",
    bg: "from-purple-50 to-purple-100",
    darkBg: "dark:from-purple-900/20 dark:to-purple-800/20"
  }
] as const

const timeline = [
  { 
    year: "2019", 
    event: "Thành lập Deutsche Ecke", 
    description: "Thành lập vào một ngày đẹp trời tháng 10/2019 bởi những người có kinh nghiệm sống và làm việc lâu năm tại Đức",
    highlight: "Khởi đầu"
  },
  { 
    year: "2020", 
    event: "Xây dựng đội ngũ", 
    description: "Tập hợp các thầy cô cực chất với kiến thức thực tế đời sống, không chỉ sách vở",
    highlight: "Tập trung chất lượng"
  },
  { 
    year: "2021", 
    event: "Phát triển khóa học đa dạng", 
    description: "Ra mắt các khóa học từ cấp tốc đến bồi dưỡng lâu dài, phù hợp mọi đối tượng học viên",
    highlight: "Đa dạng hóa"
  },
  { 
    year: "2022", 
    event: "Hoạt động ngoại khóa", 
    description: "Tổ chức các buổi sinh hoạt văn hóa, giao lưu giữa các nền văn hóa và Lễ hội Báo Đức hàng năm",
    highlight: "Văn hóa"
  },
  { 
    year: "2023", 
    event: "Tư vấn du học chuyên nghiệp", 
    description: "Hỗ trợ toàn bộ quy trình du học Đại học và Du học nghề tại Đức, từ A đến Z",
    highlight: "Mở rộng dịch vụ"
  },
  { 
    year: "2024", 
    event: "Mit Allen Sinnen Lernen", 
    description: "Hoàn thiện phương pháp học bằng tất cả giác quan, giúp học viên kiếm tiền mua đất, cất nhà, mua siêu xe! 🚗💰",
    highlight: "Hiện tại"
  }
] as const

const testimonials = [
  {
    name: "Nguyễn Minh Anh",
    role: "Du học sinh tại Munich - Khóa B2",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&auto=format",
    quote: "Thầy cô ở Deutsche Ecke thực sự 'cực chất'! Không chỉ dạy ngôn ngữ mà còn chia sẻ kinh nghiệm sống thực tế ở Đức. Nhờ đó mình tự tin hơn khi du học! 🇩🇪",
    achievement: "Thành công du học Munich"
  },
  {
    name: "Trần Văn Nam",
    role: "Kỹ sư đã định cư tại Đức - Khóa cấp tốc",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&auto=format",
    quote: "Học ở đây khác hẳn! Không học thuộc lòng mà học để dùng. Giờ mình đã mua được nhà ở Đức rồi! Cảm ơn Deutsche Ecke! 🏠💰",
    achievement: "Định cư thành công - Mua nhà ở Đức"
  },
  {
    name: "Lê Thị Hoa",
    role: "Du học nghề - Điều dưỡng tại Hamburg",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&auto=format",
    quote: "Môi trường học cực kỳ thân thiện và cảm hứng! Các hoạt động ngoại khóa giúp mình hiểu sâu về văn hóa Đức. Recommend 100%! ⭐⭐⭐⭐⭐",
    achievement: "Du học nghề thành công tại Hamburg"
  }
] as const

export default function AboutPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle scroll to top visibility
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const faqs = [
    {
      question: "Deutsche Ecke khác gì so với các trung tâm khác?",
      answer: "Deutsche Ecke sở hữu đội ngũ 100% giáo viên bản ngữ Đức, chương trình đào tạo chuẩn Goethe Institut, và phương pháp giảng dạy interactive với công nghệ VR/AR. Chúng tôi cam kết tỷ lệ đỗ chứng chỉ 95% và hỗ trợ học viên 24/7."
    },
    {
      question: "Tôi có thể học từ mức độ nào?",
      answer: "Deutsche Ecke đào tạo từ A1 (người mới bắt đầu) đến C2 (thành thạo). Chúng tôi có bài test đầu vào miễn phí để xác định trình độ hiện tại và tư vấn lộ trình học phù hợp nhất."
    },
    {
      question: "Chứng chỉ của Deutsche Ecke có được công nhận không?",
      answer: "Tất cả chứng chỉ từ Deutsche Ecke đều được Goethe Institut và các trường đại học, doanh nghiệp Đức công nhận. Học viên có thể sử dụng để du học, làm việc và định cư tại các nước nói tiếng Đức."
    },
    {
      question: "Deutsche Ecke có hỗ trợ tư vấn du học không?",
      answer: "Có, chúng tôi có đội ngũ tư vấn du học chuyên nghiệp, hỗ trợ toàn bộ quy trình từ chọn trường, làm hồ sơ, xin visa đến định hướng nghề nghiệp tại Đức. Dịch vụ này hoàn toàn miễn phí cho học viên."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative pt-16 pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-900/40 dark:to-purple-900/40" />
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-red-400/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <motion.div 
          className="container mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Enhanced Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm mb-8 text-gray-600 dark:text-gray-300" aria-label="Breadcrumb">
            <motion.a 
              href="/"
              className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              aria-label="Về trang chủ"
            >
              <FaHome className="mr-1" />
              Trang chủ
            </motion.a>
            <FaChevronRight className="text-xs" />
            <span className="text-blue-600 dark:text-blue-400 font-medium">Về chúng tôi</span>
          </nav>

          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white text-sm font-semibold mb-8 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <FaTrophy className="mr-2" />
              Trung tâm tiếng Đức #1 Việt Nam
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Mit Allen Sinnen Lernen
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Deutsche Ecke - Nơi học tiếng Đức thực tế để kiếm tiền mua đất, cất nhà, mua siêu xe! 🚗💰<br />
              Thành lập tháng 10/2019 bởi những người có kinh nghiệm sống và làm việc lâu năm tại Đức
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button 
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaPlay className="mr-3 text-lg" />
                Xem video giới thiệu
              </motion.button>
              <motion.button 
                className="px-10 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Tư vấn miễn phí
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/about/nhan-su"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-white hover:scale-105 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="relative z-10">
                <FaUserTie className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold mb-2">Đội ngũ nhân sự</h3>
                <p className="text-blue-100 mb-4">Tìm hiểu về đội ngũ giáo viên và nhân viên chuyên nghiệp của Deutsche Ecke</p>
                <div className="flex items-center text-sm font-medium">
                  Xem chi tiết <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            <motion.a
              href="/about/noi-quy"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-red-600 p-8 text-white hover:scale-105 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="relative z-10">
                <FaBookOpen className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold mb-2">Nội quy trung tâm</h3>
                <p className="text-red-100 mb-4">Quy định và chính sách của Deutsche Ecke dành cho học viên và giáo viên</p>
                <div className="flex items-center text-sm font-medium">
                  Xem chi tiết <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Câu chuyện của chúng tôi</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Từ khởi đầu tháng 10/2019 đến môi trường học tiếng Đức đúng nghĩa với những giá trị độc đáo
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format"
                  alt="Deutsche Ecke classroom"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">100%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Giáo viên bản ngữ</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">5000+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Học viên</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-semibold">
                <FaCalendarAlt className="mr-2" />
                Đối tác Goethe Institut
              </div>

              <h3 className="text-3xl font-bold text-gray-800 dark:text-white leading-tight">
                Hành trình xây dựng môi trường học tiếng Đức đúng nghĩa
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                Deutsche Ecke được thành lập vào một ngày đẹp trời tháng 10/2019 với nhận thức rằng nhu cầu học tiếng Đức để du học Đại học và Du học nghề đang gia tăng mạnh. Chúng tôi mong muốn mang đến một môi trường học tiếng Đức đúng nghĩa và thực tụ những giá trị riêng độc đáo.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">98%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tỷ lệ hài lòng</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tỷ lệ đỗ chứng chỉ</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                  Khám phá khóa học
                </button>
                <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                  Liên hệ tư vấn
                </button>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <motion.div
                  key={index}
                  className={`text-center p-6 rounded-2xl bg-gradient-to-br ${stat.bg} ${stat.darkBg} border border-white/50 dark:border-gray-700/50 backdrop-blur-sm hover:scale-105 transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IconComponent className={`${stat.color} text-3xl mx-auto mb-3`} />
                  <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Vision/Mission */}
      <section className="py-20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Tầm nhìn & Sứ mệnh</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Định hướng phát triển và cam kết của Deutsche Ecke
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {visionMission.map((vm, index) => {
              const IconComponent = vm.icon
              return (
                <motion.div
                  key={index}
                  className={`text-center p-8 rounded-2xl bg-gradient-to-br ${vm.bg} ${vm.darkBg} border border-white/50 dark:border-gray-700/50 backdrop-blur-sm hover:scale-105 transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <IconComponent className={`${vm.color} text-4xl mx-auto mb-4`} />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    {vm.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {vm.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Hành trình phát triển</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              5 năm xây dựng và phát triển Deutsche Ecke - Mit Allen Sinnen Lernen
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
              
              {timeline.map((event, index) => (
                <motion.div
                  key={index}
                  className="relative pl-20 pb-12"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  
                  <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 mr-4">{event.year}</span>
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                        {event.highlight}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{event.event}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Câu chuyện thành công</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Những học viên đã đạt được ước mơ du học và làm việc tại Đức
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 border-2 border-blue-200 dark:border-blue-700"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
                
                <FaQuoteLeft className="text-2xl text-blue-500 mb-4" />
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {testimonial.achievement}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Câu hỏi thường gặp</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Những thắc mắc phổ biến về Deutsche Ecke và chương trình học
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <span className="text-lg font-semibold text-gray-800 dark:text-white">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <FaChevronUp className="text-blue-600 dark:text-blue-400" />
                  ) : (
                    <FaChevronDown className="text-blue-600 dark:text-blue-400" />
                  )}
                </button>
                <motion.div
                  initial={false}
                  animate={{ 
                    height: expandedFAQ === index ? 'auto' : 0,
                    opacity: expandedFAQ === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bắt đầu hành trình chinh phục tiếng Đức
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Đăng ký ngay để nhận tư vấn miễn phí và ưu đãi đặc biệt
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <motion.a
                href="/contact"
                className="px-10 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaPhone className="mr-3" />
                Gọi ngay: 077-024-240
              </motion.a>
              <motion.a
                href="/contact"
                className="px-10 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaEnvelope className="mr-3" />
                Đăng ký tư vấn
              </motion.a>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <FaCheckCircle className="text-3xl mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Tư vấn miễn phí</h3>
                <p className="text-sm opacity-80">Không mất phí tư vấn lộ trình học</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <FaGraduationCap className="text-3xl mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Học thử miễn phí</h3>
                <p className="text-sm opacity-80">Trải nghiệm 1 buổi học không mất phí</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <FaTrophy className="text-3xl mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Cam kết chất lượng</h3>
                <p className="text-sm opacity-80">Hoàn tiền nếu không hài lòng</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Cuộn lên đầu trang"
        >
          <FaChevronUp className="text-lg" />
        </motion.button>
      )}
    </div>
  )
} 