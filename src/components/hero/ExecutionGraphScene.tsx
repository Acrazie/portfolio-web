import { useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { GlyphParticles } from './GlyphParticles'
import type { SceneProps } from './GlyphParticles'
export default function ExecutionGraphScene(props:SceneProps) {
 const onCreated=useCallback(({gl}:{gl:import('three').WebGLRenderer})=>{
  gl.domElement.addEventListener('webglcontextlost',props.onFailure,{once:true})
 },[props.onFailure])
 return <Canvas data-testid="execution-graph-canvas" data-motion={props.reduced?'reduced':'full'} resize={{scroll:false}} orthographic frameloop="demand" dpr={[1,2]} camera={{position:[0,0,10],zoom:1,near:.1,far:100}} gl={{antialias:false,stencil:false,alpha:true,powerPreference:'low-power'}} onCreated={onCreated} style={{position:'absolute',inset:0,pointerEvents:'none'}}>
  <GlyphParticles {...props}/>
 </Canvas>
}
