'use client'

import { useTranslations } from 'next-intl'
import type { GitHubStats } from '@/lib/github'
import FadeIn from './FadeIn'

export default function GitHubStats({ stats }: { stats: GitHubStats }) {
  const t = useTranslations('github')

  const totals = [
    { value: stats.totalContributions.toLocaleString(), label: t('contributions') },
    { value: String(stats.totalRepos), label: t('repos') },
    { value: String(stats.totalStars), label: t('stars') },
  ]

  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="py-24 px-6 max-w-4xl mx-auto"
    >
      <FadeIn>
        <h2
          id="github-heading"
          className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest mb-10"
        >
          {t('heading')}
        </h2>
      </FadeIn>

      {/* Aggregate totals */}
      <FadeIn delay={0.06}>
        <div className="grid grid-cols-3 gap-4 mb-10">
          {totals.map(({ value, label }) => (
            <div
              key={label}
              className="bg-[#1e3a5f] rounded-lg p-5 border border-white/5 text-center"
            >
              <div className="text-3xl font-bold text-white mb-1">{value}</div>
              <div className="text-xs text-white/50 uppercase tracking-widest leading-tight">
                {label}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Per-account breakdown */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {stats.users.map((user) => (
            <a
              key={user.login}
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#1e3a5f]/50 rounded-lg p-5 border border-white/5 hover:border-[#64b5f6]/30 transition-colors"
              aria-label={`GitHub profile ${user.login} (opens in new tab)`}
            >
              <p className="text-[#64b5f6] font-mono text-sm font-semibold mb-3 group-hover:underline">
                @{user.login}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-white/60">
                <span>
                  {user.contributions.toLocaleString()} {t('contributionsShort')}
                </span>
                <span>
                  {user.repos} {t('reposShort')}
                </span>
                <span>★ {user.stars}</span>
              </div>
            </a>
          ))}
        </div>
      </FadeIn>

      {/* Top languages */}
      {stats.topLanguages.length > 0 && (
        <FadeIn delay={0.14}>
          <div className="mb-8">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
              {t('topLanguages')}
            </p>
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0" role="list">
              {stats.topLanguages.map((lang) => (
                <li key={lang.name}>
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-[#1e3a5f] text-sm rounded-full border border-white/10 text-white/80">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: lang.color }}
                      aria-hidden="true"
                    />
                    {lang.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      )}

      <FadeIn delay={0.18}>
        <p className="text-white/25 text-xs">{t('buildTime')}</p>
      </FadeIn>
    </section>
  )
}
