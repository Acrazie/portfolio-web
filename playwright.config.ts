import { defineConfig, devices } from '@playwright/test'
export default defineConfig({
 testDir:'./tests', fullyParallel:false, workers:1, reporter:[['list'],['html',{open:'never'}]],
 use:{baseURL:'http://127.0.0.1:4173',trace:'retain-on-failure'},
 webServer:{command:'bun run dev --host 127.0.0.1 --port 4173 --strictPort',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI},
 projects:[{name:'chromium',use:{...devices['Desktop Chrome']}},{name:'mobile',use:{...devices['Pixel 7']}}],
})
