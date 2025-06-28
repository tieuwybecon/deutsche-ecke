'use client'

import React from 'react'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  // Chuyển đổi markdown đơn giản thành HTML
  const renderMarkdown = (text: string) => {
    let html = text

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h1>')

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-gray-900">$1</strong>')

    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')

    // Images
    html = html.replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" class="w-full max-w-md mx-auto rounded-lg shadow-sm my-4" />')

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank">$1</a>')

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/gim, '<pre class="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto"><code class="text-sm">$1</code></pre>')

    // Inline code
    html = html.replace(/`(.*?)`/gim, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')

    // Lists
    html = html.replace(/^\- (.*$)/gim, '<li class="ml-4 mb-1">• $1</li>')
    html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-1 list-decimal">$1</li>')

    // Line breaks
    html = html.replace(/\n\n/gim, '</p><p class="mb-4">')
    html = html.replace(/\n/gim, '<br />')

    // Wrap in paragraphs
    html = `<p class="mb-4">${html}</p>`

    return html
  }

  return (
    <div 
      className={`prose max-w-none text-gray-700 leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  )
} 