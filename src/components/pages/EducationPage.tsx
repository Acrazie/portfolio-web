import { InteriorLayout } from '@/components/site/InteriorLayout'
import { portfolio } from '@/content/portfolio'
import { useLocale } from '@/components/site/LocaleProvider'

export function EducationPage() {
  const { copy, locale } = useLocale()

  return (
    <InteriorLayout active="education">
      <section className="bg-white py-20 sm:py-28">
        <div className="site-container">
          <div className="typeset max-w-[70ch]">
            <h1 className="page-title !text-[clamp(3.75rem,9vw,6rem)] !font-medium !leading-[.92] !tracking-[-.04em]">{copy.education.title}</h1>
            <p className="!mt-8 !text-lg !leading-8">{copy.education.intro}</p>
            <ol className="not-typeset mt-16 list-none border-t border-black/20 p-0">
              {portfolio.education.map(item => (
                <li key={item.id} className="grid gap-2 border-b border-black/20 py-8 sm:grid-cols-[minmax(12rem,.7fr)_minmax(0,1.3fr)] sm:gap-10 sm:py-10">
                  <h2 className="text-2xl font-semibold tracking-[-.025em]">{item.institution}</h2>
                  <p className="text-base leading-7 text-black/62 sm:text-lg">{item.copy[locale].program}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </InteriorLayout>
  )
}
