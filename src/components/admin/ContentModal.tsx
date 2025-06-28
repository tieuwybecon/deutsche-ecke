'use client'

import React, { useState, useEffect } from 'react'
import { X, Upload, Save, Loader2 } from 'lucide-react'

interface ContentItem {
  id?: string
  title: string
  content: string
  type: 'article' | 'image' | 'video'
  status: 'published' | 'draft' | 'pending'
  imageUrl?: string
  videoUrl?: string
}

interface ContentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (content: ContentItem) => void
  content?: ContentItem | null
  mode: 'add' | 'edit'
}

export default function ContentModal({ 
  isOpen, 
  onClose, 
  onSave, 
  content, 
  mode 
}: ContentModalProps) {
  const [formData, setFormData] = useState<ContentItem>({
    title: '',
    content: '',
    type: 'article',
    status: 'draft'
  })
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (content && mode === 'edit') {
      setFormData(content)
    } else {
      setFormData({
        title: '',
        content: '',
        type: 'article',
        status: 'draft'
      })
    }
  }, [content, mode])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'image')

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (data.success) {
        setFormData(prev => ({
          ...prev,
          imageUrl: data.data.fileUrl
        }))
      } else {
        alert('Lỗi upload file: ' + data.message)
      }
    } catch (error) {
      alert('Lỗi upload file')
    } finally {
      setUploading(false)
    }
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'video')

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      if (data.success) {
        setFormData(prev => ({
          ...prev,
          videoUrl: data.data.fileUrl
        }))
      } else {
        alert('Lỗi upload file: ' + data.message)
      }
    } catch (error) {
      alert('Lỗi upload file')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onSave(formData)
      onClose()
    } catch (error) {
      console.error('Lỗi lưu nội dung:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'add' ? 'Thêm nội dung mới' : 'Chỉnh sửa nội dung'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tiêu đề nội dung"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại nội dung *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="article">Bài viết</option>
                <option value="image">Hình ảnh</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nội dung *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập nội dung..."
            />
          </div>

          {formData.type === 'image' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload hình ảnh
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? 'Đang upload...' : 'Chọn hình ảnh'}
                </label>
                {formData.imageUrl && (
                  <div className="flex items-center space-x-2">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="text-sm text-gray-600">Đã upload</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {formData.type === 'video' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload video
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? 'Đang upload...' : 'Chọn video'}
                </label>
                {formData.videoUrl && (
                  <div className="flex items-center space-x-2">
                    <video
                      src={formData.videoUrl}
                      className="w-32 h-20 object-cover rounded"
                      controls
                    />
                    <span className="text-sm text-gray-600">Đã upload</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Bản nháp</option>
              <option value="pending">Chờ duyệt</option>
              <option value="published">Xuất bản</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {mode === 'add' ? 'Thêm nội dung' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 