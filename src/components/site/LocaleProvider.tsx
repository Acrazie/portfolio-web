import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { portfolio, type Locale } from '@/content/portfolio'

type LocaleValue = {
  locale: Locale
  copy: (typeof portfolio.copy)[Locale]
  toggleLocale: () => void
}

const LocaleContext = createContext<LocaleValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('fr')

  useEffect(() => {
    document.documentElement.dataset.hydrated = 'true'
    return () => { delete document.documentElement.dataset.hydrated }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<LocaleValue>(() => ({
    locale,
    copy: portfolio.copy[locale],
    toggleLocale: () => setLocale(current => current === 'fr' ? 'en' : 'fr'),
  }), [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used within LocaleProvider')
  return value
}
