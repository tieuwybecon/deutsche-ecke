# 🚀 Thiết lập GitHub Repository cho Deutsche Ecke

## Bước 1: Tạo GitHub Repository

### 1. Đăng ký GitHub (nếu chưa có)
- Truy cập [github.com](https://github.com)
- Đăng ký tài khoản mới

### 2. Tạo repository mới
- Click "New repository"
- Đặt tên: `deutsche-ecke`
- Chọn "Public" (miễn phí)
- **KHÔNG** check "Initialize with README"
- Click "Create repository"

## Bước 2: Push code lên GitHub

### Mở terminal trong thư mục project:
```bash
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả files
git add .

# Commit đầu tiên
git commit -m "Initial commit: Deutsche Ecke website"

# Thêm remote repository
git remote add origin https://github.com/YOUR_USERNAME/deutsche-ecke.git

# Push lên GitHub
git push -u origin main
```

## Bước 3: Kiểm tra repository
- Truy cập: `https://github.com/YOUR_USERNAME/deutsche-ecke`
- Đảm bảo tất cả files đã được upload

## Bước 4: Thiết lập branch protection (Tùy chọn)
- Vào Settings > Branches
- Add rule cho branch `main`
- Require pull request reviews
- Require status checks to pass

## Lưu ý quan trọng:
- **KHÔNG** commit file `.env.local` (chứa API keys)
- **KHÔNG** commit `node_modules/` folder
- Luôn commit `package.json` và `package-lock.json` 