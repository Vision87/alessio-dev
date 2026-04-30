'use client'
import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-[#1e3a5f] border border-[#64b5f6]/30 text-[#64b5f6] rounded-full flex items-center justify-center hover:bg-[#64b5f6]/20 transition-colors"
    >
      <span aria-hidden="true">↑</span>
    </button>
  )
}
