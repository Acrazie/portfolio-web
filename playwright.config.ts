import { defineConfig, devices } from '@playwright/test'
export default defineConfig({
 testDir:'./tests', fullyParallel:false, workers:1, reporter:[['list'],['html',{open:'never'}]],
 use:{baseURL:process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4173',trace:'retain-on-failure'},
 webServer:process.env.PLAYWRIGHT_BASE_URL ? undefined : {command:'bun run dev --host 127.0.0.1 --port 4173 --strictPort',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI},
 projects:[{name:'chromium',use:{...devices['Desktop Chrome']}},{name:'mobile',use:{...devices['Pixel 7']}},...(process.env.TEST_WEBKIT ? [{name:'webkit',use:{...devices['Desktop Safari']}}] : [])],
})
