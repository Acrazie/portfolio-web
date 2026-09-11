import { expect,it,vi } from 'vitest'
import { createGraphResources } from './graph-resources'
it('releases all owned GPU resources once when the scene unmounts',()=>{
 vi.spyOn(HTMLCanvasElement.prototype,'getContext').mockReturnValue({clearRect(){},fillText(){}} as never)
 const resources=createGraphResources({width:1,height:1,data:new Uint8ClampedArray([65,12,112,255])})
 const geometry=vi.spyOn(resources.geometry,'dispose'),material=vi.spyOn(resources.material,'dispose'),atlas=vi.spyOn(resources.atlas,'dispose')
 expect(resources.geometry.getAttribute('position').count).toBe(1)
 expect(resources.material.isShaderMaterial).toBe(true)
 resources.dispose();resources.dispose()
 expect(geometry).toHaveBeenCalledOnce();expect(material).toHaveBeenCalledOnce();expect(atlas).toHaveBeenCalledOnce()
 vi.restoreAllMocks()
})
it('creates neutral section uniforms without changing target geometry',()=>{
 vi.spyOn(HTMLCanvasElement.prototype,'getContext').mockReturnValue({clearRect(){},fillText(){}} as never)
 const r=createGraphResources({width:1,height:1,data:new Uint8ClampedArray([65,12,112,255])})
 try{
  const u=r.material.uniforms
  expect(r.geometry.getAttribute('aLane')?.count).toBe(1)
  expect(r.geometry.getAttribute('aWord')?.count).toBe(1)
  expect(u.uPulse).toBeUndefined();expect(u.uBounds).toBeUndefined();expect(u.uSegments).toBeUndefined()
  expect(u.uTravel.value).toBe(0);expect(u.uTurn.value).toBe(0)
  expect(r.material.depthTest).toBe(false)
  expect(u.uPointer).toBeUndefined()
  expect(Array.from(r.geometry.getAttribute('aTarget').array)).toEqual([0,0,0])
  expect(r.geometry.getAttribute('aColor').count).toBe(1)
  expect((r.geometry.getAttribute('aMotion') as import('three').BufferAttribute).usage).toBe(35048)
 }finally{r.dispose();vi.restoreAllMocks()}
})
