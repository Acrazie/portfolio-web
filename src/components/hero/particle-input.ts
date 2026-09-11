import {samplePush} from './pointer-push'
import type {Push} from './pointer-push'
import {viewportPoint} from './particle-journey'
import type {Rect} from './particle-journey'
export type InputLayout={enabled:boolean;split?:number;host:Rect;hero:Rect;}
const interactive=(target:EventTarget|null)=>target instanceof Element && !!target.closest('a,button,input,textarea,select,[contenteditable]:not([contenteditable="false"]),[role="button"]')
export function bindParticleInput(push:Push,invalidate:()=>void,read:()=>InputLayout,now=()=>performance.now()) {
 const mouse=matchMedia('(hover: hover) and (pointer: fine)')
 const release=()=>{push.last=null}
 const move=(e:PointerEvent)=>{
  const s=read(),h=s.hero
  if(!s.enabled || (s.split||0)>0 || !mouse.matches || e.pointerType!=='mouse' || interactive(e.target) || e.clientX<h.left || e.clientX>h.left+h.width || e.clientY<h.top || e.clientY>h.top+h.height){release();return}
  const p=viewportPoint(e.clientX,e.clientY,s.host)
  if(p && samplePush(push,p,now()))invalidate()
 }
 window.addEventListener('pointermove',move,{passive:true})
 window.addEventListener('pointercancel',release);window.addEventListener('blur',release);document.addEventListener('pointerleave',release)
 return ()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointercancel',release);window.removeEventListener('blur',release);document.removeEventListener('pointerleave',release);release()}
}
