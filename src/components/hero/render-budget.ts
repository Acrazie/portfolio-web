export const createBudget=()=>({quality:1,frames:0,slow:0})
export function observeFrame(s:ReturnType<typeof createBudget>,dt:number) {
 if(dt<=0 || dt>.08)return false
 s.frames++;if(dt>.022)s.slow++
 if(s.frames<90)return false
 const before=s.quality
 if(s.slow>45)s.quality=Math.max(.6,Math.round((s.quality-.15)*100)/100)
 s.frames=0;s.slow=0;return before!==s.quality
}
// Bound the full-page transparent framebuffer, not the logo geometry.
// Large/high-DPR displays otherwise multiply fill cost without adding glyphs.
export function particleDpr(width:number,height:number,nativeDpr:number) {
 if(width<=0 || height<=0)return 1
 return Math.min(nativeDpr,1.5,Math.sqrt(2400000/(width*height)))
}
