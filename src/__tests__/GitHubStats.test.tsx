import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { renderWithIntl } from './utils'
import GitHubStats from '@/components/GitHubStats'
import type { GitHubStats as GitHubStatsType } from '@/lib/github'

const mockStats: GitHubStatsType = {
  users: [
    { login: 'AMoioli', contributions: 342, repos: 12, stars: 45 },
    { login: 'Vision87', contributions: 128, repos: 8, stars: 12 },
  ],
  totalContributions: 470,
  totalRepos: 20,
  totalStars: 57,
  topLanguages: [
    { name: 'TypeScript', color: '#3178c6', count: 8 },
    { name: 'JavaScript', color: '#f1e05a', count: 4 },
    { name: 'PHP', color: '#4f5d95', count: 3 },
  ],
}

describe('GitHubStats', () => {
  it('renders aggregate totals', () => {
    renderWithIntl(<GitHubStats stats={mockStats} />)
    expect(screen.getByText('470')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
    expect(screen.getByText('57')).toBeInTheDocument()
  })

  it('renders per-account cards with links', () => {
    renderWithIntl(<GitHubStats stats={mockStats} />)
    expect(screen.getByText('@AMoioli')).toBeInTheDocument()
    expect(screen.getByText('@Vision87')).toBeInTheDocument()

    const links = screen.getAllByRole('link')
    const hrefs = links.map((l) => l.getAttribute('href'))
    expect(hrefs).toContain('https://github.com/AMoioli')
    expect(hrefs).toContain('https://github.com/Vision87')
  })

  it('renders top languages with colour dots', () => {
    renderWithIntl(<GitHubStats stats={mockStats} />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('PHP')).toBeInTheDocument()
  })
})
