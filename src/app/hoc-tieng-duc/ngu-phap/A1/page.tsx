import GrammarLayout from '@/components/ui/GrammarLayout'
import Header from '../../../../components/sections/Header'
import Footer from '../../../../components/sections/Footer'
import { ThemeProvider } from '../../../../components/ui/ThemeProvider'

export default function NguPhapA1Page() {
  return (
    <ThemeProvider>
      <Header />
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Chuyển đến nội dung chính
      </a>

      <main id="main-content" role="main">
        <GrammarLayout
          level="A1"
          levelColor="blue"
          gradientFrom="from-blue-600"
          gradientTo="to-blue-700"
          description="Học ngữ pháp tiếng Đức cơ bản từ A đến Z với các bài giảng chi tiết và dễ hiểu"
        />
      </main>
      
      <Footer />
    </ThemeProvider>
  )
} 