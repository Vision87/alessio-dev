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

const rawLookup = (namespace: string | undefined, key: string): unknown => {
  const root = en as AnyMessages
  if (!namespace) return root[key]
  const ns = root[namespace]
  if (ns && typeof ns === 'object') return (ns as AnyMessages)[key]
  return undefined
}

export const useTranslations = (namespace?: string) => {
  const t = (key: string): string => lookup(namespace, key)
  t.raw = (key: string): unknown => rawLookup(namespace, key)
  return t
}

export const useLocale = () => 'en'

export const NextIntlClientProvider = ({ children }: { children: ReactNode }) =>
  children as React.ReactElement
