#!/usr/bin/env node
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import { postsFromAddedFiles } from '../lib/new-posts.mjs'

const ZERO = /^0+$/
const before = process.env.BEFORE_SHA || ''
const after = process.env.AFTER_SHA || 'HEAD'
const url = process.env.NEWSLETTER_BROADCAST_URL || 'https://brenon.cloud/.netlify/functions/newsletter-broadcast'
const secret = process.env.NEWSLETTER_BROADCAST_SECRET || ''

if (!before || ZERO.test(before)) {
  console.log('newsletter: skip (no previous commit to diff)')
  process.exit(0)
}

const names = execSync(`git diff --diff-filter=A --name-only ${before} ${after}`, {
  encoding: 'utf8'
})
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean)

const contents = Object.fromEntries(
  names.map((filePath) => [
    filePath,
    fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : ''
  ])
)
const posts = postsFromAddedFiles(names, contents)

if (posts.length === 0) {
  console.log('newsletter: no new blog posts')
  process.exit(0)
}

if (!secret) {
  console.error(`newsletter: ${posts.length} new post(s) but NEWSLETTER_BROADCAST_SECRET is missing`)
  process.exit(1)
}

for (const post of posts) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
  const text = await res.text()
  if (!res.ok) {
    console.error(`newsletter: broadcast failed for ${post.locale}:${post.slug} ${res.status} ${text}`)
    process.exit(1)
  }
  console.log(`newsletter: sent ${post.locale}:${post.slug} ${text}`)
}
