import { Component, lazy, Suspense, useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type {LayoutRefs} from './use-particle-layout'
const Scene=lazy(()=>import('./ExecutionGraphScene'))
class SceneBoundary extends Component<{children:ReactNode;onFailure:()=>void},{failed:boolean}> {
 state={failed:false}
 static getDerivedStateFromError(){return {failed:true}}
 componentDidCatch(){this.props.onFailure()}
 render(){return this.state.failed?null:this.props.children}
}
export function ExecutionGraph({refs}:{refs:LayoutRefs}) {
 const ref=refs.host
 const [mounted,setMounted]=useState(false),[active,setActive]=useState(false),[failed,setFailed]=useState(false),[paused,setPaused]=useState(false)
 const [reduced,setReduced]=useState(false)

 useEffect(()=>{
  // Motion's current useReducedMotion snapshots only the initial preference.
  const media=window.matchMedia('(prefers-reduced-motion: reduce)')
  const update=()=>setReduced(media.matches)
  update();media.addEventListener('change',update)
  return ()=>media.removeEventListener('change',update)
 },[])
 const onFailure=useCallback(()=>setFailed(true),[])
 useEffect(()=>{
  if (!('WebGLRenderingContext' in window)) return
  setMounted(true)
  const update=()=>setActive(document.visibilityState==='visible')
  update();document.addEventListener('visibilitychange',update)
  return ()=>document.removeEventListener('visibilitychange',update)
 },[])
 const enabled=active && !reduced && !paused && !failed
 useEffect(()=>{
  if(!enabled){
   if(refs.page.current)refs.page.current.dataset.gpu='false'
   if(refs.word.current)refs.word.current.style.opacity=''
  }
 },[enabled,refs])
 return <>
 <div ref={ref} className="fixed inset-0 z-10 pointer-events-none" style={{visibility:enabled?'visible':'hidden'}} aria-hidden="true" data-testid="logo-particles">
  {mounted && !failed && <SceneBoundary onFailure={onFailure}><Suspense fallback={null}><Scene refs={refs} reduced={reduced} paused={paused} active={enabled} onFailure={onFailure}/></Suspense></SceneBoundary>}
 </div>
 {mounted && !reduced && !failed && <button type="button" aria-pressed={paused} onClick={()=>setPaused(value=>!value)} className="fixed bottom-5 right-3 z-20 min-h-11 min-w-11 px-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground focus-visible:outline-2 sm:right-8" aria-label={paused?'Resume animation':'Pause animation'}>{paused?'Play':'Pause'}</button>}
 </>
}
