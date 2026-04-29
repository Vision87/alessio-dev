import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'
import { bio } from '@/content/data'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `${bio.name} — ${bio.title}`,
  description: bio.tagline,
  openGraph: {
    title: `${bio.name} — ${bio.title}`,
    description: bio.tagline,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
