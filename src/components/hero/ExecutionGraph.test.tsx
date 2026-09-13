import { renderToString } from 'react-dom/server'
import { expect, it } from 'vitest'
import { PortfolioPage } from '../PortfolioPage'
it('serves semantic content with a no-script fallback and without mounting Three', () => {
 const html=renderToString(<PortfolioPage />)
 expect(html).toContain('execution-graph-fallback')
 expect(html).toContain('/logo.png')
 expect(html).toContain('MAYEUL')
 expect(html).toContain('aria-hidden="true"')
 expect(html).not.toContain('<canvas')
})
