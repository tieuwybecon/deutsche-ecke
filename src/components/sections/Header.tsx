'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaSearch, FaUserCog, FaBars, FaTimes, FaSun, FaMoon, FaChevronDown, FaUniversity, FaTools, FaGlobe, FaBook, FaLightbulb, FaClipboardList, FaPenFancy, FaCamera } from 'react-icons/fa'

// Simple theme toggle without context
function ThemeToggleButton() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <FaSun className="text-lg text-yellow-500" />
      ) : (
        <FaMoon className="text-lg" />
      )}
    </button>
  )
}

// Mobile theme toggle
function MobileThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {isDark ? (
        <FaSun className="text-lg text-yellow-500" />
      ) : (
        <FaMoon className="text-lg" />
      )}
      <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false)
  const [isStudyAbroadDropdownOpen, setIsStudyAbroadDropdownOpen] = useState(false)
  const [isHocTiengDucDropdownOpen, setIsHocTiengDucDropdownOpen] = useState(false)
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Trang Chủ', href: '/' },
    { 
      name: 'Học Tiếng Đức',
      href: '/hoc-tieng-duc',
      hasDropdown: true,
      dropdownItems: [
        { 
          name: 'Ngữ pháp tiếng Đức', 
          href: '/hoc-tieng-duc/ngu-phap/A1', 
          icon: FaBook, 
          description: 'Ngữ pháp các trình độ A1, A2, B1, B2',
          subItems: [
            { name: 'A1', href: '/hoc-tieng-duc/ngu-phap/A1' },
            { name: 'A2', href: '/hoc-tieng-duc/ngu-phap/A2' },
            { name: 'B1', href: '/hoc-tieng-duc/ngu-phap/B1' },
            { name: 'B2', href: '/hoc-tieng-duc/ngu-phap/B2' },
          ]
        },
        { name: 'Bí kíp học tiếng Đức', href: '/hoc-tieng-duc/bi-kip', icon: FaLightbulb, description: 'Chia sẻ bí kíp học hiệu quả' },
        { name: 'Hướng dẫn luyện thi', href: '/hoc-tieng-duc/huong-dan-luyen-thi', icon: FaClipboardList, description: 'Kinh nghiệm luyện thi chứng chỉ' },
        { name: 'Bài tập online', href: '/hoc-tieng-duc/bai-tap-online', icon: FaPenFancy, description: 'Làm bài tập trực tuyến' },
      ]
    },
    { 
      name: 'Về Chúng Tôi', 
      href: '/about',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Giới Thiệu', href: '/about', icon: FaUniversity, description: 'Tìm hiểu về lịch sử và sứ mệnh' },
        { name: 'Đội Ngũ Nhân Sự', href: '/about/nhan-su', icon: FaUserCog, description: 'Đội ngũ giáo viên chuyên nghiệp' },
        { name: 'Nội Quy Trung Tâm', href: '/about/noi-quy', icon: FaTools, description: 'Quy định và chính sách học tập' },
        { name: 'Thư viện hình ảnh', href: '/hinh-anh', icon: FaCamera, description: 'Xem thư viện ảnh trung tâm' }
      ]
    },
    { name: 'Khóa Học', href: '/courses' },
    { 
      name: 'Du Học', 
      href: '/du-hoc',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Tổng Quan Du Học', href: '/du-hoc', icon: FaGlobe, description: 'Thông tin chung về du học Đức' },
        { name: 'Du Học Đại Học', href: '/du-hoc/dai-hoc', icon: FaUniversity, description: 'Bachelor • Master • PhD' },
        { name: 'Du Học Nghề', href: '/du-hoc/nghe', icon: FaTools, description: 'Ausbildung • Có lương • Định cư' },
        { name: 'Đất Nước & Con Người', href: '/du-hoc/dat-nuoc', icon: FaGlobe, description: 'Văn hóa • Lịch sử • Cuộc sống' }
      ]
    },
    { name: 'Liên Hệ', href: '/contact' }
  ]

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      {/* Top Bar */}
      <div className={`${isScrolled ? 'hidden' : 'block'} bg-primary-800 text-white transition-all duration-300`}>
        <div className="container-custom">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <FaPhone className="text-xs" />
                <a href="tel:+84777024240" className="hover:text-blue-300 transition-colors">
                  0777.024.240
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-xs" />
                <a href="mailto:info@dek.edu.vn" className="hover:text-blue-300 transition-colors">
                  info@dek.edu.vn
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {[
                { Icon: FaFacebook, href: 'https://www.facebook.com/dek.deutsche.ecke', label: 'Facebook' },
                { Icon: FaTwitter, href: 'https://twitter.com/deutscheecke', label: 'Twitter' },
                { Icon: FaYoutube, href: 'https://youtube.com/deutscheecke', label: 'YouTube' },
                { Icon: FaInstagram, href: 'https://instagram.com/deutscheecke', label: 'Instagram' }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 transition-colors hover:scale-110 transform duration-200"
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-700">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/">
              <motion.div 
                className="flex items-center space-x-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src="/images/deutsche-ecke-logo.jpg" 
                  alt="Deutsche Ecke Logo" 
                  className="w-12 h-12 object-contain rounded-full bg-white border border-gray-300 shadow-sm p-1"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Deutsche Ecke</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Trung tâm tiếng Đức</p>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <li key={index} className="relative">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => {
                        if (item.name === 'Về Chúng Tôi') {
                          setIsAboutDropdownOpen(true)
                          setIsStudyAbroadDropdownOpen(false)
                        } else if (item.name === 'Du Học') {
                          setIsStudyAbroadDropdownOpen(true)
                          setIsAboutDropdownOpen(false)
                        } else if (item.name === 'Học Tiếng Đức') {
                          setIsHocTiengDucDropdownOpen(true)
                        }
                      }}
                      onMouseLeave={() => {
                        if (item.name === 'Về Chúng Tôi') {
                          setIsAboutDropdownOpen(false)
                        } else if (item.name === 'Du Học') {
                          setIsStudyAbroadDropdownOpen(false)
                        } else if (item.name === 'Học Tiếng Đức') {
                          setIsHocTiengDucDropdownOpen(false)
                          setActiveSubDropdown(null)
                        }
                      }}
                    >
                      <a
                        href={item.href}
                        className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200 group"
                      >
                        <span>{item.name}</span>
                        <FaChevronDown className={`text-xs transition-transform duration-200 ${
                          (item.name === 'Về Chúng Tôi' && isAboutDropdownOpen) || 
                          (item.name === 'Du Học' && isStudyAbroadDropdownOpen) ||
                          (item.name === 'Học Tiếng Đức' && isHocTiengDucDropdownOpen)
                            ? 'rotate-180' : ''
                        }`} />
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"></span>
                      </a>
                      {/* Enhanced Dropdown Menu */}
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ 
                          opacity: (item.name === 'Về Chúng Tôi' && isAboutDropdownOpen) || 
                                  (item.name === 'Du Học' && isStudyAbroadDropdownOpen) ||
                                  (item.name === 'Học Tiếng Đức' && isHocTiengDucDropdownOpen) ? 1 : 0, 
                          y: (item.name === 'Về Chúng Tôi' && isAboutDropdownOpen) || 
                             (item.name === 'Du Học' && isStudyAbroadDropdownOpen) ||
                             (item.name === 'Học Tiếng Đức' && isHocTiengDucDropdownOpen) ? 0 : 10,
                          scale: (item.name === 'Về Chúng Tôi' && isAboutDropdownOpen) || 
                                (item.name === 'Du Học' && isStudyAbroadDropdownOpen) ||
                                (item.name === 'Học Tiếng Đức' && isHocTiengDucDropdownOpen) ? 1 : 0.95,
                          visibility: (item.name === 'Về Chúng Tôi' && isAboutDropdownOpen) || 
                                     (item.name === 'Du Học' && isStudyAbroadDropdownOpen) ||
                                     (item.name === 'Học Tiếng Đức' && isHocTiengDucDropdownOpen) ? 'visible' : 'hidden'
                        }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-3 overflow-visible`}
                      >
                        {item.dropdownItems?.map((dropdownItem, dropdownIndex) => {
                          const IconComponent = dropdownItem.icon
                          const hasSub = dropdownItem.subItems && dropdownItem.subItems.length > 0
                          return (
                            <div
                              key={dropdownIndex}
                              className="relative group"
                              onMouseEnter={() => hasSub && setActiveSubDropdown(dropdownItem.name)}
                              onMouseLeave={() => hasSub && setActiveSubDropdown(null)}
                            >
                              <a
                                href={dropdownItem.href}
                                className="flex items-start px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 group"
                              >
                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                                  <IconComponent className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900 dark:text-white mb-1">
                                    {dropdownItem.name}
                                  </div>
                                  {dropdownItem.description && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                      {dropdownItem.description}
                                    </div>
                                  )}
                                </div>
                                {hasSub && (
                                  <FaChevronDown className="ml-2 mt-1 text-xs" />
                                )}
                              </a>
                              {/* Sub Dropdown */}
                              {hasSub && activeSubDropdown === dropdownItem.name && (
                                <div className="absolute top-0 left-full ml-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50"
                                  onMouseEnter={() => setActiveSubDropdown(dropdownItem.name)}
                                  onMouseLeave={() => setActiveSubDropdown(null)}
                                >
                                  {dropdownItem.subItems.map((sub, subIdx) => (
                                    <a
                                      key={subIdx}
                                      href={sub.href}
                                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200"
                                    >
                                      {sub.name}
                                    </a>
                                  ))}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </motion.div>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="relative text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200 group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 dark:bg-primary-400 group-hover:w-full transition-all duration-300"></span>
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Header Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Tìm kiếm"
              >
                <FaSearch />
              </button>
              
              <ThemeToggleButton />
              
              <button 
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Tài khoản"
              >
                <FaUserCog />
              </button>
              
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Đăng Ký Ngay
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0, 
            opacity: isMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700"
        >
          <div className="container-custom py-4">
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  {item.hasDropdown ? (
                    <div>
                      <a
                        href={item.href}
                        className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                        <FaChevronDown className="text-xs" />
                      </a>
                      {/* Mobile dropdown items */}
                      <div className="mt-2 ml-4 space-y-3">
                        {item.dropdownItems?.map((dropdownItem, dropdownIndex) => {
                          const IconComponent = dropdownItem.icon
                          return (
                            <a
                              key={dropdownIndex}
                              href={dropdownItem.href}
                              className="flex items-center space-x-3 p-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 rounded-lg flex items-center justify-center">
                                <IconComponent className="text-blue-600 dark:text-blue-400 text-sm" />
                              </div>
                              <div>
                                <div className="font-medium">{dropdownItem.name}</div>
                                {dropdownItem.description && (
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {dropdownItem.description}
                                  </div>
                                )}
                              </div>
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            
            {/* Mobile Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
              <div className="flex justify-between items-center">
                <MobileThemeToggle />
                <a
                  href="/contact"
                  className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2 rounded-lg font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng Ký Ngay
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </nav>
    </header>
  )
} 