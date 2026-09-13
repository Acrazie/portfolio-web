import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
test('SSR and lazy shader graph enhance without runtime errors',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message))
 await page.goto('/')
 await expect(page.getByRole('heading',{level:1})).toContainText('Mayeul')
 await expect(page.getByTestId('execution-graph-fallback')).toHaveCount(0)
 await expect(page.getByTestId('execution-graph-canvas').locator('canvas')).toBeVisible()
 await expect(page.getByTestId('execution-graph-canvas')).toHaveAttribute('data-ready','true')
 expect(errors).toEqual([])
})
