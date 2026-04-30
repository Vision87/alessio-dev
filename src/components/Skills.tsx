import { skills } from '@/content/data'

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-24 px-6 max-w-4xl mx-auto">
      <h2
        id="skills-heading"
        className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest mb-10"
      >
        Skills
      </h2>
      <div className="space-y-8">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-white/60 text-xs uppercase tracking-widest mb-3">
              {group.category}
            </h3>
            <ul className="flex flex-wrap gap-2 list-none p-0 m-0" role="list">
              {group.items.map((item) => (
                <li key={`${group.category}-${item}`}>
                  <span className="px-3 py-1 bg-[#1e3a5f] text-[#64b5f6] text-sm rounded-full border border-[#64b5f6]/20">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
