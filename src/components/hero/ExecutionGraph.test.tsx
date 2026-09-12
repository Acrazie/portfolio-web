import { renderToString } from 'react-dom/server'
import { expect, it } from 'vitest'
import { PortfolioPage } from '../PortfolioPage'
it('serves semantic content without flashing the static logo or mounting Three', () => {
 const html=renderToString(<PortfolioPage />)
 expect(html).not.toContain('execution-graph-fallback')
 expect(html).not.toContain('/logo.png')
 expect(html).toContain('MAYEUL')
 expect(html).toContain('aria-hidden="true"')
 expect(html).not.toMatch(/Execution flow|Demand render|Intent →|<ol|<canvas/)
})
