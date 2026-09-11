uniform sampler2D uAtlas;
uniform float uDevicePixelRatio, uGutter, uWord;
uniform vec2 uViewport;
uniform vec4 uHeroBox, uWordBox;
varying float vGlyph, vAlpha;
varying vec2 vRotation;
varying vec3 vColor;
bool inside(vec2 p,vec4 b) {
  return p.x>=b.x && p.x<=b.z && p.y>=b.y && p.y<=b.w;
}
void main() {
  vec2 p=gl_FragCoord.xy/uDevicePixelRatio;
  bool lane=p.x<=uGutter || p.x>=uViewport.x-uGutter;
  if(!lane && !inside(p,uHeroBox) && !(uWord>0.0 && inside(p,uWordBox)))discard;
  vec2 cell=vec2(mod(vGlyph,8.0),7.0-floor(vGlyph/8.0));
  vec2 local=vec2(gl_PointCoord.x,1.0-gl_PointCoord.y)-.5;
  float s=vRotation.y,c=vRotation.x;
  local=mat2(c,-s,s,c)*local+.5;
  if(any(lessThan(local,vec2(0.0))) || any(greaterThan(local,vec2(1.0))))discard;
  vec2 uv=(cell+local)/8.0;
  float alpha=texture2D(uAtlas,uv).a*vAlpha;
  if(alpha<.04)discard;
  gl_FragColor=vec4(vColor,alpha);
}
