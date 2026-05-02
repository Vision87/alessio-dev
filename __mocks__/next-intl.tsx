import type { ReactNode } from 'react'

// Lightweight mock for Jest — real next-intl ships only ESM and cannot be
// transformed by Jest in a CJS environment.  We return English strings so
// that snapshot / text assertions still work without extra wiring.
import en from '../messages/en.json'

type AnyMessages = Record<string, unknown>

const lookup = (namespace: string | undefined, key: string): string => {
  const root = en as AnyMessages
  if (!namespace) return String(root[key] ?? key)
  const ns = root[namespace]
  if (ns && typeof ns === 'object') return String((ns as AnyMessages)[key] ?? key)
  return key
}

export const useTranslations = (namespace?: string) => (key: string) =>
  lookup(namespace, key)

export const useLocale = () => 'en'

export const NextIntlClientProvider = ({ children }: { children: ReactNode }) =>
  children as React.ReactElement
