import { render, screen } from '@testing-library/react'
import Contact from '@/components/Contact'
import { bio } from '@/content/data'

describe('Contact', () => {
  it('renders GitHub AMoioli link with correct href', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: /AMoioli/i })).toHaveAttribute('href', bio.github)
  })

  it('renders GitHub Vision87 link with correct href', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: /Vision87/i })).toHaveAttribute('href', bio.githubVision87)
  })

  it('renders LinkedIn link with correct href', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute('href', bio.linkedin)
  })

  it('renders email link with mailto href', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: /Email/i })).toHaveAttribute(
      'href',
      `mailto:${bio.email}`
    )
  })
})
