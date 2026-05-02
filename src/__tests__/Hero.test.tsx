import { screen } from '@testing-library/react'
import Hero from '@/components/Hero'
import { renderWithIntl } from './utils'

describe('Hero', () => {
  it('renders the name as an h1', () => {
    renderWithIntl(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Alessio Moioli')
  })

  it('renders title and company', () => {
    renderWithIntl(<Hero />)
    expect(screen.getByText(/Manager Software Engineering/)).toBeInTheDocument()
    expect(screen.getByText(/Paramount/)).toBeInTheDocument()
  })

  it('renders AMoioli GitHub link', () => {
    renderWithIntl(<Hero />)
    expect(screen.getByRole('link', { name: /AMoioli/i })).toHaveAttribute(
      'href',
      expect.stringContaining('github')
    )
  })

  it('renders Vision87 GitHub link', () => {
    renderWithIntl(<Hero />)
    expect(screen.getByRole('link', { name: /Vision87/i })).toHaveAttribute(
      'href',
      expect.stringContaining('github')
    )
  })

  it('renders LinkedIn link', () => {
    renderWithIntl(<Hero />)
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute(
      'href',
      expect.stringContaining('linkedin')
    )
  })
})
