import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// File để lưu trữ dữ liệu bài viết ngữ pháp
const GRAMMAR_FILE = path.join(process.cwd(), 'data', 'grammar.json')

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number // Index của đáp án đúng
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
  videoUrls: string[] // Thêm support cho YouTube URLs
  quiz: QuizQuestion[] // Thêm support cho quiz
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
  const dataDir = path.dirname(GRAMMAR_FILE)
  if (!existsSync(dataDir)) {
    await writeFile(GRAMMAR_FILE, JSON.stringify([]))
  }
}

// Đọc dữ liệu bài viết ngữ pháp từ file
async function readGrammarData(): Promise<GrammarPost[]> {
  try {
    await ensureDataDir()
    const data = await readFile(GRAMMAR_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Ghi dữ liệu bài viết ngữ pháp vào file
async function writeGrammarData(data: GrammarPost[]) {
  await ensureDataDir()
  await writeFile(GRAMMAR_FILE, JSON.stringify(data, null, 2))
}

// GET - Lấy danh sách bài viết ngữ pháp
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const level = searchParams.get('level')
    const status = searchParams.get('status')
    
    let posts = await readGrammarData()
    
    // Lọc theo level
    if (level) {
      posts = posts.filter(post => post.level === level)
    }
    
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
      { success: false, message: 'Lỗi khi lấy danh sách bài viết ngữ pháp' },
      { status: 500 }
    )
  }
}

// POST - Tạo bài viết ngữ pháp mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      content, 
      excerpt, 
      level, 
      status = 'draft', 
      images = [], 
      videoUrls = [],
      quiz = [],
      order = 0 
    } = body
    
    if (!title || !content || !level) {
      return NextResponse.json(
        { success: false, message: 'Tiêu đề, nội dung và cấp độ là bắt buộc' },
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

    // Validate quiz questions
    for (const question of quiz) {
      if (!question.question || !Array.isArray(question.options) || question.options.length < 2) {
        return NextResponse.json(
          { success: false, message: 'Câu hỏi quiz phải có nội dung và ít nhất 2 tùy chọn' },
          { status: 400 }
        )
      }
      if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
        return NextResponse.json(
          { success: false, message: 'Chỉ số đáp án đúng không hợp lệ' },
          { status: 400 }
        )
      }
    }
    
    const posts = await readGrammarData()
    const newPost: GrammarPost = {
      id: Date.now().toString(),
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      level,
      status,
      images,
      videoUrls,
      quiz: quiz.map((q: any, index: number) => ({
        id: `${Date.now()}_${index}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || ''
      })),
      order,
      author: 'Admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    posts.push(newPost)
    await writeGrammarData(posts)
    
    return NextResponse.json({
      success: true,
      message: 'Tạo bài viết ngữ pháp thành công',
      data: newPost
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi tạo bài viết ngữ pháp' },
      { status: 500 }
    )
  }
}

// PUT - Cập nhật bài viết ngữ pháp
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, content, excerpt, level, status, images, videoUrls, quiz, order } = body
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Thiếu ID bài viết' },
        { status: 400 }
      )
    }

    // Validate YouTube URLs if provided
    if (videoUrls) {
      const invalidUrls = videoUrls.filter((url: string) => !isValidYouTubeUrl(url))
      if (invalidUrls.length > 0) {
        return NextResponse.json(
          { success: false, message: `URL YouTube không hợp lệ: ${invalidUrls.join(', ')}` },
          { status: 400 }
        )
      }
    }

    // Validate quiz questions if provided
    if (quiz) {
      for (const question of quiz) {
        if (!question.question || !Array.isArray(question.options) || question.options.length < 2) {
          return NextResponse.json(
            { success: false, message: 'Câu hỏi quiz phải có nội dung và ít nhất 2 tùy chọn' },
            { status: 400 }
          )
        }
        if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
          return NextResponse.json(
            { success: false, message: 'Chỉ số đáp án đúng không hợp lệ' },
            { status: 400 }
          )
        }
      }
    }
    
    const posts = await readGrammarData()
    const index = posts.findIndex(post => post.id === id)
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy bài viết' },
        { status: 404 }
      )
    }
    
    posts[index] = {
      ...posts[index],
      ...(title && { title }),
      ...(content && { content }),
      ...(excerpt && { excerpt }),
      ...(level && { level }),
      ...(status && { status }),
      ...(images && { images }),
      ...(videoUrls && { videoUrls }),
      ...(quiz && { 
        quiz: quiz.map((q: any, idx: number) => ({
          id: q.id || `${Date.now()}_${idx}`,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || ''
        }))
      }),
      ...(order !== undefined && { order }),
      updatedAt: new Date().toISOString()
    }
    
    await writeGrammarData(posts)
    
    return NextResponse.json({
      success: true,
      message: 'Cập nhật bài viết ngữ pháp thành công',
      data: posts[index]
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi cập nhật bài viết ngữ pháp' },
      { status: 500 }
    )
  }
}

// DELETE - Xóa bài viết ngữ pháp
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Thiếu ID bài viết' },
        { status: 400 }
      )
    }
    
    const posts = await readGrammarData()
    const index = posts.findIndex(post => post.id === id)
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy bài viết' },
        { status: 404 }
      )
    }
    
    posts.splice(index, 1)
    await writeGrammarData(posts)
    
    return NextResponse.json({
      success: true,
      message: 'Xóa bài viết ngữ pháp thành công'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi xóa bài viết ngữ pháp' },
      { status: 500 }
    )
  }
} 