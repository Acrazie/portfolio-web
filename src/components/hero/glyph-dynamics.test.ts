import {expect,it} from 'vitest'
const modules=import.meta.glob('./glyph-dynamics.ts',{eager:true}) as Record<string,any>
it('transfers cursor travel velocity on both side hits and retains independent glyph inertia for seconds',()=>{
 const a=modules['./glyph-dynamics.ts'];expect(a?.createDynamics).toBeTypeOf('function')
 for(const velocity of [{x:600,y:0},{x:-600,y:0},{x:0,y:600},{x:0,y:-600}]){
  const s=a.createDynamics(2)
  for(let i=0;i<2;i++)a.strike(s,i,{x:0,y:(i?1:-1)*12},{a:{x:-20,y:0},b:{x:20,y:0},radius:80,velocity})
  a.advanceDynamics(s,.1)
  for(let i=0;i<2;i++)expect(s.offset[i*2]*velocity.x+s.offset[i*2+1]*velocity.y).toBeGreaterThan(0)
  const first=Math.hypot(s.offset[0],s.offset[1]);expect(s.active?.size).toBe(2);a.advanceDynamics(s,.3)
  expect(Math.hypot(s.offset[0],s.offset[1])).toBeGreaterThan(first*1.5)
  for(let i=0;i<120;i++)a.advanceDynamics(s,1/60)
  expect(Math.hypot(s.offset[0],s.offset[1])).toBeGreaterThan(10)
  for(let i=0;i<600;i++)a.advanceDynamics(s,1/60)
  expect(Array.from(s.offset)).toEqual([0,0,0,0]);expect(Array.from(s.velocity)).toEqual([0,0,0,0])
 }
})
