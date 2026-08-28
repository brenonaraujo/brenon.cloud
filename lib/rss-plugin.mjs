import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateRssFiles } from './generate-rss.mjs'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

export function rssPlugin({ siteUrl = 'https://brenon.cloud' } = {}) {
  return {
    name: 'blog-rss',
    apply: 'build',
    generateBundle() {
      const feeds = generateRssFiles({
        dir: path.join(root, 'src', 'content', 'blog'),
        siteUrl
      })
      for (const [fileName, source] of Object.entries(feeds)) {
        this.emitFile({ type: 'asset', fileName, source })
      }
    }
  }
}
