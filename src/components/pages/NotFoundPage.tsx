import { Link } from '@tanstack/react-router'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { useLocale } from '@/components/site/LocaleProvider'

export function NotFoundPage() {
  const { copy } = useLocale()

  return (
    <div className="min-h-screen bg-white text-black">
      <a href="#main" className="skip-link">{copy.skip}</a>
      <SiteHeader active="home" />
      <main id="main" tabIndex={-1} className="bg-white">
        <div className="site-container py-24 sm:py-36">
          <h1 className="page-title max-w-[16ch] text-balance text-[clamp(3.5rem,8vw,6rem)] font-medium leading-[.92] tracking-[-.04em]">{copy.notFound.title}</h1>
          <p className="mt-7 max-w-[54ch] text-lg leading-8 text-black/62">{copy.notFound.body}</p>
          <Link to="/" className="focus-ring mt-9 inline-flex min-h-11 items-center border-b border-black pb-1 text-sm font-medium">{copy.notFound.action}</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
