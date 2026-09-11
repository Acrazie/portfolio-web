import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { createGraphResources } from './graph-resources'
import { advanceIntro,introPosition } from './intro'
import {advanceDynamics,resetDynamics,strike} from './glyph-dynamics'
import {livingOffset} from './logo-life'
import { particleDpr,createBudget,observeFrame } from './render-budget'
import {createPush,resetPush,stepPush} from './pointer-push'
import {bindParticleInput} from './particle-input'
import {lane,viewportPoint,followJourney,smooth} from './particle-journey'
import {textTargets} from './text-targets'
import {useParticleLayout} from './use-particle-layout'
import type {LayoutRefs} from './use-particle-layout'
export type SceneProps = {refs:LayoutRefs; reduced:boolean; paused:boolean; active:boolean; onFailure:()=>void}
export function GlyphParticles({refs,reduced,paused,active,onFailure}:SceneProps) {
 const {invalidate,size,gl,setDpr}=useThree()
 const budget=useRef(createBudget()),clock=useRef(0),parallax=useRef({x:0,y:0})
 useEffect(()=>{setDpr(particleDpr(size.width,size.height,window.devicePixelRatio||1)*budget.current.quality)},[size.width,size.height,setDpr])
 const [resources,setResources]=useState<ReturnType<typeof createGraphResources>|null>(null)
 const intro=useRef(0),started=useRef(false),push=useRef(createPush())
 const allowed=useRef(false);allowed.current=active && !reduced && !paused
 const layout=useParticleLayout(refs,invalidate,allowed)
 const previous=useRef(''),attributes=useRef(''),journey=useRef(0)
 const resolution=useRef(typeof window!=='undefined' && window.innerWidth<600?160:256)
 useEffect(()=>{
  let cancelled=false,owned:ReturnType<typeof createGraphResources>|undefined
  const image=new Image()
  image.onload=()=>{
   if(cancelled)return
   try {
    const canvas=document.createElement('canvas'),sampleSize=resolution.current
    canvas.width=canvas.height=sampleSize
    const context=canvas.getContext('2d',{willReadFrequently:true})
    if(!context)throw new Error('Image sampling unavailable')
    context.imageSmoothingEnabled=false;context.drawImage(image,0,0,sampleSize,sampleSize)
    owned=createGraphResources(context.getImageData(0,0,sampleSize,sampleSize))
    setResources(owned);invalidate()
   }catch {onFailure()}
  }
  image.onerror=onFailure;image.src='/logo.png'
  return ()=>{cancelled=true;image.onload=null;image.onerror=null;owned?.dispose()}
 },[invalidate,onFailure])
 useEffect(()=>{
  const read=()=>{
   const l=layout.current
   const empty={left:0,top:0,width:0,height:0}
   return {enabled:allowed.current && !!resources && intro.current===1,host:l?.host||empty,hero:l?.hero||empty,split:l?.split||0,}
  }
  return bindParticleInput(push.current,invalidate,read)
 },[refs,layout,resources,invalidate])
 useEffect(()=>{
  resetPush(push.current);if(resources)resetDynamics(resources.dynamics)
  parallax.current={x:0,y:0}
  const canvasHost=gl.domElement.closest<HTMLElement>('[data-testid=execution-graph-canvas]')
  if(canvasHost){canvasHost.dataset.active=String(allowed.current);canvasHost.dataset.pushEnergy='0'}
  if(allowed.current)invalidate()
 },[active,reduced,paused,size.width,size.height,resources,gl,invalidate])
 useFrame((_,delta)=>{
  const l=layout.current
  if(!resources || !allowed.current || !l || l.host.width<=0 || l.host.height<=0)return
  if(!started.current){started.current=true;if(l.split>0)intro.current=1}
  const dt=Math.min(delta,.05)
  if(l.split>0)intro.current=1 // Scroll always wins over the opening.
  intro.current=advanceIntro(intro.current,dt,true,false)
  const logoVisible=l.split<1 && l.hero.top+l.hero.height>l.host.top && l.hero.top<l.host.top+l.host.height
  if(logoVisible)clock.current+=dt
  if(logoVisible && gl.domElement.closest<HTMLElement>('[data-testid=execution-graph-canvas]')?.dataset.lifeTime===undefined && observeFrame(budget.current,delta))setDpr(particleDpr(size.width,size.height,window.devicePixelRatio||1)*budget.current.quality)
  const u=resources.material.uniforms,count=resources.geometry.getAttribute('aTarget').count
  const key=`${l.host.width}/${l.host.height}/${l.revision}`
  if(attributes.current!==key){
   attributes.current=key
   const lanes=resources.geometry.getAttribute('aLane'),word=resources.geometry.getAttribute('aWord')
   for(let i=0;i<count;i++){const p=lane(i,count,l.host.width,l.host.height,l.gutter);lanes.setXYZ(i,p.x,p.y,0)}
   lanes.needsUpdate=true
   if(l.mask){
    try{(word.array as Float32Array).set(textTargets(l.mask,count));word.needsUpdate=true}
    catch{l.mask=null}
   }
  }
  const phase=`${l.split}/${l.word}/${key}`
  if(previous.current!==phase){resetPush(push.current);resetDynamics(resources.dynamics);previous.current=phase}
  const pushSettling=stepPush(push.current,delta)
  const center=(r:{left:number;top:number;width:number;height:number})=>viewportPoint(r.left+r.width/2,r.top+r.height/2,l.host)!
  const hero=center(l.hero),word=center(l.wordRect),scale=Math.min(l.hero.width,l.hero.height)/800*1.12
  const canvasHost=gl.domElement.closest<HTMLElement>('[data-testid=execution-graph-canvas]')
  // Deterministic ambient clock for pixel regression; impulses still run normally.
  const fixed=canvasHost?.dataset.lifeTime,time=fixed===undefined?clock.current:Number(fixed)
  const pointer=fixed===undefined?push.current.last?.p:undefined
  const goal=pointer?{x:Math.max(-1,Math.min(1,(pointer.x-hero.x)/(l.hero.width/2))),y:Math.max(-1,Math.min(1,(pointer.y-hero.y)/(l.hero.height/2)))}:{x:0,y:0}
  const follow=1-Math.exp(-dt*3)
  parallax.current.x+=(goal.x-parallax.current.x)*follow;parallax.current.y+=(goal.y-parallax.current.y)*follow
  const {geometry,life,dynamics}=resources,motion=geometry.getAttribute('aMotion'),target=geometry.getAttribute('aTarget'),field=geometry.getAttribute('position'),phases=geometry.getAttribute('aPhase')
  const contacts=push.current.pulses.filter(p=>p.velocity && !p.consumed)
  let pushEnergy=0
  if(logoVisible){
   for(let i=0;i<count;i++){
    const j=i*3,k=i*2,phase=phases.getX(i),ambient=livingOffset(time,phase,life[j+2],parallax.current)
    const x=target.getX(i),y=target.getY(i),baseX=(life[j]+ambient.x)*scale,baseY=(life[j+1]+ambient.y)*scale
    for(const p of contacts)strike(dynamics,i,{x:x*scale+hero.x+baseX+dynamics.offset[k],y:y*scale+hero.y+baseY+dynamics.offset[k+1]},{...p,velocity:p.velocity!})
    const reveal=intro.current<1?introPosition({x,y},{x:field.getX(i),y:field.getY(i),z:field.getZ(i)},intro.current,phase):{x,y,z:0}
    motion.setXYZ(i,(reveal.x-x)*scale+baseX*intro.current+dynamics.offset[k],(reveal.y-y)*scale+baseY*intro.current+dynamics.offset[k+1],reveal.z)
   }
   for(const p of contacts)p.consumed=true
   pushEnergy=advanceDynamics(dynamics,dt);motion.needsUpdate=true
  }
  const goalWord=l.mask?l.word:0
  journey.current=l.split===0?0:followJourney(journey.current,goalWord,dt)
  u.uIntro.value=intro.current;u.uSplit.value=l.split;u.uWord.value=journey.current;u.uLogoScale.value=scale
  u.uTravel.value=l.travel||0;u.uTurn.value=l.turn||0;u.uScroll.value=l.scroll||0
  u.uWordWidth.value=l.wordRect.width
  u.uHeroCenter.value.set(hero.x,hero.y);u.uWordCenter.value.set(word.x,word.y)
  u.uViewport.value.set(l.host.width,l.host.height);u.uGutter.value=l.gutter
  const box=(r:{left:number;top:number;width:number;height:number},padding=0)=>[
   Math.max(0,r.left-l.host.left-padding),Math.max(0,l.host.height-(r.top-l.host.top+r.height)-padding),
   Math.min(l.host.width,r.left-l.host.left+r.width+padding),Math.min(l.host.height,l.host.height-(r.top-l.host.top)+padding)]
  u.uHeroBox.value.fromArray(box(l.hero));u.uWordBox.value.fromArray(box(l.wordRect,72))
  u.uDevicePixelRatio.value=gl.getPixelRatio()
  const logoSize=Math.max(2.2,800/resolution.current*scale*1.8),laneSize=l.host.width<600?1.5:2.5
  u.uGlyphSize.value=(logoSize+(laneSize-logoSize)*l.split)*(1-u.uWord.value)+1.35*u.uWord.value
  if(canvasHost){
   canvasHost.dataset.quality=String(budget.current.quality);canvasHost.dataset.dpr=String(gl.getPixelRatio())
   canvasHost.dataset.lifeClock=String(time);canvasHost.dataset.parallax=JSON.stringify(parallax.current)
   canvasHost.dataset.drawCount=String(Number(canvasHost.dataset.drawCount||0)+1)
   canvasHost.dataset.phase=intro.current===1?'settled':'intro';canvasHost.dataset.intro=String(intro.current)
   canvasHost.dataset.travel=String(l.travel||0);canvasHost.dataset.turn=String(l.turn||0)
   canvasHost.dataset.wordTarget=String(goalWord)
   canvasHost.dataset.gutter=String(l.gutter);canvasHost.dataset.split=String(l.split);canvasHost.dataset.word=String(u.uWord.value)
   canvasHost.dataset.pushEnergy=String(pushEnergy)
   canvasHost.dataset.resourceGeneration=resources.geometry.uuid
  }
  if(logoVisible || intro.current<1 || pushSettling || journey.current!==goalWord)invalidate()
 })
 const drawn=()=>{
  if(!allowed.current)return
  const canvasHost=gl.domElement.closest<HTMLElement>('[data-testid=execution-graph-canvas]')
  if(canvasHost)canvasHost.dataset.ready='true'
  if(refs.page.current)refs.page.current.dataset.gpu='true'
  const l=layout.current
  // Semantic type is always the fallback; the GPU hands off only after registration.
  if(refs.word.current)refs.word.current.style.opacity=l?.mask?String(smooth(.76,.995,journey.current)):''
 }
 useEffect(()=>{
  gl.debug.onShaderError=()=>onFailure()
  const lost=(event:Event)=>{event.preventDefault();onFailure()}
  gl.domElement.addEventListener('webglcontextlost',lost)
  return ()=>{gl.debug.onShaderError=null;gl.domElement.removeEventListener('webglcontextlost',lost)}
 },[gl,onFailure])
 if(!resources) return null
 return <points onAfterRender={drawn} geometry={resources.geometry} material={resources.material} dispose={null} frustumCulled={false}/>
}
