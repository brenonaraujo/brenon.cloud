import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildRssFeed } from '../lib/rss.mjs'

test('buildRssFeed emits items for one locale with absolute post links', () => {
  const xml = buildRssFeed({
    siteUrl: 'https://brenon.cloud',
    locale: 'pt',
    title: 'Blog do Brenon.Cloud',
    description: 'Notas da nuvem pessoal.',
    posts: [
      {
        slug: 'hello-cloud',
        title: 'Olá <Cloud>',
        description: 'Resumo & mais',
        date: '2026-08-28',
        author: 'Brenon Araujo'
      }
    ]
  })

  assert.match(xml, /<rss version="2.0"/)
  assert.match(xml, /<language>pt-BR<\/language>/)
  assert.match(xml, /<link>https:\/\/brenon.cloud\/blog\/hello-cloud<\/link>/)
  assert.match(xml, /<guid isPermaLink="true">https:\/\/brenon.cloud\/blog\/hello-cloud\?lang=pt<\/guid>/)
  assert.match(xml, /Olá &lt;Cloud&gt;/)
  assert.match(xml, /Resumo &amp; mais/)
  assert.doesNotMatch(xml, /<title>Olá <Cloud><\/title>/)
})
