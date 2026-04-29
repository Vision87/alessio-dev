import { render, screen } from '@testing-library/react'
import About from '@/components/About'
import { bio } from '@/content/data'

describe('About', () => {
  it('renders the section heading', () => {
    render(<About />)
    expect(screen.getByRole('heading', { name: /About/i })).toBeInTheDocument()
  })

  it('renders the full bio.about paragraph', () => {
    render(<About />)
    expect(screen.getByText(bio.about)).toBeInTheDocument()
  })
})
