'use client'

import React, { useState, useRef, useEffect } from 'react'
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Heading1, 
  Heading2, 
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Palette,
  Type
} from 'lucide-react'
import './SimpleRichTextEditor.css'

interface SimpleRichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  className?: string
}

export default function SimpleRichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Nhập nội dung...", 
  rows = 10,
  className = ""
}: SimpleRichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showFontSize, setShowFontSize] = useState(false)

  // Initialize content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showColorPicker || showFontSize) {
        const target = event.target as Element
        if (!target.closest('.color-picker-container') && !target.closest('.font-size-container')) {
          setShowColorPicker(false)
          setShowFontSize(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showColorPicker, showFontSize])

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus()
      document.execCommand(command, false, value)
      handleInput()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault()
          execCommand('bold')
          break
        case 'i':
          e.preventDefault()
          execCommand('italic')
          break
        case 'u':
          e.preventDefault()
          execCommand('underline')
          break
        case '1':
          e.preventDefault()
          execCommand('formatBlock', '<h1>')
          break
        case '2':
          e.preventDefault()
          execCommand('formatBlock', '<h2>')
          break
        case '3':
          e.preventDefault()
          execCommand('formatBlock', '<h3>')
          break
        case 'l':
          e.preventDefault()
          if (e.shiftKey) {
            execCommand('insertOrderedList')
          } else {
            execCommand('insertUnorderedList')
          }
          break
        case 'q':
          e.preventDefault()
          execCommand('formatBlock', '<blockquote>')
          break
      }
    }
  }

  const colors = [
    '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
    '#800000', '#008000', '#000080', '#808000', '#800080', '#008080',
    '#c0c0c0', '#808080', '#ffa500', '#ffc0cb', '#dda0dd', '#90ee90'
  ]

  const fontSizes = [
    { label: 'Nhỏ', value: '1' },
    { label: 'Bình thường', value: '3' },
    { label: 'Lớn', value: '5' },
    { label: 'Rất lớn', value: '7' }
  ]

  return (
    <div className={`simple-rich-text-editor border border-slate-300 rounded-xl overflow-hidden ${className}`}>
      {/* Simple Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1">
        {/* Basic formatting */}
        <button
          type="button"
          onClick={() => execCommand('bold')}
          title="In đậm (Ctrl+B)"
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          title="In nghiêng (Ctrl+I)"
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          title="Gạch chân (Ctrl+U)"
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
        >
          <Underline className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-slate-300 mx-1" />

        {/* Headings */}
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<h1>')}
          title="Tiêu đề 1 (Ctrl+1)"
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
        >
          <Heading1 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<h2>')}
          title="Tiêu đề 2 (Ctrl+2)"
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
        >
          <Heading2 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<h3>')}
          title="Tiêu đề 3 (Ctrl+3)"
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
        >
          <Heading3 className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-slate-300 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          title="Danh sách không thứ tự (Ctrl+L)"
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          title="Danh sách có thứ tự (Ctrl+Shift+L)"
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-slate-300 mx-1" />

        {/* Alignment */}
        <button
          type="button"
          onClick={() => execCommand('justifyLeft')}
          title="Căn trái"
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
        >
          <AlignLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyCenter')}
          title="Căn giữa"
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
        >
          <AlignCenter className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyRight')}
          title="Căn phải"
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
        >
          <AlignRight className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-slate-300 mx-1" />

        {/* Quote and Code */}
        <button
          type="button"
          onClick={() => execCommand('formatBlock', '<blockquote>')}
          title="Trích dẫn (Ctrl+Q)"
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
        >
          <Quote className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => document.execCommand('insertHTML', false, '<code>code here</code>')}
          title="Mã code"
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
        >
          <Code className="h-4 w-4" />
        </button>

        <div className="w-px h-6 bg-slate-300 mx-1" />

        {/* Color picker */}
        <div className="relative color-picker-container">
          <button
            type="button"
            onClick={() => setShowColorPicker(!showColorPicker)}
            title="Màu chữ"
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
          >
            <Palette className="h-4 w-4" />
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg p-2 z-20">
              <div className="text-xs font-medium text-slate-700 mb-2">Màu chữ</div>
              <div className="grid grid-cols-6 gap-1">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      execCommand('foreColor', color)
                      setShowColorPicker(false)
                    }}
                    className="w-6 h-6 rounded border border-slate-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Font size */}
        <div className="relative font-size-container">
          <button
            type="button"
            onClick={() => setShowFontSize(!showFontSize)}
            title="Cỡ chữ"
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
          >
            <Type className="h-4 w-4" />
          </button>
          {showFontSize && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg p-2 z-20 min-w-[120px]">
              {fontSizes.map((size, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    execCommand('fontSize', size.value)
                    setShowFontSize(false)
                  }}
                  className="block w-full text-left px-2 py-1 text-sm hover:bg-slate-100 rounded transition-colors"
                >
                  {size.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-slate-300 mx-1" />

        {/* Link */}
        <button
          type="button"
          onClick={() => {
            const url = prompt('Nhập URL:')
            if (url) {
              execCommand('createLink', url)
            }
          }}
          title="Chèn liên kết"
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        className={`p-4 min-h-[${rows * 1.5}rem] outline-none text-slate-700 bg-white/80 placeholder-slate-500 leading-relaxed ${
          isFocused ? 'ring-2 ring-blue-500 ring-inset' : ''
        }`}
        style={{ minHeight: `${rows * 1.5}rem` }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
    </div>
  )
} 