'use client'

import React, { useState, useEffect } from 'react'
import { FaTools, FaEuroSign, FaCheck, FaCar, FaHeart, FaBuilding, FaCog, FaArrowUp, FaPhone, FaWhatsapp, FaSpinner } from 'react-icons/fa'
import Header from '../../../components/sections/Header'
import Footer from '../../../components/sections/Footer'

export default function NgHePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeTab, setActiveTab] = useState('vietnam')

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000)
    
    // Scroll to top handler
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <FaSpinner className="text-6xl text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Đang tải...</h2>
          <p className="text-gray-600">Chuẩn bị thông tin du học nghề Đức</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      
      <main className="pt-20">
        {/* Hero Section with enhanced animations */}
        <section className="section-padding bg-gradient-to-br from-green-600 via-green-700 to-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container-custom text-center relative z-10">
            <div className="animate-fade-in-up">
              <FaTools className="text-6xl mx-auto mb-6 animate-bounce" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Du Học Nghề Tại CHLB Đức
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">
                Chương trình Ausbildung - Học và làm việc, có lương từ ngày đầu
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg">
                  📞 Tư vấn miễn phí
                </button>
                <button className="bg-yellow-500 text-white px-8 py-4 rounded-full font-bold hover:bg-yellow-600 transition-all hover:scale-105 shadow-lg">
                  📋 Đăng ký ngay
                </button>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/10 rounded-full animate-float-delayed"></div>
          <div className="absolute top-1/2 right-20 w-12 h-12 bg-white/10 rounded-full animate-float"></div>
        </section>

        {/* Ausbildung Introduction with cards animation */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Ausbildung Là Gì?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6 text-green-600">Đặc điểm nổi bật:</h3>
                <div className="space-y-4">
                  {[
                    "50% học lý thuyết, 50% thực hành",
                    "Có lương 700-1200€/tháng",
                    "95% có việc làm sau tốt nghiệp", 
                    "Thời gian 2-3.5 năm"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      <FaCheck className="text-green-500 text-xl flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold mb-6 text-blue-600">Quy trình 5 bước:</h3>
                <div className="space-y-4">
                  {[
                    "Tìm công ty tuyển dụng",
                    "Ký hợp đồng đào tạo", 
                    "Học lý thuyết + thực hành",
                    "Thi lấy chứng chỉ nghề",
                    "Làm việc chính thức"
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lộ trình với tabs */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Lộ Trình Du Học Nghề Tại CHLB Đức
            </h2>
            
            {/* Tab Navigation */}
            <div className="flex flex-col sm:flex-row justify-center mb-12 bg-white rounded-full p-2 shadow-lg max-w-md mx-auto">
              <button
                onClick={() => setActiveTab('vietnam')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === 'vietnam'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                🇻🇳 Tại Việt Nam
              </button>
              <button
                onClick={() => setActiveTab('germany')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === 'germany'
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                🇩🇪 Tại Đức
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'vietnam' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">
                  Giai đoạn 1: Tại Việt Nam
                </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                  <h4 className="font-bold mb-3 text-blue-800 text-center">Tuyển sinh & Tư vấn</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Tư vấn và giới thiệu về chương trình</li>
                    <li>• Giới thiệu về nước Đức, những chuyển đổi và các chi phí tại Đức</li>
                    <li>• Trả lời các câu hỏi và thắc mắc của học sinh và phụ huynh</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                  <h4 className="font-bold mb-3 text-green-800 text-center">Đào tạo ngoại ngữ & ôn thi</h4>
                  <p className="text-sm text-orange-600 font-medium mb-2 text-center">(10-12 tháng)</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Đào tạo tiếng Đức từ A1-B1</li>
                    <li>• Có giáo viên người Đức cho các khóa từ A2 trở đi</li>
                    <li>• Học bổ sung từ vựng B1 chuyên ngành</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                  <h4 className="font-bold mb-3 text-orange-800 text-center">Hoàn thiện hồ sơ & xuất cảnh</h4>
                  <p className="text-sm text-orange-600 font-medium mb-2 text-center">(2-3 tháng)</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Hỗ trợ hoàn thiện hồ sơ, xin lịch Visa & phỏng vấn</li>
                    <li>• Các công việc giấy tờ sẽ được triển khai trong lúc các bạn học B1 để rút ngắn thời gian xin Visa</li>
                    <li>• 5 Dịch vụ sau xuất cảnh</li>
                  </ul>
                </div>
              </div>
              </div>
            )}

            {activeTab === 'germany' && (
              <div className="animate-fade-in">
              <h3 className="text-2xl font-bold text-purple-800 mb-6 text-center">
                Giai đoạn 2: Tại CHLB Đức
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
                  <h4 className="font-bold mb-3 text-purple-800 text-center">Làm quen với môi trường</h4>
                  <p className="text-sm text-orange-600 font-medium mb-2 text-center">(2-3 tuần)</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Đón học sinh tại sân bay và đưa về nhà ở</li>
                    <li>• Giới thiệu chung về nơi ở, công ty, nhà máy, đồng nghiệp vv</li>
                    <li>• Hướng dẫn về hỗ trợ các thủ tục bắt buộc sau khi nhập cảnh tại CHLB Đức</li>
                    <li>• 5 Dịch vụ sau xuất cảnh</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">5</div>
                  <h4 className="font-bold mb-3 text-red-800 text-center">Học nghề ở CHLB Đức</h4>
                  <p className="text-sm text-orange-600 font-medium mb-2 text-center">(36 tháng)</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Học nghề trong thời gian 3 năm</li>
                    <li>• Lương nhận được từ 600-1200€ (Tùy ngành nghề)</li>
                    <li>• Học thêm tiếng Đức B2</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl">
                  <div className="w-12 h-12 bg-yellow-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">6</div>
                  <h4 className="font-bold mb-3 text-yellow-800 text-center">Tốt nghiệp và làm việc chính thức</h4>
                  <p className="text-sm text-orange-600 font-medium mb-2 text-center">(tối thiểu 2 năm)</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Sau khi tốt nghiệp chương trình học nghề, các học viên sẽ trở thành nhân viên/công nhân chính thức</li>
                    <li>• Được phép làm việc cho công ty đang học nghề hoặc lựa chọn làm việc ở một nơi khác</li>
                    <li>• Các bạn viên được tư vấn và hỗ trợ về pháp lý khi cần thiết</li>
                    <li>• 5 Dịch vụ sau xuất cảnh</li>
                  </ul>
                </div>
              </div>
              </div>
            )}
          </div>
        </section>

        {/* Đối tượng tham gia */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Đối Tượng Tham Gia Chương Trình Du Học Nghề Đức
            </h2>
            
            <div className="bg-blue-50 p-6 rounded-2xl mb-8">
              <p className="text-gray-700 text-center">
                Các học sinh có nhu cầu học nghề tại CHLB Đức trong các ngành sau:
                <strong> Điều dưỡng • Nhà hàng - khách sạn • Cơ khí • Thợ làm bánh • Chuôi nhờ hàng thực ăn nhanh • Đầu bếp</strong>
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-gray-300 rounded-2xl overflow-hidden shadow-lg">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">STT</th>
                    <th className="px-6 py-4 text-left font-bold">Tiêu chí</th>
                    <th className="px-6 py-4 text-left font-bold">Tiêu chuẩn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-bold text-blue-600">1</td>
                    <td className="px-6 py-4 font-medium">Tuổi</td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div>• Tuổi 18 tuổi trở lên</div>
                        <div>• Tốt nghiệp trung học phổ thông</div>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="px-6 py-4 font-bold text-blue-600">2</td>
                    <td className="px-6 py-4 font-medium">Học lực</td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div>• Điểm trung bình môn Ngoại ngữ trong học bạ tối thiểu 6.5</div>
                        <div>• Hoặc điểm trung bình 3 năm tối thiểu 6.5</div>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-bold text-blue-600">3</td>
                    <td className="px-6 py-4 font-medium">Thời gian trống</td>
                    <td className="px-6 py-4">
                      <div>• Nếu có thời gian trống sau tốt nghiệp, phải có xác nhận công tác của nơi làm việc (Chi rõ về chức vụ, công việc và có đầu của đơn vị)</div>
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="px-6 py-4 font-bold text-blue-600">4</td>
                    <td className="px-6 py-4 font-medium">Sức khỏe</td>
                    <td className="px-6 py-4">
                      <div className="space-y-3">
                        <div>• Có đủ điều kiện sức khỏe để đi học tập và làm việc tại nước ngoài (có giấy khám sức khỏe sơ bộ của bệnh viện cấp huyện/ quận khi nộp hồ sơ đăng ký Visa)</div>
                        <div>• Không mắc các bệnh truyền nhiễm (Lao phổi, các bệnh cúm virus, HIV vv.)</div>
                        <div>• Không có khuyết tật về hình thể</div>
                        
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <div className="font-medium text-yellow-800 mb-2">* Đối với bệnh viêm gan:</div>
                          <div className="space-y-1 text-sm">
                            <div>• <strong>Viêm gan A:</strong> Yêu cầu chữa trị và xét nghiệm lại trước khi xuất cảnh 3 tháng</div>
                            <div>• <strong>Viêm gan B:</strong></div>
                            <div className="ml-4">+ Nếu cấp tính: Yêu cầu xét nghiệm lại sau 6 tháng. Nếu không khỏi thì trở thành mãn tính.</div>
                            <div className="ml-4">+ Nếu mãn tính: Không tham gia chương trình</div>
                            <div>• <strong>Viêm gan C:</strong> Không tham gia chương trình</div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-bold text-blue-600">5</td>
                    <td className="px-6 py-4 font-medium">Nhân khẩu</td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div>• Không có thời trước khi xuất cảnh</div>
                        <div>• Học sinh không bị cấm xuất nhập cảnh</div>
                        <div>• Chưa bị từ chối xin Visa Đức hoặc các nước trong khối EU</div>
                      </div>
                    </td>
                  </tr>

                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-bold text-blue-600">6</td>
                    <td className="px-6 py-4 font-medium">Tiêu chí thêm</td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div>• Có động lực chính đáng cho việc học nghề/ làm việc tại Đức (Thông qua phỏng vấn)</div>
                        <div>• Có năng lực học ngoại ngữ tốt (Thông qua quá trình đào tạo)</div>
                        <div>• Chủ động, hăm học và tích cực (Thông qua quá trình đào tạo)</div>
                        <div>• <span className="text-green-600 font-medium">Có bằng lái xe ô tô sẽ là một lợi thế lớn</span></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 bg-green-50 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-green-800 mb-4 text-center">Lưu ý quan trọng</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <div className="font-medium text-green-700 mb-2">✓ Yêu cầu bắt buộc:</div>
                  <ul className="space-y-1">
                    <li>• Giấy khám sức khỏe từ bệnh viện cấp huyện/quận</li>
                    <li>• Bằng tốt nghiệp THPT</li>
                    <li>• Học bạ 3 năm THPT</li>
                    <li>• Hộ khẩu, CMND/CCCD</li>
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-green-700 mb-2">⭐ Lợi thế cộng thêm:</div>
                  <ul className="space-y-1">
                    <li>• Có bằng lái xe ô tô</li>
                    <li>• Điểm ngoại ngữ cao</li>
                    <li>• Kinh nghiệm làm việc liên quan</li>
                    <li>• Khả năng giao tiếp tốt</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lợi ích cho học sinh */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Lợi Ích Cho Học Sinh
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Trình độ */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="font-bold mb-4 text-blue-800 text-center">Trình độ</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Nhận chứng chỉ ngành nghề Đức có giá trị toàn châu Âu</li>
                  <li>• Nâng cao trình độ tiếng Đức</li>
                  <li>• Có điều kiện chuyển từ theo đường chuyên ngành</li>
                </ul>
              </div>

              {/* Cơ hội tương lai */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="font-bold mb-4 text-green-800 text-center">Cơ hội tương lai</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Đảm bảo việc làm và định cư lâu dài tại Đức</li>
                  <li>• Có thể đón người thân qua Đức trong thời gian làm việc</li>
                  <li>• Được phép định cư vĩnh viễn sau 4 năm làm động (có đóng thuế) tại Đức và có thể đoàn tụ gia đình</li>
                  <li>• Sau 5 năm định cư tại Đức có thể nhập quốc tịch</li>
                </ul>
              </div>

              {/* Thu nhập */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaEuroSign className="text-2xl" />
                </div>
                <h3 className="font-bold mb-4 text-yellow-800 text-center">Thu nhập</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong className="text-green-600">Lương 2.000 - 2.800 €/tháng</strong> (trước thuế) sau khi học nghề</li>
                  <li>• Mức lương tăng dần theo thời gian làm việc tại công ty, nhà máy</li>
                  <li>• Thu nhập ổn định và có bảo đảm xã hội đầy đủ</li>
                </ul>
              </div>

              {/* Trải nghiệm */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✈️</span>
                </div>
                <h3 className="font-bold mb-4 text-purple-800 text-center">Trải nghiệm</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong className="text-blue-600">Tự do đi lại 26 nước trong khối Schengen</strong></li>
                  <li>• Trải nghiệm văn hóa và môi trường làm việc châu Âu</li>
                  <li>• Phát triển kỹ năng ngôn ngữ và giao tiếp quốc tế</li>
                </ul>
              </div>
            </div>

            {/* Thông tin bổ sung */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                  <FaCheck className="text-green-500" />
                  Lợi ích trong quá trình học
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Lương học nghề: 700-1200€/tháng</li>
                  <li>• Bảo hiểm y tế, xã hội đầy đủ</li>
                  <li>• 95% có việc làm sau tốt nghiệp</li>
                  <li>• Hỗ trợ chỗ ở và sinh hoạt ban đầu</li>
                  <li>• Môi trường học tập chuyên nghiệp</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <FaHeart className="text-red-500" />
                  Lợi ích lâu dài
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Cơ hội định cư và nhập quốc tịch</li>
                  <li>• Đoàn tụ gia đình tại Đức</li>
                  <li>• Phúc lợi xã hội như công dân Đức</li>
                  <li>• Tự do di chuyển trong EU</li>
                  <li>• Cơ hội phát triển sự nghiệp không giới hạn</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-3">Cam kết từ Deutsche Ecke</h3>
              <p className="text-lg opacity-90">
                Chúng tôi cam kết đồng hành cùng học sinh từ khi bắt đầu học tiếng Đức đến khi ổn định cuộc sống tại Đức
              </p>
            </div>
          </div>
        </section>

        {/* Các chương trình đang tuyển sinh */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Các Chương Trình Đang Tuyển Sinh
            </h2>
            
            {/* Banner chương trình */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl mb-12 text-center">
              <h3 className="text-2xl font-bold mb-4">DU HỌC NGHỀ ĐỨC</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/20 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Bao gồm:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Học tiếng Đức A1-B1</li>
                    <li>• Dịch vụ trọn gói</li>
                    <li>• Vé máy bay</li>
                  </ul>
                </div>
                <div className="bg-white/20 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Các ngành học:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• KONDITOR (Thợ làm bánh)</li>
                    <li>• HOFA (Khách sạn)</li>
                    <li>• REFA (Cơ khí)</li>
                    <li>• KOCH (Đầu bếp)</li>
                    <li>• KRANKENPFLEGER (Điều dưỡng)</li>
                  </ul>
                </div>
                <div className="bg-white/20 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Liên hệ:</h4>
                  <p className="text-lg font-bold">0777.024.240</p>
                  <p className="text-sm">Deutsche Ecke</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Điều dưỡng */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center">
                    <FaHeart className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-800">Điều dưỡng</h3>
                    <p className="text-sm text-gray-600">Krankenpfleger/-in</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Thời gian đào tạo:</span>
                    <span className="font-medium bg-red-100 px-2 py-1 rounded">3 năm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lương học nghề:</span>
                    <span className="font-medium text-green-600">1100-1400€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Yêu cầu tiếng Đức:</span>
                    <span className="font-medium">B2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Trạng thái:</span>
                    <span className="font-medium text-green-600 bg-green-100 px-2 py-1 rounded">🟢 Đang tuyển</span>
                  </div>
                </div>
                <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
                  Đăng ký tư vấn
                </button>
              </div>

              {/* Nhà hàng - Khách sạn */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏨</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-yellow-800">Nhà hàng - Khách sạn</h3>
                    <p className="text-sm text-gray-600">Hotelfachmann/-frau</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Thời gian đào tạo:</span>
                    <span className="font-medium bg-yellow-100 px-2 py-1 rounded">3 năm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lương học nghề:</span>
                    <span className="font-medium text-green-600">700-1000€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Yêu cầu tiếng Đức:</span>
                    <span className="font-medium">B1-B2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Trạng thái:</span>
                    <span className="font-medium text-green-600 bg-green-100 px-2 py-1 rounded">🟢 Đang tuyển</span>
                  </div>
                </div>
                <button className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors font-medium">
                  Đăng ký tư vấn
                </button>
              </div>

              {/* Cơ khí */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center">
                    <FaCog className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-800">Cơ khí</h3>
                    <p className="text-sm text-gray-600">Zerspanungsmechaniker</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Thời gian đào tạo:</span>
                    <span className="font-medium bg-blue-100 px-2 py-1 rounded">3.5 năm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lương học nghề:</span>
                    <span className="font-medium text-green-600">950-1300€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Yêu cầu tiếng Đức:</span>
                    <span className="font-medium">B1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Trạng thái:</span>
                    <span className="font-medium text-green-600 bg-green-100 px-2 py-1 rounded">🟢 Đang tuyển</span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Đăng ký tư vấn
                </button>
              </div>

              {/* Thợ làm bánh */}
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center">
                    <span className="text-2xl">🧁</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-pink-800">Thợ làm bánh</h3>
                    <p className="text-sm text-gray-600">Konditor/-in</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Thời gian đào tạo:</span>
                    <span className="font-medium bg-pink-100 px-2 py-1 rounded">3 năm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lương học nghề:</span>
                    <span className="font-medium text-green-600">800-1100€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Yêu cầu tiếng Đức:</span>
                    <span className="font-medium">B1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Trạng thái:</span>
                    <span className="font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded">🟡 Sắp mở</span>
                  </div>
                </div>
                <button className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium">
                  Đăng ký tư vấn
                </button>
              </div>

              {/* Chuỗi nhà hàng thức ăn nhanh */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center">
                    <span className="text-2xl">🍔</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-orange-800">Thức ăn nhanh</h3>
                    <p className="text-sm text-gray-600">Systemgastronomy</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Thời gian đào tạo:</span>
                    <span className="font-medium bg-orange-100 px-2 py-1 rounded">3 năm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lương học nghề:</span>
                    <span className="font-medium text-green-600">700-950€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Yêu cầu tiếng Đức:</span>
                    <span className="font-medium">B1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Trạng thái:</span>
                    <span className="font-medium text-green-600 bg-green-100 px-2 py-1 rounded">🟢 Đang tuyển</span>
                  </div>
                </div>
                <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium">
                  Đăng ký tư vấn
                </button>
              </div>

              {/* Đầu bếp */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍🍳</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-800">Đầu bếp</h3>
                    <p className="text-sm text-gray-600">Koch/Köchin</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Thời gian đào tạo:</span>
                    <span className="font-medium bg-green-100 px-2 py-1 rounded">3 năm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lương học nghề:</span>
                    <span className="font-medium text-green-600">750-1100€</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Yêu cầu tiếng Đức:</span>
                    <span className="font-medium">B1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Trạng thái:</span>
                    <span className="font-medium text-green-600 bg-green-100 px-2 py-1 rounded">🟢 Đang tuyển</span>
                  </div>
                </div>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                  Đăng ký tư vấn
                </button>
              </div>
            </div>

            {/* Thông tin liên hệ */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-4">Đăng ký ngay hôm nay!</h3>
              <p className="text-lg mb-6">Chúng tôi cam kết hỗ trợ bạn từ A đến Z trong hành trình du học nghề tại Đức</p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                  📞 Gọi ngay: 0777.024.240
                </button>
                <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors">
                  📝 Đăng ký tư vấn miễn phí
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bắt Đầu Hành Trình Du Học Nghề
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Được tư vấn miễn phí về ngành nghề và cơ hội việc làm
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a href="tel:0777024240" className="bg-white text-green-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg flex items-center gap-2">
                <FaPhone className="text-lg" />
                Gọi ngay: 0777.024.240
              </a>
              <a href="https://wa.me/84777024240" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition-all hover:scale-105 shadow-lg flex items-center gap-2">
                <FaWhatsapp className="text-lg" />
                Chat WhatsApp
              </a>
            </div>
            <div className="text-center opacity-80">
              <p className="text-sm">🕒 Hỗ trợ 24/7 | 🎯 Tư vấn miễn phí | ✅ Cam kết chất lượng</p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
        )}
        <a
          href="tel:0777024240"
          className="w-12 h-12 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 flex items-center justify-center animate-pulse"
          aria-label="Call now"
        >
          <FaPhone />
        </a>
        <a
          href="https://wa.me/84777024240"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center"
          aria-label="WhatsApp"
        >
          <FaWhatsapp />
        </a>
      </div>

      <Footer />
    </>
  )
} 