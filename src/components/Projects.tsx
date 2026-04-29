import { projects } from '@/content/data'

export default function Projects() {
  const visibleProjects = projects.filter((p) => p.type === 'professional')

  return (
    <section id="projects" className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest mb-10">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleProjects.map((project) => (
          <div
            key={project.title}
            className="bg-[#1e3a5f] rounded-lg p-6 flex flex-col gap-3 border border-white/5"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-white font-bold">{project.title}</h3>
              {project.type === 'personal' && (
                <span className="text-xs bg-[#64b5f6]/20 text-[#64b5f6] px-2 py-0.5 rounded shrink-0">
                  Personal
                </span>
              )}
            </div>
            <p className="text-white/70 text-sm leading-relaxed flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-white/50 bg-white/5 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#64b5f6] text-sm hover:underline mt-auto"
              >
                View Project →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
