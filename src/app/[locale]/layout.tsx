import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { bio } from '@/content/data'
import Navbar from '@/components/Navbar'
import ScrollToTop from '@/components/ScrollToTop'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], display: 'optional' })

const siteUrl = 'https://www.alessiomoioli.com'

export const viewport: Viewport = {
  themeColor: '#0d1b2a',
  width: 'device-width',
  initialScale: 1,
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    metadataBase: new URL(siteUrl),
    title: `${bio.name} — ${bio.title}`,
    description: bio.tagline,
    keywords: [
      'Alessio Moioli',
      'Manager Software Engineering',
      'Engineering Manager',
      'React',
      'Next.js',
      'GraphQL',
      'Paramount',
      'Milan',
    ],
    authors: [{ name: bio.name }],
    openGraph: {
      title: `${bio.name} — ${bio.title}`,
      description: bio.tagline,
      type: 'website',
      url: `/${locale}/`,
      siteName: bio.name,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${bio.name} — ${bio.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${bio.name} — ${bio.title}`,
      description: bio.tagline,
      images: ['/og-image.png'],
    },
    alternates: { canonical: `/${locale}/` },
    robots: { index: true, follow: true },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()
  const t = await getTranslations({ locale })

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

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#0d1b2a] focus:text-white focus:px-4 focus:py-2 focus:rounded focus:outline focus:outline-2 focus:outline-[#64b5f6]"
          >
            {t('skip')}
          </a>
          <Navbar />
          {children}
          <ScrollToTop />
          <Analytics />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
