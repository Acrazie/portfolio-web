import { expect,test } from '@playwright/test'
test('capability tracks retain visible separators',async({page})=>{
 await page.goto('/')
 const track=page.locator('#capabilities article').first()
 expect((await track.evaluate(element=>getComputedStyle(element.parentElement!).borderTopWidth))).toBe('1px')
})
test('hero is an ample unframed surface with concise copy and no fabrication labels',async({page})=>{
 await page.goto('/')
 const hero=page.getByRole('region',{name:/Mayeul/})
 await expect(hero).not.toContainText(/Content pending|Demand render|Execution graph|constellation|Intent →/i)
 const scene=page.getByTestId('logo-particles')
 await expect(scene).toHaveAttribute('aria-hidden','true')
 const style=await scene.evaluate(e=>({border:getComputedStyle(e).borderWidth,bg:getComputedStyle(e).backgroundColor}))
 expect(style).toEqual({border:'0px',bg:'rgba(0, 0, 0, 0)'})
 const viewport=page.viewportSize()!
 expect((await scene.boundingBox())!.width).toBeGreaterThan(viewport.width*.5)
})
