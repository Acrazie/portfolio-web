import { expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Reveal } from './Reveal'
it('never hides server-rendered content behind animation', () => {
 const html = renderToString(<Reveal><h2>Visible content</h2></Reveal>)
 expect(html).toContain('Visible content')
 expect(html).not.toMatch(/opacity:0|translateY/)
})
