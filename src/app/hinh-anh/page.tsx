'use client'

import React, { useState, useEffect } from 'react'
import { FaCamera, FaEye, FaTimes, FaChevronLeft, FaChevronRight, FaHome, FaChevronDown, FaGraduationCap, FaUsers, FaBuilding, FaCalendarAlt, FaCertificate, FaGlobe, FaHeart, FaDownload, FaShare } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'

const HinhAnhPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set())

  useEffect(() => {
    // Load liked images from localStorage
    const saved = localStorage.getItem('likedImages')
    if (saved) {
      setLikedImages(new Set(JSON.parse(saved)))
    }
  }, [])

  const toggleLike = (imageId: number) => {
    const newLiked = new Set(likedImages)
    if (newLiked.has(imageId)) {
      newLiked.delete(imageId)
    } else {
      newLiked.add(imageId)
    }
    setLikedImages(newLiked)
    localStorage.setItem('likedImages', JSON.stringify(Array.from(newLiked)))
  }

  const categories = [
    { id: 'all', name: 'Tất cả', icon: FaGlobe, count: 24, color: 'from-blue-500 to-purple-500' },
    { id: 'classroom', name: 'Lớp học', icon: FaGraduationCap, count: 8, color: 'from-green-500 to-teal-500' },
    { id: 'events', name: 'Sự kiện', icon: FaCalendarAlt, count: 6, color: 'from-orange-500 to-red-500' },
    { id: 'facilities', name: 'Cơ sở vật chất', icon: FaBuilding, count: 19, color: 'from-purple-500 to-pink-500' },
    { id: 'students', name: 'Học viên', icon: FaUsers, count: 5, color: 'from-yellow-500 to-orange-500' }
  ]

  const galleryImages = [
    // Lớp học
    {
      id: 1,
      src: '/images/gallery/classroom/1.jpg',
      alt: 'Lớp học tiếng Đức với giáo viên bản ngữ',
      title: 'Lớp học A1.1 - Tiếng Đức cơ bản',
      description: 'Học viên đang tham gia lớp học tiếng Đức A1 với phương pháp giảng dạy hiện đại',
      category: 'classroom',
      date: '2024-01-15',
      featured: true
    },
    {
      id: 2,
      src: '/images/gallery/classroom/2.jpg',
      alt: 'Lớp học tiếng Đức với giáo viên bản ngữ',
      title: 'Lớp A1.2 - Tiếng Đức cơ bản',
      description: 'Học viên thực hành giao tiếp tiếng Đức qua hoạt động nhóm',
      category: 'classroom',
      date: '2024-01-20',
      featured: false
    },
    {
      id: 3,
      src: '/images/gallery/classroom/3.jpg',
      alt: 'Lớp học A2.1 với giáo viên bản ngữ',
      title: 'Lớp A2.1 - Giao tiếp nâng cao',
      description: 'Lớp A2.1 học nâng cao tiếng Đức',
      category: 'classroom',
      date: '2024-02-01',
      featured: true
    },
    {
      id: 4,
      src: '/images/gallery/classroom/8.jpg',
      alt: 'Lớp học A2.2 với giáo viên bản ngữ',
      title: 'Lớp A2.2 - Thảo luận chuyên sâu',
      description: 'Lớp A2.2 học nâng cao tiếng Đức',
      category: 'classroom',
      date: '2024-02-10',
      featured: false
    },
    {
      id: 5,
      src: '/images/gallery/classroom/5.jpg',
      alt: 'Lớp học B1.1 với giáo viên bản ngữ',
      title: 'Lớp B1.1 - Giao tiếp nâng cao',
      description: 'Lớp B1.1 học nâng cao tiếng Đức',
      category: 'classroom',
      date: '2024-02-15',
      featured: false
    },
    {
      id: 6,
      src: '/images/gallery/classroom/6.jpg',
      alt: 'Lớp học B1.2 với giáo viên bản ngữ',
      title: 'Lớp B1.2 - Giao tiếp nâng cao',
      description: 'Lớp B1.2 học nâng cao tiếng Đức',
      category: 'classroom',
      date: '2024-02-20',
      featured: true
    },
    {
      id: 7,
      src: '/images/gallery/classroom/7.jpg',
      alt: 'Lớp văn hóa Đức',
      title: 'Lớp văn hóa Đức',
      description: 'Tìm hiểu về văn hóa, lịch sử và con người Đức',
      category: 'classroom',
      date: '2024-02-25',
      featured: false
    },
    {
      id: 8,
      src: '/images/gallery/classroom/4.jpg',
      alt: 'Lớp luyện thi B1 Goethe',
      title: 'Lớp luyện thi B1 Goethe',
      description: 'Lớp luyện thi B1 Goethe',
      category: 'classroom',
      date: '2024-03-01',
      featured: false
    },

    // Sự kiện
    {
      id: 9,
      src: '/images/gallery/event/1.jpg',
      alt: 'Lễ hội bia đức',
      title: 'Lễ hội bia đức',
      description: 'Lễ hội bia đức và giáng sinh với các học viên và giáo viên',
      category: 'events',
      date: '2024-01-30',
      featured: true
    },
    {
      id: 10,
      src: '/images/gallery/event/2.jpg',
      alt: 'Hội thảo du học Đức 2024',
      title: 'Hội thảo du học Đức 2024',
      description: 'Hội thảo cung cấp thông tin mới nhất về du học Đức',
      category: 'events',
      date: '2024-02-05',
      featured: true
    },
    {
      id: 11,
      src: '/images/gallery/event/3.jpg',
      alt: 'Gặp mặt học viên cũ',
      title: 'Gặp mặt học viên cũ',
      description: 'Buổi gặp mặt chia sẻ kinh nghiệm từ các học viên đã du học thành công',
      category: 'events',
      date: '2024-02-12',
      featured: false
    },
    {
      id: 12,
      src: '/images/gallery/event/4.jpg',
      alt: 'Dã ngoại với các học viên',
      title: 'Dã ngoại với các học viên',
      description: 'Sự kiện dã ngoại thường niên của trường',
      category: 'events',
      date: '2024-02-18',
      featured: true
    },
    {
      id: 13,
      src: '/images/gallery/event/5.jpg',
      alt: 'Sinh hoạt nhóm chơi game buổi tối',
      title: 'Sinh hoạt nhóm chơi game buổi tối',
      description: 'Sinh hoạt nhóm chơi game buổi tối với các học viên',
      category: 'events',
      date: '2024-02-22',
      featured: false
    },
    {
      id: 14,
      src: '/images/gallery/event/6.jpg',
      alt: 'Tổ chức đá banh giao lưu học viên và giáo viên',
      title: 'Tổ chức đá banh giao lưu học viên và giáo viên',
      description: 'Tổ chức đá banh giao lưu học viên và giáo viên nhằm gắn kết các bạn với nhau',
      category: 'events',
      date: '2024-03-05',
      featured: false
    },

    // Cơ sở vật chất
    {
      id: 15,
      src: '/images/gallery/facilities/phonghoc/101/1.jpg',
      alt: 'Phòng tự học 101',
      title: '101',
      description: 'Đây là phòng mà các bạn có thể nghỉ ngơi và tự học, ở đây tụi mình cũng có một thư viện nhỏ nhỏ xinh xinh với đủ thứ các sách và tại liệu tiếng đức để các bạn tham khảo và giải trí.',
      category: 'facilities',
      date: '2024-01-10',
      featured: true
    },
    {
      id: 16,
      src: '/images/gallery/facilities/phonghoc/101/2.jpg',
      alt: 'Phòng tự học 101',
      title: '101',
      description: 'Đây là phòng mà các bạn có thể nghỉ ngơi và tự học, ở đây tụi mình cũng có một thư viện nhỏ nhỏ xinh xinh với đủ thứ các sách và tại liệu tiếng đức để các bạn tham khảo và giải trí.',
      category: 'facilities',
      date: '2024-01-12',
      featured: false
    },
      {
        id: 17,
        src: '/images/gallery/facilities/phonghoc/101/3.jpg',
        alt: 'Phòng tự học 101',
        title: '101',
        description: 'Đây là phòng mà các bạn có thể nghỉ ngơi và tự học, ở đây tụi mình cũng có một thư viện nhỏ nhỏ xinh xinh với đủ thứ các sách và tại liệu tiếng đức để các bạn tham khảo và giải trí.',
        category: 'facilities',
        date: '2024-01-14',
        featured: false
    },
      {
        id: 18,
        src: '/images/gallery/facilities/phonghoc/101/4.jpg',
        alt: 'Phòng tự học 101',
        title: '101',
        description: 'Đây là phòng mà các bạn có thể nghỉ ngơi và tự học, ở đây tụi mình cũng có một thư viện nhỏ nhỏ xinh xinh với đủ thứ các sách và tại liệu tiếng đức để các bạn tham khảo và giải trí.',
        category: 'facilities',
        date: '2024-01-12',
        featured: false
      },{
        id: 19,
        src: '/images/gallery/facilities/phonghoc/101/5.jpg',
        alt: 'Phòng tự học 101',
        title: '101',
        description: 'Đây là phòng mà các bạn có thể nghỉ ngơi và tự học, ở đây tụi mình cũng có một thư viện nhỏ nhỏ xinh xinh với đủ thứ các sách và tại liệu tiếng đức để các bạn tham khảo và giải trí.',
        category: 'facilities',
        date: '2024-01-12',
        featured: false
   },
       {
        id: 20,
        src: '/images/gallery/facilities/phonghoc/102/1.jpg',
        alt: 'Phòng học nhỏ lầu 1',
        title: '102',
        description: 'Phòng học nhỏ lầu 1, sức chứa khoảng 10-12 người',
        category: 'facilities',
        date: '2024-01-18',
        featured: false
    },
       {
        id: 21,
        src: '/images/gallery/facilities/phonghoc/102/2.jpg',
        alt: 'Phòng học nhỏ lầu 1',
        title: '102',
        description: 'Phòng học nhỏ lầu 1, sức chứa khoảng 10-12 người',
        category: 'facilities',
        date: '2024-01-18',
        featured: false
    },
       {
        id: 23,
        src: '/images/gallery/facilities/phonghoc/301/1.jpg',
        alt: 'Phòng học lớn lầu 3',
        title: '301',
        description: 'Phòng học lớn lầu 3, sức chứa khoảng 20-25 người',
        category: 'facilities',
        date: '2024-01-18',
        featured: false
   },  
       {
        id: 24,
        src: '/images/gallery/facilities/phonghoc/301/2.jpg',
        alt: 'Phòng học lớn lầu 3',
        title: '301',
        description: 'Phòng học lớn lầu 3, sức chứa khoảng 20-25 người',
        category: 'facilities',
        date: '2024-01-18',
        featured: false
   },  {
        id: 25,
        src: '/images/gallery/facilities/phonghoc/302/1.jpg',
        alt: 'Phòng học lớn lầu 3',
        title: '302',
        description: 'Phòng học lớn lầu 3, sức chứa khoảng 20-25 người',
        category: 'facilities',
        date: '2024-01-18',
        featured: false
   },   {
        id: 26,
        src: '/images/gallery/facilities/phonghoc/302/2.jpg',
        alt: 'Phòng học lớn lầu 3',
        title: '302',
        description: 'Phòng học lớn lầu 3, sức chứa khoảng 20-25 người',
        category: 'facilities',
        date: '2024-01-18',
        featured: false
   },   {
        id: 27,
        src: '/images/gallery/facilities/phonghoc/303/1.jpg',
        alt: 'Phòng học phụ đạo và học nhóm',
        title: '303',
        description: 'Đây là phòng các bạn học phụ đạo hoặc học tăng tiết và làm việc nhóm',
        category: 'facilities',
        date: '2024-01-18',
        featured: false
      },
      {
        id: 28,
        src: '/images/gallery/facilities/phonghoc/303/2.jpg',
        alt: 'Phòng học phụ đạo và học nhóm',
        title: '303',
        description: 'Đây là phòng các bạn học phụ đạo hoặc học tăng tiết và làm việc nhóm',
        category: 'facilities',
        date: '2024-01-18',
        featured: false
      }, {
        id: 29,
        src: '/images/gallery/facilities/phonghoc/401/1.jpg',
        alt: 'Phòng học lớn lầu 4',
        title: '401',
        description: 'Phòng học lớn lầu 4, sức chứa khoảng 20-25 người',
        category: 'facilities',
        date: '2024-01-18',
        featured: false
      }, 
      {
        id: 30,
        src: '/images/gallery/facilities/phonghoc/402/1.jpg',
        alt: 'Phòng học lớn lầu 4',
        title: '402',
        description: 'Phòng học lớn lầu 4, sức chứa khoảng 20-25 người',
        category: 'facilities',
        date: '2024-01-18',
        featured: false
      },
      {
        id: 31,
        src: '/images/gallery/facilities/phonghoc/403/1.jpg',
        alt: 'Phòng học nhỏ lầu 4',
        title: '403',
        description: 'Phòng học nhỏ lầu 4, sức chứa khoảng 10-12 người',
        category: 'facilities',
        date: '2024-01-18',
        featured: false
      },
      {
        id: 32,
        src: '/images/gallery/facilities/phonghoc/501/1.jpg',
        alt: 'Phòng luyện phỏng vấn và talk Show 501',
        title: '501',
        description: 'Phòng mọi người có thể luyện phỏng vấn và talk show với các thầy cô và các bạn học viên',
        category: 'facilities',
        date: '2024-01-18',
        featured: false
      },


    // Học viên
    {
      id: 33,
      src: '/images/gallery/student-1.jpg',
      alt: 'Học viên nhận chứng chỉ A2',
      title: 'Nhận chứng chỉ A2',
      description: 'Học viên vui mừng khi nhận chứng chỉ A2',
      category: 'students',
      date: '2024-01-25',
      featured: true
    },
    {
      id: 34,
      src: '/images/gallery/student-2.jpg',
      alt: 'Nhóm học viên khóa B1',
      title: 'Nhóm học viên B1',
      description: 'Nhóm học viên thân thiết trong khóa B1',
      category: 'students',
      date: '2024-02-03',
      featured: false
    },
    {
      id: 35,
      src: '/images/gallery/student-3.jpg',
      alt: 'Học viên đạt điểm cao TestDaF',
      title: 'Thành tích TestDaF xuất sắc',
      description: 'Học viên đạt điểm cao trong kỳ thi TestDaF',
      category: 'students',
      date: '2024-02-08',
      featured: true
    },
    {
      id: 36,
      src: '/images/gallery/student-4.jpg',
      alt: 'Học viên chuẩn bị du học',
      title: 'Chuẩn bị du học Đức',
      description: 'Học viên hoàn thành khóa học và chuẩn bị du học',
      category: 'students',
      date: '2024-02-14',
      featured: false
    },
    {
      id: 37,
      src: '/images/gallery/student-5.jpg',
      alt: 'Học viên thành công trong phỏng vấn visa',
      title: 'Thành công phỏng vấn visa',
      description: 'Học viên vui mừng khi vượt qua phỏng vấn visa thành công',
      category: 'students',
      date: '2024-02-28',
      featured: true
    }
  ]

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

  const openModal = (imageId: number) => {
    setSelectedImage(imageId)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
    let newIndex
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
    }
    
    setSelectedImage(filteredImages[newIndex].id)
  }

  const selectedImageData = selectedImage 
    ? filteredImages.find(img => img.id === selectedImage)
    : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <Header />
      
      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-4 text-sm">
            <a href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center">
              <FaHome className="mr-1" />
              Trang chủ
            </a>
            <FaChevronDown className="text-gray-400 text-xs rotate-[-90deg]" />
            <span className="text-gray-600 dark:text-gray-300">Hình ảnh</span>
          </div>
        </div>
      </nav>
      
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-6 h-6 bg-white/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-8 h-8 bg-white/15 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-white/25 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-1/3 w-10 h-10 bg-white/20 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/6 w-5 h-5 bg-white/30 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white/25 rounded-full animate-float-delayed"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <FaCamera className="text-7xl mx-auto mb-6 animate-bounce text-yellow-300" />
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Thư Viện Hình Ảnh
              </span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl opacity-90 max-w-4xl mx-auto leading-relaxed mb-8"
            >
              Khám phá những khoảnh khắc đáng nhớ tại Deutsche Ecke
            </motion.p>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-8 text-center"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3">
                <div className="text-3xl font-bold text-yellow-300">{galleryImages.length}</div>
                <div className="text-sm opacity-80">Hình ảnh</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3">
                <div className="text-3xl font-bold text-yellow-300">{categories.length - 1}</div>
                <div className="text-sm opacity-80">Danh mục</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3">
                <div className="text-3xl font-bold text-yellow-300">{galleryImages.filter(img => img.featured).length}</div>
                <div className="text-sm opacity-80">Nổi bật</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Category Filter */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Danh Mục Hình Ảnh</h2>
            <p className="text-gray-600 dark:text-gray-300">Lựa chọn danh mục để xem hình ảnh</p>
          </motion.div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300 overflow-hidden ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-2xl scale-105'
                      : 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:scale-105 shadow-lg'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Background gradient on hover */}
                  {selectedCategory !== category.id && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  )}
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'bg-white/20' 
                      : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gradient-to-r group-hover:' + category.color + ' group-hover:text-white'
                  }`}>
                    <IconComponent className="text-lg" />
                  </div>
                  
                  <div className="flex flex-col items-start">
                    <span className="text-base font-semibold">{category.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 group-hover:bg-white/20 group-hover:text-current'
                    }`}>
                      {category.id === 'all' ? galleryImages.length : category.count} ảnh
                    </span>
                  </div>
                  
                  {/* Sparkle effect */}
                  {selectedCategory === category.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-3 h-3 bg-yellow-300 rounded-full"
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Image Gallery */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="wait">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group relative"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTAwQzE3Mi40IDEwMCAxNTAgMTIyLjQgMTUwIDE1MFMxNzIuNCUyMDAwIDIwMCUyMDAwUzI1MCAyNTcuNiUyMDUwIDIzMFMyMjcuNiUyMDAwIDIwMCUyMDAwWk0yMDBOdDEyMEMxODMuNTxNjBOdDZMdC0wIDEwMy41Mz2NGJlUjE2NC44OVptMCUyNTAuNjJsMzVMNi0zNS42MkwxNjQgMTY0VjE2NEwyMDAtMDA1OGRiZWQtU0xIVNQgMjAwJyUwASNOWEIOdCdSTEEtNjc1JyZkL2RCciYmNjc1YmJlL2QmYi0dCjwvcGF0aD4KPHN2Zz4K'
                        }}
                      />
                      
                      {/* Enhanced overlay with glass morphism */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
                        <div className="absolute bottom-4 left-4 right-4">
                          <motion.h3 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            className="text-white font-bold text-base mb-2 line-clamp-1"
                          >
                            {image.title}
                          </motion.h3>
                          <motion.p 
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            className="text-white/90 text-sm line-clamp-2"
                          >
                            {image.description}
                          </motion.p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.button
                          onClick={() => openModal(image.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
                          aria-label={`Xem ảnh ${image.title}`}
                        >
                          <FaEye className="text-lg" />
                        </motion.button>
                        
                        <motion.button
                          onClick={() => toggleLike(image.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 border ${
                            likedImages.has(image.id)
                              ? 'bg-red-500/80 text-white border-red-400/50'
                              : 'bg-white/20 text-white hover:bg-white/30 border-white/30'
                          }`}
                          aria-label={`${likedImages.has(image.id) ? 'Bỏ thích' : 'Yêu thích'} ảnh ${image.title}`}
                        >
                          <FaHeart className="text-lg" />
                        </motion.button>
                      </div>

                      {/* Enhanced badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <div className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-blue-400/30">
                          {new Date(image.date).toLocaleDateString('vi-VN')}
                        </div>
                        {image.featured && (
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            ⭐ Nổi bật
                          </div>
                        )}
                      </div>

                      {/* Category badge */}
                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="bg-gray-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                          {categories.find(cat => cat.id === image.category)?.name}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Enhanced Empty State */}
          {filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <FaCamera className="text-8xl text-gray-400 mx-auto mb-6" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4">
                Chưa có hình ảnh
              </h3>
              <p className="text-gray-500 dark:text-gray-500 text-lg">
                Danh mục này chưa có hình ảnh nào được thêm vào
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Enhanced Image Modal */}
      <AnimatePresence>
        {isModalOpen && selectedImageData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl max-h-[95vh] bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Enhanced header with controls */}
              <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="text-white font-bold text-xl">{selectedImageData.title}</h3>
                    {selectedImageData.featured && (
                      <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
                        ⭐ Nổi bật
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => toggleLike(selectedImageData.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        likedImages.has(selectedImageData.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      aria-label="Yêu thích"
                    >
                      <FaHeart />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all"
                      aria-label="Chia sẻ"
                    >
                      <FaShare />
                    </motion.button>
                    
                    <motion.button
                      onClick={closeModal}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-all"
                      aria-label="Đóng"
                    >
                      <FaTimes />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Enhanced Navigation Buttons */}
              <motion.button
                onClick={() => navigateImage('prev')}
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all border border-white/20"
                aria-label="Ảnh trước"
              >
                <FaChevronLeft className="text-xl" />
              </motion.button>

              <motion.button
                onClick={() => navigateImage('next')}
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-all border border-white/20"
                aria-label="Ảnh tiếp theo"
              >
                <FaChevronRight className="text-xl" />
              </motion.button>

              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImageData.src}
                  alt={selectedImageData.alt}
                  className="w-full max-h-[75vh] object-contain"
                />
              </div>

              {/* Enhanced Image Info */}
              <div className="p-8 bg-gradient-to-t from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">
                      {selectedImageData.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        📅 {new Date(selectedImageData.date).toLocaleDateString('vi-VN')}
                      </span>
                      <span className="flex items-center gap-1">
                        📁 {categories.find(cat => cat.id === selectedImageData.category)?.name}
                      </span>
                      {likedImages.has(selectedImageData.id) && (
                        <span className="flex items-center gap-1 text-red-500">
                          ❤️ Đã thích
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <FaDownload />
                      Tải xuống
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <FaShare />
                      Chia sẻ
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default HinhAnhPage 