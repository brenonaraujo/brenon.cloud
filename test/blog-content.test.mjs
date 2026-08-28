import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseFilename, parseFrontmatter, postsForLocale } from '../lib/blog-content.mjs'

test('parseFilename reads locale suffix from blog markdown names', () => {
  assert.deepEqual(parseFilename('src/content/blog/welcome.en.md'), {
    slug: 'welcome',
    locale: 'en'
  })
  assert.deepEqual(parseFilename('src/content/blog/welcome.pt.md'), {
    slug: 'welcome',
    locale: 'pt'
  })
  assert.deepEqual(parseFilename('src/content/blog/neutral.md'), {
    slug: 'neutral',
    locale: null
  })
})

test('parseFrontmatter reads title description date and tags', () => {
  const raw = `---
title: Hello Cloud
description: A short summary.
date: 2026-08-28
author: Brenon Araujo
tags: [ai, cloud]
cover: /images/blog/hello.svg
---

# Hello Cloud

Body paragraph.
`
  const { data, body } = parseFrontmatter(raw)
  assert.equal(data.title, 'Hello Cloud')
  assert.equal(data.description, 'A short summary.')
  assert.equal(data.date, '2026-08-28')
  assert.deepEqual(data.tags, ['ai', 'cloud'])
  assert.match(body, /Body paragraph/)
})

test('postsForLocale prefers the requested language then the neutral file', () => {
  const records = [
    { slug: 'hello', locale: 'en', title: 'Hello', description: 'EN', date: '2026-08-01', author: 'Brenon Araujo' },
    { slug: 'hello', locale: 'pt', title: 'Olá', description: 'PT', date: '2026-08-01', author: 'Brenon Araujo' },
    { slug: 'only-en', locale: 'en', title: 'Only EN', description: 'x', date: '2026-08-02', author: 'Brenon Araujo' }
  ]
  const pt = postsForLocale(records, 'pt')
  assert.equal(pt.find((p) => p.slug === 'hello').title, 'Olá')
  assert.equal(pt.find((p) => p.slug === 'only-en').title, 'Only EN')
})
