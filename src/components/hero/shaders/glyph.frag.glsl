uniform sampler2D uAtlas;
varying float vGlyph;
varying float vAlpha;
varying float vDepth;
void main() {
 vec2 cell=vec2(mod(vGlyph,8.0),7.0-floor(vGlyph/8.0));
 vec2 uv=(cell+vec2(gl_PointCoord.x,1.0-gl_PointCoord.y))/8.0;
 float alpha=texture2D(uAtlas,uv).a*vAlpha;
 if(alpha<.08) discard;
 vec3 color=mix(vec3(.58,.60,.98),vec3(.87,.88,1.0),vDepth);
 gl_FragColor=vec4(color,alpha);
}
