import {expect,it} from 'vitest'
it('carries an outward impulse through launch, inertia and an exact soft landing across the mark',()=>{
 const a=modules['./pointer-push.ts']
 for(const center of [{x:-260,y:180},{x:260,y:180},{x:-260,y:-180},{x:260,y:-180},{x:0,y:0}]){
  const s=a.createPush();a.samplePush(s,{x:center.x-10,y:center.y},0);a.samplePush(s,{x:center.x+10,y:center.y},10)
  for(const sign of [-1,1]){
   const q={x:center.x,y:center.y+sign*18},p=s.pulses[0]
   const slow=a.createPush();a.samplePush(slow,{x:center.x-10,y:center.y},0);a.samplePush(slow,{x:center.x+10,y:center.y},100)
   expect(a.displacement(q,p,1).y*sign).toBeGreaterThan(a.displacement(q,slow.pulses[0],1).y*sign*2)
   const launch=a.displacement(q,p,1).y*sign
   p.age=.08;const coast=a.displacement(q,p,1).y*sign
   expect(coast).toBeGreaterThan(launch*1.5)
   p.age=.6;expect(a.displacement(q,p,1).y*sign).toBeGreaterThan(0)
   p.age=1.19;expect(Math.abs(a.displacement(q,p,1).y)).toBeLessThan(.02)
   p.age=1.2;expect(a.displacement(q,p,1)).toEqual({x:0,y:0});p.age=0
  }
 }
})
it('samples a bounded directional velocity for the retained glyph solver',()=>{
 const a=modules['./pointer-push.ts'],s=a.createPush()
 a.samplePush(s,{x:10,y:20},0);a.samplePush(s,{x:-10,y:40},20)
 expect(s.pulses[0].velocity?.x).toBeLessThan(-100)
 expect(s.pulses[0].velocity?.y).toBeGreaterThan(100)
 expect(s.pulses[0].velocity.x).toBe(-s.pulses[0].velocity.y)
})
const modules=import.meta.glob('./pointer-push.ts',{eager:true}) as Record<string,any>
it('pushes radially away on both sides of the current segment',()=>{
 const api=modules['./pointer-push.ts'];expect(api?.createPush).toBeTypeOf('function')
 const s=api.createPush();api.samplePush(s,{x:0,y:-20},0);api.samplePush(s,{x:0,y:20},20)
 expect(api.displacement({x:10,y:0},s.pulses[0],0).x).toBeGreaterThan(0)
 expect(api.displacement({x:-10,y:0},s.pulses[0],0).x).toBeLessThan(0)
 expect(api.displacement({x:200,y:0},s.pulses[0],0)).toEqual({x:0,y:0})
})
it('bounds speed and slots, rejects invalid clocks, and settles exactly at every cadence',()=>{
 const a=modules['./pointer-push.ts'];expect(a.stepPush).toBeTypeOf('function')
 const pulse=(dt:number,dx=40)=>{const s=a.createPush();a.samplePush(s,{x:0,y:0},0);a.samplePush(s,{x:dx,y:0},dt);return s}
 expect(pulse(20).pulses[0].amplitude).toBeGreaterThan(pulse(100).pulses[0].amplitude)
 expect(pulse(20).pulses[0].amplitude).toBe(pulse(40,80).pulses[0].amplitude)
 for(const hz of [30,60,120]){
  const s=pulse(20);for(let i=0;i<hz*2;i++)a.stepPush(s,1/hz)
  expect(s.pulses).toEqual([])
 }
 const s=a.createPush()
 for(let i=0;i<30;i++)a.samplePush(s,{x:i*100,y:900},i*20)
 expect(s.pulses).toHaveLength(8);expect(s.pulses[7].amplitude).toBeLessThanOrEqual(110)
 const before=JSON.stringify(s);a.samplePush(s,{x:NaN,y:0},999);a.samplePush(s,{x:0,y:0},1);expect(JSON.stringify(s)).toBe(before)
 expect(a.samplePush(s,{x:10000,y:0},10000)).toBe(false)
 const d=a.displacement(s.pulses[0].a,s.pulses[0],1);expect(Number.isFinite(d.x+d.y)).toBe(true)
 a.resetPush(s);expect(s).toEqual({last:null,pulses:[]})
})
