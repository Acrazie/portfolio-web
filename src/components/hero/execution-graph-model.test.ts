import { expect, it } from 'vitest'
import { createGraphFrame, createParticleData } from './execution-graph-model'
it('builds a deterministic bounded branching graph that becomes a delivery loop', () => {
 const options = { width: 800, height: 560, progress: 0, seed: 42 }
 const a = createGraphFrame(options), b = createGraphFrame({...options, progress: 1})
 expect(a).toEqual(createGraphFrame(options))
 expect(a.nodes.every(n => n.x >= 0 && n.x <= 800 && n.y >= 0 && n.y <= 560)).toBe(true)
 expect(a.nodes).not.toEqual(b.nodes)
 expect(a.nodes.find(n => n.label === 'AC')).toMatchObject({ x: 400, y: 280 })
 expect(createGraphFrame({...options, progress: -2})).toEqual(a)
 const p = createParticleData(240,42)
 expect(p.position.length).toBe(720)
 expect(p).toEqual(createParticleData(240,42))
 expect(p.position).not.toEqual(createParticleData(240,43).position)
})
