import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// File để lưu trữ dữ liệu (trong thực tế nên dùng database)
const CONTENT_FILE = path.join(process.cwd(), 'data', 'content.json')

interface ContentItem {
  id: string
  title: string
  content: string
  type: 'article' | 'image' | 'video'
  status: 'published' | 'draft' | 'pending'
  imageUrl?: string
  videoUrl?: string
  createdAt: string
  updatedAt: string
}

// Đảm bảo thư mục data tồn tại
async function ensureDataDir() {
  const dataDir = path.dirname(CONTENT_FILE)
  if (!existsSync(dataDir)) {
    await writeFile(CONTENT_FILE, JSON.stringify([]))
  }
}

// Đọc dữ liệu từ file
async function readContentData(): Promise<ContentItem[]> {
  try {
    await ensureDataDir()
    const data = await readFile(CONTENT_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Ghi dữ liệu vào file
async function writeContentData(data: ContentItem[]) {
  await ensureDataDir()
  await writeFile(CONTENT_FILE, JSON.stringify(data, null, 2))
}

// GET - Lấy danh sách nội dung
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    
    let content = await readContentData()
    
    // Lọc theo type
    if (type) {
      content = content.filter(item => item.type === type)
    }
    
    // Lọc theo status
    if (status) {
      content = content.filter(item => item.status === status)
    }
    
    return NextResponse.json({
      success: true,
      data: content
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi lấy dữ liệu' },
      { status: 500 }
    )
  }
}

// POST - Tạo nội dung mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, type, status = 'draft' } = body
    
    if (!title || !content || !type) {
      return NextResponse.json(
        { success: false, message: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      )
    }
    
    const contentList = await readContentData()
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title,
      content,
      type,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    contentList.push(newItem)
    await writeContentData(contentList)
    
    return NextResponse.json({
      success: true,
      message: 'Tạo nội dung thành công',
      data: newItem
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi tạo nội dung' },
      { status: 500 }
    )
  }
}

// PUT - Cập nhật nội dung
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, content, type, status } = body
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Thiếu ID nội dung' },
        { status: 400 }
      )
    }
    
    const contentList = await readContentData()
    const index = contentList.findIndex(item => item.id === id)
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy nội dung' },
        { status: 404 }
      )
    }
    
    contentList[index] = {
      ...contentList[index],
      ...(title && { title }),
      ...(content && { content }),
      ...(type && { type }),
      ...(status && { status }),
      updatedAt: new Date().toISOString()
    }
    
    await writeContentData(contentList)
    
    return NextResponse.json({
      success: true,
      message: 'Cập nhật thành công',
      data: contentList[index]
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi cập nhật nội dung' },
      { status: 500 }
    )
  }
}

// DELETE - Xóa nội dung
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Thiếu ID nội dung' },
        { status: 400 }
      )
    }
    
    const contentList = await readContentData()
    const index = contentList.findIndex(item => item.id === id)
    
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy nội dung' },
        { status: 404 }
      )
    }
    
    const deletedItem = contentList.splice(index, 1)[0]
    await writeContentData(contentList)
    
    return NextResponse.json({
      success: true,
      message: 'Xóa nội dung thành công',
      data: deletedItem
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi xóa nội dung' },
      { status: 500 }
    )
  }
} 