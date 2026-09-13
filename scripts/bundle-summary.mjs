import { readdirSync, readFileSync, appendFileSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

const assetsDir = '.output/public/assets'

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  const kb = (bytes / 1024).toFixed(2)
  return `${kb} kB`
}

try {
  const files = readdirSync(assetsDir)
  const items = []

  for (const file of files) {
    if (!file.endsWith('.js') && !file.endsWith('.css') && !file.endsWith('.woff2')) continue
    const fullPath = join(assetsDir, file)
    const content = readFileSync(fullPath)
    const rawSize = content.length
    const gzipSize = gzipSync(content).length
    items.push({ file, rawSize, gzipSize })
  }

  // Sort descending by gzip size
  items.sort((a, b) => b.gzipSize - a.gzipSize)

  let summary = '### 📦 Production Bundle Assets Summary\n\n'
  summary += '| Asset | Raw Size | Gzip Size |\n'
  summary += '| :--- | :--- | :--- |\n'

  for (const item of items) {
    summary += `| \`${item.file}\` | ${formatBytes(item.rawSize)} | **${formatBytes(item.gzipSize)}** |\n`
  }

  console.log(summary)

  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${summary}\n`)
  }
} catch (error) {
  console.warn('Could not generate bundle summary:', error.message)
}
