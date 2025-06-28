import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react'

interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  status: 'published' | 'draft' | 'pending'
  category: string
  author: string
  createdAt: string
  updatedAt: string
}

async function getPost(id: string): Promise<Post | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/admin/posts`, {
      cache: 'no-store'
    })
    const data = await response.json()
    if (data.success) {
      const post = data.data.find((post: Post) => post.id === id && post.status === 'published')
      return post || null
    }
    return null
  } catch (error) {
    console.error('Lỗi load post:', error)
    return null
  }
}

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/tin-tuc"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại tin tức
          </Link>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Article Header */}
          <div className="p-8 border-b">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <Tag className="h-4 w-4 mr-1" />
                {getCategoryName(post.category)}
              </span>
              <div className="text-sm text-gray-500">
                Cập nhật: {formatDate(post.updatedAt)}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              {post.excerpt}
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(post.createdAt)}
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              {/* Chuyển đổi nội dung text thành HTML */}
              <div 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(/\n/g, '<br>') 
                }}
              />
            </div>
          </div>

          {/* Article Footer */}
          <div className="p-8 bg-gray-50 border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span>Đăng bởi {post.author}</span>
              </div>
              <Link 
                href="/tin-tuc"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Xem tất cả tin tức
                <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
} 