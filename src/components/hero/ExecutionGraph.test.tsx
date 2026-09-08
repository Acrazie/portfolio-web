import { renderToString } from 'react-dom/server'
import { expect, it } from 'vitest'
import { ExecutionGraph } from './ExecutionGraph'
it('serves a meaningful graph without browser globals or loading Three', () => {
 const html=renderToString(<ExecutionGraph />)
 expect(html).toContain('execution-graph-fallback')
 for(const label of ['intent','model','build','verify','ship','AC']) expect(html).toContain(label)
 expect(html).not.toContain('<canvas')
})
