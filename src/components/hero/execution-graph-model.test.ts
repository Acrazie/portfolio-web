import { expect, it } from 'vitest'
import { createParticleData } from './execution-graph-model'
it('samples actual colored pixels and preserves white negative space and source palette', () => {
 const image={width:2,height:2,data:new Uint8ClampedArray([65,12,112,255,255,255,255,255,255,145,0,255,192,50,220,0])}
 const p=createParticleData(image,42)
 expect(p.target.length).toBe(6)
 expect(Array.from(p.color)).toEqual(expect.arrayContaining([expect.closeTo(65/255),expect.closeTo(145/255)]))
 expect(p.target[0]).toBe(p.target[3])
 expect(p.target[1]).toBeGreaterThan(p.target[4])
 expect(p.position).not.toEqual(p.target)
 expect((p as any).life?.length).toBe(p.target.length)
})
it('scatters only a sparse subset of original contour ink, never adds a particle cloud',()=>{
 const data=new Uint8ClampedArray(32*32*4)
 for(let y=4;y<28;y++)for(let x=4;x<28;x++)data.set([65,12,112,255],(y*32+x)*4)
 const p=createParticleData({width:32,height:32,data},42) as any
 expect(p.life).toBeDefined();expect(p.target.length/3).toBe(24*24)
 let scattered=0
 for(let i=0;i<p.life.length;i+=3)if(p.life[i+2]){scattered++;expect(Math.hypot(p.life[i],p.life[i+1])).toBeGreaterThan(10);expect(Math.max(Math.abs(p.target[i]),Math.abs(p.target[i+1]))).toBeGreaterThan(220)}
 expect(scattered).toBeGreaterThan(5);expect(scattered).toBeLessThan(100)
 const image={width:32,height:32,data}
 expect(p).toEqual(createParticleData(image,42))
})
