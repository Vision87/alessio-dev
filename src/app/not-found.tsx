import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <p className="text-[#64b5f6] text-xs font-mono uppercase tracking-widest mb-4">404</p>
      <h1 className="text-5xl font-extrabold text-white mb-4">Page not found</h1>
      <p className="text-white/60 mb-8 text-center max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="text-sm text-white/70 hover:text-white transition-colors border border-white/20 hover:border-white/50 px-4 py-2 rounded"
      >
        ← Back home
      </Link>
    </main>
  )
}
