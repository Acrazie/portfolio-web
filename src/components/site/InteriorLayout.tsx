import type { ReactNode } from 'react'
import { useLocale } from './LocaleProvider'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

type NavKey = 'projects' | 'about' | 'education'

export function InteriorLayout({ active, children }: { active: NavKey; children: ReactNode }) {
  const { copy } = useLocale()

  return (
    <div className="min-h-screen bg-white text-black">
      <a href="#main" className="skip-link">{copy.skip}</a>
      <SiteHeader active={active} />
      <main id="main" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </div>
  )
}
