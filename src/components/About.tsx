import { bio } from '@/content/data'
import FadeIn from './FadeIn'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 px-6 max-w-4xl mx-auto">
      <FadeIn>
        <h2
          id="about-heading"
          className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest mb-8"
        >
          About
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="text-lg text-white/80 leading-relaxed max-w-2xl">{bio.about}</p>
      </FadeIn>
    </section>
  )
}
