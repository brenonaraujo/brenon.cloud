import fs from 'node:fs'
import path from 'node:path'
import { toPostRecord, postsForLocale } from './blog-content.mjs'
import { buildRssFeed } from './rss.mjs'

export function loadBlogRecords(dir) {
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => toPostRecord(name, fs.readFileSync(path.join(dir, name), 'utf8')))
}

export function generateRssFiles({ dir, siteUrl }) {
  const records = loadBlogRecords(dir)
  return {
    'feed.en.xml': buildRssFeed({
      siteUrl,
      locale: 'en',
      title: 'Brenon.Cloud Blog',
      description: 'Notes, deep-dives and lessons learned while running a personal cloud.',
      posts: postsForLocale(records, 'en')
    }),
    'feed.pt.xml': buildRssFeed({
      siteUrl,
      locale: 'pt',
      title: 'Blog do Brenon.Cloud',
      description: 'Notas, mergulhos técnicos e lições aprendidas operando uma nuvem pessoal.',
      posts: postsForLocale(records, 'pt')
    })
  }
}
