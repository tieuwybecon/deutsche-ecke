import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// File để lưu trữ dữ liệu hướng dẫn luyện thi
const EXAM_GUIDE_FILE = path.join(process.cwd(), 'data', 'exam-guide.json')

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

// Hàm extract YouTube video ID từ URL
function extractYouTubeId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  const match = url.match(regex)
  return match ? match[1] : null
}

// Hàm validate YouTube URL
function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeId(url) !== null
}

// Đảm bảo thư mục data tồn tại
async function ensureDataDir() {
  const dataDir = path.dirname(EXAM_GUIDE_FILE)
  if (!existsSync(dataDir)) {
    await writeFile(EXAM_GUIDE_FILE, JSON.stringify([]))
  }
}

// Đọc dữ liệu hướng dẫn luyện thi từ file
async function readExamGuideData(): Promise<ExamGuidePost[]> {
  try {
    await ensureDataDir()
    const data = await readFile(EXAM_GUIDE_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Ghi dữ liệu hướng dẫn luyện thi vào file
async function writeExamGuideData(data: ExamGuidePost[]) {
  await ensureDataDir()
  await writeFile(EXAM_GUIDE_FILE, JSON.stringify(data, null, 2))
}

// GET - Lấy danh sách hướng dẫn luyện thi
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    let posts = await readExamGuideData()
    
    // Lọc theo status
    if (status) {
      posts = posts.filter(post => post.status === status)
    }
    
    // Sắp xếp theo order và thời gian tạo
    posts.sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    
    return NextResponse.json({
      success: true,
      data: posts
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi lấy danh sách hướng dẫn luyện thi' },
      { status: 500 }
    )
  }
}

// POST - Tạo hướng dẫn luyện thi mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      content, 
      excerpt, 
      status = 'draft', 
      images = [], 
      videoUrls = [],
      order = 0 
    } = body
    
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Tiêu đề và nội dung là bắt buộc' },
        { status: 400 }
      )
    }

    // Validate YouTube URLs
    const invalidUrls = videoUrls.filter((url: string) => !isValidYouTubeUrl(url))
    if (invalidUrls.length > 0) {
      return NextResponse.json(
        { success: false, message: `URL YouTube không hợp lệ: ${invalidUrls.join(', ')}` },
        { status: 400 }
      )
    }
    
    const posts = await readExamGuideData()
    const newPost: ExamGuidePost = {
      id: Date.now().toString(),
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      status,
      images,
      videoUrls,
      order,
      author: 'Admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    posts.push(newPost)
    await writeExamGuideData(posts)
    
    return NextResponse.json({
      success: true,
      message: 'Tạo hướng dẫn luyện thi thành công',
      data: newPost
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi tạo hướng dẫn luyện thi' },
      { status: 500 }
    )
  }
}

// PUT - Cập nhật hướng dẫn luyện thi
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, content, excerpt, status, images, videoUrls, order } = body
    
    if (!id || !title || !content) {
      return NextResponse.json(
        { success: false, message: 'ID, tiêu đề và nội dung là bắt buộc' },
        { status: 400 }
      )
    }

    // Validate YouTube URLs
    const invalidUrls = videoUrls.filter((url: string) => !isValidYouTubeUrl(url))
    if (invalidUrls.length > 0) {
      return NextResponse.json(
        { success: false, message: `URL YouTube không hợp lệ: ${invalidUrls.join(', ')}` },
        { status: 400 }
      )
    }
    
    const posts = await readExamGuideData()
    const postIndex = posts.findIndex(post => post.id === id)
    
    if (postIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy hướng dẫn luyện thi' },
        { status: 404 }
      )
    }
    
    posts[postIndex] = {
      ...posts[postIndex],
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      status,
      images: images || [],
      videoUrls: videoUrls || [],
      order: order || 0,
      updatedAt: new Date().toISOString()
    }
    
    await writeExamGuideData(posts)
    
    return NextResponse.json({
      success: true,
      message: 'Cập nhật hướng dẫn luyện thi thành công',
      data: posts[postIndex]
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi cập nhật hướng dẫn luyện thi' },
      { status: 500 }
    )
  }
}

// DELETE - Xóa hướng dẫn luyện thi
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID là bắt buộc' },
        { status: 400 }
      )
    }
    
    const posts = await readExamGuideData()
    const filteredPosts = posts.filter(post => post.id !== id)
    
    if (posts.length === filteredPosts.length) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy hướng dẫn luyện thi' },
        { status: 404 }
      )
    }
    
    await writeExamGuideData(filteredPosts)
    
    return NextResponse.json({
      success: true,
      message: 'Xóa hướng dẫn luyện thi thành công'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi xóa hướng dẫn luyện thi' },
      { status: 500 }
    )
  }
} 