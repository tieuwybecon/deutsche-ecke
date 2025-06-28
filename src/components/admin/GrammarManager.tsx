'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Plus, Edit, Trash2, Save, X, Eye, Upload, Image, FileText, Search, Filter, ChevronDown, Video, HelpCircle, Play, Trash, Check } from 'lucide-react'
import SimpleRichTextEditor from './SimpleRichTextEditor'

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

interface GrammarPost {
  id: string
  title: string
  content: string
  excerpt: string
  level: 'A1' | 'A2' | 'B1' | 'B2'
  status: 'published' | 'draft' | 'pending'
  author: string
  images: string[]
  videoUrls: string[]
  quiz: QuizQuestion[]
  order: number
  createdAt: string
  updatedAt: string
}

export default function GrammarManager() {
  const [posts, setPosts] = useState<GrammarPost[]>([])
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<GrammarPost | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState<'content' | 'images' | 'videos' | 'quiz'>('content')
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    level: 'A1' as 'A1' | 'A2' | 'B1' | 'B2',
    status: 'draft' as 'published' | 'draft' | 'pending',
    images: [] as string[],
    videoUrls: [] as string[],
    quiz: [] as QuizQuestion[],
    order: 0
  })

  // Temporary state for adding new items
  const [newVideoUrl, setNewVideoUrl] = useState('')
  const [newQuiz, setNewQuiz] = useState<Partial<QuizQuestion>>({
    question: '',
    options: ['', ''],
    correctAnswer: 0,
    explanation: ''
  })

  const levels = [
    { value: 'all', label: 'Tất cả cấp độ', color: 'bg-slate-100 text-slate-800' },
    { value: 'A1', label: 'A1', color: 'bg-blue-100 text-blue-800' },
    { value: 'A2', label: 'A2', color: 'bg-green-100 text-green-800' },
    { value: 'B1', label: 'B1', color: 'bg-purple-100 text-purple-800' },
    { value: 'B2', label: 'B2', color: 'bg-red-100 text-red-800' }
  ]

  const statuses = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'published', label: 'Đã xuất bản', color: 'bg-green-100 text-green-800' },
    { value: 'draft', label: 'Bản nháp', color: 'bg-slate-100 text-slate-800' },
    { value: 'pending', label: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-800' }
  ]

  const tabs = [
    { id: 'content', label: 'Nội dung', icon: FileText },
    { id: 'images', label: 'Hình ảnh', icon: Image },
    { id: 'videos', label: 'Video', icon: Video },
    { id: 'quiz', label: 'Bài tập', icon: HelpCircle }
  ]

  useEffect(() => {
    fetchPosts()
  }, [selectedLevel, selectedStatus, searchTerm])

  // YouTube URL validation
  const isValidYouTubeUrl = (url: string): boolean => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    return regex.test(url)
  }

  const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedLevel !== 'all') params.append('level', selectedLevel)
      if (selectedStatus !== 'all') params.append('status', selectedStatus)

      const response = await fetch(`/api/admin/grammar?${params}`)
      const data = await response.json()
      
      if (data.success) {
        let filteredPosts = data.data
        if (searchTerm) {
          filteredPosts = data.data.filter((post: GrammarPost) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }
        setPosts(filteredPosts)
      }
    } catch (error) {
      console.error('Lỗi khi tải bài viết:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      level: 'A1',
      status: 'draft',
      images: [],
      videoUrls: [],
      quiz: [],
      order: 0
    })
    setNewVideoUrl('')
    setNewQuiz({
      question: '',
      options: ['', ''],
      correctAnswer: 0,
      explanation: ''
    })
    setEditingPost(null)
    setActiveTab('content')
  }

  const openModal = (post?: GrammarPost) => {
    if (post) {
      setEditingPost(post)
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        level: post.level,
        status: post.status,
        images: post.images || [],
        videoUrls: post.videoUrls || [],
        quiz: post.quiz || [],
        order: post.order
      })
    } else {
      resetForm()
    }
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = '/api/admin/grammar'
      const method = editingPost ? 'PUT' : 'POST'
      const payload = editingPost 
        ? { id: editingPost.id, ...formData }
        : formData

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      
      if (data.success) {
        alert(data.message)
        fetchPosts()
        closeModal()
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert('Lỗi khi lưu bài viết')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return

    try {
      setLoading(true)
      const response = await fetch(`/api/admin/grammar?id=${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()
      
      if (data.success) {
        alert(data.message)
        fetchPosts()
      } else {
        alert(data.message)
      }
    } catch (error) {
      alert('Lỗi khi xóa bài viết')
    } finally {
      setLoading(false)
    }
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

  const handleQuizOptionChange = (index: number, value: string) => {
    setNewQuiz(prev => ({
      ...prev,
      options: prev.options?.map((opt, i) => i === index ? value : opt) || []
    }))
  }

  const addQuizOption = () => {
    setNewQuiz(prev => ({
      ...prev,
      options: [...(prev.options || []), '']
    }))
  }

  const removeQuizOption = (index: number) => {
    if ((newQuiz.options?.length || 0) <= 2) {
      alert('Cần ít nhất 2 tùy chọn')
      return
    }
    
    setNewQuiz(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index) || [],
      correctAnswer: prev.correctAnswer === index ? 0 : 
                    (prev.correctAnswer || 0) > index ? (prev.correctAnswer || 0) - 1 : prev.correctAnswer
    }))
  }

  const handleQuizAdd = () => {
    if (!newQuiz.question?.trim()) {
      alert('Vui lòng nhập câu hỏi')
      return
    }
    
    if ((newQuiz.options?.length || 0) < 2) {
      alert('Cần ít nhất 2 tùy chọn')
      return
    }

    if (newQuiz.options?.some(opt => !opt.trim())) {
      alert('Tất cả tùy chọn phải có nội dung')
      return
    }

    const quiz: QuizQuestion = {
      id: Date.now().toString(),
      question: newQuiz.question!,
      options: newQuiz.options!,
      correctAnswer: newQuiz.correctAnswer || 0,
      explanation: newQuiz.explanation || ''
    }

    setFormData(prev => ({
      ...prev,
      quiz: [...prev.quiz, quiz]
    }))

    setNewQuiz({
      question: '',
      options: ['', ''],
      correctAnswer: 0,
      explanation: ''
    })
  }

  const handleQuizRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      quiz: prev.quiz.filter((_, i) => i !== index)
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-slate-100 text-slate-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'A1': return 'bg-blue-100 text-blue-800'
      case 'A2': return 'bg-green-100 text-green-800'
      case 'B1': return 'bg-purple-100 text-purple-800'
      case 'B2': return 'bg-red-100 text-red-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
                  <h1 className="text-2xl font-bold text-slate-800">Quản lý Ngữ pháp</h1>
        <p className="text-slate-600">Tạo và quản lý bài viết ngữ pháp tiếng Đức</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Thêm bài viết mới</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tiêu đề hoặc nội dung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
              />
            </div>
          </div>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
          >
            {levels.map(level => (
              <option key={level.value} value={level.value}>{level.label}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700"
          >
            {statuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">
            Danh sách bài viết ({filteredPosts.length})
          </h3>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Đang tải...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Chưa có bài viết nào</h3>
            <p className="text-slate-600 mb-4">Bắt đầu tạo bài viết ngữ pháp đầu tiên của bạn</p>
            <button
              onClick={() => openModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tạo bài viết mới
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredPosts.map((post) => (
              <div key={post.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(post.level)}`}>
                        {post.level}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status)}`}>
                        {post.status === 'published' ? 'Đã xuất bản' : 
                         post.status === 'draft' ? 'Bản nháp' : 'Chờ duyệt'}
                      </span>
                      {post.images.length > 0 && (
                        <span className="flex items-center text-xs text-slate-500">
                          <Image className="h-3 w-3 mr-1" />
                          {post.images.length}
                        </span>
                      )}
                      {post.videoUrls?.length > 0 && (
                        <span className="flex items-center text-xs text-slate-500">
                          <Video className="h-3 w-3 mr-1" />
                          {post.videoUrls.length}
                        </span>
                      )}
                      {post.quiz?.length > 0 && (
                        <span className="flex items-center text-xs text-slate-500">
                          <HelpCircle className="h-3 w-3 mr-1" />
                          {post.quiz.length}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">{post.title}</h3>
                    <p className="text-slate-600 text-sm mb-2">{post.excerpt}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span>Tác giả: {post.author}</span>
                      <span>Thứ tự: {post.order}</span>
                      <span>Tạo: {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                      <span>Cập nhật: {new Date(post.updatedAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => openModal(post)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-screen overflow-y-auto border border-white/20">
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {editingPost ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    {editingPost ? 'Cập nhật nội dung bài học ngữ pháp' : 'Tạo bài học ngữ pháp mới với nội dung phong phú'}
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
                            ? 'border-blue-500 text-blue-600'
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
              <div className="flex-1 min-h-0 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 h-full min-h-0">
                  {/* Main Content Area */}
                  <div className="lg:col-span-2 p-6 overflow-y-auto">
                    {activeTab === 'content' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-3">
                            Tiêu đề *
                          </label>
                          <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 font-medium bg-white/80"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-3">
                            Tóm tắt
                          </label>
                          <SimpleRichTextEditor
                            value={formData.excerpt}
                            onChange={(value) => setFormData({...formData, excerpt: value})}
                            rows={3}
                            placeholder="Tóm tắt ngắn gọn về bài viết..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-3">
                            Nội dung chính *
                          </label>
                          <SimpleRichTextEditor
                            value={formData.content}
                            onChange={(value) => setFormData({...formData, content: value})}
                          />
                        </div>
                      </div>
                    )}

                    {activeTab === 'images' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-slate-800">Quản lý hình ảnh</h3>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingImage}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-4">Quản lý video YouTube</h3>
                          
                          <div className="flex space-x-2 mb-4">
                            <input
                              type="text"
                              value={newVideoUrl}
                              onChange={(e) => setNewVideoUrl(e.target.value)}
                              placeholder="Nhập URL YouTube (ví dụ: https://www.youtube.com/watch?v=...)"
                              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 bg-white/80 placeholder-slate-500"
                            />
                            <button
                              type="button"
                              onClick={handleVideoAdd}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

                    {activeTab === 'quiz' && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tạo bài tập trắc nghiệm</h3>
                          
                          {/* Add New Quiz Form */}
                          <div className="bg-slate-50/70 p-6 rounded-xl space-y-4 border border-slate-200">
                            <div>
                              <label className="block text-sm font-bold text-slate-700 mb-3">
                                Câu hỏi *
                              </label>
                              <textarea
                                value={newQuiz.question}
                                onChange={(e) => setNewQuiz({...newQuiz, question: e.target.value})}
                                rows={3}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 bg-white/80 placeholder-slate-500"
                                placeholder="Nhập câu hỏi..."
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-bold text-slate-700 mb-3">
                                Các tùy chọn trả lời *
                              </label>
                              <div className="space-y-2">
                                {newQuiz.options?.map((option, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      name="correctAnswer"
                                      checked={newQuiz.correctAnswer === index}
                                      onChange={() => setNewQuiz({...newQuiz, correctAnswer: index})}
                                      className="text-blue-600"
                                    />
                                    <input
                                      type="text"
                                      value={option}
                                      onChange={(e) => handleQuizOptionChange(index, e.target.value)}
                                      placeholder={`Tùy chọn ${index + 1}`}
                                      className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 bg-white/80 placeholder-slate-500"
                                    />
                                    {(newQuiz.options?.length || 0) > 2 && (
                                      <button
                                        type="button"
                                        onClick={() => removeQuizOption(index)}
                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                      >
                                        <Trash className="h-4 w-4" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                              
                              <button
                                type="button"
                                onClick={addQuizOption}
                                className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                              >
                                + Thêm tùy chọn
                              </button>
                            </div>

                            <div>
                              <label className="block text-sm font-bold text-slate-700 mb-3">
                                Giải thích (tuỳ chọn)
                              </label>
                              <textarea
                                value={newQuiz.explanation}
                                onChange={(e) => setNewQuiz({...newQuiz, explanation: e.target.value})}
                                rows={2}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 bg-white/80 placeholder-slate-500"
                                placeholder="Giải thích đáp án đúng..."
                              />
                            </div>

                            <button
                              type="button"
                              onClick={handleQuizAdd}
                              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
                            >
                              Thêm câu hỏi
                            </button>
                          </div>

                          {/* Existing Quiz List */}
                          <div className="mt-6 space-y-4">
                            <h4 className="font-semibold text-slate-800">Danh sách câu hỏi ({formData.quiz.length})</h4>
                            
                            {formData.quiz.map((quiz, index) => (
                              <div key={quiz.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                  <h5 className="font-semibold text-slate-800">Câu {index + 1}</h5>
                                  <button
                                    type="button"
                                    onClick={() => handleQuizRemove(index)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash className="h-4 w-4" />
                                  </button>
                                </div>
                                
                                <p className="text-slate-700 mb-3">{quiz.question}</p>
                                
                                <div className="space-y-1">
                                  {quiz.options.map((option, optIndex) => (
                                    <div key={optIndex} className={`flex items-center space-x-2 p-2 rounded ${
                                      quiz.correctAnswer === optIndex ? 'bg-emerald-50 text-emerald-800' : 'text-slate-600'
                                    }`}>
                                      {quiz.correctAnswer === optIndex ? 
                                        <Check className="h-4 w-4 text-green-600" /> : 
                                        <span className="w-4 h-4 rounded-full border border-slate-300"></span>
                                      }
                                      <span>{option}</span>
                                    </div>
                                  ))}
                                </div>
                                
                                {quiz.explanation && (
                                  <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-800">
                                    <strong>Giải thích:</strong> {quiz.explanation}
                                  </div>
                                )}
                              </div>
                            ))}

                                                          {formData.quiz.length === 0 && (
                                <div className="text-center py-12 border-2 border-dashed border-slate-300 rounded-lg">
                                                               <HelpCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                               <p className="text-slate-600">Chưa có câu hỏi nào</p>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-1 bg-slate-50/50 p-6 border-l border-slate-200 overflow-y-auto">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Thông tin bài viết</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">
                              Cấp độ *
                            </label>
                            <select
                              value={formData.level}
                              onChange={(e) => setFormData({...formData, level: e.target.value as any})}
                              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 font-medium bg-white/80"
                              required
                            >
                              <option value="A1">A1</option>
                              <option value="A2">A2</option>
                              <option value="B1">B1</option>
                              <option value="B2">B2</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-bold text-slate-700 mb-3">
                              Trạng thái
                            </label>
                            <select
                              value={formData.status}
                              onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 font-medium bg-white/80"
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
                              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-700 font-medium bg-white/80"
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
                            <span>Câu hỏi:</span>
                            <span>{formData.quiz.length}</span>
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
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:transform-none font-medium"
                >
                  <Save className="h-4 w-4" />
                  <span>{loading ? 'Đang lưu...' : editingPost ? 'Cập nhật bài viết' : 'Tạo bài viết mới'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 