import {expect,it,vi} from 'vitest'
import vertex from './shaders/glyph.vert.glsl?raw'
import fragment from './shaders/glyph.frag.glsl?raw'
it('preserves physical hero motion, uses depth paths and clips content without click-burst uniforms',()=>{
 expect(vertex).toContain('aMotion')
 expect(vertex).toContain('700.0/max(200.0,700.0-p.z)')
 expect(vertex).toContain('mix(.6,1.0,c)')
 expect(vertex).toContain('inv*inv*inv*p+3.0*inv*inv*t*first')
 expect(vertex).toContain('aWord.xy+uWordCenter')
 expect(vertex).not.toMatch(/uPulse|uBounds|uSegments/)
 expect(vertex).toContain('uTravel*3.1415927')
 expect(vertex).not.toMatch(/uWake|uMorph/)
 expect(fragment).toContain('gl_FragCoord.xy/uDevicePixelRatio')
 expect(fragment).toContain('discard')
})
import {act,render} from '@testing-library/react'
import {GlyphParticles} from './GlyphParticles'
import {createGraphResources} from './graph-resources'
const state=vi.hoisted(()=>({frame:null as any,layout:null as any,resources:null as any,invalidate:vi.fn(),gl:null as any}))
vi.mock('@react-three/fiber',()=>({useFrame:(fn:any)=>{state.frame=fn},useThree:()=>({invalidate:state.invalidate,setDpr:vi.fn(),viewport:{width:800,height:800},size:{width:800,height:800},gl:state.gl})}))
vi.mock('./use-particle-layout',()=>({useParticleLayout:()=>({current:state.layout})}))
vi.mock('./graph-resources',async original=>{
 const real=await original<typeof import('./graph-resources')>()
 return {createGraphResources:(image:any)=>{state.resources=real.createGraphResources(image);return state.resources}}
})
it('uploads reversible viewport layout into the same geometry and stops settled demand frames',async()=>{
 const canvas=document.createElement('canvas'),host=document.createElement('div'),page=document.createElement('div'),hero=document.createElement('section'),word=document.createElement('span'),animate=document.createElement('button')
 host.dataset.testid='execution-graph-canvas';host.append(canvas)
 state.gl={domElement:canvas,getPixelRatio:()=>1,debug:{}}
 const refs={host:{current:host},page:{current:page},hero:{current:hero},word:{current:word},animate:{current:animate}}
 state.layout={host:{left:0,top:0,width:800,height:800},hero:{left:0,top:-2000,width:800,height:800},wordRect:{left:200,top:500,width:300,height:100},split:1,word:0,gutter:18,mask:{width:1,height:1,data:new Uint8ClampedArray([0,0,0,255])},revision:1}
 let image:any
 vi.stubGlobal('Image',class {onload:any;onerror:any;set src(_:string){image=this}})
 vi.spyOn(HTMLCanvasElement.prototype,'getContext').mockReturnValue({clearRect(){},fillText(){},drawImage(){},getImageData:()=>({width:1,height:1,data:new Uint8ClampedArray([65,12,112,255])})} as never)
 const result=render(<GlyphParticles {...({refs,host:refs.host,progress:{get:()=>0,on:()=>()=>{}},active:true,reduced:false,paused:false,onFailure:vi.fn()} as any)}/>)
 await act(async()=>{image.onload()})
 act(()=>state.frame({},.016))
 expect(state.resources.material.uniforms.uSplit.value).toBe(1)
 expect(host.dataset.resourceGeneration).toBe(state.resources.geometry.uuid)
 expect(state.resources.geometry.getAttribute('aLane').getX(0)).toBeLessThan(-380)
 const geometry=state.resources.geometry;state.layout.word=1
 act(()=>state.frame({},.016));expect(state.resources.material.uniforms.uWord.value).toBeGreaterThan(0);expect(state.resources.material.uniforms.uWord.value).toBeLessThan(.1)
 for(let i=0;i<200;i++)act(()=>state.frame({},.05))
 expect(state.resources.material.uniforms.uWord.value).toBe(1)
 expect(state.resources.material.uniforms.uGlyphSize.value*1.15).toBeLessThanOrEqual(2.5)
 expect(state.resources.geometry).toBe(geometry)
 state.invalidate.mockClear();act(()=>state.frame({},.016));expect(state.invalidate).not.toHaveBeenCalled()
 state.layout.hero.top=0;state.layout.split=0;state.layout.word=0
 act(()=>state.frame({},.016));state.invalidate.mockClear()
 const motion=Array.from(state.resources.geometry.getAttribute('aMotion').array)
 act(()=>state.frame({},.016));expect(state.invalidate).toHaveBeenCalled()
 expect(Array.from(state.resources.geometry.getAttribute('aMotion').array)).not.toEqual(motion)
 state.layout.host={left:0,top:0,width:0,height:0}
 expect(()=>state.frame({},.016)).not.toThrow()
 result.unmount();vi.restoreAllMocks();vi.unstubAllGlobals()
})
