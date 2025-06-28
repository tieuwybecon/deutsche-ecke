# RichTextEditor Component

## Mô tả
RichTextEditor là một component React được tạo ra để thay thế textarea đơn giản trong hệ thống quản lý ngữ pháp. Component này cung cấp các công cụ định dạng text phong phú giúp người dùng tạo nội dung với định dạng đẹp mắt.

## Tính năng

### Công cụ định dạng cơ bản
- **In đậm (Bold)**: `Ctrl+B`
- **In nghiêng (Italic)**: `Ctrl+I`
- **Gạch chân (Underline)**: `Ctrl+U`

### Tiêu đề
- **Tiêu đề 1**: `Ctrl+1`
- **Tiêu đề 2**: `Ctrl+2`
- **Tiêu đề 3**: `Ctrl+3`

### Danh sách
- **Danh sách không thứ tự**: `Ctrl+L`
- **Danh sách có thứ tự**: `Ctrl+Shift+L`

### Định dạng khác
- **Trích dẫn (Quote)**: `Ctrl+Q`
- **Mã code**: `Ctrl+K`
- **Căn trái**: `Ctrl+Shift+L`
- **Căn giữa**: `Ctrl+Shift+E`
- **Căn phải**: `Ctrl+Shift+R`

### Màu sắc và cỡ chữ
- **Chọn màu chữ**: Click vào biểu tượng bảng màu
- **Chọn màu nền**: Click vào biểu tượng bảng màu
- **Thay đổi cỡ chữ**: Click vào biểu tượng Type

### Liên kết
- **Chèn liên kết**: `Ctrl+K` hoặc click vào biểu tượng link

## Cách sử dụng

```tsx
import RichTextEditor from './RichTextEditor'

function MyComponent() {
  const [content, setContent] = useState('')

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      placeholder="Nhập nội dung..."
      rows={10}
      className="custom-class"
    />
  )
}
```

## Props

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `value` | `string` | - | Nội dung hiện tại của editor |
| `onChange` | `(value: string) => void` | - | Callback khi nội dung thay đổi |
| `placeholder` | `string` | "Nhập nội dung..." | Placeholder text |
| `rows` | `number` | 10 | Số dòng tối thiểu |
| `className` | `string` | "" | CSS class bổ sung |

## Lưu ý

1. **HTML Output**: Component trả về HTML string, không phải plain text
2. **Browser Compatibility**: Sử dụng `document.execCommand()` API, hoạt động tốt trên các trình duyệt hiện đại
3. **Accessibility**: Có hỗ trợ keyboard shortcuts cho các thao tác phổ biến
4. **Responsive**: Toolbar tự động wrap trên màn hình nhỏ

## Tùy chỉnh

### Thêm công cụ mới
Để thêm công cụ mới, cập nhật mảng `toolbarButtons`:

```tsx
const toolbarButtons: ToolbarButton[] = [
  // ... existing buttons
  {
    icon: YourIcon,
    title: 'Tên công cụ',
    command: () => execCommand('yourCommand'),
    shortcut: 'Ctrl+Key'
  }
]
```

### Thay đổi màu sắc
Cập nhật mảng `colors` để thay đổi bảng màu:

```tsx
const colors = [
  '#your-color-1',
  '#your-color-2',
  // ...
]
```

### Thay đổi cỡ chữ
Cập nhật mảng `fontSizes`:

```tsx
const fontSizes = [
  { label: 'Tên cỡ chữ', value: 'size-value' },
  // ...
]
```

## Dependencies

- React
- Lucide React (cho icons)
- CSS modules hoặc global CSS

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+ 