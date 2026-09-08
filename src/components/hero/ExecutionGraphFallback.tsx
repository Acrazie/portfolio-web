import { createGraphFrame } from './execution-graph-model'
export function ExecutionGraphFallback({progress=0}:{progress?:number}) {
 const {nodes,edges}=createGraphFrame({width:800,height:560,progress:progress*progress*(3-2*progress),seed:42})
 return <div className="absolute inset-0" data-testid="execution-graph-fallback">
  <svg viewBox="0 0 800 560" className="absolute h-full w-full" aria-hidden="true" preserveAspectRatio="none">
   {[.25,.5,.75].map(t=><path key={t} d={`M ${800*t} 65 V 490 M 50 ${560*t} H 750`} stroke="#ffffff" strokeOpacity=".045"/>)}
   {edges.map(([a,b],i)=><path key={i} d={`M ${nodes[a].x} ${nodes[a].y} L ${nodes[b].x} ${nodes[b].y}`} fill="none" stroke="#9698c9" strokeOpacity=".3"/>)}
  </svg>
  <ol aria-label="Execution flow" className="absolute inset-0">
   {nodes.map(n=><li key={n.id} style={{left:`${n.x/8}%`,top:`${n.y/5.6}%`}} className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 border px-1.5 py-2 font-mono text-[9px] uppercase tracking-wider sm:px-3 sm:text-[11px] ${n.label==='AC'?'border-[#b4b6ff] bg-[#b4b6ff] px-4 py-4 text-[#191a28]':'border-white/20 bg-[#191a24] text-[#dddde8]'}`}>{n.label}</li>)}
  </ol>
 </div>
}
