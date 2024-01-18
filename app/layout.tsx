import type { Metadata } from 'next'
import { Oswald } from 'next/font/google'
import './globals.css'

const inter = Oswald({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Memorize Cards',
  description: 'Frontend Test',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} >{children}</body>
    </html>
  )
}
