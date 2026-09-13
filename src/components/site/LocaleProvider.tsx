import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { getLocale, setLocale as setParaglideLocale, type Locale } from '@/paraglide/runtime'
import * as m from '@/paraglide/messages'
import { portfolio } from '@/content/portfolio'

type LocaleValue = {
  locale: Locale
  copy: (typeof portfolio.copy)[Locale]
  m: typeof m
  toggleLocale: () => void
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getLocale())

  useEffect(() => {
    document.documentElement.dataset.hydrated = 'true'
    return () => { delete document.documentElement.dataset.hydrated }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = (next: Locale) => {
    setParaglideLocale(next, { reload: false })
    setLocaleState(next)
  }

  const toggleLocale = () => {
    const next: Locale = locale === 'fr' ? 'en' : 'fr'
    setLocale(next)
  }

  const value = useMemo<LocaleValue>(() => ({
    locale,
    copy: portfolio.copy[locale],
    m,
    toggleLocale,
    setLocale,
  }), [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used within LocaleProvider')
  return value
}
