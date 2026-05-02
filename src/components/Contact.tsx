'use client'

import { bio } from '@/content/data'
import { useTranslations } from 'next-intl'
import FadeIn from './FadeIn'

export default function Contact() {
  const t = useTranslations('contact')

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 px-6 max-w-4xl mx-auto text-center">
      <FadeIn>
        <h2
          id="contact-heading"
          className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest mb-4"
        >
          {t('heading')}
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="text-white/70 mb-10 text-sm">{t('subtitle')}</p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="flex justify-center gap-8">
          <a
            href={bio.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub AMoioli profile (opens in new tab)"
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            GitHub / AMoioli
          </a>
          <a
            href={bio.githubVision87}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Vision87 profile (opens in new tab)"
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            GitHub / Vision87
          </a>
          <a
            href={bio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in new tab)"
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${bio.email}`}
            aria-label={t('emailLabel')}
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            {t('email')}
          </a>
        </div>
      </FadeIn>
    </section>
  )
}
