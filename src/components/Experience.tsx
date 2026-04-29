import { experience } from '@/content/data'

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest mb-10">
        Experience
      </h2>
      <div className="space-y-12">
        {experience.map((job, i) => (
          <div key={i} className="border-l-2 border-[#1e3a5f] pl-6">
            <div className="flex flex-wrap items-baseline gap-2 mb-1">
              <h3 className="text-white font-bold">{job.role}</h3>
              <span className="text-[#64b5f6]">@ {job.company}</span>
            </div>
            <p className="text-white/40 text-sm mb-4">{job.period}</p>
            <ul className="space-y-2">
              {job.bullets.map((bullet, j) => (
                <li key={j} className="text-white/70 text-sm leading-relaxed flex gap-3">
                  <span className="text-[#64b5f6] shrink-0 mt-0.5">▸</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
