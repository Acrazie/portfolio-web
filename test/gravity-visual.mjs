import {chromium} from '@playwright/test'
import {mkdir,writeFile} from 'node:fs/promises'
const dir='test-results/gravity'
await mkdir(dir,{recursive:true})
const browser=await chromium.launch()
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1})
await page.goto('http://127.0.0.1:4180')
await page.waitForFunction(()=>document.querySelector('[data-phase=settled]'))
await page.waitForTimeout(300)
await page.screenshot({path:`${dir}/before.png`})
const host=page.getByTestId('logo-particles'),b=await host.boundingBox()
console.log(b)
const y=b.y+b.height*.5,start=b.x+b.width*.5-200*Math.min(b.width,b.height)/800*1.12
await page.mouse.move(start,y)
await page.waitForTimeout(30)
const begun=Date.now()
for(let i=1;i<=44;i++){
 await page.mouse.move(start+i*20,y)
 await page.waitForTimeout(12)
}
const captureStarted=Date.now()
await page.screenshot({path:`${dir}/during.png`})
const captureElapsedMs=Date.now()-captureStarted,strokeElapsedMs=Date.now()-begun
const state=await page.getByTestId('execution-graph-canvas').getAttribute('data-wake')
await page.waitForFunction(()=>document.querySelector('[data-wake-energy="0"]'))
await page.screenshot({path:`${dir}/after.png`})
await writeFile(`${dir}/report.json`,JSON.stringify({captureElapsedMs,strokeElapsedMs,state:JSON.parse(state)},null,2))
console.log(state)
await browser.close()
