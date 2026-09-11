import { Canvas } from '@react-three/fiber'
import { GlyphParticles } from './GlyphParticles'
import type { SceneProps } from './GlyphParticles'
export default function ExecutionGraphScene(props:SceneProps) {
 return <Canvas data-testid="execution-graph-canvas" data-motion={props.reduced?'reduced':'full'} resize={{scroll:false}} orthographic frameloop={props.active?'demand':'never'} dpr={[1,1.5]} camera={{position:[0,0,500],zoom:1,near:.1,far:1500}} gl={{antialias:false,stencil:false,alpha:true,powerPreference:'low-power'}} style={{position:'absolute',inset:0,pointerEvents:'none'}}>
  <GlyphParticles {...props}/>
 </Canvas>
}
