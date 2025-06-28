# 📧 Hướng Dẫn Cấu Hình Email Service

## 🎯 Tổng Quan

Trang đăng ký khóa học của Deutsche Ecke đã được tích hợp với hệ thống email tự động để:
- Gửi thông tin đăng ký về email trung tâm
- Gửi email xác nhận cho học viên
- Log thông tin đăng ký nếu chưa cấu hình email service

## ⚙️ Cách Cấu Hình

### Option 1: Sử dụng Resend (Khuyến nghị)

1. **Đăng ký tài khoản Resend:**
   - Truy cập: https://resend.com
   - Đăng ký tài khoản miễn phí
   - Lấy API Key từ dashboard

2. **Cấu hình Environment Variables:**
   ```bash
   # Tạo file .env.local
   RESEND_API_KEY=re_xxxxxxxx_xxxxxxxxxxxxxxxxxxxxxxxxxx
   COMPANY_EMAIL=contact@dek.edu.vn
   ```

3. **Verify Domain (Tùy chọn):**
   - Để gửi email từ domain @dek.edu.vn, cần verify domain trong Resend
   - Hoặc sử dụng email mặc định của Resend

### Option 2: Chạy Mà Không Cấu Hình Email

Nếu chưa muốn cấu hình email service, hệ thống vẫn hoạt động bình thường:
- Thông tin đăng ký sẽ được log vào console
- Có thể xem thông tin trong terminal khi chạy `npm run dev`

## 🚀 Test Chức Năng

1. **Chạy development server:**
   ```bash
   npm run dev
   ```

2. **Truy cập trang đăng ký:**
   ```
   http://localhost:3000/lien-he
   ```

3. **Điền form và test:**
   - Điền đầy đủ thông tin bắt buộc
   - Chọn khóa học và thời gian
   - Click "Đăng Ký Ngay!"

## 📋 Cấu Trúc Email

### Email Gửi Về Trung Tâm:
- **Subject:** `🎓 [Đăng ký mới] [Tên khóa học] - [Tên học viên]`
- **Nội dung:** Thông tin chi tiết học viên, khóa học, ghi chú
- **Định dạng:** HTML với styling đẹp mắt

### Email Xác Nhận Cho Học Viên:
- **Subject:** `🎉 Xác nhận đăng ký khóa học - Deutsche Ecke`
- **Nội dung:** Thông tin xác nhận, bước tiếp theo, thông tin liên hệ
- **Định dạng:** HTML responsive, friendly

## 🔧 Troubleshooting

### Lỗi Thường Gặp:

1. **"Resend not available"**
   - Cài đặt package: `npm install resend`
   - Kiểm tra API key trong .env.local

2. **Email không gửi được**
   - Kiểm tra API key có đúng không
   - Verify domain nếu cần
   - Xem log trong console để debug

3. **Form submit nhưng không có response**
   - Kiểm tra Network tab trong DevTools
   - Xem console log có lỗi gì không

### Debug Steps:

```bash
# 1. Kiểm tra logs
npm run dev
# Xem console output khi submit form

# 2. Test API endpoint trực tiếp
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","phone":"0123456789","course":"a1"}'
```

## 📊 Monitoring

### Log Format:
- Console sẽ hiện log chi tiết khi có đăng ký mới
- Thông tin bao gồm: thời gian, thông tin học viên, trạng thái gửi email

### Resend Dashboard:
- Theo dõi email delivery rate
- Xem bounce rate và spam reports
- Monitor API usage

## 🎨 Customization

### Chỉnh Sửa Email Template:
- File: `src/app/api/contact/route.ts`
- Phần: `emailContentForSchool` và `confirmationEmailContent`
- Có thể thay đổi styling, nội dung, layout

### Thêm Field Mới:
1. Cập nhật form trong `src/app/lien-he/page.tsx`
2. Thêm field vào API validation
3. Cập nhật email template để hiển thị field mới

## 📞 Support

Nếu gặp vấn đề, có thể:
1. Check file log và console output
2. Test với các email khác nhau
3. Liên hệ dev team để hỗ trợ

---

**Lưu ý:** Hệ thống được thiết kế để hoạt động robust, có fallback khi không có email service. Ưu tiên trải nghiệm người dùng và không bao giờ fail form submit vì lỗi email. 