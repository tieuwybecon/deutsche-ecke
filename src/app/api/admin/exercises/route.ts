import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// File để lưu trữ dữ liệu bài tập
const EXERCISES_FILE = path.join(process.cwd(), 'data', 'exercises.json')

interface MultipleChoiceQuestion {
  type: 'multiple-choice'
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

interface FillInBlankQuestion {
  type: 'fill-in-blank'
  id: string
  sentence: string
  blanks: {
    position: number
    correctAnswer: string
    alternatives?: string[] // Các đáp án khác cũng được chấp nhận
  }[]
  explanation?: string
}

type ExerciseQuestion = MultipleChoiceQuestion | FillInBlankQuestion

interface Exercise {
  id: string
  title: string
  description: string
  level: 'A1' | 'A2' | 'B1' | 'B2'
  category: 'grammar' | 'vocabulary' | 'reading' | 'listening' | 'mixed'
  status: 'published' | 'draft' | 'pending'
  author: string
  questions: ExerciseQuestion[]
  timeLimit?: number // thời gian làm bài (phút)
  order: number
  createdAt: string
  updatedAt: string
}

// Đảm bảo thư mục data tồn tại
async function ensureDataDir() {
  const dataDir = path.dirname(EXERCISES_FILE)
  if (!existsSync(dataDir)) {
    await writeFile(EXERCISES_FILE, JSON.stringify([]))
  }
}

// Đọc dữ liệu bài tập từ file
async function readExercisesData(): Promise<Exercise[]> {
  try {
    await ensureDataDir()
    const data = await readFile(EXERCISES_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Ghi dữ liệu bài tập vào file
async function writeExercisesData(data: Exercise[]) {
  await ensureDataDir()
  await writeFile(EXERCISES_FILE, JSON.stringify(data, null, 2))
}

// Validate questions
function validateQuestions(questions: ExerciseQuestion[]): string | null {
  for (const question of questions) {
    if (question.type === 'multiple-choice') {
      if (!question.question || !Array.isArray(question.options) || question.options.length < 2) {
        return 'Câu hỏi trắc nghiệm phải có nội dung và ít nhất 2 tùy chọn'
      }
      if (question.correctAnswer < 0 || question.correctAnswer >= question.options.length) {
        return 'Chỉ số đáp án đúng không hợp lệ'
      }
    } else if (question.type === 'fill-in-blank') {
      if (!question.sentence || !Array.isArray(question.blanks) || question.blanks.length === 0) {
        return 'Câu hỏi điền từ phải có câu và ít nhất 1 chỗ trống'
      }
      for (const blank of question.blanks) {
        if (typeof blank.position !== 'number' || !blank.correctAnswer) {
          return 'Thông tin chỗ trống không hợp lệ'
        }
      }
    }
  }
  return null
}

// GET - Lấy danh sách bài tập
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const level = searchParams.get('level')
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    
    let exercises = await readExercisesData()
    
    // Lọc theo level
    if (level) {
      exercises = exercises.filter(exercise => exercise.level === level)
    }
    
    // Lọc theo category
    if (category) {
      exercises = exercises.filter(exercise => exercise.category === category)
    }
    
    // Lọc theo status
    if (status) {
      exercises = exercises.filter(exercise => exercise.status === status)
    }
    
    // Sắp xếp theo order và thời gian tạo
    exercises.sort((a, b) => {
      if (a.order !== b.order) {
        return a.order - b.order
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
    
    return NextResponse.json({
      success: true,
      data: exercises
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi lấy danh sách bài tập' },
      { status: 500 }
    )
  }
}

// POST - Tạo bài tập mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      description, 
      level, 
      category,
      status = 'draft', 
      questions = [],
      timeLimit,
      order = 0 
    } = body
    
    if (!title || !description || !level || !category) {
      return NextResponse.json(
        { success: false, message: 'Tiêu đề, mô tả, cấp độ và danh mục là bắt buộc' },
        { status: 400 }
      )
    }

    // Validate questions
    const validationError = validateQuestions(questions)
    if (validationError) {
      return NextResponse.json(
        { success: false, message: validationError },
        { status: 400 }
      )
    }
    
    const exercises = await readExercisesData()
    const newExercise: Exercise = {
      id: Date.now().toString(),
      title,
      description,
      level,
      category,
      status,
      questions: questions.map((q: any, index: number) => ({
        ...q,
        id: `${Date.now()}_${index}`
      })),
      timeLimit,
      order,
      author: 'Admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    exercises.push(newExercise)
    await writeExercisesData(exercises)
    
    return NextResponse.json({
      success: true,
      message: 'Tạo bài tập thành công',
      data: newExercise
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi tạo bài tập' },
      { status: 500 }
    )
  }
}

// PUT - Cập nhật bài tập
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, description, level, category, status, questions, timeLimit, order } = body
    
    if (!id || !title || !description || !level || !category) {
      return NextResponse.json(
        { success: false, message: 'ID, tiêu đề, mô tả, cấp độ và danh mục là bắt buộc' },
        { status: 400 }
      )
    }

    // Validate questions
    const validationError = validateQuestions(questions || [])
    if (validationError) {
      return NextResponse.json(
        { success: false, message: validationError },
        { status: 400 }
      )
    }
    
    const exercises = await readExercisesData()
    const exerciseIndex = exercises.findIndex(exercise => exercise.id === id)
    
    if (exerciseIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy bài tập' },
        { status: 404 }
      )
    }
    
    exercises[exerciseIndex] = {
      ...exercises[exerciseIndex],
      title,
      description,
      level,
      category,
      status,
      questions: questions || [],
      timeLimit,
      order: order || 0,
      updatedAt: new Date().toISOString()
    }
    
    await writeExercisesData(exercises)
    
    return NextResponse.json({
      success: true,
      message: 'Cập nhật bài tập thành công',
      data: exercises[exerciseIndex]
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi cập nhật bài tập' },
      { status: 500 }
    )
  }
}

// DELETE - Xóa bài tập
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
    
    const exercises = await readExercisesData()
    const filteredExercises = exercises.filter(exercise => exercise.id !== id)
    
    if (exercises.length === filteredExercises.length) {
      return NextResponse.json(
        { success: false, message: 'Không tìm thấy bài tập' },
        { status: 404 }
      )
    }
    
    await writeExercisesData(filteredExercises)
    
    return NextResponse.json({
      success: true,
      message: 'Xóa bài tập thành công'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Lỗi khi xóa bài tập' },
      { status: 500 }
    )
  }
} 