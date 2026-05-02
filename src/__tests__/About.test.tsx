import { screen } from '@testing-library/react'
import About from '@/components/About'
import { renderWithIntl } from './utils'
import en from '../../messages/en.json'

describe('About', () => {
  it('renders the section heading', () => {
    renderWithIntl(<About />)
    expect(screen.getByRole('heading', { name: /About/i })).toBeInTheDocument()
  })

  it('renders the full about paragraph', () => {
    renderWithIntl(<About />)
    expect(screen.getByText(en.about.text)).toBeInTheDocument()
  })
})
