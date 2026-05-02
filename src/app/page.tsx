'use client'

import { useEffect } from 'react'

// Redirect bare / to /en/ — handled by CDN (vercel.json) in production,
// and client-side for local dev and fallback.
export default function RootPage() {
  useEffect(() => {
    window.location.replace('/en/')
  }, [])
  return null
}
