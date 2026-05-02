import { screen } from '@testing-library/react'
import Skills from '@/components/Skills'
import { skills } from '@/content/data'
import { renderWithIntl } from './utils'

describe('Skills', () => {
  it('renders all skill category labels', () => {
    renderWithIntl(<Skills />)
    skills.forEach((group) => {
      expect(screen.getByText(group.category)).toBeInTheDocument()
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
})
