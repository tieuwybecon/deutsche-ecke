import GrammarLayout from '@/components/ui/GrammarLayout'
import Header from '../../../../components/sections/Header'
import Footer from '../../../../components/sections/Footer'
import { ThemeProvider } from '../../../../components/ui/ThemeProvider'

export default function NguPhapB1Page() {
  return (
    <ThemeProvider>
      <Header />
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Chuyển đến nội dung chính
      </a>

      <main id="main-content" role="main">
        <GrammarLayout
          level="B1"
          levelColor="purple"
          gradientFrom="from-purple-600"
          gradientTo="to-purple-700"
          description="Chinh phục ngữ pháp tiếng Đức trung cấp với các cấu trúc phức tạp hơn"
        />
      </main>
      
      <Footer />
    </ThemeProvider>
  )
} 