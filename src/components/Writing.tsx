import { writing } from '@/content/data'

export default function Writing() {
  if (!writing.length) return null

  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="py-24 px-6 max-w-4xl mx-auto"
    >
      <h2
        id="writing-heading"
        className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest mb-10"
      >
        Writing &amp; Talks
      </h2>
      <ul className="space-y-6 list-none p-0" role="list">
        {writing.map((entry) => (
          <li key={entry.url} className="flex items-start gap-4">
            <span
              className={`text-xs px-2 py-0.5 rounded shrink-0 mt-0.5 ${
                entry.type === 'talk'
                  ? 'bg-[#64b5f6]/20 text-[#64b5f6]'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              {entry.type === 'talk' ? 'Talk' : 'Article'}
            </span>
            <div>
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${entry.title} — ${entry.type} on ${entry.outlet} (opens in new tab)`}
                className="text-white hover:text-[#64b5f6] transition-colors text-sm font-medium"
              >
                {entry.title}
              </a>
              <p className="text-white/40 text-xs mt-0.5">
                {entry.outlet} · {entry.year}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
