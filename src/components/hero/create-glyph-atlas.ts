import { CanvasTexture, SRGBColorSpace, LinearFilter, LinearMipmapLinearFilter } from 'three'
export const GLYPHS = '.:-=+*#%@{}<>/\\[]01'
export function getGlyphAtlasLayout() {
 return {size:512,cellSize:64,cells:[...GLYPHS].map((glyph,i)=>({glyph,u:(i%8)/8,v:1-(Math.floor(i/8)+1)/8,width:1/8,height:1/8}))}
}
export function createGlyphAtlas() {
 if(typeof document==='undefined') throw new Error('Glyph atlas requires a browser canvas')
 const canvas = document.createElement('canvas'); canvas.width=512; canvas.height=512
 const ctx=canvas.getContext('2d')
 if(!ctx) throw new Error('Glyph atlas requires a browser canvas')
 ctx.clearRect(0,0,512,512); ctx.font='600 42px SFMono-Regular, Menlo, monospace'; ctx.fillStyle='white'; ctx.textAlign='center'; ctx.textBaseline='middle'
 ;[...GLYPHS].forEach((g,i)=>ctx.fillText(g,(i%8)*64+32,Math.floor(i/8)*64+32,48))
 const texture=new CanvasTexture(canvas)
 texture.colorSpace=SRGBColorSpace; texture.minFilter=LinearMipmapLinearFilter; texture.magFilter=LinearFilter; texture.generateMipmaps=true; texture.needsUpdate=true
 return texture
}
