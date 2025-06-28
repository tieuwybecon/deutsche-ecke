'use client'

import { useState, useEffect } from 'react'
import { Clock, User, Calendar, Target, Play, ArrowLeft, ArrowRight, Search, Filter, Eye, Heart, Share2, Trophy, CheckCircle } from 'lucide-react'
import Header from '../../../components/sections/Header'
import Footer from '../../../components/sections/Footer'
import { ThemeProvider } from '../../../components/ui/ThemeProvider'
import Link from 'next/link'
import SimpleRichTextEditor from '@/components/admin/SimpleRichTextEditor'

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

// YouTube component với loading state
const YouTubeVideo = ({ url }: { url: string }) => {
  const [isLoading, setIsLoading] = useState(true)
  
  const extractYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const videoId = extractYouTubeId(url)
  if (!videoId) return null

  return (
    <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      )}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}

export default function HuongDanLuyenThiPage() {
  const [posts, setPosts] = useState<ExamGuidePost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<ExamGuidePost | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<ExamGuidePost[]>([])

  useEffect(() => {
    fetchExamGuides()
  }, [])

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPosts(filtered)
  }, [posts, searchTerm])

  const fetchExamGuides = async () => {
    try {
      const response = await fetch('/api/admin/exam-guide?status=published')
      const data = await response.json()
      if (data.success) {
        const sortedPosts = data.data.sort((a: ExamGuidePost, b: ExamGuidePost) => a.order - b.order)
        setPosts(sortedPosts)
        if (sortedPosts.length > 0) {
          setSelectedPost(sortedPosts[0])
        }
      }
    } catch (error) {
      console.error('Lỗi khi tải hướng dẫn luyện thi:', error)
    } finally {
      setLoading(false)
    }
  }

  const goToNextPost = () => {
    if (!selectedPost) return
    const currentIndex = filteredPosts.findIndex(p => p.id === selectedPost.id)
    if (currentIndex < filteredPosts.length - 1) {
      setSelectedPost(filteredPosts[currentIndex + 1])
    }
  }

  const goToPreviousPost = () => {
    if (!selectedPost) return
    const currentIndex = filteredPosts.findIndex(p => p.id === selectedPost.id)
    if (currentIndex > 0) {
      setSelectedPost(filteredPosts[currentIndex - 1])
    }
  }

  if (loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
            <p className="text-purple-700 font-medium text-lg">Đang tải hướng dẫn luyện thi...</p>
          </div>
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <Header />
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Chuyển đến nội dung chính
      </a>

      <main id="main-content" role="main" className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        {/* Hero Section */}
        <section className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl shadow-lg">
                  <Target className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-slate-800 mb-6">
                Hướng Dẫn Luyện Thi
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Chiến lược và phương pháp luyện thi tiếng Đức hiệu quả, được xây dựng từ kinh nghiệm của các giáo viên và học viên đạt điểm cao
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                  Chiến lược thi hiệu quả
                </span>
                <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200">
                  Video hướng dẫn chi tiết
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                  Kinh nghiệm thực tế
                </span>
              </div>
            </div>
          </div>
        </section>

        {posts.length === 0 ? (
          <section className="pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 border border-purple-200">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">Chưa có hướng dẫn nào</h3>
                  <p className="text-slate-600 text-lg mb-8">Nội dung sẽ được cập nhật bởi admin trong thời gian sớm nhất.</p>
                  <Link
                    href="/hoc-tieng-duc"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Khám phá các khóa học
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="lg:w-1/3">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-200 p-6 sticky top-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-slate-800">Danh sách hướng dẫn</h2>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {filteredPosts.length} bài
                      </span>
                    </div>

                    {/* Search */}
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Tìm kiếm hướng dẫn..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>

                    {/* Posts List */}
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {filteredPosts.map((post, index) => (
                        <button
                          key={post.id}
                          onClick={() => setSelectedPost(post)}
                          className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                            selectedPost?.id === post.id
                              ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              selectedPost?.id === post.id 
                                ? 'bg-white/20 text-white' 
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                              {index + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <h3 className={`font-semibold text-sm leading-tight ${
                                selectedPost?.id === post.id ? 'text-white' : 'text-slate-800'
                              }`}>
                                {post.title}
                              </h3>
                              {post.excerpt && (
                                <p className={`text-xs mt-1 line-clamp-2 ${
                                  selectedPost?.id === post.id ? 'text-white/80' : 'text-slate-600'
                                }`}>
                                  {post.excerpt}
                                </p>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:w-2/3">
                  {selectedPost && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-200">
                      {/* Navigation */}
                      <div className="flex items-center justify-between p-6 border-b border-slate-200">
                        <button
                          onClick={goToPreviousPost}
                          disabled={filteredPosts.findIndex(p => p.id === selectedPost.id) === 0}
                          className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ArrowLeft className="h-5 w-5" />
                          <span className="hidden sm:inline">Bài trước</span>
                        </button>
                        
                        <div className="text-center">
                          <span className="text-sm text-slate-600">
                            {filteredPosts.findIndex(p => p.id === selectedPost.id) + 1} / {filteredPosts.length}
                          </span>
                        </div>

                        <button
                          onClick={goToNextPost}
                          disabled={filteredPosts.findIndex(p => p.id === selectedPost.id) === filteredPosts.length - 1}
                          className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <span className="hidden sm:inline">Bài sau</span>
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-8">
                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            <span>{selectedPost.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{new Date(selectedPost.createdAt).toLocaleDateString('vi-VN')}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>~{Math.ceil(selectedPost.content.length / 1000)} phút đọc</span>
                          </div>
                        </div>

                        <h1 className="text-3xl font-bold text-slate-800 mb-6">{selectedPost.title}</h1>
                        
                        {selectedPost.excerpt && (
                          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-6 rounded-r-xl mb-8">
                            <p className="text-lg text-slate-700 leading-relaxed italic">{selectedPost.excerpt}</p>
                          </div>
                        )}

                        {/* Images */}
                        {selectedPost.images && selectedPost.images.length > 0 && (
                          <div className="mb-8">
                            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                              <Eye className="w-5 h-5 mr-2 text-purple-600" />
                              Hình ảnh minh họa
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {selectedPost.images.map((image, index) => (
                                <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                  <img
                                    src={image}
                                    alt={`Minh họa ${index + 1}`}
                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Videos */}
                        {selectedPost.videoUrls && selectedPost.videoUrls.length > 0 && (
                          <div className="mb-8">
                            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
                              <Play className="w-5 h-5 mr-2 text-purple-600" />
                              Video hướng dẫn
                            </h3>
                            <div className="space-y-6">
                              {selectedPost.videoUrls.map((url, index) => (
                                <div key={index}>
                                  <YouTubeVideo url={url} />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className="prose prose-lg max-w-none prose-slate">
                          {selectedPost.content.split('\n').map((paragraph, index) => (
                            paragraph.trim() && (
                              <p key={index} className="mb-6 text-slate-700 leading-relaxed">
                                {paragraph}
                              </p>
                            )
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-8 border-t border-slate-200 mt-8">
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-red-600 transition-colors">
                              <Heart className="w-5 h-5" />
                              <span>Thích</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-blue-600 transition-colors">
                              <Share2 className="w-5 h-5" />
                              <span>Chia sẻ</span>
                            </button>
                          </div>
                          
                          <Link
                            href="/hoc-tieng-duc"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            Khám phá thêm
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </ThemeProvider>
  )
} 