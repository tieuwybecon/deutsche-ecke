# Hướng Dẫn Sử Dụng Hệ Thống Admin - Deutsche Ecke

## 🚀 Cách Truy Cập

Sau khi deploy website, truy cập: `https://your-domain.com/admin/login`

## 🔐 Thông Tin Đăng Nhập

**Mặc định:**
- Username: `admin`
- Password: `admin123`

⚠️ **QUAN TRỌNG**: Thay đổi mật khẩu ngay sau khi deploy!

## 📋 Tính Năng Chính

### 1. **Quản Lý Nội Dung**
- ✅ Thêm bài viết mới
- ✅ Upload hình ảnh (JPEG, PNG, GIF, WebP)
- ✅ Upload video (MP4, WebM, OGG)
- ✅ Chỉnh sửa nội dung
- ✅ Xóa nội dung
- ✅ Quản lý trạng thái (Draft/Pending/Published)

### 2. **Dashboard**
- 📊 Thống kê tổng quan
- 👥 Số lượng học viên
- 📚 Khóa học đang mở
- 💰 Doanh thu
- 🎯 Tỷ lệ hoàn thành

## 🔧 Cách Sử Dụng

### Thêm Bài Viết Mới
1. Vào tab "Quản lý nội dung"
2. Click "Thêm nội dung"
3. Chọn loại "Bài viết"
4. Điền tiêu đề và nội dung
5. Chọn trạng thái
6. Click "Thêm nội dung"

### Upload Hình Ảnh/Video
1. Chọn loại "Hình ảnh" hoặc "Video"
2. Click "Chọn file"
3. Chọn file (tối đa 10MB)
4. File sẽ được lưu trong `/public/uploads/`

## 🛡️ Bảo Mật

### Thay Đổi Mật Khẩu
Sửa file `src/app/api/admin/auth/route.ts`:
```typescript
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'your-new-secure-password' // Thay đổi mật khẩu này
}
```

### Sử Dụng Environment Variables
Tạo file `.env.local`:
```env
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password
```

## 📁 Cấu Trúc File

```
src/app/admin/
├── page.tsx              # Dashboard chính
├── login/page.tsx        # Trang đăng nhập
└── api/
    ├── auth/route.ts     # Xác thực
    ├── content/route.ts  # Quản lý nội dung
    └── upload/route.ts   # Upload file
```

## 🚨 Lưu Ý Quan Trọng

1. **Thay đổi mật khẩu mặc định** ngay sau khi deploy
2. **Backup dữ liệu** thường xuyên
3. **Kiểm tra quyền thư mục** `/public/uploads/`
4. **Giới hạn kích thước file** upload (10MB)
5. **Sử dụng HTTPS** trong production

## 🆘 Xử Lý Lỗi

### Lỗi Upload File
- Kiểm tra quyền thư mục `public/uploads`
- Kiểm tra kích thước file
- Kiểm tra loại file được hỗ trợ

### Lỗi Đăng Nhập
- Kiểm tra thông tin đăng nhập
- Xóa localStorage và thử lại
- Kiểm tra API route

---

**Hệ thống Admin Deutsche Ecke** - Quản lý website chuyên nghiệp! 🎓 