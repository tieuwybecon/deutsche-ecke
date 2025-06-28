'use client'

import React from 'react'
import { FaGlobe, FaUsers, FaHeart, FaMapMarkedAlt, FaCamera, FaUtensilSpoon, FaMusic, FaFootballBall, FaSnowflake, FaSun } from 'react-icons/fa'
import Header from '../../../components/sections/Header'
import Footer from '../../../components/sections/Footer'

export default function DatNuocPage() {
  return (
    <>
      <Header />
      
      <main className="pt-20">
        <section className="section-padding bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <div className="container-custom text-center">
            <FaGlobe className="text-6xl mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Đất Nước & Con Người Đức
            </h1>
            <p className="text-xl opacity-90">
              Khám phá văn hóa, lịch sử và cuộc sống tại quốc gia trái tim châu Âu
            </p>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Tổng Quan Về Đức
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Thông tin cơ bản</h3>
                <div className="space-y-2">
                  <div><strong>Thủ đô:</strong> Berlin</div>
                  <div><strong>Dân số:</strong> 83 triệu người</div>
                  <div><strong>Diện tích:</strong> 357,022 km²</div>
                  <div><strong>Ngôn ngữ:</strong> Tiếng Đức</div>
                  <div><strong>Tiền tệ:</strong> Euro (€)</div>
                  <div><strong>Múi giờ:</strong> UTC+1 (CET)</div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Đặc điểm nổi bật</h3>
                <div className="space-y-2">
                  <div>🏭 Kinh tế lớn thứ 4 thế giới</div>
                  <div>🎓 Hệ thống giáo dục tiên tiến</div>
                  <div>🌱 Tiên phong về năng lượng xanh</div>
                  <div>🚗 Quê hương của BMW, Mercedes, Audi</div>
                  <div>🍺 Nổi tiếng với lễ hội Oktoberfest</div>
                  <div>⚽ Vô địch World Cup 4 lần</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Văn Hóa & Truyền Thống
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl text-center">
                <FaUtensilSpoon className="text-4xl text-orange-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Ẩm thực</h3>
                <p className="text-sm text-gray-600">Bratwurst, Sauerkraut, Pretzel, Bánh mì đen</p>
              </div>

              <div className="bg-white p-6 rounded-2xl text-center">
                <FaMusic className="text-4xl text-green-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Âm nhạc</h3>
                <p className="text-sm text-gray-600">Bach, Beethoven, Wagner - Cái nôi âm nhạc cổ điển</p>
              </div>

              <div className="bg-white p-6 rounded-2xl text-center">
                <FaFootballBall className="text-4xl text-red-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Thể thao</h3>
                <p className="text-sm text-gray-600">Bóng đá, Tennis, F1 - Đội tuyển mạnh thế giới</p>
              </div>

              <div className="bg-white p-6 rounded-2xl text-center">
                <FaCamera className="text-4xl text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Lịch sử</h3>
                <p className="text-sm text-gray-600">Lâu đài, bảo tàng - Di sản UNESCO phong phú</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Cuộc Sống Hàng Ngày
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <FaUsers className="text-4xl text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Con người</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>Đúng giờ và kỷ luật</li>
                  <li>Trực tiếp và thẳng thắn</li>
                  <li>Tôn trọng quy tắc</li>
                  <li>Thân thiện và giúp đỡ</li>
                  <li>Yêu thích thiên nhiên</li>
                </ul>
              </div>

              <div className="text-center">
                <FaHeart className="text-4xl text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Phúc lợi xã hội</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>Bảo hiểm y tế toàn dân</li>
                  <li>Trợ cấp thất nghiệp</li>
                  <li>Nghỉ phép 24-30 ngày/năm</li>
                  <li>Bảo vệ quyền lợi người lao động</li>
                  <li>Hỗ trợ gia đình và trẻ em</li>
                </ul>
              </div>

              <div className="text-center">
                <FaMapMarkedAlt className="text-4xl text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Giao thông</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>Hệ thống tàu hỏa hiện đại</li>
                  <li>Xe bus đúng giờ</li>
                  <li>Đường dành cho xe đạp</li>
                  <li>Autobahn không giới hạn tốc độ</li>
                  <li>Vé tháng giao thông công cộng</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Khí Hậu & Mùa Trong Năm
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <FaSnowflake className="text-2xl text-blue-600" />
                  <h3 className="text-xl font-bold">Mùa đông (Dec - Feb)</h3>
                </div>
                <p className="text-gray-600 mb-3">Nhiệt độ: -5°C đến 5°C</p>
                <ul className="text-gray-600 space-y-1">
                  <li>• Tuyết rơi và băng giá</li>
                  <li>• Chợ Giáng sinh truyền thống</li>
                  <li>• Trượt tuyết ở Alps</li>
                  <li>• Ngày ngắn (8-9 tiếng sáng)</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <FaSun className="text-2xl text-yellow-600" />
                  <h3 className="text-xl font-bold">Mùa hè (Jun - Aug)</h3>
                </div>
                <p className="text-gray-600 mb-3">Nhiệt độ: 15°C đến 25°C</p>
                <ul className="text-gray-600 space-y-1">
                  <li>• Nắng ấm và dễ chịu</li>
                  <li>• Lễ hội beer garden</li>
                  <li>• Du lịch và picnic</li>
                  <li>• Ngày dài (16-17 tiếng sáng)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Những Điều Cần Biết Khi Sống Ở Đức
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-green-800 mb-4">👍 Nên làm</h3>
                <ul className="space-y-2">
                  <li>✓ Đúng giờ trong mọi cuộc hẹn</li>
                  <li>✓ Tách rác đúng quy định</li>
                  <li>✓ Giữ im lặng vào Chủ nhật</li>
                  <li>✓ Bắt tay khi gặp mặt</li>
                  <li>✓ Đăng ký địa chỉ khi chuyển nhà</li>
                  <li>✓ Học tiếng Đức càng sớm càng tốt</li>
                </ul>
              </div>

              <div className="bg-red-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-red-800 mb-4">👎 Không nên</h3>
                <ul className="space-y-2">
                  <li>✗ Đến muộn mà không báo trước</li>
                  <li>✗ Gây ồn ào sau 22h và Chủ nhật</li>
                  <li>✗ Băng qua đường khi đèn đỏ</li>
                  <li>✗ Không tôn trọng hàng đợi</li>
                  <li>✗ Mặc quần áo hở hang ở nơi công cộng</li>
                  <li>✗ Quên đóng cửa và khóa xe đạp</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-purple-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-6">
              Sẵn Sàng Khám Phá Đức?
            </h2>
            <p className="text-xl mb-8">
              Tìm hiểu thêm về các chương trình du học phù hợp
            </p>
            <button className="btn-primary bg-white text-purple-600 hover:bg-gray-100">
              Tư Vấn Du Học
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
} 