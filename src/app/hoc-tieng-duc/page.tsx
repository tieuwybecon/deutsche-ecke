import Link from 'next/link'
import { BookOpen, Target, TrendingUp, Brain, Users, Award, ArrowRight, Play } from 'lucide-react'
import Header from '../../components/sections/Header'
import Footer from '../../components/sections/Footer'
import { ThemeProvider } from '../../components/ui/ThemeProvider'

export default function HocTiengDucPage() {
  const grammarLevels = [
    {
      level: 'A1',
      title: 'Ngữ pháp cơ bản',
      description: 'Nền tảng vững chắc cho người mới bắt đầu',
      color: 'blue',
      progress: '0%', // Có thể tính từ API
      topics: ['Động từ sein/haben', 'Thì hiện tại', 'Mạo từ', 'Dạng số nhiều']
    },
    {
      level: 'A2',
      title: 'Ngữ pháp tiền trung cấp',
      description: 'Mở rộng kiến thức và cấu trúc câu',
      color: 'green',
      progress: '0%',
      topics: ['Thì quá khứ', 'Động từ khuyết thiếu', 'Giới từ', 'Câu phụ thuộc']
    },
    {
      level: 'B1',
      title: 'Ngữ pháp trung cấp',
      description: 'Chinh phục các cấu trúc phức tạp',
      color: 'purple',
      progress: '0%',
      topics: ['Thì tương lai', 'Câu điều kiện', 'Thể bị động', 'Lời nói gián tiếp']
    },
    {
      level: 'B2',
      title: 'Ngữ pháp nâng cao',
      description: 'Hoàn thiện kiến thức ngữ pháp',
      color: 'red',
      progress: '0%',
      topics: ['Cấu trúc phức tạp', 'Văn phong trang trọng', 'Ngữ pháp chuyên ngành', 'Thành ngữ']
    }
  ]

  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Học theo cấp độ',
      description: 'Từ A1 đến B2, học tuần tự và có hệ thống'
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: 'Bí kíp học hiệu quả',
      description: 'Phương pháp học được chứng minh khoa học'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Hướng dẫn luyện thi',
      description: 'Chuẩn bị tốt nhất cho các kỳ thi quốc tế'
    },
    {
      icon: <Play className="h-8 w-8" />,
      title: 'Bài tập thực hành',
      description: 'Luyện tập online tương tác và thú vị'
    }
  ]

  return (
    <ThemeProvider>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Chuyển đến nội dung chính
        </a>

        {/* Main Content */}
        <main id="main-content" role="main">
          {/* Hero Section */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white dark:from-blue-800 dark:to-purple-800">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Học Tiếng Đức
                  <span className="block text-yellow-300 mt-2">Hiệu Quả & Thú Vị</span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
                  Khám phá hành trình học tiếng Đức từ cơ bản đến nâng cao với phương pháp giảng dạy hiện đại
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="#ngu-phap" className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Bắt đầu học ngữ pháp
                  </Link>
                  <Link href="#features" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center">
                    Khám phá tính năng
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Grammar Section */}
          <div id="ngu-phap" className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Ngữ Pháp Tiếng Đức
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Hệ thống ngữ pháp được thiết kế theo từng cấp độ, từ cơ bản đến nâng cao
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {grammarLevels.map((item) => (
                  <Link 
                    key={item.level}
                    href={`/hoc-tieng-duc/ngu-phap/${item.level}`}
                    className="group"
                  >
                    <div className={`
                      bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 
                      transform hover:-translate-y-2 border-t-4 
                      ${item.color === 'blue' ? 'border-blue-500 hover:border-blue-600' : ''}
                      ${item.color === 'green' ? 'border-green-500 hover:border-green-600' : ''}
                      ${item.color === 'purple' ? 'border-purple-500 hover:border-purple-600' : ''}
                      ${item.color === 'red' ? 'border-red-500 hover:border-red-600' : ''}
                      overflow-hidden
                    `}>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className={`
                            text-2xl font-bold px-3 py-1 rounded-lg
                            ${item.color === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : ''}
                            ${item.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                            ${item.color === 'purple' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' : ''}
                            ${item.color === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
                          `}>
                            {item.level}
                          </span>
                          <ArrowRight className={`
                            h-5 w-5 transform group-hover:translate-x-1 transition-transform
                            ${item.color === 'blue' ? 'text-blue-600' : ''}
                            ${item.color === 'green' ? 'text-green-600' : ''}
                            ${item.color === 'purple' ? 'text-purple-600' : ''}
                            ${item.color === 'red' ? 'text-red-600' : ''}
                          `} />
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          {item.description}
                        </p>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Chủ đề chính:</h4>
                          <div className="flex flex-wrap gap-1">
                            {item.topics.slice(0, 2).map((topic, index) => (
                              <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                                {topic}
                              </span>
                            ))}
                            {item.topics.length > 2 && (
                              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                                +{item.topics.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div id="features" className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Tính Năng Học Tập
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Đa dạng phương pháp học tập để bạn có thể tiếp cận tiếng Đức một cách toàn diện
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-blue-600 dark:text-blue-400 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <Link 
                  href="/hoc-tieng-duc/bi-kip" 
                  className="group bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl p-6 text-white hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <Brain className="h-8 w-8 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Bí kíp học tiếng Đức</h3>
                  <p className="text-orange-100 mb-4">Phương pháp học hiệu quả từ giảng viên kinh nghiệm</p>
                  <div className="flex items-center text-orange-100 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Khám phá ngay</span>
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link 
                  href="/hoc-tieng-duc/huong-dan-luyen-thi" 
                  className="group bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl p-6 text-white hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <Award className="h-8 w-8 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Hướng dẫn luyện thi</h3>
                  <p className="text-purple-100 mb-4">Chuẩn bị tốt nhất cho TestDaF, DSH, Goethe</p>
                  <div className="flex items-center text-purple-100 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Xem hướng dẫn</span>
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link 
                  href="/hoc-tieng-duc/bai-tap-online" 
                  className="group bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <Play className="h-8 w-8 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Bài tập online</h3>
                  <p className="text-green-100 mb-4">Luyện tập tương tác với hàng ngàn câu hỏi</p>
                  <div className="flex items-center text-green-100 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Bắt đầu luyện tập</span>
                    <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="py-16 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
                  <div className="text-gray-600 dark:text-gray-400">Bài học ngữ pháp</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">1000+</div>
                  <div className="text-gray-600 dark:text-gray-400">Bài tập thực hành</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">50+</div>
                  <div className="text-gray-600 dark:text-gray-400">Bí kíp học tập</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-2">24/7</div>
                  <div className="text-gray-600 dark:text-gray-400">Hỗ trợ học tập</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white dark:from-blue-800 dark:to-purple-800">
            <div className="max-w-4xl mx-auto text-center px-4">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Sẵn sàng bắt đầu hành trình học tiếng Đức?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Tham gia cùng hàng ngàn học viên đã thành công với Deutsche Ecke
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/hoc-tieng-duc/ngu-phap/A1" className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors inline-flex items-center justify-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Bắt đầu từ A1
                </Link>
                <Link href="/courses" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center">
                  Xem các khóa học
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </ThemeProvider>
  )
} 