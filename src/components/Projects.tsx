'use client'

import { useState } from 'react'
import { projects } from '@/content/data'

type Account = 'AMoioli' | 'Vision87'

const TABS: Account[] = ['AMoioli', 'Vision87']

export default function Projects() {
  const [active, setActive] = useState<Account>('AMoioli')

  const filtered = projects.filter((p) => p.account === active)

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 px-6 max-w-4xl mx-auto">
      <h2
        id="projects-heading"
        className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest mb-8"
      >
        Projects
      </h2>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-white/10" role="tablist" aria-label="GitHub account">
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={active === tab}
            aria-controls={`tabpanel-${tab}`}
            onClick={() => setActive(tab)}
            className={`px-4 py-2 text-sm font-mono rounded-t transition-colors ${
              active === tab
                ? 'text-[#64b5f6] border-b-2 border-[#64b5f6] -mb-px bg-white/5'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div
        id={`tabpanel-${active}`}
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
      >
        {filtered.length === 0 ? (
          <p className="text-white/40 text-sm py-12 text-center">
            No projects yet for{' '}
            <a
              href={`https://github.com/${active}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#64b5f6] hover:underline"
            >
              @{active}
            </a>
            .
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0 m-0" role="list">
            {filtered.map((project) => (
              <li
                key={project.title}
                className="bg-[#1e3a5f] rounded-lg p-6 flex flex-col gap-3 border border-white/5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-white font-bold">{project.title}</h3>
                  {project.type === 'personal' && (
                    <span className="text-xs bg-[#64b5f6]/20 text-[#64b5f6] px-2 py-0.5 rounded shrink-0">
                      Personal
                    </span>
                  )}
                </div>
                <p className="text-white/70 text-sm leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-white/60 bg-white/5 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} project (opens in new tab)`}
                    className="text-[#64b5f6] text-sm hover:underline mt-auto"
                  >
                    View Project<span aria-hidden="true"> →</span>
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
