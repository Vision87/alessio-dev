import { bio } from '@/content/data'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 px-6 max-w-4xl mx-auto">
      <h2
        id="about-heading"
        className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest mb-8"
      >
        About
      </h2>
      <p className="text-lg text-white/80 leading-relaxed max-w-2xl">{bio.about}</p>
    </section>
  )
}
