import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import type { BufferGeometry, ShaderMaterial } from 'three'
import type { MotionValue } from 'motion/react'
import { createGraphResources } from './graph-resources'
export type SceneProps = { progress:MotionValue<number>; reduced:boolean; active:boolean; onFailure:()=>void; pointer:RefObject<{x:number;y:number}>; host:RefObject<HTMLDivElement|null> }
export function GlyphParticles({progress,reduced,active,onFailure,pointer,host}:SceneProps) {
 const {invalidate,viewport,size,gl}=useThree()
 const [resources,setResources]=useState<{geometry:BufferGeometry;material:ShaderMaterial}|null>(null)
 useEffect(()=>{
  const resources=createGraphResources()
  setResources(resources); invalidate()
  return ()=>resources.dispose()
 },[invalidate])
 useEffect(()=> {
  if(!active || reduced) return
  const element=host.current
  const update=()=>invalidate()
  element?.addEventListener('graphpointer',update)
  const stop=progress.on('change',update)
  return ()=>{stop();element?.removeEventListener('graphpointer',update)}
 },[active,reduced,progress,invalidate,host])
 useEffect(()=>{if(active) invalidate()},[active,reduced,invalidate])
 useFrame(({clock})=>{
  if(!resources) return
  const u=resources.material.uniforms
  u.uMorph.value=reduced?.5:progress.get();u.uReducedMotion.value=reduced?1:0
  u.uPointer.value.set(pointer.current.x,pointer.current.y)
  u.uTime.value=clock.elapsedTime;u.uDevicePixelRatio.value=gl.getPixelRatio();u.uMaxDisplacement.value=10*800/size.width
  const host=gl.domElement.closest<HTMLElement>('[data-testid=execution-graph-canvas]')
  if(host) {host.dataset.drawCount=String(Number(host.dataset.drawCount||0)+1);host.dataset.ready='true'}
 })
 useEffect(()=>{
  gl.debug.onShaderError=()=>onFailure()
  return ()=>{gl.debug.onShaderError=null}
 },[gl,onFailure])
 if(!resources) return null
 return <group scale={[viewport.width/800,viewport.height/560,1]}><points geometry={resources.geometry} material={resources.material} dispose={null} frustumCulled={false}/></group>
}
