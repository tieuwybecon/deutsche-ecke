'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
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
  Image as ImageIcon,
  Undo,
  Redo,
  LucideIcon,
  Palette,
  Type
} from 'lucide-react'
import './RichTextEditor.css'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  className?: string
}

interface ToolbarButton {
  icon?: LucideIcon
  title?: string
  command?: () => void
  shortcut?: string
  type?: 'separator' | 'color-picker' | 'font-size'
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Nhập nội dung...", 
  rows = 10,
  className = ""
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showFontSize, setShowFontSize] = useState(false)

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

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

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const newValue = editorRef.current.innerHTML
      onChange(newValue)
    }
  }, [onChange])

  const execCommand = useCallback((command: string, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus()
      document.execCommand(command, false, value)
      // Use setTimeout to ensure the command is executed before getting the content
      setTimeout(() => {
        handleInput()
      }, 0)
    }
  }, [handleInput])

  const insertText = useCallback((text: string) => {
    if (editorRef.current) {
      editorRef.current.focus()
      document.execCommand('insertText', false, text)
      setTimeout(() => {
        handleInput()
      }, 0)
    }
  }, [handleInput])

  const insertHTML = useCallback((html: string) => {
    if (editorRef.current) {
      editorRef.current.focus()
      document.execCommand('insertHTML', false, html)
      setTimeout(() => {
        handleInput()
      }, 0)
    }
  }, [handleInput])

  const setTextColor = useCallback((color: string) => {
    execCommand('foreColor', color)
    setShowColorPicker(false)
  }, [execCommand])

  const setBackgroundColor = useCallback((color: string) => {
    execCommand('hiliteColor', color)
    setShowColorPicker(false)
  }, [execCommand])

  const setFontSize = useCallback((size: string) => {
    execCommand('fontSize', size)
    setShowFontSize(false)
  }, [execCommand])

  const toolbarButtons: ToolbarButton[] = [
    {
      icon: Bold,
      title: 'In đậm (Ctrl+B)',
      command: () => execCommand('bold'),
      shortcut: 'Ctrl+B'
    },
    {
      icon: Italic,
      title: 'In nghiêng (Ctrl+I)',
      command: () => execCommand('italic'),
      shortcut: 'Ctrl+I'
    },
    {
      icon: Underline,
      title: 'Gạch chân (Ctrl+U)',
      command: () => execCommand('underline'),
      shortcut: 'Ctrl+U'
    },
    { type: 'separator' },
    {
      icon: Heading1,
      title: 'Tiêu đề 1',
      command: () => execCommand('formatBlock', '<h1>'),
      shortcut: 'Ctrl+1'
    },
    {
      icon: Heading2,
      title: 'Tiêu đề 2',
      command: () => execCommand('formatBlock', '<h2>'),
      shortcut: 'Ctrl+2'
    },
    {
      icon: Heading3,
      title: 'Tiêu đề 3',
      command: () => execCommand('formatBlock', '<h3>'),
      shortcut: 'Ctrl+3'
    },
    { type: 'separator' },
    {
      icon: List,
      title: 'Danh sách không thứ tự',
      command: () => execCommand('insertUnorderedList'),
      shortcut: 'Ctrl+L'
    },
    {
      icon: ListOrdered,
      title: 'Danh sách có thứ tự',
      command: () => execCommand('insertOrderedList'),
      shortcut: 'Ctrl+Shift+L'
    },
    { type: 'separator' },
    {
      icon: Quote,
      title: 'Trích dẫn',
      command: () => execCommand('formatBlock', '<blockquote>'),
      shortcut: 'Ctrl+Q'
    },
    {
      icon: Code,
      title: 'Mã code',
      command: () => insertHTML('<code>code here</code>'),
      shortcut: 'Ctrl+K'
    },
    { type: 'separator' },
    {
      icon: AlignLeft,
      title: 'Căn trái',
      command: () => execCommand('justifyLeft'),
      shortcut: 'Ctrl+Shift+L'
    },
    {
      icon: AlignCenter,
      title: 'Căn giữa',
      command: () => execCommand('justifyCenter'),
      shortcut: 'Ctrl+Shift+E'
    },
    {
      icon: AlignRight,
      title: 'Căn phải',
      command: () => execCommand('justifyRight'),
      shortcut: 'Ctrl+Shift+R'
    },
    { type: 'separator' },
    {
      icon: Palette,
      title: 'Màu chữ',
      type: 'color-picker'
    },
    {
      icon: Type,
      title: 'Cỡ chữ',
      type: 'font-size'
    },
    { type: 'separator' },
    {
      icon: LinkIcon,
      title: 'Chèn liên kết',
      command: () => {
        const url = prompt('Nhập URL:')
        if (url) {
          execCommand('createLink', url)
        }
      },
      shortcut: 'Ctrl+K'
    }
  ]

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Handle keyboard shortcuts
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
        case 'k':
          e.preventDefault()
          const url = prompt('Nhập URL:')
          if (url) {
            execCommand('createLink', url)
          }
          break
      }
    }
  }, [execCommand])

  const colors = [
    '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
    '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
    '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
    '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#a4c2f4', '#b4a7d6', '#d5a6bd'
  ]

  const fontSizes = [
    { label: 'Nhỏ', value: '1' },
    { label: 'Bình thường', value: '3' },
    { label: 'Lớn', value: '5' },
    { label: 'Rất lớn', value: '7' }
  ]

  return (
    <div className={`rich-text-editor border border-slate-300 rounded-xl overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="bg-slate-50 border-b border-slate-200 p-2 flex flex-wrap items-center gap-1">
        {toolbarButtons.map((button, index) => {
          if (button.type === 'separator') {
            return (
              <div key={index} className="w-px h-6 bg-slate-300 mx-1" />
            )
          }

          if (button.type === 'color-picker') {
            const Icon = button.icon
            return (
              <div key={index} className="relative color-picker-container">
                <button
                  type="button"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  title={button.title}
                  className="toolbar-button p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800 group relative"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                </button>
                {showColorPicker && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg p-2 z-20">
                    <div className="text-xs font-medium text-slate-700 mb-2">Màu chữ</div>
                    <div className="grid grid-cols-10 gap-1 mb-2">
                      {colors.map((color, colorIndex) => (
                        <button
                          key={colorIndex}
                          type="button"
                          onClick={() => setTextColor(color)}
                          className="color-button w-6 h-6 rounded border border-slate-300 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                    <div className="text-xs font-medium text-slate-700 mb-2">Màu nền</div>
                    <div className="grid grid-cols-10 gap-1">
                      {colors.map((color, colorIndex) => (
                        <button
                          key={colorIndex}
                          type="button"
                          onClick={() => setBackgroundColor(color)}
                          className="color-button w-6 h-6 rounded border border-slate-300 hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          }

          if (button.type === 'font-size') {
            const Icon = button.icon
            return (
              <div key={index} className="relative font-size-container">
                <button
                  type="button"
                  onClick={() => setShowFontSize(!showFontSize)}
                  title={button.title}
                  className="toolbar-button p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800 group relative"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                </button>
                {showFontSize && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-slate-300 rounded-lg shadow-lg p-2 z-20 min-w-[120px]">
                    {fontSizes.map((size, sizeIndex) => (
                      <button
                        key={sizeIndex}
                        type="button"
                        onClick={() => setFontSize(size.value)}
                        className="font-size-option block w-full text-left px-2 py-1 text-sm hover:bg-slate-100 rounded transition-colors"
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          const Icon = button.icon
          return (
            <button
              key={index}
              type="button"
              onClick={button.command}
              title={`${button.title} (${button.shortcut})`}
              className="toolbar-button p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-600 hover:text-slate-800 group relative"
            >
              {Icon && <Icon className="h-4 w-4" />}
              {/* Tooltip */}
              <div className="tooltip">
                {button.title}
              </div>
            </button>
          )
        })}
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