import { render, screen } from '@testing-library/react'
import Experience from '@/components/Experience'
import { experience } from '@/content/data'

describe('Experience', () => {
  it('renders company name and role for each entry', () => {
    render(<Experience />)
    experience.forEach((job) => {
      expect(screen.getByText(`@ ${job.company}`)).toBeInTheDocument()
      expect(screen.getByText(job.role)).toBeInTheDocument()
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
