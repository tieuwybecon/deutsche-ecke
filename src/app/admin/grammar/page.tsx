'use client'

import Link from 'next/link'
import { ArrowLeft, BookOpen, GraduationCap } from 'lucide-react'
import GrammarManager from '@/components/admin/GrammarManager'

export default function AdminGrammarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/admin" className="flex items-center text-slate-600 hover:text-slate-800 mr-6 transition-colors group">
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Quay lại Dashboard</span>
              </Link>
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-slate-800">
                    Quản Lý Ngữ Pháp
                  </h1>
                  <p className="text-sm text-slate-600">Tạo và quản lý bài học ngữ pháp tiếng Đức</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Hệ thống hoạt động</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Welcome Card */}
            <div className="md:col-span-2 bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 mb-3">
                    Chào mừng đến với Hệ thống Quản lý Ngữ pháp
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Tạo và quản lý các bài học ngữ pháp tiếng Đức với nội dung phong phú bao gồm video YouTube, 
                    bài tập trắc nghiệm và hình ảnh minh họa.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200">
                      Hỗ trợ A1-B2
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                      Video YouTube
                    </span>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium border border-amber-200">
                      Bài tập trắc nghiệm
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-lg">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Tính năng nổi bật</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  <span className="text-slate-600 font-medium">Rich text editor với Markdown</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-slate-600 font-medium">Nhúng video YouTube</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                  <span className="text-slate-600 font-medium">Tạo quiz tương tác</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-slate-600 font-medium">Upload hình ảnh</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  <span className="text-slate-600 font-medium">Responsive design</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grammar Manager */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
          <GrammarManager />
        </div>
      </main>
    </div>
  )
} 