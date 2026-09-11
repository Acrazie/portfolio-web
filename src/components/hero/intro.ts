import type {V} from './pointer-push'
export function introPosition(target:V,field:V & {z:number},progress:number,phase:number) {
 if(progress>=1)return {...target,z:0}
 // Travel through three depth strata first; no scroll lock, no camera reset.
 const plane=Math.floor((field.z+350)/234),delay=plane*.025+phase*.004
 const travel=Math.max(0,Math.min(1,(progress-delay)/.43))
 const z=-650+plane*140+travel*900
 const perspective=700/Math.max(180,700-z)
 const gather=Math.max(0,Math.min(1,(progress-.38)/.62))
 const remaining=(1-gather)**4
 return {x:target.x+(field.x*perspective-target.x)*remaining,y:target.y+(field.y*perspective-target.y)*remaining,z:z*remaining}
}
// Wall-time deltas are capped by the caller so returning from a hidden tab never skips the reveal.
export function advanceIntro(value:number,delta:number,active:boolean,paused:boolean) {
 return active && !paused ? Math.min(1,value+delta/3.2) : value
}
