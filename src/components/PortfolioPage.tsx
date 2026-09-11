import {useMemo,useRef} from 'react'
import {ExecutionGraphFallback} from './hero/ExecutionGraphFallback'
import { portfolio } from '@/content/portfolio'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { ExecutionGraph } from './hero/ExecutionGraph'
import { MotionProvider } from './motion/MotionProvider'
import { Reveal } from './motion/Reveal'
const label = 'font-mono text-[10px] uppercase tracking-[.16em]'
const container = 'mx-auto max-w-[80rem] px-6 sm:px-10 lg:px-14'
const anchor = 'inline-flex min-h-11 items-center px-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
export function PortfolioPage() {
 const page=useRef<HTMLDivElement>(null),hero=useRef<HTMLElement>(null),word=useRef<HTMLSpanElement>(null),host=useRef<HTMLDivElement>(null)
 const refs=useMemo(()=>({page,hero,word,host}),[])
 return <MotionProvider><div ref={page} className="relative isolate [&[data-gpu=true]_[data-hero-fallback]]:invisible">
  <a href="#main" className="fixed left-4 top-4 z-50 -translate-y-24 bg-foreground px-5 py-3 text-background focus:translate-y-0">Skip to content</a>
  <ExecutionGraph refs={refs} />
  <header className={`${container} absolute inset-x-0 top-0 z-30`}><div className="flex flex-wrap items-center justify-between gap-x-5 border-b py-5 sm:py-7">
   <span className="text-lg font-semibold tracking-[-.055em]">{portfolio.wordmark}<span className="ml-1 text-accent">.</span></span>
   <nav aria-label="Primary" className="flex gap-1 text-xs sm:gap-5 sm:text-sm">{[['Work','work'],['Capabilities','capabilities'],['Contact','contact']].map(([name,id])=><a key={id} className={anchor} href={`#${id}`}>{name}</a>)}</nav>
  </div></header>
  <main id="main" tabIndex={-1}>
   <section ref={hero} aria-labelledby="intro-title" className="relative h-svh min-h-[480px] overflow-hidden">
    <h1 id="intro-title" className="sr-only">Software. With a new perspective.</h1>
    <div data-hero-fallback className="absolute inset-0 scale-[1.12]"><ExecutionGraphFallback /></div>
    <a href="#capabilities" className={`${label} absolute bottom-5 left-1/2 z-20 inline-flex min-h-11 -translate-x-1/2 items-center gap-4 whitespace-nowrap px-4 focus-visible:outline-2`}>Scroll to explore <span aria-hidden="true">↓</span></a>
   </section>
   <section data-particle-content id="capabilities" aria-labelledby="capabilities-title" className={`${container} scroll-mt-8 pb-20 sm:pb-28`}><Reveal>
    <div className="grid gap-5 border-t pt-8 sm:grid-cols-[1fr_2fr]"><p className={label}>01 / Areas of focus</p><div><h2 id="capabilities-title" className="text-4xl font-medium tracking-[-.045em] sm:text-5xl">Capabilities</h2><p className="mt-4 max-w-lg text-sm leading-6 text-muted-foreground">A proposed structure for the work. These areas are draft positioning, not a substitute for verified experience.</p></div></div>
    <div className="mt-10">{portfolio.capabilities.map(c=><div key={c.key}><Separator /><div className="grid gap-4 py-7 sm:grid-cols-[3rem_1fr_1fr]"><span className={`${label} pt-2 text-muted-foreground`}>{c.key}</span><h3 className="text-2xl tracking-[-.035em]">{c.title}</h3><div><p className="text-sm leading-6 text-muted-foreground">{c.detail}</p><p className={`${label} mt-3 text-muted-foreground`}>Content pending</p></div></div></div>)}<Separator /></div>
   </Reveal></section>
   <section id="work" aria-labelledby="work-title" className="scroll-mt-0 bg-[#191a24] py-16 text-[#f2f0eb] sm:py-24"><div data-particle-content className={container}><Reveal>
    <div className="grid gap-5 sm:grid-cols-[1fr_2fr]"><p className={`${label} text-[#b8b8c8]`}>02 / Evidence, eventually</p><div><h2 id="work-title" className="text-4xl font-medium tracking-[-.045em] sm:text-5xl">Selected work</h2><p className="mt-4 max-w-md text-sm leading-6 text-[#b8b8c8]">Three spaces reserved for real stories. No fictional clients, inflated results, or placeholder destinations.</p></div></div>
    <div className="mt-14">{portfolio.projects.map((p,i)=><Reveal key={p.title} delay={i*.06}><article className="grid gap-6 border-t border-white/20 py-9 sm:grid-cols-[1fr_2fr]"><span aria-hidden="true" className="text-6xl leading-none tracking-[-.065em] text-[#9293ab] sm:text-8xl">0{i+1}</span><div><div className="flex flex-wrap items-center justify-between gap-4"><p className={`${label} text-[#b8b8c8]`}>{p.category}</p><Badge variant="outline" className="rounded-none border-white/30 text-[#dddde8]">{p.status}</Badge></div><h3 className="mt-5 max-w-[24ch] text-3xl tracking-[-.035em] sm:text-4xl">{p.title}</h3><p className="mt-4 max-w-lg text-sm leading-7 text-[#b8b8c8]">{p.summary}</p></div></article></Reveal>)}</div>
   </Reveal></div></section>
   <section data-particle-content id="contact" aria-labelledby="contact-title" className={`${container} scroll-mt-8 py-20 sm:py-28`}><Reveal><p className={label}>03 / The next conversation</p><div className="mt-8 grid gap-8 sm:grid-cols-[1.4fr_1fr]"><h2 id="contact-title" className="text-[clamp(3.5rem,8vw,7rem)] leading-none font-medium tracking-[-.06em]">Contact<span aria-hidden="true" className="text-accent">.</span></h2><div className="self-end"><p className={`${label} text-muted-foreground`}>Content pending</p><p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">Verified contact details, profile links, and a CV will appear here. No availability claim until confirmed.</p></div></div></Reveal></section>
  </main>
  <footer data-particle-content className={container}><div className="flex flex-wrap justify-between gap-4 border-t py-7 text-[10px] uppercase tracking-widest text-muted-foreground"><span>ACRAZIE</span><span>Software Engineering · Applied AI</span></div></footer>
  <section aria-label="MAYEUL" className="relative flex min-h-[70svh] items-center justify-center overflow-hidden px-6 py-24">
   <span ref={word} data-testid="particle-word" className="block max-w-full font-sans text-[clamp(2.75rem,12vw,12rem)] leading-[1.2] font-light tracking-[.045em] text-foreground">MAYEUL</span>
  </section>
 </div></MotionProvider>
}
