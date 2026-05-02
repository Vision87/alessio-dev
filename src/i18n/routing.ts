import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'it', 'ja'],
  defaultLocale: 'en',
  localePrefix: 'always',
})
