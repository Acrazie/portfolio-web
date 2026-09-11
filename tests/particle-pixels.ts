import type {Page} from '@playwright/test'
export async function pixels(page:Page,before:Buffer,after:Buffer,region?:{x:number;y:number;radius:number}) {
 const gutter=Number(await page.getByTestId('execution-graph-canvas').getAttribute('data-gutter'))||18
 return page.evaluate(async({a,b,region,gutter})=>{
  const decode=async(src:string)=>{const i=new Image();i.src='data:image/png;base64,'+src;await i.decode();const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const ctx=c.getContext('2d')!;ctx.drawImage(i,0,0);return ctx.getImageData(0,0,c.width,c.height)}
  const aImage=await decode(a),bImage=await decode(b),w=aImage.width,h=aImage.height
  let changed=0,outside=0,left=0,right=0,center=0,added=0,removed=0,addedRadius=0,removedRadius=0,addedX=0,removedX=0,addedY=0,removedY=0
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){
   const i=(y*w+x)*4,A=aImage.data,B=bImage.data
   const diff=Math.max(Math.abs(A[i]-B[i]),Math.abs(A[i+1]-B[i+1]),Math.abs(A[i+2]-B[i+2]))
   if(diff>0){changed++;if(x<gutter)left++;else if(x>=w-gutter)right++;else center++;if(region && Math.hypot(x-region.x,y-region.y)>region.radius)outside++}
   if(region){
    const distance=Math.hypot(x-region.x,y-region.y)
    if(distance>region.radius)continue
    const saturation=(d:Uint8ClampedArray)=>Math.max(d[i],d[i+1],d[i+2])-Math.min(d[i],d[i+1],d[i+2])
    const delta=saturation(B)-saturation(A)
    if(delta>0){added+=delta;addedRadius+=delta*distance;addedX+=delta*x;addedY+=delta*y}else{removed-=delta;removedRadius-=delta*distance;removedX-=delta*x;removedY-=delta*y}
   }
  }
  return {changed,outside,left,right,center,travelX:addedX/Math.max(1,added)-removedX/Math.max(1,removed),travelY:addedY/Math.max(1,added)-removedY/Math.max(1,removed),addedRadius:addedRadius/Math.max(1,added),removedRadius:removedRadius/Math.max(1,removed)}
 },{a:before.toString('base64'),b:after.toString('base64'),region,gutter})
}
export async function inkPoints(page:Page){
 return page.evaluate(()=>{
  const el=document.querySelector<HTMLElement>('[data-testid=particle-word]')!,r=el.getBoundingClientRect(),s=getComputedStyle(el),c=document.createElement('canvas')
  c.width=Math.ceil(r.width);c.height=Math.ceil(r.height)
  const ctx=c.getContext('2d')!;ctx.font=`${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;ctx.textAlign='center';ctx.textBaseline='alphabetic'
  const m=ctx.measureText('MAYEUL');ctx.fillText('MAYEUL',c.width/2,(c.height+m.actualBoundingBoxAscent-m.actualBoundingBoxDescent)/2)
  const data=ctx.getImageData(0,0,c.width,c.height).data,ink:{x:number;y:number}[]=[],blank:{x:number;y:number}[]=[]
  for(let y=0;y<c.height;y++)for(let x=0;x<c.width;x++){
   const p={x:r.left+r.width/2-c.width/2+x+.5,y:r.top+r.height/2-c.height/2+y+.5}
   if(data[(y*c.width+x)*4+3]>=128)ink.push(p);else blank.push(p)
  }
  return {ink:[ink[Math.floor(ink.length*.15)],ink[Math.floor(ink.length*.8)]],blank:blank[Math.floor(blank.length/2)]}
 })
}
export async function patches(page:Page,image:Buffer){
 return page.evaluate(async(src)=>{
  const i=new Image();i.src='data:image/png;base64,'+src;await i.decode();const c=document.createElement('canvas');c.width=i.width;c.height=i.height
  const ctx=c.getContext('2d')!;ctx.drawImage(i,0,0);const d=ctx.getImageData(0,0,c.width,c.height).data
  const found=[]
  for(const [x0,x1,y0,y1] of [[.2,.45,.3,.7],[.55,.8,.3,.7],[.3,.7,.18,.4],[.3,.7,.6,.82]]){
   let best={x:0,y:0,count:-1}
   for(let y=Math.floor(c.height*y0);y<c.height*y1;y+=16)for(let x=Math.floor(c.width*x0);x<c.width*x1;x+=16){
    let count=0
    for(let yy=y-20;yy<y+20;yy++)for(let xx=x-20;xx<x+20;xx++){
     const p=(yy*c.width+xx)*4;if(Math.max(d[p],d[p+1],d[p+2])-Math.min(d[p],d[p+1],d[p+2])>50)count++
    }
    if(count>best.count)best={x,y,count}
   }
   found.push(best)
  }
  return found
 },image.toString('base64'))
}
