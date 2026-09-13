import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, it } from 'vitest'
import { setLocale } from '@/paraglide/runtime'
import { LocaleProvider, useLocale } from './LocaleProvider'

function Probe() {
  const { copy, locale, toggleLocale } = useLocale()
  return <button type="button" onClick={toggleLocale}>{locale} — {copy.nav.home}</button>
}

beforeEach(() => {
  setLocale('fr', { reload: false })
  document.documentElement.lang = 'fr'
})

it('starts in French and switches the complete locale context to English', async () => {
  const user = userEvent.setup()
  render(<LocaleProvider><Probe /></LocaleProvider>)
  const button = screen.getByRole('button', { name: 'fr — Accueil' })
  await user.click(button)
  expect(button).toHaveTextContent('en — Home')
  expect(document.documentElement).toHaveAttribute('lang', 'en')
})
