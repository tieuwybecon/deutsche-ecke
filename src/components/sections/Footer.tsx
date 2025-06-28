'use client'

import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">Deutsche Ecke</h3>
            <p className="text-gray-400">Trung tâm tiếng Đức hàng đầu Việt Nam</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Khóa học</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Tiếng Đức A1</li>
                <li>Tiếng Đức A2</li>
                <li>Tiếng Đức B1</li>
                <li>Tiếng Đức B2</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Dịch vụ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Du học Đức</li>
                <li>Luyện thi</li>
                <li>Gia sư 1:1</li>
                <li>Nhóm học</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Liên hệ</li>
                <li>FAQ</li>
                <li>Chính sách</li>
                <li>Hướng dẫn</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Liên hệ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>077.024.240</li>
                <li>info@dek.edu.vn</li>
                <li>123 Đường ABC, Hà Nội</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              © 2024 Deutsche Ecke. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 