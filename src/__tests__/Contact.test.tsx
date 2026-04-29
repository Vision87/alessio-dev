import { render, screen } from '@testing-library/react'
import Contact from '@/components/Contact'
import { bio } from '@/content/data'

describe('Contact', () => {
  it('renders GitHub link with correct href', () => {
    render(<Contact />)
    expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute('href', bio.github)
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
