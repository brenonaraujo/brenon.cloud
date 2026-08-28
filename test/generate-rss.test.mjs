import { test } from 'node:test'
import assert from 'node:assert/strict'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateRssFiles } from '../lib/generate-rss.mjs'

const blogDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'blog')

test('generateRssFiles from the real blog directory includes known posts', () => {
  const feeds = generateRssFiles({ dir: blogDir, siteUrl: 'https://brenon.cloud' })
  assert.match(feeds['feed.en.xml'], /<rss version="2.0"/)
  assert.match(feeds['feed.pt.xml'], /<language>pt-BR<\/language>/)
  assert.match(feeds['feed.en.xml'], /\/blog\/agentic-loop-engineering/)
  assert.match(feeds['feed.pt.xml'], /\/blog\/tibiapixel/)
})
