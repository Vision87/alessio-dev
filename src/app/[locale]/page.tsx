import Hero from '@/components/Hero'
import About from '@/components/About'
import Certifications from '@/components/Certifications'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import GitHubStats from '@/components/GitHubStats'
import Writing from '@/components/Writing'
import Contact from '@/components/Contact'
import { fetchGitHubStats } from '@/lib/github'

export default async function LocalePage() {
  const githubStats = await fetchGitHubStats()

  return (
    <main id="main-content">
      <Hero />
      <About />
      <Certifications />
      <Skills />
      <Experience />
      <Projects />
      {githubStats && <GitHubStats stats={githubStats} />}
      <Writing />
      <Contact />
    </main>
  )
}
