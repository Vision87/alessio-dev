import { skills } from '@/content/data'

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest mb-10">
        Skills
      </h2>
      <div className="space-y-8">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-white/40 text-xs uppercase tracking-widest mb-3">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 bg-[#1e3a5f] text-[#64b5f6] text-sm rounded-full border border-[#64b5f6]/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
