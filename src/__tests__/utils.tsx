import { type ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import en from '../../messages/en.json'

export function renderWithIntl(ui: ReactNode, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(
    <NextIntlClientProvider locale="en" messages={en}>
      {ui}
    </NextIntlClientProvider>,
    options
  )
}
