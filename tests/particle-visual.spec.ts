import {expect,test} from '@playwright/test'
import {mkdir,writeFile} from 'node:fs/promises'
import {inkPoints,patches} from './particle-pixels'
test('records the requested responsive rendered compositions and no-JS fallback',async({browser,baseURL},info)=>{
 test.skip(info.project.name!=='chromium','Explicit viewport/DPR matrix; no duplicate mobile run')
 test.setTimeout(180000)
 const dir='.hermes/evidence/screenshots';await mkdir(dir,{recursive:true})
 const report:Array<{name:string;stage:string;scrollY:number;captureElapsedMs:number;dpr:number;effectiveDpr:number;quality:number}>=[]
 const frames:Array<{name:string;frameIntervalsMs:number[]}>=[]
 for(const [name,width,height,dpr] of [['desktop',1440,1000,1],['mobile',393,852,2],['narrow',320,568,1],['large',2750,1510,1.5]] as const){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:dpr,recordVideo:{dir:'.hermes/evidence/videos',size:{width:Math.min(width,1440),height:Math.min(height,1000)}}}),page=await context.newPage(),errors:string[]=[]
  page.on('pageerror',e=>errors.push(e.message));await page.goto(baseURL!)
  const early=page.getByTestId('execution-graph-canvas')
  await expect(early).toHaveAttribute('data-phase','intro');await page.screenshot({path:`${dir}/${name}-${width}x${height}-depth.png`,scale:'css'})
  await expect.poll(()=>early.getAttribute('data-intro').then(Number)).toBeGreaterThan(.4)
  await page.screenshot({path:`${dir}/${name}-${width}x${height}-gather.png`,scale:'css'})
  frames.push({name,frameIntervalsMs:await page.evaluate(()=>new Promise<number[]>(resolve=>{
   const samples:number[]=[];let last=0,draw=''
   const frame=(now:number)=>{const current=document.querySelector<HTMLElement>('[data-testid=execution-graph-canvas]')?.dataset.drawCount||'';if(current!==draw){if(last)samples.push(now-last);last=now;draw=current}if(samples.length===120)resolve(samples);else requestAnimationFrame(frame)}
   requestAnimationFrame(frame)
  }))})
  const graph=page.getByTestId('execution-graph-canvas'),capture=async(stage:string)=>{const started=Date.now();await page.screenshot({path:`${dir}/${name}-${width}x${height}-${stage}.png`,scale:'css'});report.push({name,stage,scrollY:await page.evaluate(()=>scrollY),captureElapsedMs:Date.now()-started,dpr,effectiveDpr:Number(await graph.getAttribute('data-dpr')),quality:Number(await graph.getAttribute('data-quality'))})}
  await expect(graph).toHaveAttribute('data-phase','settled',{timeout:20000});await capture('top')
  const targets=await patches(page,await graph.locator('canvas').screenshot({scale:'css'})),p=targets[0]
  await page.mouse.move(p.x-20,p.y);await page.waitForTimeout(20);await page.mouse.move(p.x+20,p.y);await capture('push')
  await expect(graph).toHaveAttribute('data-push-energy','0',{timeout:14000})
  await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight/2,behavior:'instant'}));await expect(graph).toHaveAttribute('data-split','1');await capture('mid')
  for(const [stage,selector] of [['hero-exit','#capabilities'],['work','#work'],['contact','#contact']] as const){
   await page.locator(selector).evaluate(el=>scrollTo({top:el.getBoundingClientRect().top+scrollY,behavior:'instant'}))
   await page.waitForTimeout(850);await capture(stage)
  }
  await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));await expect(graph).toHaveAttribute('data-word','1');await capture('bottom')
  const count=await graph.getAttribute('data-draw-count')
  const ink=(await inkPoints(page)).ink[0];await page.mouse.click(ink.x,ink.y);await capture('no-click-effect')
  expect(await graph.getAttribute('data-draw-count')).toBe(count)
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await expect(graph).toHaveAttribute('data-split','0');await capture('reverse')
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBe(0);expect(errors).toEqual([])
  await context.close();await page.video()?.saveAs(`.hermes/evidence/videos/${name}-${width}x${height}.webm`)
  const staticContext=await browser.newContext({viewport:{width,height},javaScriptEnabled:false}),staticPage=await staticContext.newPage()
  await staticPage.goto(baseURL!);await staticPage.screenshot({path:`${dir}/${name}-${width}x${height}-noJS.png`,scale:'css'})
  await expect(staticPage.locator('canvas')).toHaveCount(0);await expect(staticPage.getByTestId('particle-word')).toBeVisible();await staticContext.close()
 }
 await writeFile(`${dir}/metrics.json`,JSON.stringify(report,null,2))
 await writeFile(`${dir}/frame-intervals.json`,JSON.stringify(frames,null,2))
})
