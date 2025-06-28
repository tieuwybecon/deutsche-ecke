'use client'

import { PenTool, Clock, Target, BookOpen } from 'lucide-react'

export default function BaiTapOnlinePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <PenTool className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bài Tập Online</h1>
          <p className="text-xl text-gray-600">Luyện tập tiếng Đức với các bài tập tương tác</p>
        </div>

        {/* Coming Soon Section */}
        <div className="text-center py-12">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <div className="bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <PenTool className="w-12 h-12 text-blue-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Đang phát triển</h2>
            <p className="text-gray-600 mb-8">
              Hệ thống bài tập online đang được phát triển với nhiều tính năng thú vị. 
              Sắp tới bạn sẽ có thể luyện tập với:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-lg p-2">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Bài tập trắc nghiệm</h3>
                  <p className="text-sm text-gray-600">Kiểm tra kiến thức với câu hỏi lựa chọn</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 rounded-lg p-2">
                  <PenTool className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Bài tập điền từ</h3>
                  <p className="text-sm text-gray-600">Hoàn thiện câu với từ vựng phù hợp</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-yellow-100 rounded-lg p-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Luyện tập có thời gian</h3>
                  <p className="text-sm text-gray-600">Tăng tốc độ làm bài với giới hạn thời gian</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 rounded-lg p-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Phân loại theo cấp độ</h3>
                  <p className="text-sm text-gray-600">Bài tập từ A1 đến B2</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <strong>Thông báo:</strong> Tính năng này sẽ được cập nhật bởi admin trong thời gian sớm nhất.
                Hãy theo dõi để không bỏ lỡ những bài tập thú vị!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 