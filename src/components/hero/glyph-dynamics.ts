import type {V} from './pointer-push'
export const createDynamics=(count:number)=>({active:new Set<number>(),offset:new Float32Array(count*2),velocity:new Float32Array(count*2)})
export type Dynamics=ReturnType<typeof createDynamics>
export function strike(s:Dynamics,i:number,q:V,p:{a:V;b:V;radius:number;velocity:V}) {
 const dx=p.b.x-p.a.x,dy=p.b.y-p.a.y
 const t=Math.max(0,Math.min(1,((q.x-p.a.x)*dx+(q.y-p.a.y)*dy)/Math.max(dx*dx+dy*dy,.0001)))
 const k=Math.max(0,1-Math.hypot(q.x-p.a.x-t*dx,q.y-p.a.y-t*dy)/p.radius)
 if(k===0)return
 s.active.add(i)
 // Tangential contact transfers the SAME cursor vector on either side.
 const j=i*2
 s.velocity[j]+=p.velocity.x*k*k;s.velocity[j+1]+=p.velocity.y*k*k
 const speed=Math.hypot(s.velocity[j],s.velocity[j+1]),cap=Math.min(1,750/Math.max(1,speed))
 s.velocity[j]*=cap;s.velocity[j+1]*=cap
}
export function advanceDynamics(s:Dynamics,dt:number) {
 if(!Number.isFinite(dt)||dt<=0)return 0
 // Exact critically damped spring solution: x=(x0+(v0+w*x0)t)e^-wt.
 // Stored per glyph, independent of later cursor locations and frame cadence.
 const w=1.5,e=Math.exp(-w*dt);let energy=0
 for(const i of s.active){
  for(let j=i*2;j<i*2+2;j++){
  const x=s.offset[j],v=s.velocity[j],b=v+w*x
  let next=(x+b*dt)*e,velocity=(v-w*b*dt)*e
  if(Math.abs(next)<.015 && Math.abs(velocity)<.025){next=0;velocity=0}
  s.offset[j]=next;s.velocity[j]=velocity;energy=Math.max(energy,Math.abs(next),Math.abs(velocity))
  }
  const j=i*2;if(s.offset[j]===0 && s.offset[j+1]===0 && s.velocity[j]===0 && s.velocity[j+1]===0)s.active.delete(i)
 }
 return energy
}
export function resetDynamics(s:Dynamics){s.offset.fill(0);s.velocity.fill(0);s.active.clear()}
