import type { Metadata } from 'next'
import './globals.css'

const inter = {
  className: 'font-sans',
}
export const metadata: Metadata = {
  title: 'Chat AI - Tư tưởng Hồ Chí Minh | Hỗ trợ học tập thông minh',
  description: 'Ứng dụng chat AI hiện đại hỗ trợ học tập môn Tư tưởng Hồ Chí Minh. Sinh viên có thể chat với AI và gửi câu hỏi trực tiếp cho giáo viên.',
  keywords: 'Hồ Chí Minh, tư tưởng, học tập, AI, chat, giáo dục, sinh viên',
  authors: [{ name: 'Giáo viên Tư tưởng Hồ Chí Minh' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Chat AI - Tư tưởng Hồ Chí Minh',
    description: 'Hỗ trợ học tập thông minh với AI',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
