# 🚀 Hướng dẫn Deploy Website Deutsche Ecke

## ⚠️ **QUAN TRỌNG: Bảo mật trước khi deploy**

### 1. **Tạo mật khẩu admin an toàn**
```bash
# Tạo password hash
node scripts/generate-password.js yourSecurePassword123

# Copy hash được tạo ra vào .env.local
ADMIN_PASSWORD_HASH=$2a$12$your.hash.here
```

### 2. **Tạo file .env.local**
```bash
# Copy từ env.example
cp env.example .env.local

# Chỉnh sửa các giá trị
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD_HASH=your-bcrypt-hash
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## 🚀 **Các lựa chọn Deploy miễn phí**

### 1. Vercel (Khuyến nghị)
**Ưu điểm:**
- Tối ưu nhất cho Next.js
- Deploy tự động từ GitHub
- 100GB bandwidth/tháng miễn phí
- Custom domain miễn phí
- SSL tự động

**Cách deploy:**
1. Push code lên GitHub repository
2. Đăng ký tài khoản tại [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import từ GitHub repository
5. Cấu hình Environment Variables trong Vercel dashboard
6. Vercel sẽ tự động detect Next.js và deploy
7. Website sẽ có URL dạng: `https://your-project.vercel.app`

### 2. Netlify
**Ưu điểm:**
- Dễ sử dụng
- Form handling tích hợp
- 100GB bandwidth/tháng miễn phí

**Cách deploy:**
1. Push code lên GitHub
2. Đăng ký tại [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Chọn GitHub và repository
5. Build command: `npm run build`
6. Publish directory: `out` (nếu export static)

### 3. GitHub Pages (Static Export)
**Ưu điểm:**
- Hoàn toàn miễn phí
- Không giới hạn bandwidth

**Nhược điểm:**
- Cần export static
- Không hỗ trợ server-side features

**Cách deploy:**
1. Thêm vào `next.config.js`:
```javascript
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}
```

2. Build và export:
```bash
npm run build
npm run export
```

3. Push thư mục `out` lên GitHub Pages

## 🔧 **Cấu hình môi trường**

### Biến môi trường cần thiết:
Tạo file `.env.local`:
```
# Bảo mật Admin (QUAN TRỌNG!)
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD_HASH=your-bcrypt-hash
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key
```

### Tối ưu hóa cho production:
1. **Images**: Sử dụng Next.js Image component
2. **SEO**: Cấu hình meta tags
3. **Performance**: Enable compression
4. **Security**: Cấu hình CSP headers

## 🛡️ **Bảo mật sau khi deploy**

### 1. **Thay đổi thông tin admin**
- Đăng nhập vào admin panel
- Thay đổi username và password
- Cập nhật environment variables

### 2. **Cấu hình HTTPS**
- Vercel/Netlify tự động cung cấp SSL
- Đảm bảo redirect HTTP → HTTPS

### 3. **Security Headers**
- CSP (Content Security Policy)
- HSTS (HTTP Strict Transport Security)
- X-Frame-Options
- X-Content-Type-Options

## 📊 **Monitoring và Analytics**

### Vercel Analytics (Miễn phí):
- Tích hợp sẵn với Vercel
- Real-time performance monitoring
- Error tracking

### Google Analytics:
- Thêm Google Analytics 4
- Track user behavior
- Performance insights

## 🔄 **Quy trình phát triển sau deploy**

### **Hàng ngày:**
```bash
# 1. Làm việc local
npm run dev

# 2. Code, test, sửa lỗi
# 3. Khi hài lòng → commit và push
git add .
git commit -m "Mô tả thay đổi"
git push origin main

# 4. Chờ 2-3 phút → Website tự động cập nhật!
```

### **Khi có lỗi:**
```bash
# 1. Phát hiện lỗi trên website live
# 2. Sửa lỗi local
npm run dev

# 3. Test fix
# 4. Push fix
git add .
git commit -m "Fix lỗi responsive trên mobile"
git push origin main

# 5. Lỗi được sửa trên website live!
```

## 🚨 **Troubleshooting**

### Lỗi thường gặp:
1. **Build failed**: Kiểm tra TypeScript errors
2. **Images not loading**: Cấu hình domains trong next.config.js
3. **API routes not working**: Kiểm tra serverless function limits
4. **Admin login failed**: Kiểm tra environment variables

### Performance tips:
1. Sử dụng dynamic imports
2. Optimize images
3. Enable caching
4. Minify CSS/JS

## 📱 **Frontend vs Backend Admin**

### **Frontend (Website chính):**
- Hiển thị cho tất cả người dùng
- Tối ưu performance
- SEO friendly
- Responsive design

### **Backend Admin:**
- Chỉ admin truy cập
- Bảo mật cao
- Quản lý nội dung
- Upload files

### **Quy trình làm việc:**
- **Frontend**: Làm việc bình thường với Cursor
- **Backend**: Cũng làm việc với Cursor, nhưng có thêm bảo mật
- **Deploy**: Cả hai đều deploy cùng lúc qua GitHub

## 🎯 **Tóm tắt quy trình**

1. **Chuẩn bị**: Tạo password hash, cấu hình .env.local
2. **Deploy**: Push lên GitHub, connect với Vercel
3. **Bảo mật**: Thay đổi thông tin admin, cấu hình HTTPS
4. **Phát triển**: Làm việc local, push để update website
5. **Monitoring**: Theo dõi performance và lỗi

## 📞 **Hỗ trợ**

Nếu gặp vấn đề:
1. Kiểm tra logs trong Vercel dashboard
2. Xem error messages trong browser console
3. Test locally trước khi push
4. Backup code thường xuyên

---

**🎓 Deutsche Ecke - Website học tiếng Đức chuyên nghiệp!** 