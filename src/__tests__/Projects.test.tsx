import { screen } from '@testing-library/react'
import Projects from '@/components/Projects'
import { projects } from '@/content/data'
import { renderWithIntl } from './utils'

describe('Projects', () => {
  it('renders all professional projects', () => {
    renderWithIntl(<Projects />)
    const professional = projects.filter((p) => p.type === 'professional')
    professional.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument()
      expect(screen.getByText(project.description)).toBeInTheDocument()
    })
  })

  it('does not show the Personal badge when no personal projects are present', () => {
    renderWithIntl(<Projects />)
    expect(screen.queryByText('Personal')).not.toBeInTheDocument()
  })

  it('renders tags for each visible project', () => {
    renderWithIntl(<Projects />)
    const firstProject = projects.find((p) => p.type === 'professional')!
    firstProject.tags.forEach((tag) => {
      expect(screen.getAllByText(tag).length).toBeGreaterThan(0)
    })
  })
})
