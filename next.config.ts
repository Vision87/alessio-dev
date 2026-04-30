import type { NextConfig } from 'next'

// Static export for Vercel/GitHub Pages. Server components with async data,
// API routes, and image optimization are unavailable in this mode.
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
