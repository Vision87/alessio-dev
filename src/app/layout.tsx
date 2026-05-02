import type { ReactNode } from 'react'

// Root layout is a passthrough — html/body/metadata are provided
// by src/app/[locale]/layout.tsx for each locale.
export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return children
}
