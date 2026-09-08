import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion, useScroll } from 'motion/react'
import { ExecutionGraphFallback } from './ExecutionGraphFallback'
const Scene=lazy(()=>import('./ExecutionGraphScene'))
class SceneBoundary extends Component<{children:ReactNode},{failed:boolean}> {
 state={failed:false}
 static getDerivedStateFromError(){return {failed:true}}
 render(){return this.state.failed?null:this.props.children}
}
export function ExecutionGraph() {
 const ref=useRef<HTMLDivElement>(null), pointer=useRef({x:9999,y:9999})
 const [mounted,setMounted]=useState(false),[active,setActive]=useState(false),[failed,setFailed]=useState(false)
 const reduced=!!useReducedMotion(), {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']})
 const onFailure=useCallback(()=>setFailed(true),[])
 useEffect(()=>{
  if (!('IntersectionObserver' in window) || !('WebGLRenderingContext' in window)) return
  setMounted(true)
  let visible=false
  const update=()=>setActive(visible && document.visibilityState==='visible')
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update()})
  if(ref.current)observer.observe(ref.current)
  document.addEventListener('visibilitychange',update)
  return ()=>{observer.disconnect();document.removeEventListener('visibilitychange',update)}
 },[])
 return <div ref={ref} onPointerMove={event=>{
  if(reduced || !active)return
  const rect=event.currentTarget.getBoundingClientRect()
  pointer.current={x:((event.clientX-rect.left)/rect.width-.5)*800,y:(.5-(event.clientY-rect.top)/rect.height)*560}
  event.currentTarget.dispatchEvent(new Event('graphpointer'))
 }} className="relative aspect-[4/3] w-full min-h-80 overflow-hidden border border-white/15 bg-[#191a24] text-white" aria-label="Execution graph: from intent to delivery">
  <div className="absolute inset-x-5 top-5 z-10 flex justify-between gap-4 border-b border-white/15 pb-4 font-mono text-[9px] uppercase tracking-[.14em] text-[#c5c5d5]"><span>Portfolio / Execution graph</span><span>01—05</span></div>
  <ExecutionGraphFallback />
  {mounted && !failed && <SceneBoundary><Suspense fallback={null}><Scene progress={scrollYProgress} reduced={reduced} active={active} onFailure={onFailure} pointer={pointer} host={ref}/></Suspense></SceneBoundary>}
  <div className="absolute inset-x-5 bottom-5 z-10 flex justify-between gap-4 border-t border-white/15 pt-4 font-mono text-[9px] uppercase tracking-[.1em] text-[#c5c5d5]"><span>Intent → verified release</span><span>Demand render</span></div>
 </div>
}
