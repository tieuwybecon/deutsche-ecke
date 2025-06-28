import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// Thư mục lưu trữ file upload
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

// Đảm bảo thư mục upload tồn tại
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Không có file được upload' },
        { status: 400 }
      )
    }

    // Kiểm tra loại file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Chỉ chấp nhận file hình ảnh (JPG, PNG, GIF, WebP)' },
        { status: 400 }
      )
    }

    // Kiểm tra kích thước file (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'File quá lớn. Tối đa 5MB' },
        { status: 400 }
      )
    }

    // Tạo tên file unique
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, '_')
    const fileName = `${timestamp}_${originalName}`
    
    // Tạo đường dẫn upload
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'grammar')
    
    // Tạo thư mục nếu chưa tồn tại
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Đường dẫn file đầy đủ
    const filePath = path.join(uploadDir, fileName)
    
    // Lưu file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Trả về URL của file
    const fileUrl = `/uploads/grammar/${fileName}`
    
    return NextResponse.json({
      success: true,
      message: 'Upload thành công',
      data: {
        url: fileUrl,
        filename: fileName,
        originalName: file.name,
        size: file.size,
        type: file.type
      }
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, message: 'Lỗi khi upload file' },
      { status: 500 }
    )
  }
} 