import { render, screen } from '@testing-library/react'
import Skills from '@/components/Skills'
import { skills } from '@/content/data'

describe('Skills', () => {
  it('renders all skill category labels', () => {
    render(<Skills />)
    skills.forEach((group) => {
      expect(screen.getByText(group.category)).toBeInTheDocument()
    })
  })

  it('renders all individual skill items', () => {
    render(<Skills />)
    skills.forEach((group) => {
      group.items.forEach((item) => {
        expect(screen.getByText(item)).toBeInTheDocument()
      })
    })
  })
})
