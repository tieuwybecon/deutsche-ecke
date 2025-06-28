'use client'

import React, { useState, useEffect } from 'react'
import { BookOpen, Clock, User, ChevronRight, Menu, X, Home, ArrowLeft, ArrowRight, Search, Filter, Video, Play, HelpCircle, Check, RotateCcw, Sparkles, Target, Award } from 'lucide-react'
import MarkdownRenderer from './MarkdownRenderer'
import Link from 'next/link'

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

interface GrammarLayoutProps {
  level: 'A1' | 'A2' | 'B1' | 'B2'
  levelColor: string
  gradientFrom: string
  gradientTo: string
  description: string
}

interface QuizState {
  [questionId: string]: {
    selectedAnswer: number | null
    isAnswered: boolean
    isCorrect: boolean
  }
}

const levelConfig = {
  A1: { 
    color: 'blue', 
    bgColor: 'bg-blue-50', 
    textColor: 'text-blue-700',
    borderColor: 'border-blue-500',
    hoverColor: 'hover:bg-blue-100',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-600',
    lightBg: 'bg-blue-50/50',
    cardBg: 'bg-gradient-to-br from-blue-50 to-indigo-50'
  },
  A2: { 
    color: 'emerald', 
    bgColor: 'bg-emerald-50', 
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-500',
    hoverColor: 'hover:bg-emerald-100',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-emerald-600',
    lightBg: 'bg-emerald-50/50',
    cardBg: 'bg-gradient-to-br from-emerald-50 to-teal-50'
  },
  B1: { 
    color: 'purple', 
    bgColor: 'bg-purple-50', 
    textColor: 'text-purple-700',
    borderColor: 'border-purple-500',
    hoverColor: 'hover:bg-purple-100',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-purple-600',
    lightBg: 'bg-purple-50/50',
    cardBg: 'bg-gradient-to-br from-purple-50 to-violet-50'
  },
  B2: { 
    color: 'rose', 
    bgColor: 'bg-rose-50', 
    textColor: 'text-rose-700',
    borderColor: 'border-rose-500',
    hoverColor: 'hover:bg-rose-100',
    gradientFrom: 'from-rose-500',
    gradientTo: 'to-rose-600',
    lightBg: 'bg-rose-50/50',
    cardBg: 'bg-gradient-to-br from-rose-50 to-pink-50'
  }
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
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

// Quiz component với animation và feedback tốt hơn
const QuizComponent = ({ 
  quiz, 
  quizState, 
  onAnswerSelect, 
  onReset 
}: { 
  quiz: QuizQuestion[]
  quizState: QuizState
  onAnswerSelect: (questionId: string, answerIndex: number) => void
  onReset: () => void
}) => {
  if (quiz.length === 0) return null

  const answeredQuestions = Object.values(quizState).filter(q => q.isAnswered).length
  const correctAnswers = Object.values(quizState).filter(q => q.isCorrect).length
  const totalQuestions = quiz.length

  return (
    <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-purple-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg">
            <HelpCircle className="h-7 w-7 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Bài tập thực hành</h3>
            <p className="text-slate-600 text-lg">
              {answeredQuestions}/{totalQuestions} câu đã trả lời
              {answeredQuestions > 0 && (
                <span className="ml-2 text-purple-600 font-semibold">
                  • {correctAnswers}/{answeredQuestions} đúng
                </span>
              )}
            </p>
          </div>
        </div>
        {answeredQuestions > 0 && (
          <button
            onClick={onReset}
            className="flex items-center space-x-2 px-4 py-3 text-slate-700 hover:text-slate-900 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <RotateCcw className="h-5 w-5" />
            <span className="font-medium">Làm lại</span>
          </button>
        )}
      </div>

      <div className="space-y-8">
        {quiz.map((question, questionIndex) => {
          const questionState = quizState[question.id] || { selectedAnswer: null, isAnswered: false, isCorrect: false }
          
          return (
            <div 
              key={question.id} 
              className={`p-6 rounded-2xl border-2 transition-all duration-300 shadow-sm hover:shadow-md ${
                questionState.isAnswered 
                  ? questionState.isCorrect 
                    ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50' 
                    : 'border-rose-200 bg-gradient-to-br from-rose-50 to-red-50'
                  : 'border-slate-200 bg-white hover:border-purple-200'
              }`}
            >
              <div className="flex items-start space-x-4 mb-6">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {questionIndex + 1}
                </span>
                <h4 className="text-xl font-semibold text-slate-800 flex-1 leading-relaxed">
                  {question.question}
                </h4>
              </div>

              <div className="space-y-3 ml-12">
                {question.options.map((option, optionIndex) => {
                  const isSelected = questionState.selectedAnswer === optionIndex
                  const isCorrect = optionIndex === question.correctAnswer
                  const showResult = questionState.isAnswered

                  return (
                    <button
                      key={optionIndex}
                      onClick={() => !questionState.isAnswered && onAnswerSelect(question.id, optionIndex)}
                      disabled={questionState.isAnswered}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        showResult
                          ? isCorrect
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-md'
                            : isSelected
                            ? 'border-rose-500 bg-rose-50 text-rose-800 shadow-md'
                            : 'border-slate-200 bg-slate-50 text-slate-600'
                          : isSelected
                          ? 'border-purple-500 bg-purple-50 text-purple-800 shadow-md'
                          : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/50 hover:shadow-sm'
                      } ${questionState.isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          showResult && isCorrect
                            ? 'border-emerald-500 bg-emerald-500'
                            : showResult && isSelected && !isCorrect
                            ? 'border-rose-500 bg-rose-500'
                            : isSelected
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-slate-300'
                        }`}>
                          {((showResult && isCorrect) || (isSelected && !showResult)) && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span className="flex-1 text-lg leading-relaxed">{option}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {questionState.isAnswered && question.explanation && (
                <div className="ml-12 mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                  <p className="text-slate-700 leading-relaxed">
                    <strong className="text-blue-800">💡 Giải thích:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {answeredQuestions === totalQuestions && (
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 text-white rounded-2xl shadow-xl">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Award className="h-12 w-12 text-yellow-300" />
            </div>
            <h4 className="text-2xl font-bold mb-3">🎉 Hoàn thành bài tập!</h4>
            <p className="text-xl text-purple-100 mb-2">
              Bạn đã trả lời đúng <strong className="text-yellow-300">{correctAnswers}/{totalQuestions}</strong> câu 
            </p>
            <p className="text-lg text-purple-100">
              Tỷ lệ đúng: <strong className="text-yellow-300">{Math.round((correctAnswers / totalQuestions) * 100)}%</strong>
            </p>
            {correctAnswers === totalQuestions && (
              <div className="mt-4 p-3 bg-yellow-400 bg-opacity-20 rounded-xl">
                <p className="text-yellow-200 font-semibold">🌟 Xuất sắc! Bạn đã trả lời đúng tất cả!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function GrammarLayout({ level, levelColor, gradientFrom, gradientTo, description }: GrammarLayoutProps) {
  const [posts, setPosts] = useState<GrammarPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<GrammarPost | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const [quizState, setQuizState] = useState<QuizState>({})
  
  const config = levelConfig[level]
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    fetchPosts()
  }, [level])

  useEffect(() => {
    if (filteredPosts.length > 0 && !selectedPost) {
      setSelectedPost(filteredPosts[0])
      setCurrentPostIndex(0)
    }
  }, [filteredPosts, selectedPost])

  // Reset quiz state when post changes
  useEffect(() => {
    setQuizState({})
  }, [selectedPost])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPreviousPost()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNextPost()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPostIndex, filteredPosts])

  // Touch/swipe navigation for mobile
  useEffect(() => {
    let startX = 0
    let startY = 0

    const handleTouchStart = (e: Event) => {
      const touchEvent = e as TouchEvent
      startX = touchEvent.touches[0].clientX
      startY = touchEvent.touches[0].clientY
    }

    const handleTouchEnd = (e: Event) => {
      if (!startX || !startY) return

      const touchEvent = e as TouchEvent
      const endX = touchEvent.changedTouches[0].clientX
      const endY = touchEvent.changedTouches[0].clientY
      const diffX = startX - endX
      const diffY = startY - endY

      // Only handle horizontal swipes
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          // Swipe left - next post
          goToNextPost()
        } else {
          // Swipe right - previous post
          goToPreviousPost()
        }
      }

      startX = 0
      startY = 0
    }

    const mainContent = document.querySelector('[data-main-content]')
    if (mainContent) {
      mainContent.addEventListener('touchstart', handleTouchStart, { passive: true })
      mainContent.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    return () => {
      if (mainContent) {
        mainContent.removeEventListener('touchstart', handleTouchStart)
        mainContent.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [currentPostIndex, filteredPosts])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/grammar?level=${level}&status=published`)
      const data = await response.json()
      
      if (data.success) {
        setPosts(data.data)
      }
    } catch (error) {
      console.error('Lỗi khi tải bài viết:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePostSelect = (post: GrammarPost) => {
    setSelectedPost(post)
    const index = filteredPosts.findIndex(p => p.id === post.id)
    setCurrentPostIndex(index)
    setIsSidebarOpen(false)
    // Scroll to top when selecting new post
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToNextPost = () => {
    if (currentPostIndex < filteredPosts.length - 1) {
      const nextPost = filteredPosts[currentPostIndex + 1]
      setSelectedPost(nextPost)
      setCurrentPostIndex(currentPostIndex + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const goToPreviousPost = () => {
    if (currentPostIndex > 0) {
      const prevPost = filteredPosts[currentPostIndex - 1]
      setSelectedPost(prevPost)
      setCurrentPostIndex(currentPostIndex - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleQuizAnswer = (questionId: string, answerIndex: number) => {
    if (!selectedPost) return
    
    const question = selectedPost.quiz.find(q => q.id === questionId)
    if (!question) return

    const isCorrect = answerIndex === question.correctAnswer

    setQuizState(prev => ({
      ...prev,
      [questionId]: {
        selectedAnswer: answerIndex,
        isAnswered: true,
        isCorrect
      }
    }))
  }

  const resetQuiz = () => {
    setQuizState({})
  }

  const otherLevels = ['A1', 'A2', 'B1', 'B2'].filter(l => l !== level)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className={`animate-spin rounded-full h-16 w-16 border-b-4 mx-auto mb-6 ${
              levelColor === 'blue' ? 'border-blue-600' :
              levelColor === 'green' ? 'border-emerald-600' :
              levelColor === 'purple' ? 'border-purple-600' :
              'border-rose-600'
            }`}></div>
            <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
          </div>
          <p className="text-xl text-slate-600 font-medium">Đang tải bài viết...</p>
          <p className="text-slate-500 mt-2">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white/80 backdrop-blur-md shadow-lg border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <h1 className="text-xl font-bold text-slate-800">Ngữ pháp {level}</h1>
          </div>
          <Link href="/hoc-tieng-duc" className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <Home className="h-6 w-6" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto lg:py-12 lg:px-6">
        {/* Desktop Header */}
        <div className="hidden lg:block text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Link 
              href="/hoc-tieng-duc" 
              className="mr-6 p-3 rounded-2xl hover:bg-white/50 transition-all duration-200 shadow-sm hover:shadow-md"
              title="Quay lại trang chính"
            >
              <Home className="h-7 w-7 text-slate-600" />
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Ngữ pháp tiếng Đức 
              <span className={`ml-4 bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo} bg-clip-text text-transparent`}>{level}</span>
            </h1>
          </div>
          <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
          
          {/* Progress indicator */}
          {posts.length > 0 && (
            <div className="mt-8 flex items-center justify-center space-x-4">
              <span className="text-lg text-slate-500 font-medium">Tiến độ:</span>
              <div className="flex space-x-2">
                {posts.slice(0, 10).map((_, index) => (
                  <div 
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index <= currentPostIndex ? `bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo}` : 'bg-slate-300'
                    }`}
                  />
                ))}
                {posts.length > 10 && <span className="text-lg text-slate-500 font-medium">+{posts.length - 10}</span>}
              </div>
              <span className="text-lg text-slate-500 font-medium">
                {currentPostIndex + 1}/{posts.length}
              </span>
            </div>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-16 text-center mx-4 lg:mx-0">
            <div className="p-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-slate-500" />
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-4">
              Chưa có bài viết nào
            </h3>
            <p className="text-xl text-slate-600 leading-relaxed">
              Các bài viết ngữ pháp {level} sẽ được cập nhật sớm bởi admin.
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:gap-8">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
              <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <div className="w-80 lg:w-96 flex-shrink-0">
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 sticky top-24 flex flex-col max-h-[calc(100vh-7rem)]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">
                    Danh sách bài học
                  </h2>
                  <span className={`px-3 py-2 text-sm font-bold rounded-full ${config.bgColor} ${config.textColor} shadow-sm`}>
                    {filteredPosts.length} bài
                  </span>
                </div>
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm bài học..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-slate-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg transition-all duration-200"
                  />
                </div>
                {/* Posts List */}
                <div className="space-y-3 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                  {filteredPosts.map((post, index) => (
                    <button
                      key={post.id}
                      onClick={() => handlePostSelect(post)}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-200 ${
                        selectedPost?.id === post.id
                          ? `${config.cardBg} ${config.textColor} border-l-4 ${config.borderColor} shadow-lg`
                          : 'hover:bg-slate-50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-lg font-semibold truncate leading-relaxed">
                            Bài {index + 1}: {post.title}
                          </div>
                          <div className="text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                            {post.excerpt.substring(0, 100)}...
                          </div>
                          {/* Content indicators */}
                          <div className="flex items-center space-x-3 mt-3">
                            {post.images.length > 0 && (
                              <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">📷 {post.images.length}</span>
                            )}
                            {post.videoUrls?.length > 0 && (
                              <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">🎥 {post.videoUrls.length}</span>
                            )}
                            {post.quiz?.length > 0 && (
                              <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-full">❓ {post.quiz.length}</span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400 flex-shrink-0 ml-3" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:min-w-0 p-4 lg:p-0" data-main-content>
              {selectedPost ? (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
                  {/* Post Header */}
                  <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white p-8 lg:p-12`}>
                    <div className="flex items-center justify-between mb-6">
                      <h1 className="text-3xl md:text-4xl font-bold leading-tight">{selectedPost.title}</h1>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={goToPreviousPost}
                          disabled={currentPostIndex === 0}
                          className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <ArrowLeft className="h-6 w-6" />
                        </button>
                        <button
                          onClick={goToNextPost}
                          disabled={currentPostIndex === filteredPosts.length - 1}
                          className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                          <ArrowRight className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 text-white/90">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5" />
                        <span className="text-lg">{selectedPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5" />
                        <span className="text-lg">
                          {new Date(selectedPost.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-5 w-5" />
                        <span className="text-lg">Bài {currentPostIndex + 1}/{filteredPosts.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-8 lg:p-12 space-y-12">
                    {/* Images */}
                    {selectedPost.images.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mr-4 shadow-lg">
                            <BookOpen className="h-6 w-6 text-white" />
                          </div>
                          Hình ảnh minh họa
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {selectedPost.images.map((image, index) => (
                            <div key={index} className="group cursor-pointer">
                              <img
                                src={image}
                                alt={`Hình ảnh ${index + 1}`}
                                className="w-full h-64 object-cover rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
                                onClick={() => window.open(image, '_blank')}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Main Content */}
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl mr-4 shadow-lg">
                          <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        Nội dung bài học
                      </h3>
                      <div className="prose prose-lg max-w-none">
                        <MarkdownRenderer content={selectedPost.content} />
                      </div>
                    </div>

                    {/* Videos */}
                    {selectedPost.videoUrls?.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                          <div className="p-3 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl mr-4 shadow-lg">
                            <Video className="h-6 w-6 text-white" />
                          </div>
                          Video bài giảng ({selectedPost.videoUrls.length})
                        </h3>
                        <div className="space-y-8">
                          {selectedPost.videoUrls.map((url, index) => (
                            <div key={index}>
                              <h4 className="text-xl font-semibold text-slate-700 mb-4">
                                Video {index + 1}
                              </h4>
                              <YouTubeVideo url={url} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quiz */}
                    {selectedPost.quiz?.length > 0 && (
                      <QuizComponent
                        quiz={selectedPost.quiz}
                        quizState={quizState}
                        onAnswerSelect={handleQuizAnswer}
                        onReset={resetQuiz}
                      />
                    )}
                    
                    {/* Navigation footer */}
                    <div className="pt-8 border-t border-slate-200">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={goToPreviousPost}
                          disabled={currentPostIndex === 0}
                          className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${config.bgColor} ${config.textColor} ${config.hoverColor} shadow-lg hover:shadow-xl`}
                        >
                          <ArrowLeft className="h-5 w-5" />
                          <span className="font-semibold text-lg">Bài trước</span>
                        </button>
                        
                        <span className="text-lg text-slate-600 font-medium">
                          {currentPostIndex + 1} / {filteredPosts.length}
                        </span>
                        
                        <button
                          onClick={goToNextPost}
                          disabled={currentPostIndex === filteredPosts.length - 1}
                          className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${config.bgColor} ${config.textColor} ${config.hoverColor} shadow-lg hover:shadow-xl`}
                        >
                          <span className="font-semibold text-lg">Bài sau</span>
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-16 text-center">
                  <div className="p-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-slate-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-4">
                    Chọn một bài học
                  </h3>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    Chọn một bài học từ danh sách bên trái để bắt đầu học ngữ pháp tiếng Đức {level}.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Level Navigation */}
        <div className="mt-16 mx-4 lg:mx-0">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              Các cấp độ khác
            </h3>
            <div className="grid grid-cols-2 md:flex md:justify-center gap-4">
              {otherLevels.map(otherLevel => {
                const otherConfig = levelConfig[otherLevel as keyof typeof levelConfig]
                return (
                  <Link
                    key={otherLevel}
                    href={`/hoc-tieng-duc/ngu-phap/${otherLevel}`}
                    className={`px-6 py-4 rounded-2xl transition-all duration-200 text-center font-semibold text-lg shadow-lg hover:shadow-xl ${otherConfig.bgColor} ${otherConfig.textColor} ${otherConfig.hoverColor}`}
                  >
                    {otherLevel}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 