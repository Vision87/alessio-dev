import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'it', 'jp'],
  defaultLocale: 'en',
  localePrefix: 'always',
})
