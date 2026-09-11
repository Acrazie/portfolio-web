export type Rect = {left:number; top:number; width:number; height:number}
export const clamp = (x:number, lo=0, hi=1) => Math.max(lo, Math.min(hi,x))
export const smooth = (a:number,b:number,x:number) => {
  const t=clamp((x-a)/Math.max(b-a,1e-6)); return t*t*(3-2*t)
}
export function viewportPoint(x:number,y:number,r:Rect) {
  if(![x,y,r.left,r.top,r.width,r.height].every(Number.isFinite) || r.width<=0 || r.height<=0) return null
  return {x:x-r.left-r.width/2,y:r.top+r.height/2-y}
}
export function stages(scrollY:number,heroHeight:number,docHeight:number,h:number) {
  const end=Math.max(0,docHeight-h), y=clamp(scrollY,0,end)
  return {split:smooth(0,Math.max(1,heroHeight*.65),y),
    word:end===0?0:smooth(Math.min(end*.8,Math.max(heroHeight*.65,end-h*.8)),end,y)}
}
// Each real boundary turns the same ribbon once as it crosses the viewport.
// Viewport coordinates keep this independent of section height and reversible.
export function sectionTravel(tops:number[],height:number) {
 if(height<=0)return {travel:0,turn:0}
 let travel=0,turn=0
 for(const top of tops){const t=smooth(.05,.9,1-top/height);travel+=t;turn=Math.max(turn,4*t*(1-t))}
 return {travel,turn}
}
// Finite exponential landing: no perpetual frames and no accumulated scroll delta.
export function followJourney(value:number,target:number,dt:number) {
 const next=value+(target-value)*(1-Math.exp(-Math.max(0,Math.min(dt,.05))*2.8))
 return Math.abs(next-target)<.001?target:next
}
export function lane(i:number,n:number,w:number,h:number,gutter:number) {
  const side=i%2===0?-1:1, rank=Math.floor(i/2), count=Math.ceil(n/2)
  const g=clamp(gutter,12,w/4), inset=4+(g-8)*((rank*.61803398875)%1)
  return {x:side*(w/2-inset),y:(.5-(rank+.5)/count)*h}
}
