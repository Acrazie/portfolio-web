import {expect,it} from 'vitest'
const modules=import.meta.glob('./logo-life.ts',{eager:true}) as Record<string,any>
it('keeps original glyphs gently alive with stronger perimeter drift and depth-dependent parallax',()=>{
 const a=modules['./logo-life.ts'];expect(a?.livingOffset).toBeTypeOf('function')
 const rest=a.livingOffset(0,1,0,{x:0,y:0}),later=a.livingOffset(2,1,0,{x:0,y:0})
 expect(Math.hypot(rest.x-later.x,rest.y-later.y)).toBeGreaterThan(.2)
 const edge=a.livingOffset(2,1,1,{x:0,y:0});expect(Math.hypot(edge.x,edge.y)).toBeGreaterThan(Math.hypot(later.x,later.y))
 const near=a.livingOffset(2,1,1,{x:1,y:0}),far=a.livingOffset(2,1,0,{x:1,y:0})
 expect(near.x-edge.x).toBeGreaterThan(far.x-later.x)
 expect(a.livingOffset(2,1,1,{x:1,y:1},false)).toEqual({x:0,y:0})
})
