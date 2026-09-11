import {expect,it,vi} from 'vitest'
it('registers proportional tracked type and distributes contour-first targets through shallow depth',()=>{
 const a=modules['./text-targets.ts']
 const data=new Uint8ClampedArray(9*9*4);for(let y=1;y<8;y++)for(let x=1;x<8;x++)data[(y*9+x)*4+3]=255
 const m={width:9,height:9,data},points=a.textTargets(m,1000)
 let edge=0;const depths=new Set<number>()
 for(let i=0;i<points.length;i+=3){const x=Math.floor(points[i]+4.5),y=Math.floor(4.5-points[i+1]);if(x===1||x===7||y===1||y===7)edge++;depths.add(points[i+2])}
 expect(edge).toBeGreaterThan(700);expect(depths.size).toBeGreaterThan(2)
 expect(Math.max(...depths)-Math.min(...depths)).toBeLessThanOrEqual(8)
 const el=document.createElement('span');el.style.font='300 40px sans-serif';el.style.letterSpacing='2px'
 vi.spyOn(el,'getBoundingClientRect').mockReturnValue({width:180,height:48} as DOMRect)
 const context={measureText:()=>({actualBoundingBoxAscent:30,actualBoundingBoxDescent:4}),fillText:vi.fn(),getImageData:()=>m,font:'',letterSpacing:''}
 vi.spyOn(HTMLCanvasElement.prototype,'getContext').mockReturnValue(context as never)
 a.sampleMask(el);expect(context.letterSpacing).toBe('2px');expect(context.font).toContain('300')
 vi.restoreAllMocks()
})
const modules=import.meta.glob('./text-targets.ts',{eager:true}) as Record<string,any>
it('assigns deterministic particles only to raster ink and rejects counters',()=>{
 const a=modules['./text-targets.ts'];expect(a?.textTargets).toBeTypeOf('function')
 const data=new Uint8ClampedArray(36);for(let i=0;i<9;i++)data[i*4+3]=i===4?0:255
 const m={width:3,height:3,data};expect(a.inkAt(m,1,1)).toBe(false);expect(a.inkAt(m,-1,0)).toBe(false)
 const points=a.textTargets(m,32);expect(points).toEqual(a.textTargets(m,32))
 for(let i=0;i<points.length;i+=3)expect(a.inkAt(m,points[i]+1.5,1.5-points[i+1])).toBe(true)
 expect(a.textTargets(m,0)).toHaveLength(0)
 expect(()=>a.textTargets({...m,data:new Uint8ClampedArray(36)},2)).toThrow('Empty word mask')
})
it('rasterizes the computed font and fails safely without a 2D context',()=>{
 const a=modules['./text-targets.ts'];expect(a.sampleMask).toBeTypeOf('function')
 const el=document.createElement('span');el.style.font='normal 40px monospace'
 vi.spyOn(el,'getBoundingClientRect').mockReturnValue({width:150,height:40} as DOMRect)
 const context={measureText:()=>({actualBoundingBoxAscent:30,actualBoundingBoxDescent:4}),fillText:vi.fn(),getImageData:vi.fn(()=>({width:150,height:40,data:new Uint8ClampedArray(24000)})),font:''}
 vi.spyOn(HTMLCanvasElement.prototype,'getContext').mockReturnValue(context as never)
 expect(a.sampleMask(el).width).toBe(150);expect(context.font).toContain('40px');expect(context.fillText).toHaveBeenCalledWith('MAYEUL',75,33)
 vi.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValue(null)
 expect(()=>a.sampleMask(el)).toThrow('Text sampling unavailable');vi.restoreAllMocks()
})
