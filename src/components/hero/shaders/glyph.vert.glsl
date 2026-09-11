uniform float uIntro, uSplit, uWord, uLogoScale;
uniform float uGlyphSize, uDevicePixelRatio;
uniform float uTravel, uTurn, uScroll, uGutter, uWordWidth;
uniform vec2 uHeroCenter, uWordCenter, uViewport;
attribute vec3 aTarget, aLane, aWord, aColor, aMotion;
attribute float aSize, aGlyph, aPhase;
varying float vGlyph, vAlpha;
varying vec2 vRotation;
varying vec3 vColor;
void main() {
  float c=smoothstep(0.0,1.0,uIntro);
  vec3 logo=vec3(aTarget.xy*uLogoScale+uHeroCenter,0.0)+aMotion;
  float side=sign(aLane.x);
  float ribbon=aLane.y/uViewport.y*6.2831853+uTravel*3.1415927;
  float strand=sin(aPhase*2.7);
  float inset=4.0+(uGutter-8.0)*(.5+.32*sin(ribbon)+.14*strand);
  vec3 stream=vec3(side*(uViewport.x*.5-inset),
    mod(aLane.y+uViewport.y*.5+uScroll*.36,uViewport.y)-uViewport.y*.5,
    -55.0+45.0*cos(ribbon)+uTurn*strand*36.0);
  vec3 p=mix(logo,stream,uSplit);
  if(uWord>0.0) {
    // Two opposing paths bow through depth, then register contours in staggered strata.
    float delay=.18*fract(aPhase*1.618);
    float t=smoothstep(0.0,1.0,clamp((uWord-delay)/(1.0-delay),0.0,1.0));
    vec3 end=vec3(aWord.xy+uWordCenter,aWord.z);
    vec3 first=vec3(stream.x,uWordCenter.y+side*34.0+strand*30.0,-220.0-strand*80.0);
    vec3 second=vec3(end.x+side*uWordWidth*.2,end.y-side*22.0,-95.0);
    float inv=1.0-t;
    p=inv*inv*inv*p+3.0*inv*inv*t*first+3.0*inv*t*t*second+t*t*t*end;
    // Orthographic hero stays untouched; only the finale has this perspective plane.
    p.xy=uWordCenter+(p.xy-uWordCenter)*(700.0/(700.0-p.z));
  }
  float agitation=clamp(length(aMotion.xy)*(1.0-uSplit)*c/90.0,0.0,1.0);
  float turn=sin(aPhase)*agitation*.7;
  vRotation=vec2(cos(turn),sin(turn));
  gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
  float depth=700.0/max(200.0,700.0-p.z);
  gl_PointSize=clamp(uGlyphSize*aSize*uDevicePixelRatio*depth*(1.0+.12*agitation),1.0,42.0);
  vGlyph=aGlyph;vColor=aColor;
  float registration=1.0-.94*smoothstep(.78,1.0,uWord);
  vAlpha=mix(.6,1.0,c)*mix(mix(1.0,.42,uSplit),registration,uWord);
}
