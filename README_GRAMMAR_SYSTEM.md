# Hệ thống Quản lý Ngữ pháp - Deutsche Ecke

## Tổng quan
Hệ thống này cho phép admin quản lý các bài viết ngữ pháp tiếng Đức theo từng cấp độ (A1, A2, B1, B2) và hiển thị chúng trên website.

## Cấu trúc hệ thống

### 1. API Endpoints
- **GET** `/api/admin/grammar` - Lấy danh sách bài viết ngữ pháp
- **POST** `/api/admin/grammar` - Tạo bài viết mới
- **PUT** `/api/admin/grammar` - Cập nhật bài viết
- **DELETE** `/api/admin/grammar` - Xóa bài viết

### 2. Trang Admin
- **URL**: `/admin/grammar`
- **Chức năng**: Quản lý CRUD các bài viết ngữ pháp
- **Tính năng**:
  - Thêm/sửa/xóa bài viết
  - Lọc theo cấp độ và trạng thái
  - Upload hình ảnh
  - Sắp xếp thứ tự bài viết

### 3. Trang Hiển thị
- **A1**: `/hoc-tieng-duc/ngu-phap/A1`
- **A2**: `/hoc-tieng-duc/ngu-phap/A2`
- **B1**: `/hoc-tieng-duc/ngu-phap/B1`
- **B2**: `/hoc-tieng-duc/ngu-phap/B2`

## Cách sử dụng

### Dành cho Admin

1. **Truy cập trang admin**:
   - Vào `/admin`
   - Click "Quản lý ngữ pháp" trong sidebar hoặc Quick Actions

2. **Thêm bài viết mới**:
   - Click nút "Thêm bài viết"
   - Điền thông tin: tiêu đề, nội dung, cấp độ, v.v.
   - Thêm hình ảnh nếu cần
   - Chọn trạng thái (Draft/Published/Pending)
   - Click "Lưu"

3. **Chỉnh sửa bài viết**:
   - Click icon Edit trong danh sách
   - Cập nhật thông tin
   - Click "Lưu"

4. **Xóa bài viết**:
   - Click icon Delete trong danh sách
   - Xác nhận xóa

### Dành cho Người dùng

1. **Xem bài viết**:
   - Vào trang `/hoc-tieng-duc/ngu-phap/[level]`
   - Chọn bài học từ sidebar
   - Đọc nội dung và xem hình ảnh

## Cấu trúc dữ liệu

```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "excerpt": "string",
  "level": "A1" | "A2" | "B1" | "B2",
  "status": "published" | "draft" | "pending",
  "author": "string",
  "images": ["string"],
  "order": "number",
  "createdAt": "string",
  "updatedAt": "string"
}
```

## File quan trọng

- **API**: `src/app/api/admin/grammar/route.ts`
- **Component Admin**: `src/components/admin/GrammarManager.tsx`
- **Trang Admin**: `src/app/admin/grammar/page.tsx`
- **Trang A1**: `src/app/hoc-tieng-duc/ngu-phap/A1/page.tsx`
- **Trang A2**: `src/app/hoc-tieng-duc/ngu-phap/A2/page.tsx`
- **Trang B1**: `src/app/hoc-tieng-duc/ngu-phap/B1/page.tsx`
- **Trang B2**: `src/app/hoc-tieng-duc/ngu-phap/B2/page.tsx`
- **Dữ liệu**: `data/grammar.json`

## Lưu ý

1. **Bảo mật**: Cần kiểm tra authentication trong production
2. **Performance**: Có thể cache dữ liệu khi cần thiết
3. **Backup**: Thường xuyên backup file `data/grammar.json`
4. **Hình ảnh**: URL hình ảnh nên lưu trữ trên CDN trong production

## Mở rộng tương lai

- Thêm editor WYSIWYG cho nội dung
- Hỗ trợ upload file trực tiếp
- Thêm tính năng comment và đánh giá
- Tích hợp search và filter nâng cao
- Thêm analytics và tracking 