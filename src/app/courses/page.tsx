'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaCertificate, FaUsers, FaClock, FaCheck, FaStar, FaArrowRight, FaDownload, FaBook, FaPlay, FaFileAlt, FaMicrophone, FaComments, FaCalendarAlt, FaVideo, FaHeadphones, FaGamepad, FaPencilAlt, FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Header from '../../components/sections/Header'
import Footer from '../../components/sections/Footer'
import CoursesSection from '../../components/sections/CoursesSection'

// Courses data

const courses = [
  {
    level: "A1",
    title: "Tiếng Đức cơ bản",
    price: "2,500,000",
    originalPrice: "3,000,000",
    duration: "2-3 tháng",
    lessons: "48 bài học",
    description: "Dành cho người mới bắt đầu. Học bảng chữ cái, phát âm và giao tiếp cơ bản.",
    features: ["48 video bài giảng", "Luyện phát âm", "Bài tập tương tác", "Chứng chỉ A1"],
    color: "green",
    popular: false
  },
  {
    level: "A2", 
    title: "Tiếng Đức sơ cấp",
    price: "3,200,000",
    originalPrice: "3,800,000",
    duration: "3-4 tháng",
    lessons: "64 bài học",
    description: "Nâng cao kỹ năng giao tiếp, viết email và kể chuyện đơn giản.",
    features: ["64 video bài giảng", "Luyện viết email", "Speaking practice", "Chứng chỉ A2"],
    color: "blue",
    popular: true
  },
  {
    level: "B1",
    title: "Tiếng Đức trung cấp", 
    price: "4,500,000",
    originalPrice: "5,200,000",
    duration: "4-5 tháng",
    lessons: "80 bài học",
    description: "Thể hiện ý kiến, thảo luận và xử lý tình huống phức tạp.",
    features: ["80 video bài giảng", "Thảo luận nhóm", "Viết luận", "Chứng chỉ B1"],
    color: "purple",
    popular: false
  },
  {
    level: "B2",
    title: "Tiếng Đức nâng cao",
    price: "5,500,000",
    originalPrice: "6,500,000", 
    duration: "5-6 tháng",
    lessons: "96 bài học",
    description: "Sử dụng tiếng Đức thành thạo trong học tập và công việc.",
    features: ["96 video bài giảng", "Phân tích văn bản", "Thuyết trình", "Chứng chỉ B2"],
    color: "red",
    popular: false
  }
] as const

const benefits = [
  {
    icon: FaGraduationCap,
    title: "Giáo viên bản ngữ Đức",
    description: "100% giáo viên có chứng chỉ quốc tế và kinh nghiệm tại Đức"
  },
  {
    icon: FaCertificate,
    title: "Chứng chỉ Goethe quốc tế", 
    description: "Được công nhận toàn cầu bởi các trường đại học và doanh nghiệp"
  },
  {
    icon: FaUsers,
    title: "Lớp học nhỏ (tối đa 12 người)",
    description: "Đảm bảo chất lượng giảng dạy và tương tác tối ưu"
  },
  {
    icon: FaClock,
    title: "Học linh hoạt 24/7",
    description: "Online, offline hoặc kết hợp theo nhu cầu của bạn"
  }
] as const

const learningPath = [
  {
    level: "A1",
    title: "Bước đầu tiên",
    duration: "Tuần 1-4",
    topics: ["Bảng chữ cái và phát âm", "Số đếm và thời gian", "Giới thiệu bản thân", "Mua sắm cơ bản"],
    skills: ["Nghe hiểu 30%", "Nói 25%", "Đọc 35%", "Viết 30%"]
  },
  {
    level: "A2", 
    title: "Phát triển kỹ năng",
    duration: "Tuần 5-12",
    topics: ["Gia đình và bạn bè", "Công việc và sở thích", "Du lịch cơ bản", "Kể chuyện quá khứ"],
    skills: ["Nghe hiểu 50%", "Nói 45%", "Đọc 55%", "Viết 50%"]
  },
  {
    level: "B1",
    title: "Giao tiếp tự tin", 
    duration: "Tuần 13-24",
    topics: ["Thảo luận ý kiến", "Viết email chính thức", "Xem phim không phụ đề", "Thuyết trình ngắn"],
    skills: ["Nghe hiểu 70%", "Nói 65%", "Đọc 75%", "Viết 70%"]
  },
  {
    level: "B2",
    title: "Thành thạo",
    duration: "Tuần 25-40", 
    topics: ["Phân tích văn bản", "Tranh luận phức tạp", "Viết báo cáo", "Hiểu phương ngữ"],
    skills: ["Nghe hiểu 85%", "Nói 80%", "Đọc 90%", "Viết 85%"]
  }
]

const courseFeatures = [
  {
    icon: FaVideo,
    title: "Video HD chất lượng cao",
    description: "Hơn 300 video bài giảng với chất lượng 4K, có phụ đề tiếng Việt"
  },
  {
    icon: FaHeadphones,
    title: "Luyện nghe tương tác",
    description: "Hệ thống AI nhận diện giọng nói, phát âm chuẩn từng từ"
  },
  {
    icon: FaGamepad,
    title: "Game học tập thú vị",
    description: "Hơn 50 trò chơi giáo dục giúp ghi nhớ từ vựng hiệu quả"
  },
  {
    icon: FaPencilAlt,
    title: "Bài tập thực hành",
    description: "1000+ bài tập đa dạng với hệ thống chấm điểm tự động"
  },
  {
    icon: FaComments,
    title: "Lớp học trực tuyến",
    description: "Tham gia lớp học với giáo viên bản ngữ 3 lần/tuần"
  },
  {
    icon: FaFileAlt,
    title: "Tài liệu đầy đủ",
    description: "Sách giáo trình, từ điển, và tài liệu tham khảo miễn phí"
  }
]

const testimonials = [
  {
    name: "Nguyễn Thị Mai",
    role: "Du học sinh tại Berlin",
    image: "/images/testimonial-1.jpg",
    rating: 5,
    text: "Nhờ Deutsche Ecke mà tôi đã đậu B2 chỉ sau 8 tháng học. Giáo viên rất tận tâm và phương pháp học hiệu quả."
  },
  {
    name: "Trần Văn Nam",
    role: "Kỹ sư tại Siemens",
    image: "/images/testimonial-2.jpg", 
    rating: 5,
    text: "Khóa học B1 giúp tôi tự tin giao tiếp với đồng nghiệp Đức. Chương trình học rất thực tế và ứng dụng cao."
  },
  {
    name: "Lê Thị Hương",
    role: "Học sinh THPT",
    image: "/images/testimonial-3.jpg",
    rating: 5,
    text: "Từ zero tiếng Đức, sau 6 tháng học A1-A2 tôi đã có thể chat với bạn Đức một cách tự nhiên."
  }
]

const faqs = [
  {
    question: "Khóa học có phù hợp với người mới bắt đầu không?",
    answer: "Có, khóa A1 được thiết kế đặc biệt cho người chưa biết gì về tiếng Đức. Chúng tôi bắt đầu từ bảng chữ cái và phát âm cơ bản."
  },
  {
    question: "Tôi có thể học online 100% không?",
    answer: "Có, tất cả khóa học đều hỗ trợ học online hoàn toàn. Bạn cũng có thể kết hợp online và offline theo nhu cầu."
  },
  {
    question: "Chứng chỉ có được công nhận quốc tế không?",
    answer: "Có, chúng tôi cấp chứng chỉ theo chuẩn Goethe Institute được công nhận toàn cầu bởi các trường đại học và doanh nghiệp."
  },
  {
    question: "Thời gian học linh hoạt như thế nào?", 
    answer: "Bạn có thể học bất cứ lúc nào 24/7. Lớp trực tuyến với giáo viên có lịch cố định nhưng cũng rất linh hoạt."
  },
  {
    question: "Có chính sách hoàn tiền không?",
    answer: "Có, chúng tôi có chính sách hoàn tiền 100% trong vòng 7 ngày đầu nếu bạn không hài lòng với khóa học."
  },
  {
    question: "Sau khi hoàn thành có hỗ trợ tìm việc không?",
    answer: "Có, chúng tôi có mạng lưới đối tác doanh nghiệp và hỗ trợ sinh viên tìm việc làm, thực tập tại Đức."
  }
]

const scheduleOptions = [
  {
    type: "Sáng",
    time: "8:00 - 10:00",
    days: "Thứ 2, 4, 6",
    suitable: "Học sinh, sinh viên",
    icon: FaCalendarAlt
  },
  {
    type: "Chiều", 
    time: "14:00 - 16:00",
    days: "Thứ 3, 5, 7",
    suitable: "Người đi làm",
    icon: FaClock
  },
  {
    type: "Tối",
    time: "19:00 - 21:00", 
    days: "Thứ 2, 4, 6",
    suitable: "Người bận việc",
    icon: FaClock
  },
  {
    type: "Cuối tuần",
    time: "9:00 - 12:00",
    days: "Thứ 7, Chủ nhật",
    suitable: "Lịch linh hoạt",
    icon: FaCalendarAlt
  }
]

const instructors = [
  {
    name: "Dr. Schmidt Weber",
    title: "Giảng viên chính - Goethe Institut",
    experience: "15 năm kinh nghiệm",
    specialty: "Ngữ pháp và giao tiếp",
    image: "/images/instructor-1.jpg",
    qualifications: ["PhD Ngôn ngữ học", "Chứng chỉ DaF", "Goethe C2"]
  },
  {
    name: "Ms. Anna Mueller",
    title: "Chuyên gia phát âm",
    experience: "10 năm kinh nghiệm", 
    specialty: "Phát âm và nghe nói",
    image: "/images/instructor-2.jpg",
    qualifications: ["MA Giáo dục", "TestDaF Trainer", "Phonetik Expert"]
  },
  {
    name: "Mr. Thomas Klein", 
    title: "Giáo viên B1-B2",
    experience: "8 năm kinh nghiệm",
    specialty: "Viết và đọc hiểu",
    image: "/images/instructor-3.jpg",
    qualifications: ["BA Germanistik", "TELC Trainer", "Business German"]
  }
]

export default function CoursesPage() {
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null)
  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Khóa Học Tiếng Đức Chuyên Nghiệp
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Từ A1 đến C2 - Chứng chỉ quốc tế được công nhận toàn cầu
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400" />
                  <span>5000+ học viên thành công</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCertificate className="text-green-400" />
                  <span>Chứng chỉ Goethe</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-blue-300" />
                  <span>Giáo viên bản ngữ</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tại Sao Chọn Deutsche Ecke?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Chúng tôi cam kết mang đến chất lượng giảng dạy tốt nhất với phương pháp hiện đại
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

        {/* Courses Section */}
        <CoursesSection courses={courses} />

        {/* Learning Path Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Lộ Trình Học Tập Chi Tiết
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Từ người mới bắt đầu đến thành thạo - lộ trình rõ ràng, bài bản
              </p>
            </motion.div>

            <div className="grid gap-8">
              {learningPath.map((path, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    <div className="lg:w-1/4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">{path.level}</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{path.title}</h3>
                          <p className="text-blue-600 font-medium">{path.duration}</p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-1/2">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Nội dung học:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {path.topics.map((topic, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <FaCheck className="text-green-500 text-sm" />
                            <span className="text-gray-700">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:w-1/4">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Kỹ năng đạt được:</h4>
                      <div className="space-y-3">
                        {path.skills.map((skill, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-gray-700 text-sm">{skill.split(' ')[0]} {skill.split(' ')[1]}</span>
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                                style={{ width: skill.split(' ')[2] }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Course Features Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Tính Năng Nổi Bật
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Công nghệ hiện đại kết hợp phương pháp giảng dạy truyền thống
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courseFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow group"
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                      <IconComponent className="text-2xl text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Học Viên Nói Gì Về Chúng Tôi
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Hơn 5000 học viên đã thành công với Deutsche Ecke
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, idx) => (
                      <FaStar key={idx} className="text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Câu Hỏi Thường Gặp
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Giải đáp những thắc mắc phổ biến về khóa học
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl mb-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-medium text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    {expandedFaq === index ? (
                      <FaChevronUp className="text-blue-600 flex-shrink-0" />
                    ) : (
                      <FaChevronDown className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Lịch Học Linh Hoạt
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Chọn thời gian học phù hợp với lịch trình cá nhân
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {scheduleOptions.map((schedule, index) => {
                const IconComponent = schedule.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-blue-200"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="text-2xl text-blue-600" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{schedule.type}</h3>
                      <p className="text-2xl font-bold text-blue-600 mb-2">{schedule.time}</p>
                      <p className="text-gray-600 mb-3">{schedule.days}</p>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {schedule.suitable}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Instructors Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Đội Ngũ Giảng Viên
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                100% giáo viên bản ngữ với bằng cấp quốc tế và kinh nghiệm tại Đức
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {instructors.map((instructor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">
                        {instructor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{instructor.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{instructor.title}</p>
                    <p className="text-gray-600 text-sm">{instructor.experience}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-2">Chuyên môn:</h4>
                    <p className="text-gray-600">{instructor.specialty}</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Bằng cấp:</h4>
                    <div className="space-y-2">
                      {instructor.qualifications.map((qual, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <FaCheck className="text-green-500 text-sm" />
                          <span className="text-gray-600 text-sm">{qual}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <div className="container-custom text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Sẵn Sàng Bắt Đầu Hành Trình?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Đăng ký ngay để nhận tư vấn miễn phí và ưu đãi đặc biệt
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                  Đăng Ký Ngay
                </button>
                <button className="btn-secondary border-white text-white hover:bg-white hover:text-blue-600">
                  Tư Vấn Miễn Phí
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