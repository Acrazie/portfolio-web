import { renderToString } from 'react-dom/server'
import { expect, it } from 'vitest'
import { PortfolioPage } from '../PortfolioPage'
it('serves an original logo and semantic word without browser globals or Three', () => {
 const html=renderToString(<PortfolioPage />)
 expect(html).toContain('execution-graph-fallback')
 expect(html).toContain('/logo.png')
 expect(html).toContain('MAYEUL')
 expect(html).toContain('aria-hidden="true"')
 expect(html).not.toMatch(/Execution flow|Demand render|Intent →|<ol|<canvas/)
})
