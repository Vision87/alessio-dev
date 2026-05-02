import { render, screen } from '@testing-library/react'
import Experience from '@/components/Experience'
import { experience } from '@/content/data'

describe('Experience', () => {
  it('renders company name and role for each entry', () => {
    render(<Experience />)
    experience.forEach((job) => {
      expect(screen.getAllByText(`@ ${job.company}`).length).toBeGreaterThan(0)
      expect(screen.getAllByText(job.role).length).toBeGreaterThan(0)
    })
  })

  it('renders all bullet points for each entry', () => {
    render(<Experience />)
    experience.forEach((job) => {
      job.bullets.forEach((bullet) => {
        expect(screen.getByText(bullet)).toBeInTheDocument()
      })
    })
  })
})
