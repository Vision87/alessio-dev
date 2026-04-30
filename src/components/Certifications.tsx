import { certifications } from '@/content/data'

export default function Certifications() {
  if (!certifications.length) return null

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="py-16 px-6 max-w-4xl mx-auto"
    >
      <h2
        id="certifications-heading"
        className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest mb-8"
      >
        Certifications
      </h2>
      <div className="flex flex-wrap gap-4">
        {certifications.map((cert) => {
          const card = (
            <div className="bg-[#1e3a5f] border border-white/5 rounded-lg px-5 py-4 min-w-[220px]">
              <p className="text-[#64b5f6] font-semibold text-sm">{cert.name}</p>
              <p className="text-white/70 text-xs mt-1">{cert.issuer}</p>
              <p className="text-white/40 text-xs mt-0.5">{cert.year}</p>
            </div>
          )

          return cert.url ? (
            <a
              key={cert.name}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${cert.name} from ${cert.issuer} (opens in new tab)`}
              className="block hover:opacity-80 transition-opacity"
            >
              {card}
            </a>
          ) : (
            <div key={cert.name}>{card}</div>
          )
        })}
      </div>
    </section>
  )
}
