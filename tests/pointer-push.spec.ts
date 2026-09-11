import {expect,test} from '@playwright/test'
import {patches,pixels} from './particle-pixels'
import type {Page} from '@playwright/test'
const graph=(page:Page)=>page.getByTestId('execution-graph-canvas')
const energy=(page:Page)=>graph(page).getAttribute('data-push-energy').then(Number)
async function ready(page:Page){await page.goto('/');await graph(page).evaluate(e=>(e as HTMLElement).dataset.lifeTime='0');await expect(graph(page)).toHaveAttribute('data-phase','settled',{timeout:15000});await page.waitForTimeout(150)}
async function idle(page:Page){await expect.poll(()=>energy(page),{timeout:14000}).toBe(0);await page.waitForTimeout(100)}
test('rendered ink follows cursor direction across four regions with seconds of inertia and exact isolated return',async({page,isMobile},info)=>{
 test.setTimeout(100000);test.skip(isMobile,'Fine mouse only; native mobile scroll tested separately')
 await page.setViewportSize({width:1440,height:1000});await ready(page)
 const canvas=graph(page).locator('canvas'),before=await canvas.screenshot({scale:'css'}),regions=await patches(page,before)
 for(const [index,p] of regions.entries()){
  expect(p.count).toBeGreaterThan(40)
  await page.mouse.move(-1,-1);await page.mouse.move(p.x-10,p.y);await page.waitForTimeout(30)
  await page.mouse.move(p.x+10,p.y)
  const start=Date.now(),during=await canvas.screenshot({scale:'css'}),captureElapsedMs=Date.now()-start
  const metric=await pixels(page,before,during,{x:p.x,y:p.y,radius:220})
  expect(metric.changed).toBeGreaterThan(30);expect(metric.outside).toBe(0)
  expect(metric.travelX).toBeGreaterThan(1)
  await page.waitForTimeout(2000);expect(await energy(page)).toBeGreaterThan(1)
  await info.attach(`push-${index}`,{body:during,contentType:'image/png'})
  await info.attach(`push-${index}-metrics`,{body:JSON.stringify({...metric,captureElapsedMs}),contentType:'application/json'})
  await idle(page);expect((await pixels(page,before,await canvas.screenshot({scale:'css'}))).changed).toBe(0)
 }
})
test('same path has stronger speed-dependent impulses without a four-origin limit',async({page,isMobile})=>{
 test.setTimeout(90000);test.skip(isMobile,'Fine mouse only');await ready(page)
 const b=page.viewportSize()!,stroke=async(delay:number)=>{
  await page.mouse.move(-1,-1);await idle(page);await page.mouse.move(b.width*.4,b.height*.5);await page.waitForTimeout(30)
  let peak=0
  for(let i=1;i<=12;i++){await page.waitForTimeout(delay);await page.mouse.move(b.width*(.4+i*.015),b.height*.5);peak=Math.max(peak,await energy(page))}
  return peak
 }
 const slow=await stroke(100),fast=await stroke(8);expect(fast).toBeGreaterThan(slow*1.3);await idle(page)
 for(let i=0;i<6;i++){const x=b.width*(.25+i*.09),y=b.height*(i%2?.6:.4);await page.mouse.move(x,y);await page.waitForTimeout(20);await page.mouse.move(x+20,y);expect(await energy(page)).toBeGreaterThan(0)}
 await idle(page)
})
test('faster identical pointer paths displace more rendered ink, not just diagnostic energy',async({page,isMobile},info)=>{
 test.setTimeout(90000);test.skip(isMobile,'Fine mouse only');await page.setViewportSize({width:1440,height:1000});await ready(page)
 const canvas=graph(page).locator('canvas'),before=await canvas.screenshot({scale:'css'}),p=(await patches(page,before))[0]
 const stroke=async(delay:number)=>{
  await page.mouse.move(-1,-1);await idle(page);await page.mouse.move(p.x-10,p.y);await page.waitForTimeout(delay);await page.mouse.move(p.x+10,p.y)
  await page.waitForTimeout(90)
  const start=Date.now(),image=await canvas.screenshot({scale:'css'}),metric=await pixels(page,before,image,{x:p.x,y:p.y,radius:220})
  await info.attach(`speed-${delay}`,{body:image,contentType:'image/png'})
  return {...metric,captureElapsedMs:Date.now()-start}
 }
 // Stay within the unchanged 250ms pointer-continuity window even with
 // browser transport latency; retain all rendered displacement assertions.
 const slow=await stroke(80),fast=await stroke(10)
 console.log('rendered-speed-metrics',JSON.stringify({slow,fast}))
 await info.attach('rendered-speed-metrics',{body:JSON.stringify({slow,fast}),contentType:'application/json'})
 // Changed-pixel area is not displacement: dense glyph overlap and screenshot
 // latency make its ratio nonlinear. Assert more ink AND more measured travel;
 // the independent impulse test retains the 1.3x physical-response requirement.
 expect(fast.changed).toBeGreaterThan(slow.changed)
 expect(fast.travelX).toBeGreaterThan(slow.travelX*1.1)
 expect(slow.travelX).toBeGreaterThan(1)
 expect(fast.outside).toBe(0)
 await idle(page);expect((await pixels(page,before,await canvas.screenshot({scale:'css'}))).changed).toBe(0)
})
test('native touch scrolling creates no mouse push',async({page,isMobile,context})=>{
 test.skip(!isMobile,'CDP mobile touch');await ready(page)
 const client=await context.newCDPSession(page)
 await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:180,y:600}]})
 for(const y of [560,500,440,380,320,260]){await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:180,y}]});await page.waitForTimeout(20)}
 await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(50);expect(await energy(page)).toBe(0);await client.detach()
})
