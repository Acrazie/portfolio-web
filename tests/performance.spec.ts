import {expect,test} from '@playwright/test'
test('three simultaneous invalidations coalesce into one draw',async({page})=>{
 await page.goto('/')
 const graph=page.getByTestId('execution-graph-canvas')
 await graph.scrollIntoViewIfNeeded();await expect(graph).toHaveAttribute('data-ready','true')
 await page.waitForTimeout(500)
 const before=Number(await graph.getAttribute('data-draw-count'))
 await graph.evaluate(g=>{for(let i=0;i<3;i++)g.parentElement!.dispatchEvent(new Event('graphpointer'))})
 await expect.poll(async()=>Number(await graph.getAttribute('data-draw-count'))).toBe(before+1)
 await page.waitForTimeout(500)
 expect(Number(await graph.getAttribute('data-draw-count'))).toBe(before+1)
})
test('narrow viewport has no overflow or graph label collision',async({page})=>{
 await page.setViewportSize({width:320,height:568});await page.goto('/')
 const graph=page.getByTestId('execution-graph-fallback');await graph.scrollIntoViewIfNeeded()
 expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBe(0)
 const boxes=await graph.locator('li').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom}}))
 for(let a=0;a<boxes.length;a++)for(let b=a+1;b<boxes.length;b++){
  const x=boxes[a],y=boxes[b];expect(x.left<y.right && x.right>y.left && x.top<y.bottom && x.bottom>y.top).toBe(false)
 }
})
