import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { m, useAnimationControls, useReducedMotion } from 'motion/react'
export function Reveal({children,delay=0}: {children:ReactNode;delay?:number}) {
 const ref = useRef<HTMLDivElement>(null), controls = useAnimationControls(), reduced = useReducedMotion()
 useEffect(() => {
  if(reduced || !ref.current || !('IntersectionObserver' in window)) { controls.set({y:0}); return }
  const observer = new IntersectionObserver(([entry]) => {
   if(entry.isIntersecting) { void controls.start({ y:[12,0], transition:{duration:.55,delay} }); observer.disconnect() }
  }, {threshold:.12})
  observer.observe(ref.current)
  return () => {observer.disconnect(); controls.stop()}
 },[controls,delay,reduced])
 return <m.div ref={ref} initial={false} animate={controls}>{children}</m.div>
}
