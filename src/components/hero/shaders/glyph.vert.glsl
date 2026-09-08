uniform float uMorph;
uniform vec2 uPointer;
uniform float uTime;
uniform float uGlyphSize;
uniform float uDevicePixelRatio;
uniform float uReducedMotion;
uniform float uMaxDisplacement;
attribute vec3 aTarget;
attribute float aSize;
attribute float aGlyph;
attribute float aPhase;
varying float vGlyph;
varying float vAlpha;
varying float vDepth;
void main() {
 vec3 p = mix(position, aTarget, smoothstep(0.0, 1.0, uMorph));
 if(uReducedMotion < 0.5) {
  vec2 delta = p.xy-uPointer;
  float influence = 1.0-smoothstep(0.0,130.0,length(delta));
  p.xy += normalize(delta+vec2(0.001))*influence*uMaxDisplacement*.8;
  p.y += sin(uTime+aPhase)*uMaxDisplacement*.2;
 }
 vec4 viewPosition = modelViewMatrix*vec4(p,1.0);
 gl_Position = projectionMatrix*viewPosition;
 gl_PointSize=clamp(uGlyphSize*aSize*uDevicePixelRatio,1.0,42.0);
 vGlyph=aGlyph; vDepth=clamp((viewPosition.z+12.0)/12.0,0.0,1.0);
 vAlpha=.35+.35*sin(aPhase)*sin(aPhase);
}
