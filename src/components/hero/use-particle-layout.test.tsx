import {expect,it,vi} from 'vitest'
const modules=import.meta.glob('./use-particle-layout.ts',{eager:true}) as Record<string,any>
it('coalesces scroll without rerasterizing and cancels pending font publication on cleanup',async()=>{
 const a=modules['./use-particle-layout.ts'];expect(a?.observeParticleLayout).toBeTypeOf('function')
 let frame:FrameRequestCallback|undefined
 vi.spyOn(window,'requestAnimationFrame').mockImplementation(cb=>{frame=cb;return 1});vi.spyOn(window,'cancelAnimationFrame').mockImplementation(()=>{frame=undefined})
 const el=document.createElement('div');vi.spyOn(el,'getBoundingClientRect').mockReturnValue({left:0,top:0,width:800,height:800} as DOMRect)
 let finish!:()=>void;const load=vi.fn(()=>new Promise<void>(resolve=>{finish=resolve}))
 Object.defineProperty(document,'fonts',{configurable:true,value:{ready:Promise.resolve(),load,addEventListener:vi.fn(),removeEventListener:vi.fn()}})
 const publish=vi.fn(),raster=vi.fn(()=>({width:1,height:1,data:new Uint8ClampedArray([0,0,0,255])}))
 const off=a.observeParticleLayout({host:el,hero:el,word:el,page:el},publish,raster)
 frame?.(0);await Promise.resolve();await Promise.resolve()
 const first=publish.mock.calls.length
 for(let i=0;i<3;i++)window.dispatchEvent(new Event('scroll'))
 expect(publish).toHaveBeenCalledTimes(first);frame?.(0);expect(publish).toHaveBeenCalledTimes(first+1);expect(load).toHaveBeenCalledOnce()
 off();finish();await Promise.resolve();await Promise.resolve();expect(raster).not.toHaveBeenCalled()
 vi.restoreAllMocks()
})
it('rejects an empty font raster instead of publishing unusable word targets',async()=>{
 const a=modules['./use-particle-layout.ts'];let frame:FrameRequestCallback|undefined
 vi.spyOn(window,'requestAnimationFrame').mockImplementation(cb=>{frame=cb;return 1});vi.spyOn(window,'cancelAnimationFrame').mockImplementation(()=>{})
 const el=document.createElement('span');vi.spyOn(el,'getBoundingClientRect').mockReturnValue({left:0,top:0,width:10,height:10} as DOMRect)
 Object.defineProperty(document,'fonts',{configurable:true,value:{ready:Promise.resolve(),load:()=>Promise.resolve(),addEventListener(){},removeEventListener(){}}})
 const publish=vi.fn(),off=a.observeParticleLayout({host:el,hero:el,word:el,page:el},publish,()=>({width:1,height:1,data:new Uint8ClampedArray(4)}))
 frame?.(0);await new Promise(resolve=>setTimeout(resolve,0));frame?.(0)
 expect(publish.mock.calls.at(-1)![0].mask).toBeNull();off();vi.restoreAllMocks()
})
it('ignores stale font generations and reacts to document and visual viewport resize',async()=>{
 const a=modules['./use-particle-layout.ts'];let frame:FrameRequestCallback|undefined,resize!:()=>void,width=100
 vi.spyOn(window,'requestAnimationFrame').mockImplementation(cb=>{frame=cb;return 1});vi.spyOn(window,'cancelAnimationFrame').mockImplementation(()=>{})
 const disconnect=vi.fn();vi.stubGlobal('ResizeObserver',class{constructor(cb:()=>void){resize=cb}observe(){}disconnect=disconnect})
 const vv=new EventTarget();vi.stubGlobal('visualViewport',vv)
 const el=document.createElement('span');vi.spyOn(el,'getBoundingClientRect').mockImplementation(()=>({left:10,top:20,width,height:50} as DOMRect))
 const pending:Array<()=>void>=[]
 Object.defineProperty(document,'fonts',{configurable:true,value:{ready:Promise.resolve(),load:()=>new Promise<void>(resolve=>pending.push(resolve)),addEventListener(){},removeEventListener(){}}})
 const publish=vi.fn(),raster=vi.fn(()=>({width:1,height:1,data:new Uint8ClampedArray([0,0,0,255])}))
 const off=a.observeParticleLayout({host:el,hero:el,word:el,page:el},publish,raster)
 frame?.(0);await Promise.resolve();await Promise.resolve()
 width=200;vv.dispatchEvent(new Event('resize'));frame?.(0);await Promise.resolve();await Promise.resolve()
 pending[0]();await new Promise(r=>setTimeout(r,0));expect(raster).not.toHaveBeenCalled()
 pending[1]();await new Promise(r=>setTimeout(r,0));frame?.(0);expect(raster).toHaveBeenCalledOnce()
 const revision=publish.mock.calls.at(-1)![0].revision
 resize();frame?.(0);expect(publish.mock.calls.at(-1)![0].revision).toBe(revision);expect(raster).toHaveBeenCalledOnce()
 off();expect(disconnect).toHaveBeenCalledOnce();vi.restoreAllMocks();vi.unstubAllGlobals()
})
it('reserves a measured gutter with a six-pixel content gap and a 64-pixel cap',()=>{
 const a=modules['./use-particle-layout.ts'];let frame:FrameRequestCallback|undefined
 vi.spyOn(window,'requestAnimationFrame').mockImplementation(cb=>{frame=cb;return 1});vi.spyOn(window,'cancelAnimationFrame').mockImplementation(()=>{})
 const el=document.createElement('div'),content=document.createElement('section');content.dataset.particleContent='';content.style.padding='0 56px';el.append(content)
 vi.spyOn(el,'getBoundingClientRect').mockReturnValue({left:0,top:0,width:1440,height:1000} as DOMRect)
 vi.spyOn(content,'getBoundingClientRect').mockReturnValue({left:80,right:1360,top:0,width:1280,height:600} as DOMRect)
 const publish=vi.fn(),off=a.observeParticleLayout({host:el,hero:el,word:el,page:el},publish)
 frame?.(0);expect(publish.mock.calls.at(-1)![0].gutter).toBe(64)
 off();vi.restoreAllMocks()
})
