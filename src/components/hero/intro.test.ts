import { expect,it } from 'vitest'
import { advanceIntro } from './intro'
const modules=import.meta.glob('./intro.ts',{eager:true}) as Record<string,any>
it('traverses staggered depth planes before decelerating precisely onto original targets',()=>{
 const pose=modules['./intro.ts'].introPosition;expect(pose).toBeTypeOf('function')
 const t={x:80,y:40},f={x:130,y:-90,z:-200}
 const a=pose(t,f,0,1),b=pose(t,f,.3,1)
 expect(b.z).toBeGreaterThan(a.z);expect(Math.hypot(b.x,b.y)).toBeGreaterThan(Math.hypot(a.x,a.y))
 expect(pose(t,{...f,z:200},.3,1).z).not.toBe(b.z)
 const late=pose(t,f,.98,1),end=pose(t,f,1,1)
 expect(end).toEqual({x:80,y:40,z:0});expect(Math.hypot(late.x-80,late.y-40)).toBeLessThan(.1)
})
it('runs a finite visible convergence and freezes when inactive or paused',()=>{
 expect(advanceIntro(0,.05,true,false)).toBeGreaterThan(0)
 expect(advanceIntro(.5,1,false,false)).toBe(.5)
 expect(advanceIntro(.5,1,true,true)).toBe(.5)
 expect(advanceIntro(.99,1,true,false)).toBe(1)
 expect(advanceIntro(1,1,true,false)).toBe(1)
})
