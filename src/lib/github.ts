/**
 * Build-time GitHub GraphQL data fetcher.
 *
 * Fetches contribution counts, public repo counts, star totals, and top
 * languages for both GitHub accounts (AMoioli + Vision87) in a single
 * GraphQL request. Returns null if GITHUB_TOKEN is unset or on any error,
 * so the GitHubStats section simply doesn't render rather than breaking
 * the build.
 */

export interface LanguageStat {
  name: string
  color: string
  count: number
}

export interface UserStats {
  login: string
  contributions: number
  repos: number
  stars: number
}

export interface GitHubStats {
  users: UserStats[]
  totalContributions: number
  totalRepos: number
  totalStars: number
  topLanguages: LanguageStat[]
}

interface GQLRepo {
  stargazerCount: number
  primaryLanguage: { name: string; color: string } | null
}

interface GQLUser {
  contributionsCollection: {
    contributionCalendar: { totalContributions: number }
  }
  repositories: {
    totalCount: number
    nodes: GQLRepo[]
  }
}

// Single request — both accounts aliased as u1/u2
const QUERY = `
  query TwoUserStats($l1: String!, $l2: String!) {
    u1: user(login: $l1) {
      contributionsCollection {
        contributionCalendar { totalContributions }
      }
      repositories(
        first: 100
        ownerAffiliations: OWNER
        isFork: false
        privacy: PUBLIC
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        totalCount
        nodes {
          stargazerCount
          primaryLanguage { name color }
        }
      }
    }
    u2: user(login: $l2) {
      contributionsCollection {
        contributionCalendar { totalContributions }
      }
      repositories(
        first: 100
        ownerAffiliations: OWNER
        isFork: false
        privacy: PUBLIC
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        totalCount
        nodes {
          stargazerCount
          primaryLanguage { name color }
        }
      }
    }
  }
`

function parseUser(login: string, raw: GQLUser): UserStats {
  const stars = raw.repositories.nodes.reduce(
    (sum, repo) => sum + repo.stargazerCount,
    0,
  )
  return {
    login,
    contributions: raw.contributionsCollection.contributionCalendar.totalContributions,
    repos: raw.repositories.totalCount,
    stars,
  }
}

function aggregateLanguages(rawUsers: GQLUser[]): LanguageStat[] {
  const map = new Map<string, { color: string; count: number }>()
  for (const user of rawUsers) {
    for (const repo of user.repositories.nodes) {
      if (!repo.primaryLanguage) continue
      const { name, color } = repo.primaryLanguage
      const entry = map.get(name)
      if (entry) {
        entry.count++
      } else {
        map.set(name, { color: color ?? '#ccc', count: 1 })
      }
    }
  }
  return Array.from(map.entries())
    .map(([name, { color, count }]) => ({ name, color, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
}

export async function fetchGitHubStats(): Promise<GitHubStats | null> {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn('[github] GITHUB_TOKEN not set — GitHub stats section will be hidden')
    }
    return null
  }

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { l1: 'AMoioli', l2: 'Vision87' },
      }),
      // Deduplicated across the 3 locale builds at build time
      cache: 'force-cache',
    })

    if (!res.ok) {
      console.warn('[github] API returned', res.status, res.statusText)
      return null
    }

    const json = (await res.json()) as {
      data?: { u1: GQLUser; u2: GQLUser }
      errors?: unknown[]
    }

    if (json.errors?.length) {
      console.warn('[github] GraphQL errors:', json.errors)
      return null
    }

    if (!json.data) return null

    const { u1, u2 } = json.data
    const users = [parseUser('AMoioli', u1), parseUser('Vision87', u2)]

    return {
      users,
      totalContributions: users.reduce((s, u) => s + u.contributions, 0),
      totalRepos: users.reduce((s, u) => s + u.repos, 0),
      totalStars: users.reduce((s, u) => s + u.stars, 0),
      topLanguages: aggregateLanguages([u1, u2]),
    }
  } catch (err) {
    console.warn('[github] fetch failed:', err)
    return null
  }
}
