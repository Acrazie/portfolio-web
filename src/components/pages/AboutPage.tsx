import { InteriorLayout } from '@/components/site/InteriorLayout'
import { portfolio } from '@/content/portfolio'
import { useLocale } from '@/components/site/LocaleProvider'

export function AboutPage() {
  const { copy } = useLocale()

  return (
    <InteriorLayout active="about">
      <section className="bg-white py-20 sm:py-28">
        <div className="site-container">
          <div className="typeset max-w-[70ch]">
            <h1 className="page-title !text-[clamp(3.75rem,9vw,6rem)] !font-medium !leading-[.92] !tracking-[-.04em]">{copy.about.title}</h1>
            <p className="!mt-8 !text-[clamp(1.5rem,3vw,2.5rem)] !leading-[1.18]">{copy.about.lead}</p>
            <p>{copy.about.body}</p>
            <hr />
            <h2>{copy.about.capabilitiesTitle}</h2>
            <dl>
              {copy.about.capabilities.map(item => (
                <div key={item.title} className="border-t border-black/16 py-6 first:border-t-0">
                  <dt>{item.title}</dt>
                  <dd>{item.body}</dd>
                </div>
              ))}
            </dl>
            <hr />
            <h2>{copy.about.toolsTitle}</h2>
            <p>{copy.about.toolsBody}</p>
            <p className="not-typeset mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
              {portfolio.tools.map(tool => <span key={tool}>{tool}</span>)}
            </p>
            <hr />
            <h2>{copy.about.profilesTitle}</h2>
            <ul>
              {portfolio.links.map(link => (
                <li key={link.id}><a href={link.href}>{link.label} — {link.detail}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </InteriorLayout>
  )
}
