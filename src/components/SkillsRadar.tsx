'use client'

import { motion, useReducedMotion } from 'framer-motion'

// ── Geometry constants ──────────────────────────────────────────────────────
const W = 320
const H = 300
const CX = 160   // centre x
const CY = 150   // centre y
const R = 90     // outer ring radius
const LR = 113   // label radius (beyond outer ring)
const N = 6      // number of axes

function axisAngle(i: number) {
  return (Math.PI * 2 * i) / N - Math.PI / 2 // start at top, clockwise
}

function polarXY(r: number, i: number): [number, number] {
  const a = axisAngle(i)
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
}

function hexPoints(r: number) {
  return Array.from({ length: N }, (_, i) => polarXY(r, i).join(',')).join(' ')
}

// ── Component ───────────────────────────────────────────────────────────────

interface Props {
  categories: string[]
  proficiencies: Record<string, number>
  activeCategory: string | null
  onSelect: (cat: string) => void
}

export default function SkillsRadar({ categories, proficiencies, activeCategory, onSelect }: Props) {
  const reduced = useReducedMotion()

  const polyPoints = categories
    .map((cat, i) => polarXY(R * ((proficiencies[cat] ?? 0) / 100), i).join(','))
    .join(' ')

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      className="w-full max-w-xs sm:max-w-sm mx-auto"
    >
      {/* Background grid rings at 33 / 66 / 100 % */}
      {[0.33, 0.66, 1].map((lvl) => (
        <polygon
          key={lvl}
          points={hexPoints(R * lvl)}
          fill="none"
          stroke="#64b5f6"
          strokeOpacity={lvl === 1 ? 0.2 : 0.1}
          strokeWidth="1"
        />
      ))}

      {/* Axis spokes */}
      {categories.map((_, i) => {
        const [x2, y2] = polarXY(R, i)
        return (
          <line
            key={i}
            x1={CX} y1={CY}
            x2={x2} y2={y2}
            stroke="#64b5f6"
            strokeOpacity={0.12}
            strokeWidth="1"
          />
        )
      })}

      {/* Proficiency polygon — fades in on mount */}
      <motion.polygon
        points={polyPoints}
        fill="#64b5f6"
        fillOpacity={0.18}
        stroke="#64b5f6"
        strokeWidth="1.5"
        strokeOpacity={0.7}
        initial={reduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
      />

      {/* Vertex dots */}
      {categories.map((cat, i) => {
        const pct = (proficiencies[cat] ?? 0) / 100
        const [cx, cy] = polarXY(R * pct, i)
        const isActive = activeCategory === cat
        return (
          <circle
            key={cat}
            cx={cx} cy={cy}
            r={isActive ? 5 : 3.5}
            fill={isActive ? '#64b5f6' : '#0d1b2a'}
            stroke="#64b5f6"
            strokeWidth="1.5"
            strokeOpacity={0.85}
            style={{ transition: 'r 0.15s ease, fill 0.15s ease' }}
          />
        )
      })}

      {/* Axis labels — clicking filters the tag grid */}
      {categories.map((cat, i) => {
        const [x, y] = polarXY(LR, i)
        const cosA = Math.cos(axisAngle(i))
        const anchor: 'start' | 'middle' | 'end' =
          cosA > 0.1 ? 'start' : cosA < -0.1 ? 'end' : 'middle'
        const isActive = activeCategory === cat

        return (
          <text
            key={cat}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize="9"
            fontFamily="ui-monospace,monospace"
            fill={isActive ? '#64b5f6' : 'rgba(255,255,255,0.5)'}
            style={{ cursor: 'pointer', transition: 'fill 0.15s ease' }}
            onClick={() => onSelect(cat)}
          >
            {cat}
          </text>
        )
      })}
    </svg>
  )
}
