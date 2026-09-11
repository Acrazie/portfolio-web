export type V={x:number;y:number}
export type Pulse={a:V;b:V;radius:number;amplitude:number;age:number;velocity?:V;consumed?:boolean}
export type Push={last:{p:V;t:number}|null;pulses:Pulse[]}
export const createPush=():Push=>({last:null,pulses:[]})
export function addPulse(s:Push,a:V,b:V,radius:number,amplitude:number) {
  s.pulses.push({a:{...a},b:{...b},radius,amplitude,age:0})
  if(s.pulses.length>8)s.pulses.shift()
}
export function samplePush(s:Push,p:V,t:number) {
  if(![p.x,p.y,t].every(Number.isFinite))return false
  const prev=s.last
  if(prev && t<=prev.t)return false
  s.last={p:{...p},t}
  if(!prev || t-prev.t>250)return false
  const speed=Math.min(2400,Math.hypot(p.x-prev.p.x,p.y-prev.p.y)/Math.max(.001,(t-prev.t)/1000))
  if(speed<1)return false
  const gain=speed/2400
  addPulse(s,prev.p,p,32+64*gain,10+100*gain)
  const length=Math.hypot(p.x-prev.p.x,p.y-prev.p.y),impulse=80+520*gain
  s.pulses[s.pulses.length-1].velocity={x:(p.x-prev.p.x)/length*impulse,y:(p.y-prev.p.y)/length*impulse}
  return true
}
export function stepPush(s:Push,dt:number) {
  if(!Number.isFinite(dt) || dt<=0)return s.pulses.length>0
  for(const p of s.pulses)p.age+=Math.min(dt,.05)
  s.pulses=s.pulses.filter(p=>p.age<1.2)
  return s.pulses.length>0
}
// A short launch carries momentum after the pointer stops; the cubic tail
// reaches both zero displacement and zero velocity before demand rendering sleeps.
// Evaluated once per pulse on the CPU, not once per glyph on the GPU.
export function pulseEnvelope(age:number) {
  if(age>=1.2)return 0
  const attack=Math.min(1,Math.max(0,age)/.08)
  const launch=.18+.82*attack*attack*(3-2*attack)
  const tail=Math.max(0,(age-.08)/1.12)
  return launch*(1-tail)**3*(1+3*tail)
}
export function displacement(q:V,p:Pulse,phase:number):V {
  const dx=p.b.x-p.a.x,dy=p.b.y-p.a.y
  const t=Math.max(0,Math.min(1,((q.x-p.a.x)*dx+(q.y-p.a.y)*dy)/Math.max(dx*dx+dy*dy,.0001)))
  const x=q.x-p.a.x-t*dx,y=q.y-p.a.y-t*dy,d=Math.hypot(x,y)
  const k=Math.max(0,1-d/p.radius)
  const force=p.amplitude*k*k*pulseEnvelope(p.age)*(.82+.18*Math.sin(phase))
  if(force===0)return {x:0,y:0}
  return {x:(d>.0001?x/d:Math.cos(phase))*force,y:(d>.0001?y/d:Math.sin(phase))*force}
}
export function resetPush(s:Push) {s.last=null;s.pulses=[]}
