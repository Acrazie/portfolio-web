export type Mask={width:number;height:number;data:Uint8ClampedArray}
export function sampleMask(el:HTMLElement):Mask {
  const r=el.getBoundingClientRect(),style=getComputedStyle(el)
  const canvas=document.createElement('canvas')
  canvas.width=Math.max(1,Math.ceil(r.width));canvas.height=Math.max(1,Math.ceil(r.height))
  const ctx=canvas.getContext('2d',{willReadFrequently:true})
  if(!ctx)throw new Error('Text sampling unavailable')
  ctx.font=`${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  ctx.letterSpacing=style.letterSpacing==='normal'?'0px':style.letterSpacing
  ctx.textAlign='center';ctx.textBaseline='alphabetic';ctx.fillStyle='#fff'
  const m=ctx.measureText('MAYEUL')
  const ascent=m.fontBoundingBoxAscent??m.actualBoundingBoxAscent,descent=m.fontBoundingBoxDescent??m.actualBoundingBoxDescent
  const y=(canvas.height+ascent-descent)/2
  ctx.fillText('MAYEUL',canvas.width/2,y)
  return ctx.getImageData(0,0,canvas.width,canvas.height)
}
export function inkAt(m:Mask,x:number,y:number) {
  const ix=Math.floor(x),iy=Math.floor(y)
  return ix>=0 && iy>=0 && ix<m.width && iy<m.height && m.data[(iy*m.width+ix)*4+3]>=128
}
export function textTargets(m:Mask,n:number) {
  const ink:number[]=[],edge:number[]=[]
  for(let y=0;y<m.height;y++)for(let x=0;x<m.width;x++)if(inkAt(m,x,y)){
   const p=y*m.width+x;ink.push(p)
   if(!inkAt(m,x-1,y)||!inkAt(m,x+1,y)||!inkAt(m,x,y-1)||!inkAt(m,x,y+1))edge.push(p)
  }
  if(!ink.length)throw new Error('Empty word mask')
  const out=new Float32Array(n*3)
  for(let i=0;i<n;i++) {
    // Stratified contour-first registration, scrambled to avoid scanline wipes.
    const pool=i%4===0?ink:edge,rank=((i+.5)*.61803398875)%1
    const p=pool[Math.min(pool.length-1,Math.floor(rank*pool.length))]
    out[i*3]=p%m.width+.5-m.width/2
    out[i*3+1]=m.height/2-Math.floor(p/m.width)-.5
    out[i*3+2]=(i%5)*-1.5
  }
  return out
}
