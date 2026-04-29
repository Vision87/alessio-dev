import { render, screen } from '@testing-library/react'
import Projects from '@/components/Projects'
import { projects } from '@/content/data'

describe('Projects', () => {
  it('renders all professional projects', () => {
    render(<Projects />)
    const professional = projects.filter((p) => p.type === 'professional')
    professional.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument()
      expect(screen.getByText(project.description)).toBeInTheDocument()
    })
  })

  it('does not show the Personal badge when no personal projects are present', () => {
    render(<Projects />)
    expect(screen.queryByText('Personal')).not.toBeInTheDocument()
  })

  it('renders tags for each visible project', () => {
    render(<Projects />)
    const firstProject = projects.find((p) => p.type === 'professional')!
    firstProject.tags.forEach((tag) => {
      expect(screen.getAllByText(tag).length).toBeGreaterThan(0)
    })
  })
})
