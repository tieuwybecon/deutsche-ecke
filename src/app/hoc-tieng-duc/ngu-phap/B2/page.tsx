import GrammarLayout from '@/components/ui/GrammarLayout'
import Header from '../../../../components/sections/Header'
import Footer from '../../../../components/sections/Footer'
import { ThemeProvider } from '../../../../components/ui/ThemeProvider'

export default function NguPhapB2Page() {
  return (
    <ThemeProvider>
      <Header />
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-red-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Chuyển đến nội dung chính
      </a>

      <main id="main-content" role="main">
        <GrammarLayout
          level="B2"
          levelColor="red"
          gradientFrom="from-red-600"
          gradientTo="to-red-700"
          description="Hoàn thiện kiến thức ngữ pháp tiếng Đức với các chủ đề nâng cao và phức tạp"
        />
      </main>
      
      <Footer />
    </ThemeProvider>
  )
} 