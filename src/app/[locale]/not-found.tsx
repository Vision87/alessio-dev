'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function LocaleNotFound() {
  const t = useTranslations('notFound')
  const params = useParams()
  const locale = (params?.locale as string) ?? 'en'

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <p className="text-[#64b5f6] text-xs font-mono uppercase tracking-widest mb-4">
        {t('code')}
      </p>
      <h1 className="text-5xl font-extrabold text-white mb-4">{t('title')}</h1>
      <p className="text-white/60 mb-8 text-center max-w-sm">{t('description')}</p>
      <Link
        href={`/${locale}/`}
        className="text-sm text-white/70 hover:text-white transition-colors border border-white/20 hover:border-white/50 px-4 py-2 rounded"
      >
        {t('backHome')}
      </Link>
    </main>
  )
}
