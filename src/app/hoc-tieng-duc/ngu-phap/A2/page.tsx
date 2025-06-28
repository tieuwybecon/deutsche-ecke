import GrammarLayout from '@/components/ui/GrammarLayout'
import Header from '../../../../components/sections/Header'
import Footer from '../../../../components/sections/Footer'
import { ThemeProvider } from '../../../../components/ui/ThemeProvider'

export default function NguPhapA2Page() {
  return (
    <ThemeProvider>
      <Header />
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-green-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Chuyển đến nội dung chính
      </a>

      <main id="main-content" role="main">
        <GrammarLayout
          level="A2"
          levelColor="green"
          gradientFrom="from-green-600"
          gradientTo="to-green-700"
          description="Nâng cao kiến thức ngữ pháp tiếng Đức với các bài học A2 chuyên sâu"
        />
      </main>
      
      <Footer />
    </ThemeProvider>
  )
} 