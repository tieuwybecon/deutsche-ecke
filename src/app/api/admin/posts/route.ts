import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// File để lưu trữ dữ liệu bài viết
const POSTS_FILE = path.join(process.cwd(), 'data', 'posts.json')

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

// Đảm bảo thư mục data tồn tại
async function ensureDataDir() {
  const dataDir = path.dirname(POSTS_FILE)
  if (!existsSync(dataDir)) {
    await writeFile(POSTS_FILE, JSON.stringify([]))
  }
}

// Đọc dữ liệu bài viết từ file
async function readPostsData(): Promise<Post[]> {
  try {
    await ensureDataDir()
    const data = await readFile(POSTS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Ghi dữ liệu bài viết vào file
async function writePostsData(data: Post[]) {
  await ensureDataDir()
  await writeFile(POSTS_FILE, JSON.stringify(data, null, 2))
}

// GET - Lấy danh sách bài viết
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    
    let posts = await readPostsData()
    
    // Lọc theo status
    if (status) {
      posts = posts.filter(post => post.status === status)
    }
    
    // Lọc theo category
    if (category) {
      posts = posts.filter(post => post.category === category)
    }
    
    // Sắp xếp theo thời gian tạo mới nhất
    posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    
    return NextResponse.json({
      success: true,
      data: posts
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi lấy danh sách bài viết' },
      { status: 500 }
    )
  }
}

// POST - Tạo bài viết mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, excerpt, status = 'draft', category = 'tin-tuc' } = body
    
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Tiêu đề và nội dung là bắt buộc' },
        { status: 400 }
      )
    }
    
    const posts = await readPostsData()
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      status,
      category,
      author: 'Admin', // Có thể lấy từ session sau này
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    posts.push(newPost)
    await writePostsData(posts)
    
    return NextResponse.json({
      success: true,
      message: 'Tạo bài viết thành công',
      data: newPost
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi tạo bài viết' },
      { status: 500 }
    )
  }
}

// PUT - Cập nhật bài viết
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, content, excerpt, status, category } = body
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Thiếu ID bài viết' },
        { status: 400 }
      )
    }
    
    const posts = await readPostsData()
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
      ...(status && { status }),
      ...(category && { category }),
      updatedAt: new Date().toISOString()
    }
    
    await writePostsData(posts)
    
    return NextResponse.json({
      success: true,
      message: 'Cập nhật bài viết thành công',
      data: posts[index]
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi cập nhật bài viết' },
      { status: 500 }
    )
  }
}

// DELETE - Xóa bài viết
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
    
    const posts = await readPostsData()
    const index = posts.findIndex(post => post.id === id)
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy bài viết' },
        { status: 404 }
      )
    }
    
    const deletedPost = posts.splice(index, 1)[0]
    await writePostsData(posts)
    
    return NextResponse.json({
      success: true,
      message: 'Xóa bài viết thành công',
      data: deletedPost
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi xóa bài viết' },
      { status: 500 }
    )
  }
} 