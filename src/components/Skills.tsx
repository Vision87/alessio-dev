'use client'

import { useState } from 'react'
import { skills } from '@/content/data'
import { useTranslations } from 'next-intl'
import FadeIn from './FadeIn'
import SkillsRadar from './SkillsRadar'

// Subjective proficiency values (0–100) used to draw the radar chart.
const PROFICIENCY: Record<string, number> = {
  Frontend: 95,
  Backend: 80,
  Mobile: 65,
  'Tools & Infrastructure': 85,
  Leadership: 90,
  Languages: 75,
}

export default function Skills() {
  const t = useTranslations('skills')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categoryLabels: Record<string, string> = {
    Frontend: t('categoryFrontend'),
    Backend: t('categoryBackend'),
    Mobile: t('categoryMobile'),
    'Tools & Infrastructure': t('categoryTools'),
    Leadership: t('categoryLeadership'),
    Languages: t('categoryLanguages'),
  }

  const languageItems: Record<string, string> = {
    'Italian (native)': t('languageItalian'),
    'English (professional)': t('languageEnglish'),
    'Japanese (basic)': t('languageJapanese'),
  }

  const categories = skills.map((g) => g.category)

  function handleSelect(cat: string) {
    setActiveCategory((prev) => (prev === cat ? null : cat))
  }

  const visibleGroups = activeCategory
    ? skills.filter((g) => g.category === activeCategory)
    : skills

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-24 px-6 max-w-4xl mx-auto">
      <FadeIn>
        <h2
          id="skills-heading"
          className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest mb-10"
        >
          {t('heading')}
        </h2>
      </FadeIn>

      {/* Radar chart — tap/click a label to filter the tag grid below */}
      <FadeIn delay={0.1}>
        <SkillsRadar
          categories={categories}
          proficiencies={PROFICIENCY}
          activeCategory={activeCategory}
          onSelect={handleSelect}
        />
      </FadeIn>

      {/* "Show all" reset — only visible when a category is active */}
      {activeCategory && (
        <div className="flex justify-center mt-5 mb-2">
          <button
            onClick={() => setActiveCategory(null)}
            className="text-xs font-mono text-[#64b5f6]/60 hover:text-[#64b5f6] transition-colors px-3 py-1 rounded border border-[#64b5f6]/20 hover:border-[#64b5f6]/50"
          >
            ← show all
          </button>
        </div>
      )}

      <div className="space-y-8 mt-10">
        {visibleGroups.map((group, i) => (
          <FadeIn key={group.category} delay={i * 0.08}>
            <div>
              <h3 className="text-white/60 text-xs uppercase tracking-widest mb-3">
                {categoryLabels[group.category] ?? group.category}
              </h3>
              <ul className="flex flex-wrap gap-2 list-none p-0 m-0" role="list">
                {group.items.map((item) => (
                  <li key={`${group.category}-${item}`}>
                    <span className="px-3 py-1 bg-[#1e3a5f] text-[#64b5f6] text-sm rounded-full border border-[#64b5f6]/20">
                      {group.category === 'Languages' ? (languageItems[item] ?? item) : item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
