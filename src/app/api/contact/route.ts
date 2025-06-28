import { NextRequest, NextResponse } from 'next/server'

// Dynamic import để tránh lỗi khi package không có
async function sendEmailWithResend(emailData: any) {
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    return await resend.emails.send(emailData)
  } catch (error) {
    console.log('Resend not available or configured:', error)
    return null
  }
}

// Fallback: Log email content if no service available
function logEmailContent(emailContent: string, subject: string, to: string) {
  console.log('='.repeat(50))
  console.log(`📧 EMAIL CONTENT (${new Date().toISOString()})`)
  console.log('='.repeat(50))
  console.log(`To: ${to}`)
  console.log(`Subject: ${subject}`)
  console.log('Content:')
  console.log(emailContent)
  console.log('='.repeat(50))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      email, 
      phone, 
      course, 
      schedule, 
      experience, 
      motivation, 
      message 
    } = body

    // Validate required fields
    if (!name || !email || !phone || !course) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin bắt buộc!' },
        { status: 400 }
      )
    }

    // Course mapping
    const courses = {
      a1: { name: 'Khóa A1 - Người mới bắt đầu', duration: '3 tháng', price: '2.500.000đ' },
      a2: { name: 'Khóa A2 - Sơ cấp', duration: '3 tháng', price: '2.700.000đ' },
      b1: { name: 'Khóa B1 - Trung cấp', duration: '4 tháng', price: '3.200.000đ' },
      b2: { name: 'Khóa B2 - Trung cấp cao', duration: '4 tháng', price: '3.500.000đ' },
      intensive: { name: 'Khóa cấp tốc - Luyện thi', duration: '2 tháng', price: '4.000.000đ' },
      conversation: { name: 'Khóa giao tiếp - Thực hành', duration: '2 tháng', price: '2.200.000đ' },
      consultation: { name: 'Tư vấn du học Đức', duration: 'Linh hoạt', price: 'Liên hệ' }
    }

    const scheduleMapping = {
      morning: '🌅 Buổi sáng (8:00 - 11:00)',
      afternoon: '☀️ Buổi chiều (14:00 - 17:00)',
      evening: '🌙 Buổi tối (18:30 - 21:30)',
      weekend: '🎯 Cuối tuần (9:00 - 12:00)'
    }

    const experienceMapping = {
      beginner: 'Mới bắt đầu - chưa học bao giờ',
      basic: 'Đã học cơ bản - biết một ít',
      intermediate: 'Trung cấp - đã có nền tảng',
      advanced: 'Nâng cao - muốn hoàn thiện'
    }

    const motivationMapping = {
      study: 'Du học Đức',
      work: 'Làm việc tại Đức',
      travel: 'Du lịch và khám phá',
      hobby: 'Sở thích cá nhân',
      certificate: 'Lấy chứng chỉ quốc tế',
      other: 'Mục tiêu khác'
    }

    const selectedCourse = courses[course as keyof typeof courses]
    const selectedSchedule = scheduleMapping[schedule as keyof typeof scheduleMapping]
    const selectedExperience = experienceMapping[experience as keyof typeof experienceMapping]
    const selectedMotivation = motivationMapping[motivation as keyof typeof motivationMapping]

    // Create email content cho trung tâm
    const emailContentForSchool = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; }
        .content { padding: 30px; }
        .section { margin: 25px 0; padding: 20px; border-left: 4px solid #667eea; background: #f8f9fa; border-radius: 8px; }
        .section h2 { margin: 0 0 15px 0; color: #333; font-size: 18px; }
        .highlight { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #bbdefb; }
        .info-grid { display: grid; grid-template-columns: 120px 1fr; gap: 10px; margin: 10px 0; }
        .info-label { font-weight: bold; color: #555; }
        .footer { background: #f1f3f4; padding: 20px; text-align: center; font-size: 14px; color: #666; }
        .priority { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .priority h3 { margin: 0 0 10px 0; color: #d68910; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎓 Đăng Ký Khóa Học Mới</h1>
          <p>Deutsche Ecke - Thông tin học viên</p>
        </div>
        
        <div class="content">
          <div class="priority">
            <h3>⚡ Ưu tiên cao - Học viên mới đăng ký!</h3>
            <p>Vui lòng liên hệ lại trong vòng <strong>24 giờ</strong> để tư vấn và xác nhận khóa học.</p>
          </div>

          <div class="section">
            <h2>👤 Thông Tin Học Viên</h2>
            <div class="info-grid">
              <span class="info-label">Họ tên:</span>
              <span>${name}</span>
              <span class="info-label">Email:</span>
              <span><a href="mailto:${email}">${email}</a></span>
              <span class="info-label">Điện thoại:</span>
              <span><a href="tel:${phone}">${phone}</a></span>
            </div>
          </div>

          <div class="section">
            <h2>📚 Thông Tin Khóa Học</h2>
            <div class="highlight">
              <div class="info-grid">
                <span class="info-label">Khóa học:</span>
                <span><strong>${selectedCourse?.name || 'Không xác định'}</strong></span>
                <span class="info-label">Thời lượng:</span>
                <span>${selectedCourse?.duration || 'N/A'}</span>
                <span class="info-label">Học phí:</span>
                <span><strong style="color: #2e7d32;">${selectedCourse?.price || 'Liên hệ'}</strong></span>
                <span class="info-label">Lịch học:</span>
                <span>${selectedSchedule || 'Chưa chọn - cần tư vấn'}</span>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>📖 Kinh Nghiệm & Mục Tiêu</h2>
            <div class="info-grid">
              <span class="info-label">Kinh nghiệm:</span>
              <span>${selectedExperience || 'Không có thông tin'}</span>
              <span class="info-label">Mục tiêu:</span>
              <span>${selectedMotivation || 'Không có thông tin'}</span>
            </div>
          </div>

          ${message ? `
          <div class="section">
            <h2>📝 Ghi Chú Từ Học Viên</h2>
            <p style="background: white; padding: 15px; border-radius: 5px; border-left: 3px solid #4caf50;">${message}</p>
          </div>
          ` : ''}

          <div class="section">
            <h2>⏰ Chi Tiết Đăng Ký</h2>
            <div class="info-grid">
              <span class="info-label">Thời gian:</span>
              <span>${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}</span>
              <span class="info-label">Nguồn:</span>
              <span>Website Deutsche Ecke - Form đăng ký</span>
              <span class="info-label">IP Address:</span>
              <span>${request.headers.get('x-forwarded-for') || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div class="footer">
          <p><strong>📞 Hành động tiếp theo:</strong></p>
          <p>1. Gọi điện tư vấn trong 24h: <strong>${phone}</strong></p>
          <p>2. Gửi email chi tiết về khóa học: <strong>${email}</strong></p>
          <p>3. Cập nhật CRM và lên lịch hẹn tư vấn</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p>📧 contact@dek.edu.vn | 📞 077.024.240</p>
          <p>🏢 Deutsche Ecke - Trung tâm tiếng Đức chất lượng cao</p>
        </div>
      </div>
    </body>
    </html>
    `

    // Create confirmation email cho học viên
    const confirmationEmailContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center; }
        .content { padding: 30px; }
        .highlight { background: #e8f5e8; padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #4caf50; }
        .next-steps { background: #fff3e0; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .contact-info { background: #e3f2fd; padding: 20px; border-radius: 10px; margin: 20px 0; }
        .footer { background: #f1f3f4; padding: 20px; text-align: center; color: #666; }
        .btn { display: inline-block; background: #4caf50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Chào mừng đến với Deutsche Ecke!</h1>
          <p>Cảm ơn bạn đã đăng ký khóa học</p>
        </div>
        
        <div class="content">
          <p>Chào <strong>${name}</strong>,</p>
          
          <div class="highlight">
            <h2>✅ Đăng ký thành công!</h2>
            <p>Chúng tôi đã nhận được thông tin đăng ký khóa học của bạn:</p>
            <p><strong>📚 Khóa học:</strong> ${selectedCourse?.name}</p>
            <p><strong>⏰ Thời gian:</strong> ${selectedSchedule || 'Sẽ tư vấn chi tiết'}</p>
            <p><strong>💰 Học phí:</strong> ${selectedCourse?.price}</p>
          </div>

          <div class="next-steps">
            <h3>🔥 Bước tiếp theo:</h3>
            <ul>
              <li>✨ Đội ngũ tư vấn sẽ gọi điện cho bạn trong vòng <strong>24 giờ</strong></li>
              <li>📋 Tư vấn chi tiết về khóa học và lịch học phù hợp</li>
              <li>📝 Hướng dẫn thủ tục đăng ký và thanh toán</li>
              <li>🎯 Đánh giá trình độ và phân lớp (nếu cần)</li>
            </ul>
          </div>

          <div class="contact-info">
            <h3>📞 Liên hệ ngay nếu cần hỗ trợ:</h3>
            <p>
              📧 <strong>Email:</strong> <a href="mailto:contact@dek.edu.vn">contact@dek.edu.vn</a><br>
              📱 <strong>Hotline:</strong> <a href="tel:0770242400">077.024.240</a><br>
              📍 <strong>Địa chỉ:</strong> 123 Đường Đức, Quận 1, TP.HCM<br>
              🌐 <strong>Website:</strong> <a href="https://deutsche-ecke.com">deutsche-ecke.com</a>
            </p>
            
            <div style="text-align: center; margin: 20px 0;">
              <a href="tel:0770242400" class="btn">📞 Gọi ngay</a>
              <a href="mailto:contact@dek.edu.vn" class="btn" style="background: #2196f3;">✉️ Gửi email</a>
            </div>
          </div>

          <h3>🌟 Tại sao chọn Deutsche Ecke?</h3>
          <ul>
            <li>🎓 Đội ngũ giáo viên bản ngữ và có kinh nghiệm tại Đức</li>
            <li>📚 Chương trình học chuẩn châu Âu</li>
            <li>🏆 Tỷ lệ đỗ chứng chỉ cao (98%)</li>
            <li>🎯 Hỗ trợ tư vấn du học miễn phí</li>
            <li>💝 Môi trường học tập thân thiện, hiệu quả</li>
          </ul>
        </div>

        <div class="footer">
          <p><strong>Cảm ơn bạn đã tin tưởng Deutsche Ecke!</strong></p>
          <p>Chúng tôi rất mong được đồng hành cùng bạn trên hành trình chinh phục tiếng Đức! 🇩🇪</p>
          <p style="font-size: 12px; color: #999; margin-top: 20px;">
            Email này được gửi tự động. Vui lòng không reply trực tiếp.<br>
            Để được hỗ trợ, vui lòng liên hệ: contact@dek.edu.vn
          </p>
        </div>
      </div>
    </body>
    </html>
    `

    const companyEmail = process.env.COMPANY_EMAIL || 'contact@dek.edu.vn'

    // Try to send email using Resend
    let emailSent = false
    
    if (process.env.RESEND_API_KEY) {
      try {
        // Send to company
        await sendEmailWithResend({
          from: 'Deutsche Ecke <noreply@dek.edu.vn>',
          to: [companyEmail],
          subject: `🎓 [Đăng ký mới] ${selectedCourse?.name} - ${name}`,
          html: emailContentForSchool,
          replyTo: email
        })

        // Send confirmation to student
        await sendEmailWithResend({
          from: 'Deutsche Ecke <noreply@dek.edu.vn>',
          to: [email],
          subject: '🎉 Xác nhận đăng ký khóa học - Deutsche Ecke',
          html: confirmationEmailContent
        })

        emailSent = true
        console.log('✅ Emails sent successfully via Resend')
      } catch (resendError) {
        console.error('❌ Resend error:', resendError)
      }
    }

    // Fallback: Log email content if no service available
    if (!emailSent) {
      console.log('📧 Email service not configured. Logging email content:')
      logEmailContent(emailContentForSchool, `Đăng ký khóa học - ${name}`, companyEmail)
      logEmailContent(confirmationEmailContent, 'Xác nhận đăng ký', email)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Đăng ký thành công! Chúng tôi sẽ liên hệ lại với bạn trong vòng 24h.',
      details: {
        course: selectedCourse?.name,
        schedule: selectedSchedule,
        emailSent: emailSent
      }
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau!' },
      { status: 500 }
    )
  }
} 