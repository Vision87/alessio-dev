'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ACHIEVEMENTS, fireAchievement, getUnlocked, unlock } from '@/lib/achievements'

interface Toast {
  toastId: number
  icon: string
  title: string
}

let _toastSeq = 0

export default function Passport() {
  const [unlocked, setUnlocked] = useState<string[]>([])
  const [panelOpen, setPanelOpen] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // Load persisted state on mount and claim the first-visit achievement
  useEffect(() => {
    setUnlocked(getUnlocked())
    fireAchievement('first_visit')
    return () => timersRef.current.forEach(clearTimeout)
  }, [])

  // Central achievement event listener
  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      const newIds = unlock(id)
      if (newIds.length === 0) return

      setUnlocked(getUnlocked())

      newIds.forEach((nid) => {
        const def = ACHIEVEMENTS.find((a) => a.id === nid)
        if (!def) return

        const toastId = ++_toastSeq
        setToasts((prev) => [...prev, { toastId, icon: def.icon, title: def.title }])

        const timer = setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.toastId !== toastId))
        }, 3000)
        timersRef.current.push(timer)
      })
    }

    window.addEventListener('achievement:unlock', handler)
    return () => window.removeEventListener('achievement:unlock', handler)
  }, [])

  // Fire contact_reached when the #contact section enters the viewport
  useEffect(() => {
    const contact = document.getElementById('contact')
    if (!contact || typeof IntersectionObserver === 'undefined') return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fireAchievement('contact_reached')
      },
      { threshold: 0.3 },
    )
    obs.observe(contact)
    return () => obs.disconnect()
  }, [])

  const count = unlocked.length
  const total = ACHIEVEMENTS.length

  return (
    <>
      {/* Achievement toasts — centered above the fold */}
      <div
        className="fixed bottom-24 left-0 right-0 flex flex-col items-center gap-2 z-[60] pointer-events-none"
        aria-live="polite"
        aria-atomic="false"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.toastId}
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-[#1e3a5f] border border-[#64b5f6]/30 rounded-lg px-4 py-2.5 shadow-xl flex items-center gap-3"
            >
              <span className="text-xl">{t.icon}</span>
              <div>
                <span className="block text-[10px] font-mono text-[#64b5f6]/60 uppercase tracking-wider">
                  achievement unlocked
                </span>
                <span className="block text-sm font-semibold text-white/90">{t.title}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Widget: panel + button */}
      <div className="fixed bottom-[4.5rem] right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {panelOpen && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="mb-2 w-72 bg-[#0d1b2a] border border-[#64b5f6]/20 rounded-xl p-4 shadow-2xl"
              role="region"
              aria-label="Visitor passport achievements"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest">
                  Visitor Passport
                </span>
                <span className="text-xs font-mono text-white/30 tabular-nums">
                  {count} / {total}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {ACHIEVEMENTS.map((a) => {
                  const earned = unlocked.includes(a.id)
                  return (
                    <div
                      key={a.id}
                      title={earned ? a.description : 'Not yet unlocked'}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-center ${
                        earned
                          ? 'border-[#64b5f6]/25 bg-[#64b5f6]/10'
                          : 'border-white/5 bg-white/[0.02]'
                      }`}
                    >
                      <span className={`text-2xl leading-none ${earned ? '' : 'grayscale opacity-20'}`}>
                        {a.icon}
                      </span>
                      <span className={`text-[9px] font-mono leading-tight ${
                        earned ? 'text-white/70' : 'text-white/20'
                      }`}>
                        {earned ? a.title : '???'}
                      </span>
                    </div>
                  )
                })}
              </div>

              {count === total && (
                <p className="mt-3 text-center text-[10px] font-mono text-[#64b5f6]/50">
                  passport complete ✓
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setPanelOpen((v) => !v)}
          aria-label={`Visitor passport: ${count} of ${total} stamps collected`}
          aria-expanded={panelOpen}
          className="w-10 h-10 bg-[#1e3a5f] border border-[#64b5f6]/30 rounded-full flex items-center justify-center hover:bg-[#64b5f6]/20 transition-colors relative"
        >
          <span aria-hidden="true" className="text-lg leading-none">🎫</span>
          {count > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1 w-4 h-4 bg-[#64b5f6] rounded-full text-[9px] text-[#0d1b2a] font-bold flex items-center justify-center tabular-nums"
            >
              {count > 9 ? '9+' : count}
            </span>
          )}
        </button>
      </div>
    </>
  )
}
