/**
 * Build-time OG image generator.
 * Renders an SVG card to public/og-image.png (1200×630) using sharp.
 * Run via: node scripts/generate-og.mjs
 * Wired into `npm run build` automatically.
 */
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, '..', 'public', 'og-image.png')

const W = 1200
const H = 630

const svg = /* xml */ `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#0d1b2a"/>

  <!-- Top accent bar -->
  <rect x="0" y="0" width="${W}" height="5" fill="#64b5f6"/>

  <!-- Right decorative card -->
  <rect x="808" y="80" width="312" height="470" rx="16" fill="#1e3a5f"
    stroke="#64b5f6" stroke-opacity="0.2" stroke-width="1"/>

  <!-- { } braces inside card -->
  <text x="964" y="390"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="148" font-weight="700"
    fill="#64b5f6" fill-opacity="0.25"
    text-anchor="middle">
    { }
  </text>

  <!-- Name -->
  <text x="80" y="215"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="82" font-weight="800" fill="#ffffff">
    Alessio Moioli
  </text>

  <!-- Title -->
  <text x="80" y="276"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="33" font-weight="600" fill="#64b5f6">
    Manager Software Engineering
  </text>

  <!-- Divider -->
  <rect x="80" y="298" width="136" height="3" rx="1" fill="#64b5f6" opacity="0.65"/>

  <!-- Tagline line 1 -->
  <text x="80" y="358"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="23" fill="#ffffff" fill-opacity="0.65">
    15+ years delivering innovative web solutions
  </text>

  <!-- Tagline line 2 -->
  <text x="80" y="392"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="23" fill="#ffffff" fill-opacity="0.65">
    and leading international engineering teams.
  </text>

  <!-- Paramount+ badge -->
  <rect x="80" y="444" width="148" height="44" rx="8" fill="#1e3a5f"
    stroke="#64b5f6" stroke-opacity="0.4" stroke-width="1"/>
  <text x="154" y="472"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="20" font-weight="600" fill="#64b5f6" text-anchor="middle">
    Paramount+
  </text>

  <!-- URL -->
  <text x="80" y="578"
    font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
    font-size="20" fill="#ffffff" fill-opacity="0.45">
    alessiomoioli.com
  </text>

</svg>`

await sharp(Buffer.from(svg)).png().toFile(out)
console.log('✓  OG image generated →', out)
