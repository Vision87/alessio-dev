'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { routing } from '@/i18n/routing'

export default function Navbar() {
  const t = useTranslations('nav')
  const tLang = useTranslations('langSwitcher')
  const locale = useLocale()
  const [activeId, setActiveId] = useState<string>('hero')

  const links = [
    { href: '#about', label: t('about') },
    { href: '#skills', label: t('skills') },
    { href: '#experience', label: t('experience') },
    { href: '#projects', label: t('projects') },
    { href: '#contact', label: t('contact') },
  ]

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 inset-x-0 z-50 bg-[#0d1b2a]/90 backdrop-blur-sm border-b border-white/5"
    >
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href={`/${locale}/#hero`}
          aria-label="Alessio Moioli — go to top"
          className="font-bold text-[#64b5f6] tracking-tight text-lg hover:opacity-80 transition-opacity"
        >
          AM
        </a>
        <div className="flex items-center gap-6">
          <ul className="hidden sm:flex gap-6 list-none">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`text-sm transition-colors duration-150 ${
                    activeId === l.href.slice(1)
                      ? 'text-[#64b5f6] font-medium'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div aria-label={tLang('label')} className="flex gap-1 ml-2">
            {routing.locales.map((l) => (
              <a
                key={l}
                href={`/${l}/`}
                aria-current={l === locale ? 'true' : undefined}
                className={`text-xs px-2 py-1 rounded transition-colors font-mono ${
                  l === locale
                    ? 'text-[#64b5f6] bg-[#64b5f6]/10 font-semibold'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {tLang(l as 'en' | 'it' | 'jp')}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
