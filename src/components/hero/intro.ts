import type {V} from './pointer-push'
export function introPosition(target:V,field:V & {z:number},progress:number,phase:number) {
 if(progress>=1)return {...target,z:0}
 // Three spiral arms sweep through a shallow galactic disc before registering the mark.
 const tau=Math.PI*2,arm=Math.floor(phase/(tau/3)),within=phase-arm*tau/3,seed=Math.min(980,Math.hypot(field.x,field.y))
 const radius=170+seed*.72,base=arm*tau/3+radius*.0068+(within/(tau/3)-.5)*.48
 const delay=arm*.018+(phase%1)*.012,travel=Math.max(0,Math.min(1,(progress-delay)/(1-delay)))
 const gather=travel*travel*(3-2*travel),angle=base+travel*(Math.PI*1.65+.28*Math.sin(phase*2))
 const remaining=(1-gather)**3,thickness=Math.sin(field.z*.021+phase*4.7)*(18+seed*.025)*remaining
 const discX=Math.cos(angle)*radius*(1-.52*gather)-Math.sin(angle)*thickness
 const discY=Math.sin(angle)*radius*.52*(1-.38*gather)+Math.cos(angle)*thickness
 const depth=(-260+110*Math.sin(angle*1.7+phase)+field.z*.16)*remaining
 return {x:target.x+(discX-target.x)*remaining,y:target.y+(discY-target.y)*remaining,z:depth}
}
// Wall-time deltas are capped by the caller so returning from a hidden tab never skips the reveal.
export function advanceIntro(value:number,delta:number,active:boolean,paused:boolean) {
 return active && !paused ? Math.min(1,value+delta/3.2) : value
}
