export type LogoPixels={width:number;height:number;data:Uint8ClampedArray}
// Targets and RGB come only from the supplied image; white/transparent holes stay empty.
export function createParticleData(image:LogoPixels,seed:number) {
 let state=seed>>>0
 const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296}
 const life:number[]=[]
 const ink=(x:number,y:number)=>{if(x<0||y<0||x>=image.width||y>=image.height)return false;const i=(y*image.width+x)*4;return image.data[i+3]>=128 && Math.min(image.data[i],image.data[i+1],image.data[i+2])<=240}
 const positions:number[]=[],targets:number[]=[],colors:number[]=[],glyphs:number[]=[],phases:number[]=[],sizes:number[]=[]
 for(let y=0;y<image.height;y++)for(let x=0;x<image.width;x++){
  const i=(y*image.width+x)*4, [r,g,b,a]=image.data.slice(i,i+4)
  if(a<128 || Math.min(r,g,b)>240)continue
  targets.push(((x+.5)/image.width-.5)*800,(.5-(y+.5)/image.height)*800,0)
  positions.push((random()-.5)*1900,(random()-.5)*1500,(random()-.5)*700)
  const edge=!ink(x-1,y)||!ink(x+1,y)||!ink(x,y-1)||!ink(x,y+1)
  const scatter=edge && random()<.35 ? 14+random()*34 : 0
  const length=Math.max(1,Math.hypot(x-image.width/2,image.height/2-y))
  life.push((x-image.width/2)/length*scatter,(image.height/2-y)/length*scatter,scatter?1:0)
  colors.push(r/255,g/255,b/255);glyphs.push(Math.floor(random()*18));phases.push(random()*Math.PI*2);sizes.push(.85+random()*.3)
 }
 return {life:new Float32Array(life),position:new Float32Array(positions),target:new Float32Array(targets),color:new Float32Array(colors),glyph:new Float32Array(glyphs),phase:new Float32Array(phases),size:new Float32Array(sizes)}
}
