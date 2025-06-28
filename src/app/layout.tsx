import type { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Deutsche Ecke - Trung Tâm Học Tiếng Đức Uy Tín #1 Việt Nam | Khóa Học A1-C2',
  description: 'Deutsche Ecke - Trung tâm dạy tiếng Đức hàng đầu tại Việt Nam với 5000+ học viên thành công. Khóa học từ A1-C2, giáo viên bản ngữ Đức, chứng chỉ quốc tế Goethe. Tư vấn du học Đức miễn phí 24/7. Đăng ký ngay nhận ưu đãi!',
  keywords: 'học tiếng đức, trung tâm tiếng đức, du học đức, deutsche ecke, khóa học tiếng đức, chứng chỉ goethe, giáo viên bản ngữ, học tiếng đức online, testdaf, dsh, a1 a2 b1 b2 c1 c2',
  authors: [{ name: 'Deutsche Ecke', url: 'https://dek.edu.vn' }],
  creator: 'Deutsche Ecke',
  publisher: 'Deutsche Ecke',
  applicationName: 'Deutsche Ecke Learning Platform',
  referrer: 'origin-when-cross-origin',
  category: 'education',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://dek.edu.vn/',
    title: 'Deutsche Ecke - Trung Tâm Học Tiếng Đức Uy Tín #1 Việt Nam',
    description: 'Trung tâm dạy tiếng Đức hàng đầu với 5000+ học viên thành công. Giáo viên bản ngữ Đức, chứng chỉ quốc tế, tư vấn du học miễn phí.',
    siteName: 'Deutsche Ecke',
    images: [
      {
        url: 'https://dek.edu.vn/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Deutsche Ecke - Học Tiếng Đức Chuyên Nghiệp'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@deutscheecke',
    creator: '@deutscheecke',
    title: 'Deutsche Ecke - Trung Tâm Học Tiếng Đức Uy Tín #1 Việt Nam',
    description: 'Trung tâm dạy tiếng Đức hàng đầu với 5000+ học viên thành công. Giáo viên bản ngữ Đức, chứng chỉ quốc tế, tư vấn du học miễn phí.',
    images: ['https://dek.edu.vn/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://dek.edu.vn/',
    languages: {
      'vi-VN': 'https://dek.edu.vn/',
      'de-DE': 'https://dek.edu.vn/de/',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://dek.edu.vn/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Deutsche Ecke",
              "alternateName": "Trung Tâm Tiếng Đức Deutsche Ecke",
              "url": "https://dek.edu.vn",
              "logo": "https://dek.edu.vn/images/deutsche-ecke-logo.svg",
              "description": "Trung tâm dạy tiếng Đức chuyên nghiệp với giáo viên bản ngữ và phương pháp giảng dạy hiện đại",
              "foundingDate": "2015",
              "numberOfEmployees": "50-100",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Đường Láng",
                "addressLocality": "Hà Nội",
                "addressRegion": "Hà Nội",
                "postalCode": "100000",
                "addressCountry": "VN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+84-77-024-240",
                "contactType": "customer service",
                "email": "info@dek.edu.vn",
                "availableLanguage": ["Vietnamese", "German", "English"]
              },
              "sameAs": [
                "https://www.facebook.com/deutscheecke",
                "https://www.youtube.com/deutscheecke",
                "https://www.instagram.com/deutscheecke",
                "https://www.linkedin.com/company/deutscheecke"
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "1250",
                "bestRating": "5",
                "worstRating": "1"
              }
            })
          }}
        />

        {/* Structured Data - Course */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "Khóa Học Tiếng Đức Toàn Diện A1-B2",
              "description": "Khóa học tiếng Đức chuyên nghiệp từ cơ bản đến nâng cao với giáo viên bản ngữ",
              "provider": {
                "@type": "Organization",
                "name": "Deutsche Ecke",
                "sameAs": "https://dek.edu.vn"
              },
              "offers": [
                {
                  "@type": "Offer",
                  "category": "Course",
                  "name": "Khóa A1 - Tiếng Đức Cơ Bản",
                  "price": "2500000",
                  "priceCurrency": "VND",
                  "availability": "https://schema.org/InStock"
                },
                {
                  "@type": "Offer", 
                  "category": "Course",
                  "name": "Khóa A2 - Tiếng Đức Sơ Cấp",
                  "price": "3200000",
                  "priceCurrency": "VND",
                  "availability": "https://schema.org/InStock"
                }
              ],
              "educationalCredentialAwarded": "Chứng chỉ Goethe quốc tế",
              "timeRequired": "P2M",
              "courseMode": "blended"
            })
          }}
        />

        {/* Structured Data - FAQs */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Deutsche Ecke có uy tín không?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Deutsche Ecke là trung tâm tiếng Đức uy tín #1 tại Việt Nam với hơn 5000 học viên thành công, được công nhận bởi Goethe Institut."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Học phí tiếng Đức tại Deutsche Ecke bao nhiêu?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Học phí từ 2.5 triệu (A1) đến 5.5 triệu VND (B2), bao gồm giáo trình và chứng chỉ quốc tế."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Có tư vấn du học Đức miễn phí không?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Có, Deutsche Ecke cung cấp tư vấn du học Đức hoàn toàn miễn phí 24/7 cho tất cả học viên."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        {children}
      </body>
    </html>
  )
}