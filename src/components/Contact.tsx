import { bio } from '@/content/data'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto text-center">
      <h2 className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest mb-4">
        Contact
      </h2>
      <p className="text-white/50 mb-10 text-sm">Let&apos;s connect.</p>
      <div className="flex justify-center gap-8">
        <a
          href={bio.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white transition-colors text-sm"
        >
          GitHub
        </a>
        <a
          href={bio.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-white transition-colors text-sm"
        >
          LinkedIn
        </a>
        <a
          href={`mailto:${bio.email}`}
          className="text-white/70 hover:text-white transition-colors text-sm"
        >
          Email
        </a>
      </div>
    </section>
  )
}
