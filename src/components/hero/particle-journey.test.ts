import {expect,it} from 'vitest'
it('turns at measured section boundaries, reverses deterministically and settles automatically without overshoot',()=>{
 const a=modules['./particle-journey.ts'];expect(a.sectionTravel).toBeTypeOf('function');expect(a.followJourney).toBeTypeOf('function')
 const tops=[1000,1900,3200]
 const samples=[0,600,1000,1500,1900,2400,3200].map(y=>a.sectionTravel(tops.map(t=>t-y),1000))
 expect(samples[0].turn).toBe(0)
 expect(samples[1].turn).toBeGreaterThan(.5)
 expect(samples[3].travel).toBeGreaterThan(samples[1].travel)
 for(let i=0;i<samples.length;i++)expect(a.sectionTravel(tops.map(t=>t-[0,600,1000,1500,1900,2400,3200][i]),1000)).toEqual(samples[i])
 let p=0;for(let i=0;i<60;i++)p=a.followJourney(p,1,1/60)
 expect(p).toBeGreaterThan(.7);expect(p).toBeLessThan(1)
 for(let i=0;i<240;i++)p=a.followJourney(p,1,1/60)
 expect(p).toBe(1)
 const back=a.followJourney(p,0,1/60);expect(back).toBeLessThan(p);expect(back).toBeGreaterThan(.8)
 expect(a.followJourney(.4,.4,1/60)).toBe(.4)
 expect(a.sectionTravel([],0)).toEqual({travel:0,turn:0})
})
const modules=import.meta.glob('./particle-journey.ts',{eager:true}) as Record<string,any>
it('maps viewport CSS pixels and reversible scroll to safe lanes and true bottom',()=>{
 const a=modules['./particle-journey.ts'];expect(a?.viewportPoint).toBeTypeOf('function')
 expect(a.viewportPoint(60,70,{left:10,top:20,width:100,height:100})).toEqual({x:0,y:0})
 expect(a.viewportPoint(60,20,{left:10,top:20,width:100,height:100})).toEqual({x:0,y:50})
 expect(a.viewportPoint(0,0,{left:0,top:0,width:0,height:0})).toBeNull()
 expect(a.stages(0,1000,5000,1000)).toEqual({split:0,word:0})
 expect(a.stages(4000,1000,5000,1000)).toEqual({split:1,word:1})
 expect(a.stages(2000,1000,5000,1000)).toEqual({split:1,word:0})
 expect(a.stages(100,1000,500,1000).word).toBe(0)
 for(const w of [320,393,1440,2750])for(let i=0;i<101;i++){
  const p=a.lane(i,101,w,852,18);expect(Math.abs(p.x)).toBeGreaterThanOrEqual(w/2-18+4)
  expect(Math.abs(p.x)).toBeLessThanOrEqual(w/2-4);expect(Math.abs(p.y)).toBeLessThan(426)
 }
})
