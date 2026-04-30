import { render, screen } from '@testing-library/react'
import Hero from '@/components/Hero'

describe('Hero', () => {
  it('renders the name as an h1', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Alessio Moioli')
  })

  it('renders title and company', () => {
    render(<Hero />)
    expect(screen.getByText(/Senior Software Engineer/)).toBeInTheDocument()
    expect(screen.getByText(/Paramount/)).toBeInTheDocument()
  })

  it('renders AMoioli GitHub link', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /AMoioli/i })).toHaveAttribute(
      'href',
      expect.stringContaining('github')
    )
  })

  it('renders Vision87 GitHub link', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /Vision87/i })).toHaveAttribute(
      'href',
      expect.stringContaining('github')
    )
  })

  it('renders LinkedIn link', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute(
      'href',
      expect.stringContaining('linkedin')
    )
  })
})
