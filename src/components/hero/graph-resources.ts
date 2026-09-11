import { DynamicDrawUsage, NormalBlending, BufferAttribute, BufferGeometry, ShaderMaterial, Vector2, Vector4 } from 'three'
import { createGlyphAtlas } from './create-glyph-atlas'
import {createDynamics} from './glyph-dynamics'
import { createParticleData } from './execution-graph-model'
import vertexShader from './shaders/glyph.vert.glsl?raw'
import fragmentShader from './shaders/glyph.frag.glsl?raw'
export function createGraphResources(image:import('./execution-graph-model').LogoPixels) {
  const atlas=createGlyphAtlas(), data=createParticleData(image,42), geometry=new BufferGeometry()
  for(const [name,array,width] of [['position',data.position,3],['aTarget',data.target,3],['aLane',new Float32Array(data.target.length),3],['aWord',new Float32Array(data.target.length),3],['aMotion',new Float32Array(data.target.length),3],['aColor',data.color,3],['aGlyph',data.glyph,1],['aPhase',data.phase,1],['aSize',data.size,1]] as const) geometry.setAttribute(name,new BufferAttribute(array,width))
  ;(geometry.getAttribute('aMotion') as BufferAttribute).setUsage(DynamicDrawUsage)
  const material=new ShaderMaterial({vertexShader,fragmentShader,transparent:true,depthTest:false,depthWrite:false,blending:NormalBlending,uniforms:{
   uAtlas:{value:atlas},uIntro:{value:0},uSplit:{value:0},uWord:{value:0},uLogoScale:{value:1},
   uTravel:{value:0},uTurn:{value:0},uScroll:{value:0},uWordWidth:{value:1},
   uHeroCenter:{value:new Vector2()},uWordCenter:{value:new Vector2()},uViewport:{value:new Vector2()},
   uHeroBox:{value:new Vector4(0,0,0,0)},uWordBox:{value:new Vector4(0,0,0,0)},uGutter:{value:18},
   uGlyphSize:{value:5.8},uDevicePixelRatio:{value:1}
  }})
 let disposed=false
 return {geometry,material,atlas,life:data.life,dynamics:createDynamics(data.target.length/3),dispose:()=>{
  if(disposed)return
  disposed=true;geometry.dispose();material.dispose();atlas.dispose()
 }}
}
