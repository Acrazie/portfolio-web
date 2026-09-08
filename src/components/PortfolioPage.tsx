import { portfolio } from '@/content/portfolio'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { ExecutionGraph } from './hero/ExecutionGraph'
import { MotionProvider } from './motion/MotionProvider'
import { Reveal } from './motion/Reveal'
const label = 'font-mono text-[10px] uppercase tracking-[.16em]'
const container = 'mx-auto max-w-[80rem] px-6 sm:px-10 lg:px-14'
const anchor = 'inline-flex min-h-11 items-center px-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
export function PortfolioPage() {
 return <MotionProvider>
  <a href="#main" className="fixed left-4 top-4 z-50 -translate-y-24 bg-foreground px-5 py-3 text-background focus:translate-y-0">Skip to content</a>
  <header className={container}><div className="flex flex-wrap items-center justify-between gap-x-5 border-b py-5 sm:py-7">
   <span className="text-lg font-semibold tracking-[-.055em]">{portfolio.wordmark}<span className="ml-1 text-accent">.</span></span>
   <nav aria-label="Primary" className="flex gap-1 text-xs sm:gap-5 sm:text-sm">{[['Work','work'],['Capabilities','capabilities'],['Contact','contact']].map(([name,id])=><a key={id} className={anchor} href={`#${id}`}>{name}</a>)}</nav>
  </div></header>
  <main id="main" tabIndex={-1}>
   <section aria-labelledby="intro-title" className={`${container} pb-16 pt-10 sm:pb-24 sm:pt-14`}>
    <div className="mb-10 flex flex-wrap justify-between gap-3"><p className={label}>{portfolio.role}</p><span className={`${label} text-muted-foreground`}>Portfolio foundation / Content pending</span></div>
    <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
     <div><h1 id="intro-title" className="max-w-[12ch] text-[clamp(3rem,5.6vw,5.4rem)] leading-[.97] font-medium tracking-[-.065em]">Engineering dependable software <span className="text-muted-foreground">and practical AI systems.</span></h1>
      <p className="mt-8 max-w-[37ch] text-sm leading-7 text-muted-foreground">{portfolio.introduction}</p>
      <Button nativeButton={false} render={<a href="#capabilities" />} role="link" className="mt-7 min-h-12 gap-8 rounded-none px-5">Explore the structure <span aria-hidden="true">↗</span></Button>
     </div>
     <div className="min-w-0 lg:mt-14"><ExecutionGraph /><div className="mt-4 flex justify-between gap-4 text-[10px] text-muted-foreground"><span>Fig. 01 — An execution graph, not a constellation.</span><span className="shrink-0 font-mono">SCROLL TO REORGANIZE</span></div></div>
    </div>
   </section>
   <section id="capabilities" aria-labelledby="capabilities-title" className={`${container} scroll-mt-8 pb-20 sm:pb-28`}><Reveal>
    <div className="grid gap-5 border-t pt-8 sm:grid-cols-[1fr_2fr]"><p className={label}>01 / Areas of focus</p><div><h2 id="capabilities-title" className="text-4xl font-medium tracking-[-.045em] sm:text-5xl">Capabilities</h2><p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">A proposed structure for the work. These areas are draft positioning, not a substitute for verified experience.</p></div></div>
    <div className="mt-10">{portfolio.capabilities.map(c=><div key={c.key}><Separator /><div className="grid gap-4 py-7 sm:grid-cols-[3rem_1fr_1fr]"><span className={`${label} pt-2 text-muted-foreground`}>{c.key}</span><h3 className="text-2xl tracking-[-.035em]">{c.title}</h3><div><p className="text-sm leading-6 text-muted-foreground">{c.detail}</p><p className={`${label} mt-3 text-muted-foreground`}>Content pending</p></div></div></div>)}<Separator /></div>
   </Reveal></section>
   <section id="work" aria-labelledby="work-title" className="scroll-mt-0 bg-[#191a24] py-16 text-[#f2f0eb] sm:py-24"><div className={container}><Reveal>
    <div className="grid gap-5 sm:grid-cols-[1fr_2fr]"><p className={`${label} text-[#b8b8c8]`}>02 / Evidence, eventually</p><div><h2 id="work-title" className="text-4xl font-medium tracking-[-.045em] sm:text-5xl">Selected work</h2><p className="mt-4 max-w-md text-sm leading-6 text-[#b8b8c8]">Three spaces reserved for real stories. No fictional clients, inflated results, or placeholder destinations.</p></div></div>
    <div className="mt-14">{portfolio.projects.map((p,i)=><Reveal key={p.title} delay={i*.06}><article className="grid gap-6 border-t border-white/20 py-9 sm:grid-cols-[1fr_2fr]"><span aria-hidden="true" className="text-6xl leading-none tracking-[-.065em] text-[#9293ab] sm:text-8xl">0{i+1}</span><div><div className="flex flex-wrap items-center justify-between gap-4"><p className={`${label} text-[#b8b8c8]`}>{p.category}</p><Badge variant="outline" className="rounded-none border-white/30 text-[#dddde8]">{p.status}</Badge></div><h3 className="mt-5 max-w-[24ch] text-3xl tracking-[-.035em] sm:text-4xl">{p.title}</h3><p className="mt-4 max-w-lg text-sm leading-7 text-[#b8b8c8]">{p.summary}</p></div></article></Reveal>)}</div>
   </Reveal></div></section>
   <section id="contact" aria-labelledby="contact-title" className={`${container} scroll-mt-8 py-20 sm:py-28`}><Reveal><p className={label}>03 / The next conversation</p><div className="mt-8 grid gap-8 sm:grid-cols-[1.4fr_1fr]"><h2 id="contact-title" className="text-[clamp(3.5rem,8vw,7rem)] leading-none font-medium tracking-[-.06em]">Contact<span aria-hidden="true" className="text-accent">.</span></h2><div className="self-end"><p className={`${label} text-muted-foreground`}>Content pending</p><p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">Verified contact details, profile links, and a CV will appear here. No availability claim until confirmed.</p></div></div></Reveal></section>
  </main>
  <footer className={container}><div className="flex flex-wrap justify-between gap-4 border-t py-7 text-[10px] uppercase tracking-widest text-muted-foreground"><span>ACRAZIE</span><span>Software Engineering · Applied AI</span></div></footer>
 </MotionProvider>
}
