import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
const dir='test-results/logo-hero'
await mkdir(dir,{recursive:true})
const browser=await chromium.launch()
const report=[]
for(const [width,height] of [[1440,1000],[393,852],[320,852],[2750,1510]]) {
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1})
 const errors=[];page.on('pageerror',e=>errors.push(e.message))
 await page.goto('http://127.0.0.1:4180/')
 const graph=page.getByTestId('execution-graph-canvas')
 await graph.waitFor()
 await page.waitForFunction(()=>document.querySelector('[data-ready=true]'))
 await page.screenshot({path:`${dir}/${width}-intro.png`})
 await page.waitForTimeout(1000)
 await page.screenshot({path:`${dir}/${width}-converging.png`})
 await page.waitForFunction(()=>document.querySelector('[data-phase=settled]'))
 await page.screenshot({path:`${dir}/${width}-settled.png`})
 report.push({width,height,errors,overflow:await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),canvasReady:await graph.getAttribute('data-ready'),phase:await graph.getAttribute('data-phase')})
 if(width===1440){await page.evaluate(()=>scrollTo(0,400));await page.waitForTimeout(200);await page.screenshot({path:`${dir}/scroll.png`})}
 await page.close()
}
for(const mode of ['no-js','reduced']){
 const page=await browser.newPage({viewport:{width:1440,height:1000},javaScriptEnabled:mode!=='no-js',reducedMotion:mode==='reduced'?'reduce':'no-preference'})
 await page.goto('http://127.0.0.1:4180/')
 if(mode==='reduced')await page.waitForFunction(()=>document.querySelector('[data-phase=settled]'))
 await page.screenshot({path:`${dir}/${mode}.png`});await page.close()
}
await browser.close()
await writeFile(`${dir}/report.json`,JSON.stringify(report,null,2))
console.log(JSON.stringify(report,null,2))
