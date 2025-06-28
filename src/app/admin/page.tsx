'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  GraduationCap,
  Plus,
  Settings,
  FileText,
  Lightbulb,
  Target,
  PenTool,
  BarChart3
} from 'lucide-react'


interface AdminStats {
  totalStudents: number
  activeCourses: number
  monthlyRevenue: number
  completionRate: number
}

export default function AdminDashboard() {
  const [stats] = useState<AdminStats>({
    totalStudents: 486,
    activeCourses: 24,
    monthlyRevenue: 850000000,
    completionRate: 94
  })

  const [activeTab, setActiveTab] = useState('dashboard')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  // Navigation items
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: GraduationCap, isButton: true },
    { id: 'posts', label: 'Quản lý bài viết', icon: FileText, href: '/admin/posts' },
    { id: 'grammar', label: 'Quản lý ngữ pháp', icon: BookOpen, href: '/admin/grammar' },
  ]

  const contentNavItems = [
    { id: 'tips', label: 'Bí kíp học tiếng Đức', icon: Lightbulb, href: '/admin/tips' },
    { id: 'exam-guide', label: 'Hướng dẫn luyện thi', icon: Target, href: '/admin/exam-guide' },
    { id: 'exercises', label: 'Bài tập online', icon: PenTool, isButton: true },
  ]

  const systemNavItems = [
    { id: 'analytics', label: 'Thống kê', icon: BarChart3, isButton: true },
    { id: 'users', label: 'Quản lý người dùng', icon: Users, isButton: true },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                Deutsche Ecke Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                  alt="Admin"
                />
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-6">
              {/* Main Section */}
              <div>
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Tổng quan
                </h3>
                <div className="mt-2 space-y-1">
                  {mainNavItems.map((item) => (
                    item.isButton ? (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          activeTab === item.id
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        key={item.id}
                        href={item.href || '/admin'}
                        className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </Link>
                    )
                  ))}
                </div>
              </div>

              {/* Content Management Section */}
              <div>
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Quản lý nội dung
                </h3>
                <div className="mt-2 space-y-1">
                  {contentNavItems.map((item) => (
                    item.isButton ? (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          activeTab === item.id
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        key={item.id}
                        href={item.href || '/admin'}
                        className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </Link>
                    )
                  ))}
                </div>
              </div>

              {/* System Section */}
              <div>
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Hệ thống
                </h3>
                <div className="mt-2 space-y-1">
                  {systemNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h2>
                <p className="text-gray-600">Tổng quan hoạt động Deutsche Ecke</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Tổng học viên</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.totalStudents}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Khóa học đang mở</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.activeCourses}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <DollarSign className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Doanh thu tháng</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        {formatCurrency(stats.monthlyRevenue)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <GraduationCap className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Tỷ lệ hoàn thành</p>
                      <p className="text-2xl font-semibold text-gray-900">{stats.completionRate}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Thao tác nhanh</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Link
                    href="/admin/posts"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Quản lý bài viết
                  </Link>
                  <Link
                    href="/admin/grammar"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 transition-colors"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Quản lý ngữ pháp
                  </Link>
                  <Link
                    href="/admin/tips"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Bí kíp học tiếng Đức
                  </Link>
                  <Link
                    href="/admin/exam-guide"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                  >
                    <Target className="h-5 w-5 mr-2" />
                    Hướng dẫn luyện thi
                  </Link>
                </div>
              </div>
            </div>
          )}



          {/* Placeholder Sections */}
          {(activeTab === 'exercises' || activeTab === 'analytics' || activeTab === 'users') && (
            <div className="p-6">
              <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                <div className="mb-4">
                  {activeTab === 'exercises' && <PenTool className="h-12 w-12 text-gray-400 mx-auto" />}
                  {activeTab === 'analytics' && <BarChart3 className="h-12 w-12 text-gray-400 mx-auto" />}
                  {activeTab === 'users' && <Users className="h-12 w-12 text-gray-400 mx-auto" />}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab === 'exercises' && 'Bài tập online đang được phát triển'}
                  {activeTab === 'analytics' && 'Tính năng thống kê đang được phát triển'}
                  {activeTab === 'users' && 'Quản lý người dùng đang được phát triển'}
                </h3>
                <p className="text-gray-600">
                  Tính năng này sẽ được hoàn thiện trong phiên bản tiếp theo.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
} 