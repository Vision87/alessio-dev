import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import ScrollToTop from '@/components/ScrollToTop'
import './globals.css'
import { bio } from '@/content/data'

const inter = Inter({ subsets: ['latin'], display: 'optional' })

// Primary canonical domain — .it and .eu redirect here via vercel.json
const siteUrl = 'https://www.alessiomoioli.com'

export const viewport: Viewport = {
  themeColor: '#0d1b2a',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${bio.name} — ${bio.title}`,
  description: bio.tagline,
  keywords: ['Alessio Moioli', 'Manager Software Engineering', 'Engineering Manager', 'React', 'Next.js', 'GraphQL', 'Paramount', 'Milan'],
  authors: [{ name: bio.name }],
  openGraph: {
    title: `${bio.name} — ${bio.title}`,
    description: bio.tagline,
    type: 'website',
    url: '/',
    siteName: bio.name,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${bio.name} — ${bio.title}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${bio.name} — ${bio.title}`,
    description: bio.tagline,
    images: ['/og-image.png'],
  },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: bio.name,
  jobTitle: bio.title,
  worksFor: { '@type': 'Organization', name: bio.company },
  address: { '@type': 'PostalAddress', addressLocality: 'Milan', addressCountry: 'IT' },
  url: siteUrl,
  sameAs: [bio.github, bio.githubVision87, bio.linkedin],
  description: bio.tagline,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#0d1b2a] focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline focus:outline-2 focus:outline-[#64b5f6]"
        >
          Skip to main content
        </a>
        <Navbar />
        {children}
        <ScrollToTop />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
