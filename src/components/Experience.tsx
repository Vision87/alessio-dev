'use client'

import { setup, assign } from 'xstate'
import { useMachine } from '@xstate/react'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import FadeIn from './FadeIn'
import { fireAchievement } from '@/lib/achievements'

interface JobMessage {
  company: string
  role: string
  period: string
  bullets: string[]
}

// ── State machine ──────────────────────────────────────────────────────────────
//
// States:
//   idle     → no entry expanded
//   expanded → one entry is open; NEXT/PREV/CLOSE navigate or collapse it
//
// Context:
//   activeIndex  which entry is open (null when idle)
//   visited      indices the user has opened (drives the dot fill animation)
//   count        total number of entries (set from jobs.length at mount)

const timelineMachine = setup({
  types: {
    input: {} as { count: number },
    context: {} as {
      activeIndex: number | null
      visited: number[]
      count: number
    },
    events: {} as
      | { type: 'SELECT'; index: number }
      | { type: 'CLOSE' }
      | { type: 'NEXT' }
      | { type: 'PREV' },
  },
}).createMachine({
  id: 'timeline',
  initial: 'idle',
  context: ({ input }) => ({
    activeIndex: null,
    visited: [],
    count: input.count,
  }),
  states: {
    idle: {
      on: {
        SELECT: {
          target: 'expanded',
          actions: assign(({ event, context }) => ({
            activeIndex: event.index,
            visited: context.visited.includes(event.index)
              ? context.visited
              : [...context.visited, event.index],
          })),
        },
      },
    },
    expanded: {
      on: {
        // Clicking the active entry collapses it; clicking another switches to it
        SELECT: [
          {
            guard: ({ context, event }) => context.activeIndex === event.index,
            target: 'idle',
            actions: assign({ activeIndex: null }),
          },
          {
            actions: assign(({ event, context }) => ({
              activeIndex: event.index,
              visited: context.visited.includes(event.index)
                ? context.visited
                : [...context.visited, event.index],
            })),
          },
        ],
        CLOSE: {
          target: 'idle',
          actions: assign({ activeIndex: null }),
        },
        NEXT: {
          guard: ({ context }) =>
            context.activeIndex !== null && context.activeIndex < context.count - 1,
          actions: assign(({ context }) => {
            const next = (context.activeIndex as number) + 1
            return {
              activeIndex: next,
              visited: context.visited.includes(next)
                ? context.visited
                : [...context.visited, next],
            }
          }),
        },
        PREV: {
          guard: ({ context }) =>
            context.activeIndex !== null && context.activeIndex > 0,
          actions: assign(({ context }) => {
            const prev = (context.activeIndex as number) - 1
            return {
              activeIndex: prev,
              visited: context.visited.includes(prev)
                ? context.visited
                : [...context.visited, prev],
            }
          }),
        },
      },
    },
  },
})

// ── Component ─────────────────────────────────────────────────────────────────

export default function Experience() {
  const t = useTranslations('experience')
  const jobs = (t.raw('jobs') as JobMessage[]) ?? []

  const [snapshot, send] = useMachine(timelineMachine, {
    input: { count: jobs.length },
  })

  const { activeIndex, visited } = snapshot.context
  const isExpanded = snapshot.matches('expanded')
  const canNext = snapshot.can({ type: 'NEXT' })
  const canPrev = snapshot.can({ type: 'PREV' })

  // Refs so we can move DOM focus when the active entry changes via keyboard
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])
  useEffect(() => {
    if (activeIndex !== null) {
      buttonRefs.current[activeIndex]?.focus({ preventScroll: false })
    }
  }, [activeIndex])

  // Achievement tracking: fire on first entry visit; fire all when every entry visited
  useEffect(() => {
    if (visited.length > 0) fireAchievement('experience_opened')
    if (visited.length === jobs.length) fireAchievement('experience_all')
  }, [visited, jobs.length])

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-24 px-6 max-w-4xl mx-auto"
    >
      <FadeIn>
        <div className="flex items-baseline justify-between mb-10">
          <h2
            id="experience-heading"
            className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest"
          >
            {t('heading')}
          </h2>
          {visited.length > 0 && (
            <span
              className="text-xs text-white/30 font-mono tabular-nums"
              aria-live="polite"
              aria-label={`${visited.length} of ${jobs.length} entries explored`}
            >
              {visited.length} / {jobs.length} explored
            </span>
          )}
        </div>
      </FadeIn>

      <ol className="list-none p-0 space-y-0">
        {jobs.map((job, i) => {
          const isActive = activeIndex === i
          const isVisited = visited.includes(i)

          return (
            <FadeIn key={`${job.company}-${job.role}-${i}`} delay={Math.min(i * 0.05, 0.35)}>
              <li className="relative border-l-2 border-[#64b5f6]/20 pl-7 pb-2">
                {/* Timeline dot */}
                <span
                  className={`absolute -left-[5px] top-[18px] w-[9px] h-[9px] rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-[#64b5f6] border-[#64b5f6] scale-125'
                      : isVisited
                      ? 'bg-[#64b5f6]/50 border-[#64b5f6]/70'
                      : 'bg-[#0d1b2a] border-white/20'
                  }`}
                  aria-hidden="true"
                />

                {/* Header button */}
                <button
                  ref={(el) => { buttonRefs.current[i] = el }}
                  onClick={() => send({ type: 'SELECT', index: i })}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown' && isActive && canNext) {
                      e.preventDefault()
                      send({ type: 'NEXT' })
                    }
                    if (e.key === 'ArrowUp' && isActive && canPrev) {
                      e.preventDefault()
                      send({ type: 'PREV' })
                    }
                    if (e.key === 'Escape' && isActive) {
                      send({ type: 'CLOSE' })
                    }
                  }}
                  aria-expanded={isActive}
                  aria-controls={`bullets-${i}`}
                  className={`w-full text-left py-3 pr-4 rounded-r-lg transition-colors duration-150 group outline-none focus-visible:outline-2 focus-visible:outline-[#64b5f6]/50 focus-visible:-outline-offset-2 ${
                    isActive ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-0.5">
                    <span
                      className={`font-bold text-sm transition-colors ${
                        isActive ? 'text-white' : 'text-white/85 group-hover:text-white'
                      }`}
                    >
                      {job.role}
                    </span>
                    <span
                      className={`text-sm transition-colors ${
                        isActive ? 'text-[#64b5f6]' : 'text-[#64b5f6]/60 group-hover:text-[#64b5f6]'
                      }`}
                    >
                      @ {job.company}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/45 text-xs">{job.period}</span>
                    <span
                      className={`text-[#64b5f6]/50 text-xs font-mono transition-transform duration-200 ${
                        isActive ? 'rotate-90' : ''
                      }`}
                      aria-hidden="true"
                    >
                      ▸
                    </span>
                  </div>
                </button>

                {/* Expandable bullet points */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={`bullets-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <ul className="py-3 pr-4 space-y-2 list-none p-0 pb-3">
                        {job.bullets.map((bullet, bi) => (
                          <motion.li
                            key={bi}
                            initial={{ x: -6, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: bi * 0.045, duration: 0.18 }}
                            className="text-white/70 text-sm leading-relaxed flex gap-3"
                          >
                            <span
                              className="text-[#64b5f6]/70 shrink-0 mt-0.5"
                              aria-hidden="true"
                            >
                              ▸
                            </span>
                            <span>{bullet}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            </FadeIn>
          )
        })}
      </ol>

      {/* Keyboard hint — only visible when an entry is open */}
      <AnimatePresence>
        {isExpanded && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-white/20 text-xs font-mono mt-6 text-center select-none"
            aria-hidden="true"
          >
            ↑↓ navigate &nbsp;·&nbsp; Esc close
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  )
}
