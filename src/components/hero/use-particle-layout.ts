import {useEffect,useRef} from 'react'
import type {RefObject} from 'react'
import {clamp,stages,sectionTravel} from './particle-journey'
import type {Rect} from './particle-journey'
import {sampleMask,textTargets} from './text-targets'
import type {Mask} from './text-targets'
export type LayoutRefs={host:RefObject<HTMLDivElement|null>;hero:RefObject<HTMLElement|null>;word:RefObject<HTMLElement|null>;page:RefObject<HTMLDivElement|null>}
export type ParticleLayout={host:Rect;hero:Rect;wordRect:Rect;split:number;word:number;travel:number;turn:number;scroll:number;gutter:number;mask:Mask|null;revision:number}
export function observeParticleLayout(elements:{host:HTMLElement;hero:HTMLElement;word:HTMLElement;page:HTMLElement},publish:(layout:ParticleLayout)=>void,raster=sampleMask) {
 let frame=0,disposed=false,generation=0,key='',mask:Mask|null=null,revision=0
 const measure=()=>{
  frame=0;if(disposed)return
  const host=elements.host.getBoundingClientRect(),hero=elements.hero.getBoundingClientRect(),wordRect=elements.word.getBoundingClientRect()
  const style=getComputedStyle(elements.word),font=`${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  const nextKey=`${wordRect.width}/${wordRect.height}/${font}/${style.letterSpacing}`
  if(nextKey!==key){
   key=nextKey;mask=null;revision++;const token=++generation
   Promise.resolve(document.fonts?.ready).then(()=>document.fonts?.load(font,'MAYEUL')).then(()=>{
    if(disposed || token!==generation)return
    try{const sampled=raster(elements.word);textTargets(sampled,0);mask=sampled}catch{mask=null}
    revision++;schedule()
   }).catch(()=>{if(!disposed && token===generation){mask=null;revision++;schedule()}})
  }
  const insets=Array.from(elements.page.querySelectorAll<HTMLElement>('[data-particle-content]')).flatMap(el=>{
   const rect=el.getBoundingClientRect(),style=getComputedStyle(el)
   return [rect.left-host.left+(parseFloat(style.paddingLeft)||0),host.left+host.width-rect.right+(parseFloat(style.paddingRight)||0)]
  })
  const gutter=insets.length?clamp(Math.min(...insets)-6,18,64):18
  const boundaries=Array.from(elements.page.querySelectorAll<HTMLElement>('main > section[id]')).map(el=>el.getBoundingClientRect().top-host.top)
  publish({host,hero,wordRect,...sectionTravel(boundaries,host.height),scroll:window.scrollY,...stages(window.scrollY,hero.height,document.documentElement.scrollHeight,host.height),gutter,mask,revision})
 }
 const schedule=()=>{if(!disposed && !frame)frame=requestAnimationFrame(measure)}
 const fonts=()=>{key='';schedule()}
 const observer=typeof ResizeObserver==='undefined'?null:new ResizeObserver(schedule)
 for(const el of Object.values(elements))observer?.observe(el)
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true})
 window.visualViewport?.addEventListener('scroll',schedule,{passive:true});window.visualViewport?.addEventListener('resize',schedule,{passive:true})
 document.fonts?.addEventListener('loadingdone',fonts);schedule()
 return ()=>{disposed=true;generation++;cancelAnimationFrame(frame);observer?.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);window.visualViewport?.removeEventListener('scroll',schedule);window.visualViewport?.removeEventListener('resize',schedule);document.fonts?.removeEventListener('loadingdone',fonts)}
}
export function useParticleLayout(refs:LayoutRefs,invalidate:()=>void,enabled:RefObject<boolean>) {
 const layout=useRef<ParticleLayout|null>(null)
 useEffect(()=>{
  const {host,hero,word,page}=refs
  if(!host.current || !hero.current || !word.current || !page.current)return
  return observeParticleLayout({host:host.current,hero:hero.current,word:word.current,page:page.current},value=>{layout.current=value;if(enabled.current)invalidate()})
 },[refs,invalidate,enabled])
 return layout
}
