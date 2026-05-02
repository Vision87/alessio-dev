import { experience } from '@/content/data'
import FadeIn from './FadeIn'

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-24 px-6 max-w-4xl mx-auto">
      <FadeIn>
        <h2
          id="experience-heading"
          className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest mb-10"
        >
          Experience
        </h2>
      </FadeIn>
      <ol className="space-y-12 list-none p-0">
        {experience.map((job, i) => (
          <FadeIn key={`${job.company}-${job.role}`} delay={Math.min(i * 0.07, 0.42)}>
            <li className="relative border-l-2 border-[#64b5f6]/30 pl-6">
              <span
                className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#64b5f6]/60 border-2 border-[#0d1b2a]"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <h3 className="text-white font-bold">{job.role}</h3>
                <span className="text-[#64b5f6]">@ {job.company}</span>
              </div>
              <p className="text-white/60 text-sm mb-4">{job.period}</p>
              <ul className="space-y-2">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="text-white/70 text-sm leading-relaxed flex gap-3">
                    <span className="text-[#64b5f6] shrink-0 mt-0.5" aria-hidden="true">▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </li>
          </FadeIn>
        ))}
      </ol>
    </section>
  )
}
