import Hero from '@/components/Hero'
import About from '@/components/About'
import Certifications from '@/components/Certifications'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Writing from '@/components/Writing'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Certifications />
      <Skills />
      <Experience />
      <Projects />
      <Writing />
      <Contact />
    </main>
  )
}
