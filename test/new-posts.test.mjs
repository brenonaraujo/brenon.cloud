import { test } from 'node:test'
import assert from 'node:assert/strict'
import { postsFromAddedFiles } from '../lib/new-posts.mjs'

test('postsFromAddedFiles keeps only newly added blog markdown', () => {
  const files = {
    'src/content/blog/hello-cloud.pt.md': `---
title: Olá nuvem
description: Primeiro aviso
date: 2026-08-28
---
`,
    'src/content/blog/hello-cloud.en.md': `---
title: Hello cloud
description: First ping
date: 2026-08-28
---
`,
    'src/pages/Blog.vue': '<template></template>',
    'src/content/blog/hello-cloud.pt.md.bak': 'ignore'
  }

  const posts = postsFromAddedFiles(
    [
      'src/content/blog/hello-cloud.pt.md',
      'src/content/blog/hello-cloud.en.md',
      'src/pages/Blog.vue'
    ],
    files
  )

  assert.equal(posts.length, 2)
  assert.deepEqual(
    posts.map((p) => `${p.locale}:${p.slug}`).sort(),
    ['en:hello-cloud', 'pt:hello-cloud']
  )
  assert.equal(posts.find((p) => p.locale === 'pt').title, 'Olá nuvem')
  assert.equal(posts.find((p) => p.locale === 'en').urlPath, '/blog/hello-cloud')
})
