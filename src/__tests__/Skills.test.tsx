import '@testing-library/jest-dom'
import { screen, fireEvent } from '@testing-library/react'
import Skills from '@/components/Skills'
import { skills } from '@/content/data'
import { renderWithIntl } from './utils'

// framer-motion: no animation support in jsdom
jest.mock('framer-motion', () => {
  const { createElement, Fragment } = require('react') as typeof import('react')
  return {
    motion: {
      div: ({ children, ...props }: React.ComponentProps<'div'>) =>
        createElement('div', props, children),
      // Filter animation props so they don't end up on the <polygon> DOM element
      polygon: ({ initial, animate, exit, transition, variants, children, ...props }: {
        initial?: unknown; animate?: unknown; exit?: unknown;
        transition?: unknown; variants?: unknown; children?: React.ReactNode;
        [k: string]: unknown
      }) => createElement('polygon', props, children),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      createElement(Fragment, null, children),
    useReducedMotion: () => false,
  }
})

describe('Skills', () => {
  it('renders the radar SVG', () => {
    const { container } = renderWithIntl(<Skills />)
    expect(container.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument()
  })

  it('renders all skill category headings', () => {
    renderWithIntl(<Skills />)
    skills.forEach((group) => {
      // Use role query to match only the h3 elements, not the SVG text labels
      expect(screen.getByRole('heading', { name: group.category })).toBeInTheDocument()
    })
  })

  it('renders all individual skill items', () => {
    renderWithIntl(<Skills />)
    skills.forEach((group) => {
      group.items.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument()
      })
    })
  })

  it('filters to one category when an SVG label is clicked', () => {
    const { container } = renderWithIntl(<Skills />)

    // All 6 category headings visible by default
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(skills.length)

    // Click the first SVG text label (Frontend)
    const svgTexts = container.querySelectorAll('svg text')
    expect(svgTexts.length).toBeGreaterThan(0)
    fireEvent.click(svgTexts[0])

    // Only one category heading should be visible
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1)

    // "show all" button appears
    expect(screen.getByRole('button', { name: /show all/i })).toBeInTheDocument()
  })

  it('resets the filter when "show all" is clicked', () => {
    const { container } = renderWithIntl(<Skills />)

    // Filter to one category
    const svgTexts = container.querySelectorAll('svg text')
    fireEvent.click(svgTexts[0])
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1)

    // Reset
    fireEvent.click(screen.getByRole('button', { name: /show all/i }))
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(skills.length)
  })

  it('clicking the active SVG label again resets the filter', () => {
    const { container } = renderWithIntl(<Skills />)

    const svgTexts = container.querySelectorAll('svg text')
    fireEvent.click(svgTexts[0]) // activate
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(1)

    fireEvent.click(svgTexts[0]) // deactivate (toggle)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(skills.length)
  })
})
