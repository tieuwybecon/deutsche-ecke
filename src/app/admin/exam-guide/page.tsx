'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Calendar,
  User,
  FileText,
  ArrowLeft,
  Search,
  Filter,
  Clock,
  Eye as EyeIcon,
  Target,
  Upload,
  Image,
  Video,
  Trash,
  Play
} from 'lucide-react'
import SimpleRichTextEditor from '@/components/admin/SimpleRichTextEditor'
import { useRouter } from 'next/navigation'

interface ExamGuidePost {
  id: string
  title: string
  content: string
  excerpt: string
  status: 'published' | 'draft' | 'pending'
  author: string
  images: string[]
  videoUrls: string[]
  order: number
  createdAt: string
  updatedAt: string
}

export default function ExamGuideManagement() {
  const [posts, setPosts] = useState<ExamGuidePost[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPost, setEditingPost] = useState<ExamGuidePost | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [activeTab, setActiveTab] = useState<'content' | 'images' | 'videos'>('content')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [newVideoUrl, setNewVideoUrl] = useState('')
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    status: 'draft' as 'published' | 'draft' | 'pending',
    images: [] as string[],
    videoUrls: [] as string[],
    order: 0
  })

  const tabs = [
    { id: 'content', label: 'Nội dung', icon: FileText },
    { id: 'images', label: 'Hình ảnh', icon: Image },
    { id: 'videos', label: 'Video', icon: Video }
  ]

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    if (!token) {
      router.push('/admin/login');
    }
  }, [router]);

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const response = await fetch('/api/admin/exam-guide')
      const data = await response.json()
      if (data.success) {
        setPosts(data.data)
      }
    } catch (error) {
      console.error('Lỗi load exam guides:', error)
    } finally {
      setLoading(false)
    }
  }

  const isValidYouTubeUrl = (url: string): boolean => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    return regex.test(url)
  }

  const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const url = '/api/admin/exam-guide'
      const method = editingPost ? 'PUT' : 'POST'
      const payload = editingPost 
        ? { id: editingPost.id, ...formData }
        : formData

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()
      if (data.success) {
        setShowModal(false)
        setEditingPost(null)
        resetForm()
        loadPosts()
        alert(editingPost ? 'Cập nhật hướng dẫn thành công!' : 'Thêm hướng dẫn thành công!')
      } else {
        alert('Lỗi: ' + data.message)
      }
    } catch (error) {
      alert('Lỗi khi lưu hướng dẫn')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (post: ExamGuidePost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      status: post.status,
      images: post.images || [],
      videoUrls: post.videoUrls || [],
      order: post.order
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa hướng dẫn này?')) return

    try {
      const response = await fetch(`/api/admin/exam-guide?id=${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      if (data.success) {
        loadPosts()
        alert('Xóa hướng dẫn thành công!')
      } else {
        alert('Lỗi: ' + data.message)
      }
    } catch (error) {
      alert('Lỗi khi xóa hướng dẫn')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      status: 'draft',
      images: [],
      videoUrls: [],
      order: 0
    })
    setNewVideoUrl('')
    setActiveTab('content')
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

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      
      if (data.success) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, data.data.url]
        }))
        alert('Upload hình ảnh thành công!')
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert('Lỗi khi upload hình ảnh')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleVideoAdd = () => {
    if (!newVideoUrl.trim()) {
      alert('Vui lòng nhập URL video')
      return
    }
    
    if (!isValidYouTubeUrl(newVideoUrl)) {
      alert('URL YouTube không hợp lệ')
      return
    }

    setFormData(prev => ({
      ...prev,
      videoUrls: [...prev.videoUrls, newVideoUrl.trim()]
    }))
    setNewVideoUrl('')
  }

  const handleVideoRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videoUrls: prev.videoUrls.filter((_, i) => i !== index)
    }))
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

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const publishedCount = posts.filter(p => p.status === 'published').length
  const draftCount = posts.filter(p => p.status === 'draft').length
  const pendingCount = posts.filter(p => p.status === 'pending').length

  if (loading && !showModal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-700 font-medium text-lg">Đang tải dữ liệu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link href="/admin" className="flex items-center text-slate-600 hover:text-slate-800 mr-6 transition-colors group">
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Quay lại Dashboard</span>
              </Link>
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-slate-800">
                    Quản Lý Hướng Dẫn Luyện Thi
                  </h1>
                  <p className="text-sm text-slate-600">Tạo và quản lý hướng dẫn luyện thi tiếng Đức</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={openAddModal}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
              >
                <Plus className="h-5 w-5 mr-2" />
                Thêm Hướng Dẫn Mới
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
            <div className="flex items-center">
              <div className="p-4 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl shadow-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Tổng hướng dẫn</p>
                <p className="text-3xl font-bold text-slate-800">{posts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
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

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
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

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20">
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
                  placeholder="Tìm kiếm hướng dẫn theo tiêu đề hoặc nội dung..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/50 backdrop-blur-sm text-slate-700 placeholder-slate-400 font-medium"
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
              <h2 className="text-2xl font-bold text-slate-800">Danh Sách Hướng Dẫn</h2>
              <div className="bg-slate-100 px-4 py-2 rounded-full">
                <span className="text-sm font-semibold text-slate-600">{filteredPosts.length} hướng dẫn</span>
              </div>
            </div>
            
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <div className="p-6 bg-slate-100 rounded-full w-fit mx-auto mb-6">
                  <Target className="h-16 w-16 text-slate-400" />
                </div>
                <p className="text-xl font-semibold mb-3 text-slate-700">
                  {posts.length === 0 ? 'Chưa có hướng dẫn nào' : 'Không tìm thấy hướng dẫn'}
                </p>
                <p className="text-slate-500 max-w-md mx-auto">
                  {posts.length === 0 ? 'Hãy thêm hướng dẫn đầu tiên để chia sẻ chiến lược luyện thi!' : 'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc'}
                </p>
                {posts.length === 0 && (
                  <button
                    onClick={openAddModal}
                    className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Thêm Hướng Dẫn Đầu Tiên
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
                          <h3 className="text-xl font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
                            {post.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(post.status)}`}>
                            {getStatusText(post.status)}
                          </span>
                          {post.images.length > 0 && (
                            <span className="flex items-center text-xs text-slate-500">
                              <Image className="h-3 w-3 mr-1" />
                              {post.images.length}
                            </span>
                          )}
                          {post.videoUrls.length > 0 && (
                            <span className="flex items-center text-xs text-slate-500">
                              <Video className="h-3 w-3 mr-1" />
                              {post.videoUrls.length}
                            </span>
                          )}
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
                          <div className="flex items-center font-medium">
                            Thứ tự: {post.order}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-6 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(post)}
                          className="p-3 text-purple-600 hover:bg-purple-50 rounded-xl transition-colors border border-purple-200 hover:border-purple-300"
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden border border-white/20">
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-indigo-50">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {editingPost ? 'Chỉnh sửa hướng dẫn' : 'Thêm hướng dẫn mới'}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {editingPost ? 'Cập nhật nội dung hướng dẫn luyện thi' : 'Tạo hướng dẫn luyện thi mới với nội dung phong phú'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
                  {/* Main Content Area */}
                  <div className="lg:col-span-2 p-6 overflow-y-auto">
                    {activeTab === 'content' && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-3">
                            Tiêu đề *
                          </label>
                          <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            required
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-700 font-medium bg-white/80"
                            placeholder="Nhập tiêu đề hướng dẫn..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-3">
                            Tóm tắt
                          </label>
                          <SimpleRichTextEditor
                            value={formData.excerpt}
                            onChange={val => setFormData({...formData, excerpt: val})}
                            rows={3}
                            placeholder="Tóm tắt ngắn gọn về hướng dẫn..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-3">
                            Nội dung *
                          </label>
                          <SimpleRichTextEditor
                            value={formData.content}
                            onChange={val => setFormData({...formData, content: val})}
                            rows={15}
                            placeholder="Viết nội dung chi tiết cho hướng dẫn..."
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'images' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-slate-800">Quản lý hình ảnh</h3>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingImage}
                            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                          >
                            <Upload className="h-4 w-4" />
                            <span>{uploadingImage ? 'Đang upload...' : 'Upload hình ảnh'}</span>
                          </button>
                        </div>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {formData.images.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image}
                                alt={`Hình ảnh ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border"
                              />
                              <button
                                type="button"
                                onClick={() => handleImageRemove(index)}
                                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>

                        {formData.images.length === 0 && (
                          <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-lg">
                            <Image className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                            <p className="text-slate-600">Chưa có hình ảnh nào</p>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'videos' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-4">Quản lý video YouTube</h3>
                          
                          <div className="flex space-x-2 mb-4">
                            <input
                              type="text"
                              value={newVideoUrl}
                              onChange={(e) => setNewVideoUrl(e.target.value)}
                              placeholder="Nhập URL YouTube..."
                              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-700 bg-white/80 placeholder-slate-500"
                            />
                            <button
                              type="button"
                              onClick={handleVideoAdd}
                              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                              Thêm
                            </button>
                          </div>

                          <div className="space-y-3">
                            {formData.videoUrls.map((url, index) => {
                              const videoId = extractYouTubeId(url)
                              return (
                                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                                  {videoId && (
                                    <img
                                      src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                                      alt="Video thumbnail"
                                      className="w-20 h-15 object-cover rounded"
                                    />
                                  )}
                                  <div className="flex-1">
                                    <p className="text-sm text-slate-800 truncate">{url}</p>
                                    <p className="text-xs text-slate-500">Video ID: {videoId}</p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleVideoRemove(index)}
                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </button>
                                </div>
                              )
                            })}
                          </div>

                          {formData.videoUrls.length === 0 && (
                            <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-lg">
                              <Video className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                              <p className="text-slate-600">Chưa có video nào</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-1 bg-slate-50/50 p-6 border-l border-slate-200 overflow-y-auto">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Thông tin hướng dẫn</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">
                              Trạng thái
                            </label>
                            <select
                              value={formData.status}
                              onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-700 font-medium bg-white/80"
                            >
                              <option value="draft">Bản nháp</option>
                              <option value="pending">Chờ duyệt</option>
                              <option value="published">Đã xuất bản</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">
                              Thứ tự hiển thị
                            </label>
                            <input
                              type="number"
                              value={formData.order}
                              onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-700 font-medium bg-white/80"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-slate-800 mb-3">Thống kê nội dung</h4>
                        <div className="space-y-2 text-sm text-slate-600">
                          <div className="flex justify-between">
                            <span>Hình ảnh:</span>
                            <span>{formData.images.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Video:</span>
                            <span>{formData.videoUrls.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Ký tự:</span>
                            <span>{formData.content.length}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end space-x-4 p-6 border-t border-slate-200 bg-slate-50/50">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors font-medium"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:transform-none font-medium"
                >
                  <Save className="h-4 w-4" />
                  <span>{loading ? 'Đang lưu...' : editingPost ? 'Cập nhật hướng dẫn' : 'Tạo hướng dẫn mới'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 