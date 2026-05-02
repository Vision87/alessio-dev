import { bio } from '@/content/data'
import FadeIn from './FadeIn'

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 px-6 max-w-4xl mx-auto text-center">
      <FadeIn>
        <h2
          id="contact-heading"
          className="text-xs font-mono text-[#64b5f6] uppercase tracking-widest mb-4"
        >
          Contact
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="text-white/70 mb-10 text-sm">Let&apos;s connect.</p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="flex justify-center gap-8">
          <a
            href={bio.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub AMoioli profile (opens in new tab)"
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            GitHub / AMoioli
          </a>
          <a
            href={bio.githubVision87}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Vision87 profile (opens in new tab)"
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            GitHub / Vision87
          </a>
          <a
            href={bio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in new tab)"
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${bio.email}`}
            aria-label="Send email to Alessio Moioli"
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            Email
          </a>
        </div>
      </FadeIn>
    </section>
  )
}
