import { AdditiveBlending, BufferAttribute, BufferGeometry, ShaderMaterial, Vector2 } from 'three'
import { createGlyphAtlas } from './create-glyph-atlas'
import { createParticleData } from './execution-graph-model'
import vertexShader from './shaders/glyph.vert.glsl?raw'
import fragmentShader from './shaders/glyph.frag.glsl?raw'
export function createGraphResources() {
  const atlas=createGlyphAtlas(), data=createParticleData(240,42), geometry=new BufferGeometry()
  for(const [name,array,width] of [['position',data.position,3],['aTarget',data.target,3],['aGlyph',data.glyph,1],['aPhase',data.phase,1],['aSize',data.size,1]] as const) geometry.setAttribute(name,new BufferAttribute(array,width))
  const material=new ShaderMaterial({vertexShader,fragmentShader,transparent:true,depthWrite:false,blending:AdditiveBlending,uniforms:{uAtlas:{value:atlas},uMorph:{value:0},uPointer:{value:new Vector2(9999,9999)},uTime:{value:0},uGlyphSize:{value:16},uDevicePixelRatio:{value:1},uReducedMotion:{value:0},uMaxDisplacement:{value:10}}})
 let disposed=false
 return {geometry,material,atlas,dispose:()=>{
  if(disposed)return
  disposed=true;geometry.dispose();material.dispose();atlas.dispose()
 }}
}
