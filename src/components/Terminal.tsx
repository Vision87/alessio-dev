'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { bio, experience, projects, skills } from '@/content/data'
import { ACHIEVEMENTS, fireAchievement, getUnlocked } from '@/lib/achievements'

// ─── output builders ──────────────────────────────────────────────────────────

function helpOutput(): string[] {
  return [
    '',
    '  COMMAND                DESCRIPTION',
    '  ──────────────────────────────────────────────────',
    '  whoami                 About Alessio',
    '  ls projects            List projects',
    '  cat about.txt          Full bio',
    '  skills                 All skill categories',
    '  skills -c <category>   Filter by category name',
    '  experience             Career timeline',
    '  contact                Contact details',
    '  git log                Recent commits',
    '  neofetch               System info',
    '  passport               View your visitor passport',
    '  clear                  Clear the terminal',
    '  exit                   Close the terminal',
    '',
  ]
}

function whoamiOutput(): string[] {
  return [
    '',
    `  ${bio.name}`,
    `  ${bio.title} @ ${bio.company}`,
    `  ${bio.location}`,
    '',
    '  15+ years · 28 countries · GraphQL · React · TypeScript · Next.js',
    '',
  ]
}

function lsOutput(args: string[]): string[] {
  const target = args[0]?.toLowerCase()
  if (!target || target === 'projects') {
    if (projects.length === 0) return ['', '  (no projects listed yet)', '']
    return [
      '',
      ...projects.map((p) => {
        const icon = p.type === 'personal' ? '📁' : '🏢'
        const tags = p.tags.join(', ')
        return `  ${icon}  ${p.title.padEnd(24)} [${tags}]`
      }),
      '',
    ]
  }
  return ['', `  ls: ${target}: No such file or directory`, '']
}

function catOutput(args: string[]): string[] {
  const file = args[0]?.toLowerCase()
  if (file === 'about.txt') {
    const wrapped = (bio.about.match(/.{1,74}/g) ?? [bio.about]).map((l) => `  ${l}`)
    return ['', ...wrapped, '']
  }
  return ['', `  cat: ${args[0] ?? '(no file)'}: No such file or directory`, '']
}

function skillsOutput(args: string[]): string[] {
  const catIdx = args.indexOf('-c')
  const filter = catIdx !== -1 ? args[catIdx + 1]?.toLowerCase() : null
  const groups = filter
    ? skills.filter((g) => g.category.toLowerCase().includes(filter))
    : skills
  if (groups.length === 0) return ['', `  No category matching "${filter}"`, '']
  return [
    '',
    ...groups.flatMap((g) => [
      `  ${g.category}`,
      `  ${'─'.repeat(g.category.length)}`,
      `  ${g.items.join(' · ')}`,
      '',
    ]),
  ]
}

function experienceOutput(): string[] {
  return [
    '',
    ...experience.map((j) =>
      `  ${j.period.padEnd(26)} ${j.company.padEnd(22)} ${j.role}`,
    ),
    '',
  ]
}

function contactOutput(): string[] {
  return [
    '',
    `  Email     ${bio.email}`,
    `  LinkedIn  ${bio.linkedin.replace('https://', '')}`,
    `  GitHub    github.com/AMoioli`,
    `            github.com/Vision87`,
    '',
  ]
}

function gitLogOutput(): string[] {
  return [
    '',
    '  commit a3f9b2c (HEAD -> main, origin/main)',
    '  Author: Alessio Moioli <alessio.moioli.87@gmail.com>',
    '  Date:   Today',
    '',
    '      fix: resolve i18n edge case that only appeared on Tuesdays',
    '',
    '  commit 7e1d4a8',
    '  Date:   Last week',
    '',
    '      feat: add GraphQL caching layer (rewrote it only twice this time)',
    '',
    '  commit 2b8c3f1',
    '  Date:   Last month',
    '',
    '      chore: update all dependencies, fix the 47 breaking changes',
    '',
    '  commit f1c0de9',
    '  Date:   3 months ago',
    '',
    '      refactor: rename variable to something slightly less confusing',
    '',
    '  commit 0d1b2a3',
    '  Date:   6 months ago',
    '',
    '      init: initial commit (it worked on the first try, obviously)',
    '',
  ]
}

function passportOutput(): string[] {
  const unlocked = getUnlocked()
  const lines = ACHIEVEMENTS.map((a) => {
    const earned = unlocked.includes(a.id)
    return `  ${earned ? a.icon : '🔒'}  ${a.title.padEnd(18)} ${earned ? a.description : '???'}`
  })
  return [
    '',
    '  VISITOR PASSPORT',
    '  ──────────────────────────────────────────────────',
    ...lines,
    '',
    `  ${unlocked.length} / ${ACHIEVEMENTS.length} stamps collected`,
    '',
  ]
}

function neofetchOutput(): string[] {
  return [
    '',
    '          .          alessio@portfolio',
    '         .:.         ─────────────────────────────',
    '        .::.         OS:        Portfolio OS 1.0',
    '       .::::.        Host:      alessiomoioli.com',
    '      .::::  .       Shell:     Next.js + React 19',
    '     .::::    .      Terminal:  This one',
    '    .::::      .     Languages: TypeScript · GraphQL · PHP · Swift',
    '   .:::::::::::.     Uptime:    15+ years',
    '  .::::::::::::::    Memory:    All used by TypeScript type inference',
    '',
  ]
}

// ─── types ────────────────────────────────────────────────────────────────────

interface Line {
  id: number
  kind: 'input' | 'output' | 'error'
  text: string
}

let nextId = 0
const mkLine = (kind: Line['kind'], text: string): Line => ({
  id: nextId++,
  kind,
  text,
})

const WELCOME: Line[] = [
  mkLine('output', ''),
  mkLine('output', '  ╔════════════════════════════════════════════════════╗'),
  mkLine('output', "  ║  Alessio's Portfolio Terminal  v1.0.0              ║"),
  mkLine('output', "  ║  Type 'help' for available commands.               ║"),
  mkLine('output', '  ║  Press Escape or click outside to close.           ║'),
  mkLine('output', '  ╚════════════════════════════════════════════════════╝'),
  mkLine('output', ''),
]

// ─── component ────────────────────────────────────────────────────────────────

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [lines, setLines] = useState<Line[]>(WELCOME)
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new lines
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  // Global backtick shortcut + Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (e.key === '^' && tag !== 'INPUT' && tag !== 'TEXTAREA' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        setIsOpen((v) => {
          if (!v) fireAchievement('terminal_opened')
          return !v
        })
      }
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const runCommand = useCallback((raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    const parts = trimmed.split(/\s+/)
    const cmd = parts[0].toLowerCase()
    const args = parts.slice(1)
    const inputLine = mkLine('input', trimmed)

    setCmdHistory((h) => [trimmed, ...h].slice(0, 50))
    setHistoryIdx(-1)

    if (cmd === 'clear') {
      setLines(WELCOME)
      return
    }
    if (cmd === 'exit' || cmd === 'quit' || cmd === 'close') {
      setIsOpen(false)
      setLines((prev) => [...prev, inputLine])
      return
    }

    let output: string[]
    let isError = false

    switch (cmd) {
      case 'help':        output = helpOutput(); fireAchievement('terminal_help'); break
      case 'whoami':      output = whoamiOutput(); break
      case 'ls':          output = lsOutput(args); break
      case 'cat':         output = catOutput(args); break
      case 'skills':      output = skillsOutput(args); break
      case 'experience':  output = experienceOutput(); break
      case 'contact':     output = contactOutput(); break
      case 'neofetch':    output = neofetchOutput(); break
      case 'git':
        output = args[0] === 'log'
          ? gitLogOutput()
          : ['', `  git: '${args[0] ?? ''}' is not a git command. Did you mean 'git log'?`, '']
        break
      case 'sudo':
        output = ['', "  sudo: permission denied (you're in a browser, not a server).", '']
        break
      case 'rm':
        output = ['', '  Nice try. No files were harmed — this is JavaScript.', '']
        break
      case 'vim':
        output = [
          '', '  Vim opened successfully.',
          '  ...',
          "  How do you exit? That's a great question. Try :q!",
          '  ...closing automatically to save you.',
          '',
        ]
        break
      case 'pwd':
        output = ['', '  /home/alessio/portfolio', '']
        break
      case 'echo':
        output = ['', `  ${args.join(' ')}`, '']
        break
      case 'date':
        output = ['', `  ${new Date().toUTCString()}`, '']
        break
      case 'passport':
        output = passportOutput()
        break
      default:
        output = ['', `  command not found: ${cmd}`, "  Type 'help' to see available commands.", '']
        isError = true
    }

    const outLines = output.map((t) => mkLine(isError ? 'error' : 'output', t))
    setLines((prev) => [...prev, inputLine, ...outLines])
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const idx = Math.min(historyIdx + 1, cmdHistory.length - 1)
      setHistoryIdx(idx)
      setInput(cmdHistory[idx] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = Math.max(historyIdx - 1, -1)
      setHistoryIdx(idx)
      setInput(idx === -1 ? '' : cmdHistory[idx])
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const completions = [
        'help', 'whoami', 'ls', 'cat', 'skills', 'experience',
        'contact', 'git', 'neofetch', 'clear', 'exit',
      ]
      const match = completions.find((c) => c.startsWith(input.toLowerCase()))
      if (match) setInput(match)
    }
  }

  return (
    <>
      {/* Subtle hint — bottom-left, desktop only */}
      {!isOpen && (
        <div
          className="fixed bottom-6 left-6 z-40 hidden md:block pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="text-white/20 text-xs font-mono">
            press{' '}
            <kbd className="px-1 py-0.5 bg-white/10 rounded text-white/25 text-xs not-italic">
              ^
            </kbd>{' '}
            for terminal
          </span>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="terminal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false) }}
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio terminal"
          >
            <motion.div
              key="terminal-panel"
              initial={{ scale: 0.97, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-3xl flex flex-col bg-[#0c0c0c] rounded-xl overflow-hidden shadow-2xl border border-white/10"
              style={{ height: '62vh', minHeight: '420px' }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1c1c1c] border-b border-white/10 shrink-0">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-3 h-3 rounded-full bg-[#ff5f57] hover:opacity-80 transition-opacity"
                  aria-label="Close terminal"
                />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" aria-hidden="true" />
                <span className="ml-3 text-white/35 text-xs font-mono">
                  alessio@portfolio — bash
                </span>
              </div>

              {/* Output area */}
              <div
                className="flex-1 overflow-y-auto px-4 pt-3 pb-1 font-mono text-sm leading-relaxed"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((l) => (
                  <div key={l.id}>
                    {l.kind === 'input' ? (
                      <div className="flex items-start gap-0 text-white">
                        <span className="shrink-0">
                          <span className="text-[#64b5f6]">alessio@portfolio</span>
                          <span className="text-white/30">:</span>
                          <span className="text-[#64b5f6]">~</span>
                          <span className="text-white/30">$ </span>
                        </span>
                        <span>{l.text}</span>
                      </div>
                    ) : (
                      <pre
                        className={`whitespace-pre-wrap break-words ${
                          l.kind === 'error' ? 'text-[#ff6b6b]' : 'text-[#4dff91]'
                        }`}
                      >
                        {l.text}
                      </pre>
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input row */}
              <div className="flex items-center px-4 py-3 border-t border-white/10 font-mono text-sm shrink-0">
                <span className="text-[#64b5f6] shrink-0">alessio@portfolio</span>
                <span className="text-white/30">:</span>
                <span className="text-[#64b5f6]">~</span>
                <span className="text-white/30 shrink-0">$ </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white outline-none caret-[#4dff91] ml-0.5"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
