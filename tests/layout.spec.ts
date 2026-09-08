import { expect,test } from '@playwright/test'
test('capability rules have visible thickness',async({page})=>{
 await page.goto('/')
 const rules=page.locator('#capabilities [data-slot=separator]')
 for(const rule of await rules.all()) expect((await rule.boundingBox())!.height).toBe(1)
})
test('graph labels follow the delivery-loop morph',async({page})=>{
 await page.goto('/')
 const graph=page.getByTestId('execution-graph-fallback'), intent=graph.getByText('intent',{exact:true})
 await graph.scrollIntoViewIfNeeded()
 const before=await intent.getAttribute('style')
 await page.evaluate(()=>window.scrollBy({top:180,behavior:'instant'}))
 await expect.poll(()=>intent.getAttribute('style')).not.toBe(before)
})
