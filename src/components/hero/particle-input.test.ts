import {expect,it,vi} from 'vitest'
import {createPush} from './pointer-push'
const modules=import.meta.glob('./particle-input.ts',{eager:true}) as Record<string,any>
it('keeps passive hero input but never binds name clicks or keyboard bursts',()=>{
 const a=modules['./particle-input.ts'];expect(a?.bindParticleInput).toBeTypeOf('function')
 vi.spyOn(window,'matchMedia').mockReturnValue({matches:true} as MediaQueryList)
 const push=createPush(),burst=createPush(),invalidate=vi.fn();let enabled=true,time=0,word=0
 const host={left:10,top:20,width:800,height:800},mask={width:3,height:3,data:new Uint8ClampedArray(36)};mask.data[3]=255
 const off=a.bindParticleInput(push,invalidate,()=>({enabled,host,hero:host,word,mask,wordRect:{left:100,top:100,width:3,height:3}}),()=>time)
 const move=(x:number,type='mouse',target:EventTarget=window)=>{time+=20;const e=new MouseEvent('pointermove',{clientX:x,clientY:420,bubbles:true,cancelable:true});Object.defineProperty(e,'pointerType',{value:type});target.dispatchEvent(e);expect(e.defaultPrevented).toBe(false)}
 move(410,'touch');expect(push.last).toBeNull();move(410);expect(push.last?.p).toEqual({x:0,y:0});move(450);expect(push.pulses).toHaveLength(1)
 enabled=false;move(500);expect(push.last).toBeNull();enabled=true;move(500);expect(push.pulses).toHaveLength(1)
 const button=document.createElement('button');document.body.append(button);move(520,'mouse',button);expect(push.last).toBeNull()
 word=1
 const click=(x:number,y:number,target:EventTarget=window,detail=1)=>{const e=new MouseEvent('click',{clientX:x,clientY:y,detail,bubbles:true,cancelable:true});target.dispatchEvent(e);expect(e.defaultPrevented).toBe(false)}
 invalidate.mockClear()
 click(101,101);click(100,100);click(100,100,button);click(100,100,window,0)
 window.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter'}))
 window.dispatchEvent(new Event('particleburst'))
 expect(burst.pulses).toHaveLength(0);expect(invalidate).not.toHaveBeenCalled()
 off();invalidate.mockClear();move(550);click(100,100);expect(invalidate).not.toHaveBeenCalled();button.remove();vi.restoreAllMocks()
})
