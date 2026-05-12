// ── Achievement definitions ────────────────────────────────────────────────

export interface Achievement {
  id: string
  icon: string
  title: string
  description: string
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_visit',       icon: '🎫', title: 'First Visit',   description: 'Loaded the portfolio' },
  { id: 'terminal_opened',   icon: '💻', title: 'Hacker',        description: 'Opened the terminal' },
  { id: 'terminal_help',     icon: '📖', title: 'RTFM',          description: "Ran 'help' in the terminal" },
  { id: 'experience_opened', icon: '📜', title: 'History Buff',  description: 'Explored a career entry' },
  { id: 'experience_all',    icon: '🏆', title: 'Senior Dev',    description: 'Explored every career entry' },
  { id: 'skills_radar',      icon: '🎯', title: 'Full Stack',    description: 'Interacted with the skills radar' },
  { id: 'project_clicked',   icon: '🔗', title: 'Code Reviewer', description: 'Visited a project link' },
  { id: 'language_changed',  icon: '🌏', title: 'Polyglot',      description: 'Changed the interface language' },
  { id: 'contact_reached',   icon: '📬', title: 'Deep Dive',     description: 'Scrolled to the contact section' },
  { id: 'completionist',     icon: '⭐', title: '100%',          description: 'Collected every other stamp' },
]

const BASE_IDS = ACHIEVEMENTS.filter((a) => a.id !== 'completionist').map((a) => a.id)
const LS_KEY = 'portfolio_achievements'

// ── Storage helpers ───────────────────────────────────────────────────────

export function getUnlocked(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]')
  } catch {
    return []
  }
}

function save(ids: string[]): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(ids))
  } catch {
    // private browsing may block localStorage writes
  }
}

// ── Unlock ────────────────────────────────────────────────────────────────

/**
 * Persists `id` to localStorage.
 * Returns all newly unlocked IDs — may include 'completionist' if the
 * last base achievement was just collected.
 * Returns [] if `id` was already unlocked.
 */
export function unlock(id: string): string[] {
  const current = getUnlocked()
  if (current.includes(id)) return []

  const next = [...current, id]
  const newlyUnlocked: string[] = [id]

  // Auto-trigger completionist when every base achievement is collected
  const allBaseCollected = BASE_IDS.every((bid) => next.includes(bid))
  if (allBaseCollected && !next.includes('completionist')) {
    next.push('completionist')
    newlyUnlocked.push('completionist')
  }

  save(next)
  return newlyUnlocked
}

// ── Event dispatch ────────────────────────────────────────────────────────

/**
 * Fire a custom DOM event. The Passport component listens for this and
 * persists + displays the achievement. Safe to call from any client component.
 */
export function fireAchievement(id: string): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('achievement:unlock', { detail: id }))
}
