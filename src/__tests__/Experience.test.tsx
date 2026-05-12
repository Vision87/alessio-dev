import '@testing-library/jest-dom'
import { screen, fireEvent } from '@testing-library/react'
import Experience from '@/components/Experience'
import { experience } from '@/content/data'
import { renderWithIntl } from './utils'

// framer-motion: no animation support in jsdom
jest.mock('framer-motion', () => {
  const { createElement, Fragment } = require('react') as typeof import('react')
  return {
    motion: {
      div: ({ children, ...props }: React.ComponentProps<'div'>) =>
        createElement('div', props, children),
      li: ({ children, ...props }: React.ComponentProps<'li'>) =>
        createElement('li', props, children),
      p: ({ children, ...props }: React.ComponentProps<'p'>) =>
        createElement('p', props, children),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      createElement(Fragment, null, children),
    // FadeIn uses this hook; return false so no reduced-motion branch is taken
    useReducedMotion: () => false,
  }
})

describe('Experience', () => {
  it('renders company name and role for each entry', () => {
    renderWithIntl(<Experience />)
    experience.forEach((job) => {
      expect(screen.getAllByText(`@ ${job.company}`).length).toBeGreaterThan(0)
      expect(screen.getAllByText(job.role).length).toBeGreaterThan(0)
    })
  })

  it('shows bullets when an entry is clicked', () => {
    renderWithIntl(<Experience />)

    // Bullets are hidden initially
    const firstJob = experience[0]
    firstJob.bullets.forEach((bullet) => {
      expect(screen.queryByText(bullet)).not.toBeInTheDocument()
    })

    // Click the first entry's button
    const button = screen.getAllByRole('button', { expanded: false })[0]
    fireEvent.click(button)

    // Now the bullets should be visible
    firstJob.bullets.forEach((bullet) => {
      expect(screen.getByText(bullet)).toBeInTheDocument()
    })
  })

  it('collapses an entry when clicked again', () => {
    renderWithIntl(<Experience />)

    const button = screen.getAllByRole('button', { expanded: false })[0]
    fireEvent.click(button) // expand
    expect(button).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(button) // collapse
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('shows the explored counter after visiting an entry', () => {
    renderWithIntl(<Experience />)
    expect(screen.queryByText(/explored/)).not.toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button')[0])
    expect(screen.getByText(/1 \/ \d+ explored/)).toBeInTheDocument()
  })

  it('switches to a different entry without going back to idle', () => {
    renderWithIntl(<Experience />)

    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0]) // open first
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(buttons[1]) // open second — first should close
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false')
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true')
  })
})
