import {expect,it} from 'vitest'
it('reduces quality after sustained slow frames but never chases isolated stalls',()=>{
 const a=modules['./render-budget.ts'];expect(a.createBudget).toBeTypeOf('function')
 const s=a.createBudget();a.observeFrame(s,.1);expect(s.quality).toBe(1)
 for(let i=0;i<100;i++)a.observeFrame(s,1/30)
 expect(s.quality).toBeLessThan(1);expect(s.quality).toBeGreaterThanOrEqual(.6)
 for(let i=0;i<1000;i++)a.observeFrame(s,1/20)
 expect(s.quality).toBe(.6)
})
const modules=import.meta.glob('./render-budget.ts',{eager:true}) as Record<string,any>
it('caps large canvas fill cost while retaining native small-screen detail',()=>{
 const dpr=modules['./render-budget.ts']?.particleDpr
 expect(dpr).toBeTypeOf('function')
 expect(dpr(1440,1000,1)).toBe(1)
 expect(dpr(393,852,2)).toBe(1.5)
 for(const [width,height] of [[2750,1510],[3840,2160]]){
  expect(width*height*dpr(width,height,2)**2).toBeLessThanOrEqual(2400001)
  expect(dpr(width,height,2)).toBeGreaterThan(.5)
 }
 expect(dpr(0,0,2)).toBe(1)
})
