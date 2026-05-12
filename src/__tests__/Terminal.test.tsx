import '@testing-library/jest-dom'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithIntl } from './utils'
import Terminal from '@/components/Terminal'

// framer-motion has no animation support in jsdom — replace with simple wrappers
jest.mock('framer-motion', () => {
  const { createElement, Fragment } = require('react') as typeof import('react')
  return {
    motion: {
      div: ({ children, ...props }: React.ComponentProps<'div'>) =>
        createElement('div', props, children),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      createElement(Fragment, null, children),
  }
})

// jsdom doesn't implement scrollIntoView
beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
})

describe('Terminal', () => {
  it('renders the backtick hint', () => {
    renderWithIntl(<Terminal />)
    // Text is split: "press" + <kbd>`</kbd> + "for terminal"
    expect(screen.getByText(/for terminal/)).toBeInTheDocument()
  })

  it('opens on backtick keydown', () => {
    renderWithIntl(<Terminal />)
    fireEvent.keyDown(window, { key: '`' })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('closes on Escape', () => {
    renderWithIntl(<Terminal />)
    fireEvent.keyDown(window, { key: '`' })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('shows welcome message when opened', () => {
    renderWithIntl(<Terminal />)
    fireEvent.keyDown(window, { key: '`' })
    expect(screen.getByText(/Alessio's Portfolio Terminal/)).toBeInTheDocument()
  })

  it('executes the help command', () => {
    renderWithIntl(<Terminal />)
    fireEvent.keyDown(window, { key: '`' })

    const input = screen.getByRole('textbox', { name: /terminal input/i })
    fireEvent.change(input, { target: { value: 'help' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(screen.getByText(/COMMAND/)).toBeInTheDocument()
    expect(screen.getByText(/whoami/)).toBeInTheDocument()
  })

  it('shows error for unknown command', () => {
    renderWithIntl(<Terminal />)
    fireEvent.keyDown(window, { key: '`' })

    const input = screen.getByRole('textbox', { name: /terminal input/i })
    fireEvent.change(input, { target: { value: 'foobar' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(screen.getByText(/command not found: foobar/)).toBeInTheDocument()
  })

  it('executes the whoami command', () => {
    renderWithIntl(<Terminal />)
    fireEvent.keyDown(window, { key: '`' })

    const input = screen.getByRole('textbox', { name: /terminal input/i })
    fireEvent.change(input, { target: { value: 'whoami' } })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(screen.getByText(/Alessio Moioli/)).toBeInTheDocument()
  })

  it('closes via the close button', () => {
    renderWithIntl(<Terminal />)
    fireEvent.keyDown(window, { key: '`' })
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /close terminal/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
