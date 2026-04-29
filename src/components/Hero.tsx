import { bio } from '@/content/data'

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-20 max-w-4xl mx-auto">
      <p className="text-[#64b5f6] text-xs font-mono mb-3 tracking-widest uppercase">
        Hi, I&apos;m
      </p>
      <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4">
        {bio.name}
      </h1>
      <p className="text-xl md:text-2xl text-white/70 mb-2">
        {bio.title}{' '}
        <span className="text-[#64b5f6]">@ {bio.company}</span>
      </p>
      <p className="text-white/40 text-sm mb-8">{bio.location}</p>
      <p className="text-lg text-white/80 max-w-xl leading-relaxed">{bio.tagline}</p>
      <div className="flex flex-wrap gap-4 mt-10">
        <a
          href={bio.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/70 hover:text-white transition-colors border border-white/20 hover:border-white/50 px-4 py-2 rounded"
        >
          GitHub
        </a>
        <a
          href={bio.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/70 hover:text-white transition-colors border border-white/20 hover:border-white/50 px-4 py-2 rounded"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${bio.email}`}
          className="text-sm text-white/70 hover:text-white transition-colors border border-white/20 hover:border-white/50 px-4 py-2 rounded"
        >
          Email
        </a>
      </div>
    </section>
  )
}
