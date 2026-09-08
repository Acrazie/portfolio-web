export const stages = ['intent', 'model', 'AC', 'build', 'verify', 'ship'] as const
const tree = [[.12,.28],[.3,.28],[.5,.5],[.7,.28],[.7,.72],[.88,.72]]
const loop = [[.22,.28],[.5,.2],[.5,.5],[.78,.28],[.78,.72],[.22,.72]]
export const edges = [[0,1],[1,2],[2,3],[2,4],[3,4],[4,5],[5,2]] as const
export function createGraphFrame({width,height,progress}: {width:number;height:number;progress:number;seed:number}) {
 const t = Math.min(1,Math.max(0,progress))
 return { nodes: stages.map((label,i) => ({id:label,label,x:(tree[i][0]+(loop[i][0]-tree[i][0])*t)*width,y:(tree[i][1]+(loop[i][1]-tree[i][1])*t)*height})), edges }
}
export function createParticleData(count:number,seed:number) {
 let state = seed >>> 0
 const random = () => { state = (Math.imul(state,1664525)+1013904223)>>>0; return state/4294967296 }
 const position = new Float32Array(count*3), target = new Float32Array(count*3)
 const glyph = new Float32Array(count), phase = new Float32Array(count), size = new Float32Array(count)
 for(let i=0;i<count;i++) {
  const [a,b] = edges[i%edges.length], t=random()
  for(const [out,points] of [[position,tree],[target,loop]] as const) {
   out[i*3]=(points[a][0]+(points[b][0]-points[a][0])*t-.5)*800
   out[i*3+1]=(.5-points[a][1]-(points[b][1]-points[a][1])*t)*560
   out[i*3+2]=0
  }
  glyph[i]=9+Math.floor(random()*9); phase[i]=random()*6.28; size[i]=.65+random()*.45
 }
 return {position,target,glyph,phase,size}
}
