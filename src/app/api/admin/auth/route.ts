import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Sử dụng environment variables cho bảo mật
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$default.hash.here'
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Kiểm tra username
    if (username !== ADMIN_USERNAME) {
      return NextResponse.json(
        { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    // Kiểm tra password với bcrypt
    const isValidPassword = await bcrypt.compare(password, ADMIN_PASSWORD_HASH)
    
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    // Tạo JWT token
    const token = jwt.sign(
      { 
        username, 
        role: 'admin',
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 giờ
      },
      JWT_SECRET
    )
    
    return NextResponse.json({
      success: true,
      message: 'Đăng nhập thành công',
      token,
      user: {
        username,
        role: 'admin'
      }
    })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { success: false, message: 'Lỗi server' },
      { status: 500 }
    )
  }
} 