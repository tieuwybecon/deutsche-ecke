'use client'

import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react'
import { motion, AnimatePresence, useInView, useAnimation, useSpring } from 'framer-motion'
import { 
  FaPlay, FaGraduationCap, FaUsers, FaStar, FaArrowRight, FaBookOpen, FaHeadphones, 
  FaMicrophone, FaPenFancy, FaTrophy, FaQuoteLeft, FaDownload, FaGlobe, FaUser, FaClock, FaHeart, 
  FaLightbulb, FaRocket, FaChartLine, FaAward, FaCertificate, FaLanguage, FaVideo, FaComments, 
  FaMobile, FaDesktop, FaGamepad, FaBrain, FaPhone, FaCheck, FaWrench, FaShieldVirus, FaEnvelope, 
  FaMapMarkerAlt, FaWifi, FaTabletAlt, FaEye, FaAccessibleIcon
} from 'react-icons/fa'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

// Import components with relative paths
import Header from '../components/sections/Header'
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import StatsSection from '../components/sections/StatsSection'
import BenefitsSection from '../components/sections/BenefitsSection'
import AboutSection from '../components/sections/AboutSection'
import CoursesSection from '../components/sections/CoursesSection'
import LearningPathSection from '../components/sections/LearningPathSection'
import TrustSection from '../components/sections/TrustSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import FAQSection from '../components/sections/FAQSection'
import CTASection from '../components/sections/CTASection'
import ContactSection from '../components/sections/ContactSection'
import Footer from '../components/sections/Footer'
import FloatingButtons from '../components/ui/FloatingButtons'
import ScrollToTop from '../components/ui/ScrollToTop'
import { ThemeProvider } from '../components/ui/ThemeProvider'

// Performance optimization: Memoize static data
const heroSlides = [
  {
    title: "Mit Allen Sinnen Lernen - Học Bằng Tất Cả Giác Quan",
    subtitle: "Trung tâm tiếng Đức Deutsche Ecke - Nơi bạn học tiếng Đức thực tế, chuẩn Đức, để kiếm tiền mua đất, cất nhà, mua siêu xe! 🚗💰",
    bg: "gradient-blue",
    features: ["🎓 Thầy cô cực chất", "🇩🇪 Kiến thức thực tế đời sống", "💪 Học để thành công"],
    image: "/images/Slides/1.png",
    badge: "Thực tế #1",
    cta: {
      primary: "Bắt Đầu Chinh Phục",
      secondary: "Tư Vấn Miễn Phí"
    }
  },
  {
    title: "Đào Tạo Toàn Diện 4 Kỹ Năng",
    subtitle: "Nghe - Nói - Đọc - Viết cùng kiến thức văn hóa Đức thực tế. Không học thuộc lòng, chỉ học để ứng dụng!",
    bg: "gradient-green", 
    features: ["👂 Nghe chuẩn", "🗣️ Nói tự tin", "📖 Đọc hiểu sâu", "✍️ Viết chính xác"],
    image: "/images/Slides/2.png",
    badge: "Toàn diện",
    cta: {
      primary: "Trải Nghiệm Ngay",
      secondary: "Xem Phương Pháp"
    }
  },
  {
    title: "Du Học Đức - Mở Cửa Tương Lai",
    subtitle: "Tư vấn du học Đại học và Du học nghề tại Đức. Từ A đến Z, chúng tôi đồng hành cùng bạn chinh phục ước mơ!",
    bg: "gradient-purple",
    features: ["🎓 Du học Đại học", "🔧 Du học nghề", "💼 Định cư dài hạn", "🌟 Tương lai rộng mở"],
    image: "/images/Slides/3.png",
    badge: "Uy tín 2019",
    cta: {
      primary: "Tư Vấn Du Học",
      secondary: "Xem Cơ Hội"
    }
  }
] as const

// Enhanced Features data with hover animations
const features = [
  {
    icon: FaGraduationCap,
    title: "Thầy Cô Cực Chất",
    description: "Đội ngũ giáo viên có kinh nghiệm sống, học tập và làm việc lâu năm tại Đức. Kiến thức thực tế đời sống, không chỉ sách vở!",
    color: "blue",
    highlight: "Thực tế",
    hoverBg: "from-blue-50 to-blue-100",
    borderColor: "border-blue-200 hover:border-blue-400"
  },
  {
    icon: FaBrain,
    title: "Học Thông Minh", 
    description: "Mit Allen Sinnen Lernen - Học bằng tất cả giác quan. Phát triển tư duy năng động, ứng dụng ngay vào thực tế.",
    color: "green",
    highlight: "Hiệu quả",
    hoverBg: "from-green-50 to-green-100",
    borderColor: "border-green-200 hover:border-green-400"
  },
  {
    icon: FaHeart,
    title: "Môi Trường Thân Thiện",
    description: "Không gian học tập truyền cảm hứng, nơi bạn tự tin thể hiện bản thân và chinh phục mọi mục tiêu.",
    color: "purple",
    highlight: "Cảm hứng",
    hoverBg: "from-purple-50 to-purple-100",
    borderColor: "border-purple-200 hover:border-purple-400"
  },
  {
    icon: FaRocket,
    title: "Đổi Mới Liên Tục",
    description: "Ứng dụng phương pháp giảng dạy tiên tiến, công nghệ giáo dục hiện đại, tạo trải nghiệm học tập thú vị.",
    color: "red",
    highlight: "Tiên tiến",
    hoverBg: "from-red-50 to-red-100",
    borderColor: "border-red-200 hover:border-red-400"
  }
] as const

// Enhanced Stats data with animated counters
const stats = [
  { 
    number: "2019", 
    label: "Thành lập", 
    icon: FaClock, 
    description: "Kinh nghiệm 5+ năm",
    color: "blue",
    suffix: ""
  },
  { 
    number: "1000", 
    label: "Học viên", 
    icon: FaUsers, 
    description: "Thành công du học",
    color: "green",
    suffix: "+"
  },
  { 
    number: "100", 
    label: "Thực tế", 
    icon: FaStar, 
    description: "Kiến thức đời sống",
    color: "purple",
    suffix: "%"
  },
  { 
    number: "24", 
    label: "Hỗ trợ", 
    icon: FaHeadphones, 
    description: "Tư vấn tận tâm",
    color: "red",
    suffix: "/7"
  }
] as const

// Enhanced Courses data with modern styling
const courses = [
  {
    level: "A1",
    title: "Tiếng Đức cơ bản",
    price: "11000000",
    originalPrice: "13000000",
    duration: "10 tuần/200 tiết",
    lessons: "Miễn Phí Tài Liệu A1",
    description: "Dành cho những bạn bắt đầu học tiếng Đức. Phù hợp lịch trình bận rộn hàng ngày.",
    features: ["Nắm vững kiến thức cơ bản", "Kỹ năng giao tiếp cơ bản", "Tiếp cận với tiếng Đức", "Nền tảng vững chắc"],
    color: "blue",
    popular: false,
    gradient: "from-blue-500 to-blue-600",
    hoverGradient: "from-blue-600 to-blue-700"
  },
  {
    level: "A2", 
    title: "Tiếng Đức trung cấp",
    price: "11000000",
    originalPrice: "13000000",
    duration: "10 tuần/200 tiết",
    lessons: "Miễn Phí Tài Liệu A2",
    description: "Củng cố kiến thức toàn diện, phù hợp mọi trình độ từ cơ bản đến nâng cao.",
    features: ["4 kỹ năng toàn diện", "Kiến thức văn hóa", "Thực hành thực tế", "Lộ trình rõ ràng"],
    color: "green",
    popular: false,
    gradient: "from-green-500 to-green-600",
    hoverGradient: "from-green-600 to-green-700"
  },
  {
    level: "B1",
    title: "Tiếng Đức nâng cao", 
    price: "14000000",
    originalPrice: "16000000",
    duration: "11 tuần/220 tiết",
    lessons: "Miễn Phí Tài Liệu B1",
    description: "Chương trình đào tạo theo tiêu chuẩn kỳ thi quốc tế Goethe và ÖSD.",
    features: ["Luyện thi chuyên sâu", "Đề thi thực tế", "Kỹ thuật làm bài", "Cam kết kết quả"],
    color: "purple",
    popular: true,
    gradient: "from-purple-500 to-purple-600",
    hoverGradient: "from-purple-600 to-purple-700"
  },
  {
    level: "B2",
    title: "Tiếng Đức chuyên sâu",
    price: "16000000",
    originalPrice: "18000000", 
    duration: "12 tuần / 240 tiết",
    lessons: "Miễn Phí Tài Liệu B2",
    description: "Chương trình học chuyên sâu, phù hợp cho những ai đã có nền tảng tiếng Đức.",
    features: ["Kiến thức chuyên sâu", "Nâng cao kỹ năng giao tiếp", "Thảo luận các chủ đề phức tạp", "Kỹ năng làm bài"],
    color: "orange",
    popular: false,
    gradient: "from-orange-500 to-orange-600",
    hoverGradient: "from-orange-600 to-orange-700"
  },
  {
    level: "Luyện thi",
    title: "Luyện thi Goethe",
    price: "4500000",
    originalPrice: "5000000", 
    duration: "80 tiết / 1 tháng",
    lessons: "Tài Liệu Luyện thi Goethe",
    description: "Chương trình luyện thi chuyên sâu dành riêng cho kỳ thi quốc tế Goethe và ÖSD.",
    features: ["Luyện thi chuyên sâu", "Đề thi thực tế", "Kỹ thuật làm bài", "Cam kết kết quả"],
    color: "indigo",
    popular: false,
    gradient: "from-indigo-500 to-indigo-600",
    hoverGradient: "from-indigo-600 to-indigo-700"
  }
] as const

// Enhanced Testimonials data
const testimonials = [
  {
    name: "Nguyễn Minh Anh",
    role: "Du học sinh tại Munich - Khóa B2",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b494?w=60&h=60&fit=crop&crop=face",
    content: "Thầy cô ở Deutsche Ecke thực sự 'cực chất'! Không chỉ dạy ngôn ngữ mà còn chia sẻ kinh nghiệm sống thực tế ở Đức. Nhờ đó mình tự tin hơn khi du học! 🇩🇪",
    rating: 5,
    verified: true,
    achievement: "Đã định cư tại Đức",
    gradient: "from-blue-500 to-purple-600"
  },
  {
    name: "Trần Văn Nam", 
    role: "Kỹ sư đã định cư tại Đức - Khóa cấp tốc",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    content: "Học ở đây khác hẳn! Không học thuộc lòng mà học để dùng. Giờ mình đã mua được nhà ở Đức rồi! Cảm ơn Deutsche Ecke! 🏠💰",
    rating: 5,
    verified: true,
    achievement: "Mua nhà tại Đức",
    gradient: "from-green-500 to-blue-600"
  },
  {
    name: "Lê Thị Hoa",
    role: "Du học nghề - Điều dưỡng tại Hamburg", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    content: "Môi trường học cực kỳ thân thiện và cảm hứng! Các hoạt động ngoại khóa giúp mình hiểu sâu về văn hóa Đức. Recommend 100%! ⭐⭐⭐⭐⭐",
    rating: 5,
    verified: true,
    achievement: "Thành công du học nghề",
    gradient: "from-purple-500 to-pink-600"
  }
] as const

// Loading Spinner Component
const LoadingSpinner = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8', 
    large: 'w-12 h-12'
  }

  return (
    <div className="flex justify-center items-center">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-blue-200 border-t-blue-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  )
}

// Error Boundary Component
const ErrorFallback = ({ error, resetError }: { error: Error, resetError: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-2xl border border-red-200">
      <div className="text-red-600 text-4xl mb-4">😟</div>
      <h2 className="text-xl font-bold text-red-800 mb-2">Có lỗi xảy ra</h2>
      <p className="text-red-600 text-center mb-4">
        Xin lỗi, đã có lỗi kỹ thuật. Vui lòng thử lại.
      </p>
      <button 
        onClick={resetError}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Thử lại
      </button>
    </div>
  )
}

// Animated Counter Component with improved performance
const AnimatedCounter = ({ end, suffix = "", duration = 2000 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    if (!isVisible) return
    
    let startTime: number
    let animationFrame: number
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Use easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, isVisible])

  // Use Intersection Observer for better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById(`counter-${end}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [end])
  
  return <span id={`counter-${end}`}>{count}{suffix}</span>
}

// Enhanced Feature Card Component with improved responsive design and accessibility
const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const Icon = feature.icon

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative overflow-hidden rounded-2xl p-4 sm:p-6 lg:p-8 border-2 transition-all duration-500 
        bg-gradient-to-br ${feature.hoverBg} ${feature.borderColor} 
        hover:shadow-2xl focus-within:shadow-2xl focus-within:ring-2 focus-within:ring-${feature.color}-400
        cursor-pointer touch-manipulation min-h-[300px] sm:min-h-[320px]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
      role="article"
      aria-labelledby={`feature-title-${index}`}
    >
      {/* Background Pattern - Optimized for performance */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, var(--tw-${feature.color}-500) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }} 
        />
      </div>

      {/* Highlight Badge - Responsive sizing */}
      <motion.div 
        className={`absolute top-3 right-3 sm:top-4 sm:right-4 px-2 py-1 sm:px-3 sm:py-1 
          bg-${feature.color}-500 text-white text-xs font-bold rounded-full
          shadow-lg backdrop-blur-sm`}
        animate={{ 
          scale: isHovered || isFocused ? 1.1 : 1,
          rotate: isHovered ? [0, -5, 5, 0] : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {feature.highlight}
      </motion.div>

      {/* Icon - Responsive sizing and improved animation */}
      <motion.div 
        className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 
          mb-4 sm:mb-6 rounded-2xl bg-${feature.color}-100 text-${feature.color}-600
          shadow-lg relative z-10`}
        animate={{ 
          scale: isHovered || isFocused ? 1.1 : 1,
          rotate: isHovered ? [0, 180, 360] : 0,
        }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 200
        }}
      >
        <Icon size={window?.innerWidth < 640 ? 20 : window?.innerWidth < 1024 ? 24 : 32} />
      </motion.div>

      {/* Content - Improved typography hierarchy */}
      <div className="relative z-10">
        <h3 
          id={`feature-title-${index}`}
          className={`text-lg sm:text-xl lg:text-xl font-bold mb-3 sm:mb-4 text-gray-900 
            group-hover:text-${feature.color}-600 transition-colors duration-300
            leading-tight`}
        >
          {feature.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-4">
          {feature.description}
        </p>
      </div>

      {/* Interactive Elements */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered || isFocused ? 0.1 : 0 }}
      />

      {/* Hover Effect Lines - Enhanced design */}
      <motion.div 
        className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-${feature.color}-400 to-${feature.color}-600
          shadow-lg`}
        initial={{ width: "20%" }}
        animate={{ width: isHovered || isFocused ? "100%" : "20%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      {/* Focus indicator for accessibility */}
      <motion.div 
        className={`absolute inset-0 rounded-2xl border-2 border-${feature.color}-400 opacity-0 pointer-events-none`}
        animate={{ opacity: isFocused ? 0.6 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  )
}

// Enhanced Stats Card Component
const StatsCard = ({ stat, index }: { stat: any, index: number }) => {
  const [isVisible, setIsVisible] = useState(false)
  const Icon = stat.icon

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 200)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
      className={`group relative overflow-hidden rounded-2xl p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border-t-4 border-${stat.color}-500`}
    >
      {/* Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Icon */}
      <motion.div 
        className={`inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-${stat.color}-100 text-${stat.color}-600 relative z-10`}
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon size={32} />
      </motion.div>

      {/* Number */}
      <div className={`text-4xl font-bold mb-2 text-${stat.color}-600 relative z-10`}>
        {isVisible ? <AnimatedCounter end={parseInt(stat.number)} suffix={stat.suffix} /> : '0'}
      </div>

      {/* Label */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2 relative z-10">
        {stat.label}
      </h3>

      {/* Description */}
      <p className="text-gray-600 relative z-10">
        {stat.description}
      </p>
    </motion.div>
  )
}

// Enhanced Course Card Component with improved responsive design and UX
const CourseCard = ({ course, index }: { course: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      rotateX: 15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.7,
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.02,
      y: -8,
      rotateX: 5,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-30px" }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl 
        transition-all duration-500 focus-within:shadow-2xl focus-within:ring-2 focus-within:ring-blue-400
        cursor-pointer touch-manipulation min-h-[500px] sm:min-h-[520px] perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={0}
      role="article"
      aria-labelledby={`course-title-${index}`}
    >
      {/* Popular Badge */}
      {course.popular && (
        <motion.div 
          className="absolute top-4 right-4 z-20 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          🔥 Phổ biến
        </motion.div>
      )}

      {/* Header */}
      <div className={`p-8 bg-gradient-to-r ${isHovered ? course.hoverGradient : course.gradient} text-white relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>

        <motion.div 
          className="relative z-10"
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`inline-block px-4 py-2 bg-white bg-opacity-20 text-white text-sm font-bold rounded-full mb-4`}>
            {course.level}
          </div>
          <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
          <p className="text-lg opacity-90">{course.duration}</p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-8">
        <p className="text-gray-600 mb-6 leading-relaxed">
          {course.description}
        </p>

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {course.features.map((feature: string, idx: number) => (
            <motion.li 
              key={idx}
              className="flex items-center text-gray-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.3 }}
            >
              <div className={`w-2 h-2 bg-${course.color}-500 rounded-full mr-3 flex-shrink-0`} />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* Price */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-gray-900">
                {parseInt(course.price).toLocaleString('vi-VN')}đ
              </span>
              <span className="text-lg text-gray-500 line-through">
                {parseInt(course.originalPrice).toLocaleString('vi-VN')}đ
              </span>
            </div>
            <p className="text-sm text-green-600 font-medium">{course.lessons}</p>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button 
          className={`w-full bg-gradient-to-r ${course.gradient} hover:${course.hoverGradient} text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Đăng Ký Ngay
        </motion.button>
      </div>
    </motion.div>
  )
}

// Enhanced Testimonial Card Component
const TestimonialCard = ({ testimonial, index }: { testimonial: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

      {/* Quote Icon */}
      <motion.div 
        className="absolute top-4 right-4 text-6xl text-gray-200 opacity-50"
        animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 15 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <FaQuoteLeft />
      </motion.div>

      {/* Avatar and Info */}
      <div className="flex items-center mb-6 relative z-10">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover shadow-lg"
          />
          {testimonial.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <FaCheck className="text-white text-xs" />
            </div>
          )}
        </motion.div>
        
        <div className="ml-4">
          <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
          <p className="text-gray-600 text-sm">{testimonial.role}</p>
          <div className="flex items-center mt-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i, duration: 0.2 }}
              >
                <FaStar className="text-yellow-400 text-sm" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <blockquote className="text-gray-700 leading-relaxed mb-4 relative z-10">
        "{testimonial.content}"
      </blockquote>

      {/* Achievement Badge */}
      <motion.div 
        className={`inline-block px-4 py-2 bg-gradient-to-r ${testimonial.gradient} text-white text-xs font-bold rounded-full`}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.2 }}
      >
        🏆 {testimonial.achievement}
      </motion.div>
    </motion.div>
  )
}

// Performance optimization hooks
const useDeviceDetection = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      
      setIsTouch(isTouchDevice)
      
      if (width < 768) setDeviceType('mobile')
      else if (width < 1024) setDeviceType('tablet')
      else setDeviceType('desktop')
    }

    detectDevice()
    window.addEventListener('resize', detectDevice)
    return () => window.removeEventListener('resize', detectDevice)
  }, [])

  return { deviceType, isTouch }
}

const useOptimizedMouseTracking = (enabled: boolean = true) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return

    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [enabled])

  return mousePosition
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const { deviceType, isTouch } = useDeviceDetection()
  const mousePosition = useOptimizedMouseTracking(!isTouch)

  // Keen-slider setup với responsive optimization
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: 'snap',
    slides: {
      perView: deviceType === 'mobile' ? 1.1 : deviceType === 'tablet' ? 1.8 : 1.2,
      spacing: deviceType === 'mobile' ? 12 : deviceType === 'tablet' ? 16 : 20,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: { perView: 2, spacing: 20 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 24 },
      },
      '(min-width: 1280px)': {
        slides: { perView: 3.2, spacing: 28 },
      },
    },
  })

  // Performance: Optimize page loading
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Preload critical images
        const imagePromises = [
          '/images/Slides/1.png',
          '/images/Slides/2.png', 
          '/images/Slides/3.png'
        ].map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image()
            img.onload = resolve
            img.onerror = reject
            img.src = src
          })
        })

        await Promise.allSettled(imagePromises)
        setIsLoaded(true)
      } catch (err) {
        setError(err as Error)
        setIsLoaded(true)
      }
    }

    initializeApp()
  }, [])

  // Error recovery
  const resetError = useCallback(() => {
    setError(null)
  }, [])

  // Show loading screen while initializing
  if (!isLoaded) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="large" />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Đang tải Deutsche Ecke...
              </h2>
              <p className="text-gray-500">
                Chuẩn bị trải nghiệm học tiếng Đức tuyệt vời
              </p>
            </motion.div>
          </div>
        </div>
      </ThemeProvider>
    )
  }

  // Show error screen if there's an error
  if (error) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <ErrorFallback error={error} resetError={resetError} />
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      {/* Mouse Follower - Only show on desktop for performance */}
      {!isTouch && deviceType === 'desktop' && (
        <motion.div 
          className="fixed top-0 left-0 w-6 h-6 bg-blue-500 rounded-full mix-blend-difference pointer-events-none z-50 opacity-50"
          animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      )}

      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Chuyển đến nội dung chính
      </a>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main id="main-content" className="relative" role="main">
        {/* Enhanced Hero Section */}
        <HeroSection slides={heroSlides} />

        {/* Enhanced Features Section */}
        <section className="py-12 sm:py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
          {/* Background Elements - Optimized for mobile */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-30 sm:opacity-50" />
            {deviceType !== 'mobile' && (
              <>
                <div className="absolute top-20 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-blue-200 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-20 right-10 w-32 h-32 sm:w-40 sm:h-40 bg-purple-200 rounded-full blur-3xl opacity-20" />
              </>
            )}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Tại Sao Chọn{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Deutsche Ecke
                </span>?
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Chúng tôi không chỉ dạy tiếng Đức, mà còn truyền cảm hứng và định hướng tương lai cho bạn
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Stats Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50" />
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Con Số Biết Nói
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Thành tích và sự tin tưởng từ cộng đồng học viên Deutsche Ecke
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <StatsCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Regular sections with enhanced styling */}
        <BenefitsSection />
        <AboutSection />

        {/* Enhanced Courses Section */}
        <section className="py-12 sm:py-16 lg:py-24 bg-gray-50 relative overflow-hidden" aria-labelledby="courses-heading">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-purple-50 via-transparent to-blue-50 opacity-30 sm:opacity-50" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h2 id="courses-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Khóa Học Tiếng Đức
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Từ cơ bản đến nâng cao, chúng tôi có lộ trình phù hợp cho mọi đối tượng
              </p>
            </motion.div>

            {/* Enhanced Keen-slider với improved accessibility */}
            <div className="relative" role="region" aria-label="Khóa học tiếng Đức">
              <div ref={sliderRef} className="keen-slider">
                {courses.map((course, index) => (
                  <div key={index} className="keen-slider__slide px-2 sm:px-3 lg:px-4">
                    <CourseCard course={course} index={index} />
                  </div>
                ))}
              </div>
              
              {/* Navigation buttons - Responsive và accessible */}
              {deviceType !== 'mobile' && (
                <>
                  <motion.button
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white 
                      backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl p-3 transition-all duration-300
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => instanceRef.current?.prev()}
                    aria-label="Xem khóa học trước"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15 19l-7-7 7-7"/>
                    </svg>
                  </motion.button>
                  
                  <motion.button
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white 
                      backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl p-3 transition-all duration-300
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => instanceRef.current?.next()}
                    aria-label="Xem khóa học tiếp theo"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7"/>
                    </svg>
                  </motion.button>
                </>
              )}

              {/* Mobile swipe indicator */}
              {deviceType === 'mobile' && (
                <motion.div 
                  className="flex justify-center mt-4 text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <span className="flex items-center gap-2">
                    <FaMobile /> Vuốt để xem thêm khóa học
                  </span>
                </motion.div>
              )}
            </div>

            {/* CTA Button */}
            <motion.div 
              className="text-center mt-12 sm:mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 
                  hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl 
                  shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPhone />
                Tư Vấn Khóa Học Phù Hợp
                <FaArrowRight />
              </motion.button>
            </motion.div>
          </div>
        </section>

        <LearningPathSection />
        <TrustSection />

        {/* Enhanced Testimonials Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-50" />
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Câu Chuyện Thành Công
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Những chia sẻ chân thật từ học viên đã thành công với Deutsche Ecke
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>

        <FAQSection />
        <CTASection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <FloatingButtons />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </ThemeProvider>
  )
} 