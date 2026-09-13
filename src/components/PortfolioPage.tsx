import { useEffect, useMemo, useRef, useState } from 'react'
import { portfolio, type Locale } from '@/content/portfolio'
import { ExecutionGraph } from './hero/ExecutionGraph'
import { ExecutionGraphFallback } from './hero/ExecutionGraphFallback'
import { MotionProvider } from './motion/MotionProvider'
import { Reveal } from './motion/Reveal'

const container = 'mx-auto w-full max-w-[88rem] px-5 sm:px-10 lg:px-16'
const focus = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
const instrument = 'font-mono text-[10px] uppercase tracking-[.16em]'

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-none stroke-current stroke-[1.5]">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  )
}

function ArrowDown() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-none stroke-current stroke-[1.5]">
      <path d="M10 3v13m-5-5 5 5 5-5" />
    </svg>
  )
}

export function PortfolioPage() {
  const page = useRef<HTMLDivElement>(null)
  const hero = useRef<HTMLElement>(null)
  const word = useRef<HTMLSpanElement>(null)
  const host = useRef<HTMLDivElement>(null)
  const [staticLogo, setStaticLogo] = useState(false)
  const [locale, setLocale] = useState<Locale>('fr')
  const copy = portfolio.copy[locale]
  const refs = useMemo(() => ({ page, hero, word, host }), [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <MotionProvider>
      <div ref={page} className="relative isolate overflow-clip [&[data-gpu=true]_[data-hero-fallback]]:invisible">
        <a href="#main" className={`fixed left-4 top-4 z-50 -translate-y-24 rounded-full bg-foreground px-5 py-3 text-background focus:translate-y-0 ${focus}`}>
          {locale === 'fr' ? 'Aller au contenu' : 'Skip to content'}
        </a>

        <ExecutionGraph refs={refs} onFallbackChange={setStaticLogo} labels={copy.pause} />

        <header className={`${container} pointer-events-none absolute inset-x-0 top-0 z-30`}>
          <div className="pointer-events-auto flex min-h-20 items-center justify-between gap-4 border-b border-foreground/10 sm:min-h-24">
            <a href="#home" className={`group inline-flex min-h-11 items-center gap-3 ${focus}`}>
              <span className="text-base font-semibold tracking-[-.03em]">MAYEUL</span>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent shadow-[0_0_18px_var(--accent)] transition-transform group-hover:scale-150" />
            </a>
            <div className="flex items-center gap-1 sm:gap-4">
              <nav aria-label={copy.navigationLabel} className="hidden items-center gap-1 md:flex">
                {[
                  [copy.nav.about, 'about'],
                  [copy.nav.work, 'work'],
                  [copy.nav.capabilities, 'capabilities'],
                  [copy.nav.skills, 'skills'],
                  [copy.nav.contact, 'contact'],
                ].map(([label, id]) => (
                  <a key={id} className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm text-foreground/70 transition-colors hover:bg-white/45 hover:text-foreground ${focus}`} href={`#${id}`}>
                    {label}
                  </a>
                ))}
              </nav>
              <button
                type="button"
                className={`optical-control min-h-11 min-w-11 px-3 ${instrument} ${focus}`}
                aria-label={copy.language.label}
                onClick={() => setLocale(value => value === 'fr' ? 'en' : 'fr')}
              >
                <span aria-hidden="true">{copy.language.short}</span>
                <span aria-hidden="true" className="mx-1 text-foreground/25">/</span>
                <span aria-hidden="true" className="text-foreground/40">{copy.language.other}</span>
              </button>
            </div>
          </div>
        </header>

        <main id="main" tabIndex={-1}>
          <section ref={hero} id="home" aria-labelledby="hero-title" className="optical-hero relative min-h-[620px] h-svh overflow-hidden">
            <div aria-hidden="true" className="optical-bloom absolute inset-0" />
            {staticLogo && <div data-hero-fallback className="absolute inset-0 scale-[1.06]"><ExecutionGraphFallback /></div>}
            <noscript><ExecutionGraphFallback /></noscript>

            <div className={`${container} relative z-20 flex h-full min-h-[620px] flex-col justify-end pb-7 pt-28 sm:pb-10`}>
              <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div className="hero-copy-block relative max-w-3xl">
                  <h1 id="hero-title" className="text-balance text-[clamp(3.25rem,8vw,6rem)] leading-[.92] font-medium tracking-[-.04em]">
                    <span className="block">{portfolio.displayName}</span>
                    <span className="mt-3 block text-[clamp(.9rem,1.3vw,1.15rem)] leading-6 font-medium tracking-[.01em] text-foreground/60">{portfolio.role}</span>
                  </h1>
                  <p className="mt-5 max-w-[20ch] text-balance text-[clamp(1.4rem,2.6vw,2.35rem)] leading-[1.08] tracking-[-.025em]">{copy.hero.statement}</p>
                  <p className="mt-5 max-w-[62ch] text-sm leading-6 text-foreground/60 sm:text-base sm:leading-7">{copy.hero.body}</p>
                </div>

                <aside aria-label={copy.hero.instrument} className="optical-panel relative overflow-hidden rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className={`${instrument} text-foreground/50`}>{copy.hero.instrument}</span>
                    <span className="inline-flex items-center gap-2 text-xs font-medium">
                      <span aria-hidden="true" className="size-2 rounded-full bg-accent shadow-[0_0_14px_var(--accent)]" />
                      {copy.hero.instrumentStatus}
                    </span>
                  </div>
                  <p className={`mt-8 max-w-[24ch] leading-5 text-foreground/55 ${instrument}`}>{copy.hero.signal}</p>
                  <a href="#work" className={`mt-5 inline-flex min-h-11 w-full items-center justify-between rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 ${focus}`}>
                    {copy.nav.work}
                    <ArrowDown />
                  </a>
                </aside>
              </div>

              <a href="#about" className={`mt-7 inline-flex min-h-11 w-fit items-center gap-3 rounded-full px-1 text-sm text-foreground/55 hover:text-foreground ${focus}`}>
                {copy.hero.explore}
                <ArrowDown />
              </a>
            </div>
          </section>

          <section data-particle-content id="about" aria-labelledby="about-title" className={`${container} scroll-mt-8 py-24 sm:py-36`}>
            <Reveal>
              <div className="grid gap-12 border-t border-foreground/12 pt-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,.65fr)] lg:gap-20">
                <h2 id="about-title" className="max-w-[18ch] text-balance text-[clamp(2.6rem,5vw,5rem)] leading-[.98] font-medium tracking-[-.04em]">{copy.about.title}</h2>
                <div className="self-end">
                  <p className="max-w-[65ch] text-base leading-7 text-foreground/72 sm:text-lg sm:leading-8">{copy.about.body}</p>
                  <p className="mt-7 max-w-[65ch] border-t border-foreground/10 pt-5 text-sm leading-6 text-foreground/50">{copy.about.note}</p>
                </div>
              </div>
            </Reveal>
          </section>

          <section data-particle-content id="journey" aria-label={locale === 'fr' ? 'Parcours' : 'Background'} className="bg-[var(--mist-field)] py-20 sm:py-28">
            <div className={container}>
              <div className="grid border-y border-foreground/14 lg:grid-cols-3">
                <Reveal>
                  <article id="experience" aria-labelledby="experience-title" className="min-h-72 py-8 sm:py-10 lg:pr-8">
                    <h2 id="experience-title" className="max-w-[18ch] text-3xl leading-tight font-medium tracking-[-.03em] sm:text-4xl">{copy.experience.title}</h2>
                    <p className="mt-14 inline-flex rounded-full border border-foreground/12 px-3 py-2 text-xs font-medium text-foreground/60">{copy.experience.status}</p>
                    <p className="mt-5 max-w-[56ch] text-sm leading-6 text-foreground/55">{copy.experience.body}</p>
                  </article>
                </Reveal>
                <Reveal delay={0.06}>
                  <article id="education" aria-labelledby="education-title" className="min-h-72 border-t border-foreground/14 py-8 sm:py-10 lg:border-l lg:border-t-0 lg:px-8">
                    <h2 id="education-title" className="max-w-[18ch] text-3xl leading-tight font-medium tracking-[-.03em] sm:text-4xl">{copy.education.title}</h2>
                    <p className="mt-14 inline-flex rounded-full border border-foreground/12 px-3 py-2 text-xs font-medium text-foreground/60">{copy.education.status}</p>
                    <p className="mt-5 max-w-[56ch] text-sm leading-6 text-foreground/55">{copy.education.body}</p>
                  </article>
                </Reveal>
                <Reveal delay={0.08}>
                  <article id="achievements" aria-labelledby="achievements-title" className="min-h-72 border-t border-foreground/14 py-8 sm:py-10 lg:border-l lg:border-t-0 lg:pl-8">
                    <h2 id="achievements-title" className="max-w-[18ch] text-3xl leading-tight font-medium tracking-[-.03em] sm:text-4xl">{copy.achievements.title}</h2>
                    <p className="mt-14 inline-flex rounded-full border border-foreground/12 px-3 py-2 text-xs font-medium text-foreground/60">{copy.achievements.status}</p>
                    <p className="mt-5 max-w-[56ch] text-sm leading-6 text-foreground/55">{copy.achievements.body}</p>
                  </article>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="work" aria-labelledby="work-title" className="scroll-mt-0 bg-[var(--night-field)] py-24 text-[var(--night-foreground)] sm:py-36">
            <div data-particle-content className={container}>
              <Reveal>
                <div className="grid gap-8 lg:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)] lg:gap-20">
                  <div>
                    <h2 id="work-title" className="max-w-[14ch] text-balance text-[clamp(2.8rem,6vw,5.5rem)] leading-[.95] font-medium tracking-[-.04em]">{copy.work.title}</h2>
                    <p className="mt-6 max-w-md text-base leading-7 text-[var(--night-muted)]">{copy.work.intro}</p>
                  </div>
                  <article className="relative border-t border-white/18 pt-8">
                    <h3 className="max-w-[18ch] text-balance text-[clamp(2.2rem,4vw,4.6rem)] leading-[.98] font-medium tracking-[-.035em]">{copy.work.projectTitle}</h3>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-white/16 px-3 py-2 text-xs text-[var(--night-muted)]">{copy.work.status}</span>
                      <span className="text-sm text-[var(--night-muted)]">{copy.work.provenance}</span>
                    </div>
                    <p className="mt-6 max-w-[65ch] text-base leading-7 text-[var(--night-muted)]">{copy.work.projectBody}</p>
                    <ul className="mt-10 flex flex-wrap gap-2" aria-label={copy.work.stackLabel}>
                      {portfolio.project.stack.map(item => <li key={item} className="rounded-full bg-white/8 px-3 py-2 text-xs text-[var(--night-foreground)]">{item}</li>)}
                    </ul>
                    <ul className="mt-4 grid gap-2 text-sm text-[var(--night-muted)] sm:grid-cols-2">
                      {copy.work.facts.map(item => <li key={item} className="border-t border-white/12 py-3">{item}</li>)}
                    </ul>
                    <a href={portfolio.project.href} className={`mt-8 inline-flex min-h-11 items-center gap-3 rounded-full bg-[var(--night-foreground)] px-5 text-sm font-medium text-[var(--night-field)] transition-transform hover:-translate-y-0.5 ${focus}`}>
                      {copy.work.link}
                      <ArrowUpRight />
                    </a>
                  </article>
                </div>
              </Reveal>
            </div>
          </section>

          <section data-particle-content id="capabilities" aria-labelledby="capabilities-title" className={`${container} scroll-mt-8 py-24 sm:py-36`}>
            <Reveal>
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,.6fr)]">
                <h2 id="capabilities-title" className="max-w-[16ch] text-balance text-[clamp(2.8rem,6vw,5.5rem)] leading-[.96] font-medium tracking-[-.04em]">{copy.capabilities.title}</h2>
                <p className="self-end max-w-[58ch] text-base leading-7 text-foreground/60">{copy.capabilities.intro}</p>
              </div>
              <div className="mt-16 grid border-y border-foreground/12 md:grid-cols-3">
                {copy.capabilities.groups.map((group, index) => (
                  <article key={group.title} className={`py-8 md:px-7 md:py-10 ${index > 0 ? 'border-t border-foreground/12 md:border-l md:border-t-0' : ''}`}>
                    <span aria-hidden="true" className="block h-16 w-px bg-gradient-to-b from-accent to-transparent" />
                    <h3 className="mt-7 text-2xl font-medium tracking-[-.025em]">{group.title}</h3>
                    <p className="mt-4 max-w-[44ch] text-sm leading-6 text-foreground/55">{group.body}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </section>

          <section data-particle-content id="tools" aria-labelledby="tools-title" className="bg-[var(--mist-field)] py-24 sm:py-32">
            <div className={container}>
              <Reveal>
                <div className="grid gap-8 lg:grid-cols-2">
                  <h2 id="tools-title" className="text-[clamp(2.6rem,5vw,5rem)] leading-none font-medium tracking-[-.04em]">{copy.tools.title}</h2>
                  <div>
                    <p className="max-w-[58ch] text-base leading-7 text-foreground/65">{copy.tools.intro}</p>
                    <p className="mt-4 max-w-[58ch] text-sm leading-6 text-foreground/50">{copy.tools.detail}</p>
                  </div>
                </div>
                <ol className="mt-16 border-t border-foreground/12">
                  {portfolio.tools.map(tool => (
                    <li key={tool} className="group border-b border-foreground/12 py-6 sm:py-8">
                      <span className="text-[clamp(2rem,5vw,4.8rem)] leading-none font-medium tracking-[-.04em] transition-transform duration-300 group-hover:translate-x-2">{tool}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </section>

          <section data-particle-content id="skills" aria-labelledby="external-title" className={`${container} scroll-mt-8 py-24 sm:py-36`}>
            <Reveal>
              <div className="optical-panel grid gap-10 rounded-2xl p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,.55fr)] lg:p-14">
                <h2 id="external-title" className="max-w-[15ch] text-balance text-[clamp(2.6rem,5vw,5rem)] leading-[.98] font-medium tracking-[-.04em]">{copy.external.title}</h2>
                <div className="self-end">
                  <p className="max-w-[58ch] text-base leading-7 text-foreground/60">{copy.external.body}</p>
                  <a href="https://www.skills.sh/acrazie" className={`mt-7 inline-flex min-h-11 items-center gap-3 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 ${focus}`}>
                    {copy.external.link}
                    <ArrowUpRight />
                  </a>
                </div>
              </div>
            </Reveal>
          </section>

          <section data-particle-content id="blog" aria-labelledby="blog-title" className={`${container} py-20 sm:py-28`}>
            <Reveal>
              <div className="grid gap-8 border-y border-foreground/12 py-10 lg:grid-cols-[1fr_1fr]">
                <h2 id="blog-title" className="text-4xl font-medium tracking-[-.035em] sm:text-5xl">{copy.blog.title}</h2>
                <div>
                  <p className="inline-flex rounded-full border border-foreground/12 px-3 py-2 text-xs font-medium text-foreground/60">{copy.blog.status}</p>
                  <p className="mt-5 max-w-[58ch] text-sm leading-6 text-foreground/55">{copy.blog.body}</p>
                </div>
              </div>
            </Reveal>
          </section>

          <section data-particle-content id="contact" aria-labelledby="contact-title" className="optical-contact scroll-mt-8 py-24 sm:py-36">
            <div className={container}>
              <Reveal>
                <h2 id="contact-title" className="max-w-[15ch] text-balance text-[clamp(3rem,7vw,6rem)] leading-[.94] font-medium tracking-[-.04em]">{copy.contact.title}</h2>
                <div className="mt-12 grid gap-8 border-t border-foreground/12 pt-8 lg:grid-cols-[1fr_1fr]">
                  <p className="max-w-[58ch] text-base leading-7 text-foreground/60">{copy.contact.body}</p>
                  <div className="flex flex-col items-start gap-3 lg:items-end">
                    <a href="mailto:mayeul.desbazeille@gmail.com" className={`inline-flex min-h-12 items-center gap-3 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 ${focus}`}>
                      {copy.contact.email}
                      <ArrowUpRight />
                    </a>
                    <span className="text-sm text-foreground/55">mayeul.desbazeille@gmail.com</span>
                  </div>
                </div>
                <ul className="mt-14 grid border-y border-foreground/12 sm:grid-cols-2 lg:grid-cols-4">
                  {portfolio.links.map((link, index) => (
                    <li key={link.id} className={`${index > 0 ? 'border-t border-foreground/12 sm:border-l sm:border-t-0' : ''} ${index === 2 ? 'sm:border-l-0 lg:border-l' : ''}`}>
                      <a href={link.href} className={`group flex min-h-24 items-center justify-between gap-4 px-4 py-5 hover:bg-white/35 ${focus}`}>
                        <span>
                          <span className="block text-sm font-medium">{link.label}</span>
                          <span className="mt-1 block break-all text-xs text-foreground/45">{link.detail}</span>
                        </span>
                        <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><ArrowUpRight /></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
        </main>

        <footer data-particle-content className={container}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-foreground/12 py-7 text-xs text-foreground/48">
            <span>MAYEUL</span>
            <span>{copy.footer}</span>
          </div>
        </footer>

        <section aria-label="MAYEUL" className="relative flex min-h-[70svh] items-center justify-center overflow-hidden px-5 py-24">
          <span ref={word} data-testid="particle-word" className="block max-w-full text-[clamp(3rem,13vw,12rem)] leading-[1.05] font-light tracking-[.04em] text-foreground">MAYEUL</span>
        </section>
      </div>
    </MotionProvider>
  )
}
