'use client'

import { bio } from '@/content/data'
import { useTranslations } from 'next-intl'
import FadeIn from './FadeIn'

export default function Hero() {
  const t = useTranslations('hero')

  const metricLabels: Record<string, string> = {
    'Countries where my projects are published': t('metricCountries'),
    'Years of experience': t('metricYears'),
  }

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="min-h-screen flex flex-col justify-center px-6 pt-20 max-w-4xl mx-auto"
    >
      <FadeIn delay={0}>
        <p
          aria-hidden="true"
          className="text-[#64b5f6] text-xs font-mono mb-3 tracking-widest uppercase"
        >
          {t('greeting')}
        </p>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4">
          {bio.name}
        </h1>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="text-xl md:text-2xl text-white/70 mb-2">
          {bio.title}{' '}
          <span className="text-[#64b5f6]">@ {bio.company}</span>
        </p>
        <p className="text-white/60 text-sm mb-8">{t('location')}</p>
      </FadeIn>
      <FadeIn delay={0.15}>
        <p className="text-lg text-white/80 max-w-xl leading-relaxed">{t('tagline')}</p>
      </FadeIn>
      {bio.metrics && bio.metrics.length > 0 && (
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-8 mt-8 mb-2">
            {bio.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <span className="text-2xl font-bold text-white">{metric.value}</span>
                <span className="text-xs text-white/50 uppercase tracking-widest">
                  {metricLabels[metric.label] ?? metric.label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      )}
      <FadeIn delay={0.25}>
        <div className="flex flex-wrap gap-4 mt-10">
          <a
            href={bio.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('githubAmoioliLabel')}
            className="text-sm text-white/70 hover:text-white transition-colors border border-white/20 hover:border-white/50 px-4 py-2 rounded"
          >
            AMoioli
          </a>
          <a
            href={bio.githubVision87}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('githubVision87Label')}
            className="text-sm text-white/70 hover:text-white transition-colors border border-white/20 hover:border-white/50 px-4 py-2 rounded"
          >
            Vision87
          </a>
          <a
            href={bio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('linkedinLabel')}
            className="text-sm font-semibold bg-[#64b5f6] text-[#0d1b2a] border border-[#64b5f6] hover:bg-[#64b5f6]/90 transition-colors px-4 py-2 rounded"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${bio.email}`}
            className="text-sm text-white/70 hover:text-white transition-colors border border-white/20 hover:border-white/50 px-4 py-2 rounded"
          >
            {t('email')}
          </a>
          <a
            href={bio.cv}
            download
            aria-label={t('cvLabel')}
            className="text-sm text-white/70 hover:text-white transition-colors border border-white/20 hover:border-white/50 px-4 py-2 rounded"
          >
            {t('downloadCv')}
          </a>
        </div>
      </FadeIn>
    </section>
  )
}
