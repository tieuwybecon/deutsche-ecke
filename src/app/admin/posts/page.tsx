'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save, 
  X,
  Calendar,
  User,
  FileText,
  GraduationCap,
  ArrowLeft,
  Search,
  Filter,
  BookOpen,
  Clock,
  Eye as EyeIcon
} from 'lucide-react'
import SimpleRichTextEditor from '@/components/admin/SimpleRichTextEditor'

interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  status: 'published' | 'draft' | 'pending'
  createdAt: string
  updatedAt: string
  author: string
  category: string
}

export default function PostsManagement() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    status: 'draft' as 'published' | 'draft' | 'pending',
    category: 'tin-tuc'
  })

  // Load posts từ API
  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/admin/posts')
      const data = await response.json()
      if (data.success) {
        setPosts(data.data)
      }
    } catch (error) {
      console.error('Lỗi load posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingPost ? '/api/admin/posts' : '/api/admin/posts'
      const method = editingPost ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          ...(editingPost && { id: editingPost.id })
        }),
      })

      const data = await response.json()
      if (data.success) {
        setShowModal(false)
        setEditingPost(null)
        resetForm()
        loadPosts() // Reload danh sách
        alert(editingPost ? 'Cập nhật bài viết thành công!' : 'Thêm bài viết thành công!')
      } else {
        alert('Lỗi: ' + data.message)
      }
    } catch (error) {
      alert('Lỗi khi lưu bài viết')
    }
  }

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      status: post.status,
      category: post.category
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return

    try {
      const response = await fetch(`/api/admin/posts?id=${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (data.success) {
        loadPosts()
        alert('Xóa bài viết thành công!')
      } else {
        alert('Lỗi: ' + data.message)
      }
    } catch (error) {
      alert('Lỗi khi xóa bài viết')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      status: 'draft',
      category: 'tin-tuc'
    })
  }

  const openAddModal = () => {
    setEditingPost(null)
    resetForm()
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingPost(null)
    resetForm()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'draft': return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'pending': return 'bg-blue-50 text-blue-700 border-blue-200'
      default: return 'bg-slate-50 text-slate-700 border-slate-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Đã xuất bản'
      case 'draft': return 'Bản nháp'
      case 'pending': return 'Chờ duyệt'
      default: return status
    }
  }

  const getCategoryName = (category: string) => {
    const categories: { [key: string]: string } = {
      'tin-tuc': 'Tin tức',
      'khoa-hoc': 'Khóa học',
      'du-hoc': 'Du học',
      'kinh-nghiem': 'Kinh nghiệm',
      'su-kien': 'Sự kiện'
    }
    return categories[category] || category
  }

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const publishedCount = posts.filter(p => p.status === 'published').length
  const draftCount = posts.filter(p => p.status === 'draft').length
  const pendingCount = posts.filter(p => p.status === 'pending').length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-ping mx-auto"></div>
          </div>
          <div className="text-xl font-medium text-slate-700">Đang tải dữ liệu...</div>
          <div className="text-sm text-slate-500 mt-2">Vui lòng chờ một chút</div>
        </div>
      </div>
    )
  }

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
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                  <BookOpen className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-slate-800">
                    Quản Lý Bài Viết
                  </h1>
                  <p className="text-sm text-slate-600">Tạo và quản lý nội dung website</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={openAddModal}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
              >
                <Plus className="h-5 w-5 mr-2" />
                Thêm Bài Viết Mới
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Tổng bài viết</p>
                <p className="text-3xl font-bold text-slate-800">{posts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                <EyeIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Đã xuất bản</p>
                <p className="text-3xl font-bold text-slate-800">{publishedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg">
                <Edit className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Bản nháp</p>
                <p className="text-3xl font-bold text-slate-800">{draftCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Chờ duyệt</p>
                <p className="text-3xl font-bold text-slate-800">{pendingCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm bài viết theo tiêu đề hoặc nội dung..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-slate-700 placeholder-slate-400 font-medium"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-xl border border-slate-200 px-4 py-2">
                <Filter className="h-5 w-5 text-slate-500 mr-3" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent border-none outline-none text-slate-700 font-medium cursor-pointer"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="published">Đã xuất bản</option>
                  <option value="draft">Bản nháp</option>
                  <option value="pending">Chờ duyệt</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">Danh Sách Bài Viết</h2>
              <div className="bg-slate-100 px-4 py-2 rounded-full">
                <span className="text-sm font-semibold text-slate-600">{filteredPosts.length} bài viết</span>
              </div>
            </div>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <div className="p-6 bg-slate-100 rounded-full w-fit mx-auto mb-6">
                  <FileText className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-xl font-semibold mb-3 text-slate-700">
                  {posts.length === 0 ? 'Chưa có bài viết nào' : 'Không tìm thấy bài viết'}
                </p>
                <p className="text-slate-500 max-w-md mx-auto">
                  {posts.length === 0 ? 'Hãy thêm bài viết đầu tiên để bắt đầu chia sẻ nội dung với độc giả!' : 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc để tìm bài viết mong muốn'}
                </p>
                {posts.length === 0 && (
                  <button
                    onClick={openAddModal}
                    className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Thêm Bài Viết Đầu Tiên
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-xl p-6 hover:bg-white/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(post.status)}`}>
                            {getStatusText(post.status)}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            {getCategoryName(post.category)}
                          </span>
                        </div>
                        <p className="text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                          {post.excerpt || post.content.substring(0, 200) + '...'}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-slate-500">
                          <div className="flex items-center font-medium">
                            <User className="h-4 w-4 mr-2" />
                            {post.author}
                          </div>
                          <div className="flex items-center font-medium">
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(post.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-6 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-blue-200 hover:border-blue-300"
                          title="Chỉnh sửa"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors border border-red-200 hover:border-red-300"
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {editingPost ? 'Chỉnh Sửa Bài Viết' : 'Thêm Bài Viết Mới'}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {editingPost ? 'Cập nhật thông tin bài viết' : 'Tạo nội dung mới để chia sẻ'}
                </p>
              </div>
              <button 
                onClick={closeModal} 
                className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Tiêu đề bài viết *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 font-medium bg-white/80 placeholder-slate-500"
                  placeholder="Nhập tiêu đề hấp dẫn cho bài viết..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Tóm tắt (Excerpt)
                </label>
                <SimpleRichTextEditor
                  value={formData.excerpt}
                  onChange={val => setFormData({...formData, excerpt: val})}
                  rows={3}
                  placeholder="Tóm tắt ngắn gọn và thu hút về nội dung bài viết..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">
                  Nội dung bài viết *
                </label>
                <SimpleRichTextEditor
                  value={formData.content}
                  onChange={val => setFormData({...formData, content: val})}
                  rows={12}
                  placeholder="Viết nội dung chi tiết cho bài viết..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Danh mục
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 font-medium bg-white/80"
                  >
                    <option value="tin-tuc">Tin tức</option>
                    <option value="khoa-hoc">Khóa học</option>
                    <option value="du-hoc">Du học</option>
                    <option value="kinh-nghiem">Kinh nghiệm</option>
                    <option value="su-kien">Sự kiện</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    Trạng thái
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 font-medium bg-white/80"
                  >
                    <option value="draft">Bản nháp</option>
                    <option value="pending">Chờ duyệt</option>
                    <option value="published">Xuất bản</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors font-medium"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingPost ? 'Cập nhật bài viết' : 'Thêm bài viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 