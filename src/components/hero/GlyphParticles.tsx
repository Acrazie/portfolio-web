import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { AdditiveBlending, BufferAttribute, BufferGeometry, ShaderMaterial, Vector2 } from 'three'
import type { MotionValue } from 'motion/react'
import { createGlyphAtlas } from './create-glyph-atlas'
import { createParticleData } from './execution-graph-model'
import vertexShader from './shaders/glyph.vert.glsl?raw'
import fragmentShader from './shaders/glyph.frag.glsl?raw'
export type SceneProps = { progress:MotionValue<number>; reduced:boolean; active:boolean; onFailure:()=>void; pointer:RefObject<{x:number;y:number}>; host:RefObject<HTMLDivElement|null> }
export function GlyphParticles({progress,reduced,active,onFailure,pointer,host}:SceneProps) {
 const {invalidate,viewport,size,gl}=useThree()
 const [resources,setResources]=useState<{geometry:BufferGeometry;material:ShaderMaterial}|null>(null)
 useEffect(()=>{
  const atlas=createGlyphAtlas(), data=createParticleData(240,42), geometry=new BufferGeometry()
  for(const [name,array,width] of [['position',data.position,3],['aTarget',data.target,3],['aGlyph',data.glyph,1],['aPhase',data.phase,1],['aSize',data.size,1]] as const) geometry.setAttribute(name,new BufferAttribute(array,width))
  const material=new ShaderMaterial({vertexShader,fragmentShader,transparent:true,depthWrite:false,blending:AdditiveBlending,uniforms:{uAtlas:{value:atlas},uMorph:{value:0},uPointer:{value:new Vector2(9999,9999)},uTime:{value:0},uGlyphSize:{value:16},uDevicePixelRatio:{value:1},uReducedMotion:{value:0},uMaxDisplacement:{value:10}}})
  setResources({geometry,material}); invalidate()
  return ()=>{geometry.dispose();material.dispose();atlas.dispose()}
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
