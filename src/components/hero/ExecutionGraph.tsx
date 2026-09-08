import { ExecutionGraphFallback } from './ExecutionGraphFallback'
export function ExecutionGraph() {
 return <div className="relative aspect-[4/3] min-h-80 overflow-hidden border border-white/15 bg-[#191a24] text-white" aria-label="Execution graph: from intent to delivery">
  <div className="absolute inset-x-5 top-5 z-10 flex justify-between gap-4 border-b border-white/15 pb-4 font-mono text-[9px] uppercase tracking-[.14em] text-[#c5c5d5]"><span>Portfolio / Execution graph</span><span>01—05</span></div>
  <ExecutionGraphFallback />
  <div className="absolute inset-x-5 bottom-5 z-10 flex justify-between gap-4 border-t border-white/15 pt-4 font-mono text-[9px] uppercase tracking-[.1em] text-[#c5c5d5]"><span>Intent → verified release</span><span>Demand render</span></div>
 </div>
}
