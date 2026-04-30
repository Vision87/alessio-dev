'use client'
import { useState, useEffect } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [activeId, setActiveId] = useState<string>('hero')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
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
          href="#hero"
          aria-label="Alessio Moioli — go to top"
          className="font-bold text-[#64b5f6] tracking-tight text-lg hover:opacity-80 transition-opacity"
        >
          AM
        </a>
        <ul className="flex gap-6 list-none">
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
      </div>
    </nav>
  )
}
