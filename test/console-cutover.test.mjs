import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CONSOLE_ORIGIN = 'https://console.brenon.cloud'

function read(rel) {
  return readFileSync(join(root, rel), 'utf8')
}

function redirectBlocks(toml) {
  const blocks = []
  const parts = toml.split('[[redirects]]').slice(1)
  for (const part of parts) {
    const from = part.match(/from\s*=\s*"([^"]+)"/)?.[1]
    const to = part.match(/to\s*=\s*"([^"]+)"/)?.[1]
    const status = Number(part.match(/status\s*=\s*(\d+)/)?.[1])
    const force = /force\s*=\s*true/.test(part)
    blocks.push({ from, to, status, force })
  }
  return blocks
}

function collectLocalImports(entryRel) {
  const visited = new Set()
  const queue = [entryRel]

  while (queue.length) {
    const rel = queue.pop()
    const norm = rel.replace(/\\/g, '/')
    if (visited.has(norm)) continue
    visited.add(norm)
    const abs = join(root, rel)
    if (!existsSync(abs)) continue
    const src = readFileSync(abs, 'utf8')
    const froms = [...src.matchAll(/from\s+['"](\.[^'"]+)['"]/g)].map((m) => m[1])
    const dir = dirname(rel)
    for (const spec of froms) {
      const raw = resolve(root, dir, spec)
      const candidates = [
        raw,
        `${raw}.js`,
        `${raw}.mjs`,
        `${raw}.vue`,
        join(raw, 'index.js')
      ]
      const hit = candidates.find((p) => existsSync(p))
      if (!hit) continue
      queue.push(hit.slice(root.length + 1))
    }
  }
  return visited
}

describe('Netlify 301 /console → console.brenon.cloud', () => {
  const toml = read('netlify.toml')
  const redirects = redirectBlocks(toml)

  it('sends /console and /console/* to the console host with 301 above the SPA catch-all', () => {
    const exact = redirects.find((r) => r.from === '/console')
    const splat = redirects.find((r) => r.from === '/console/*')
    const spa = redirects.find((r) => r.from === '/*')
    assert.ok(exact, 'missing /console redirect')
    assert.ok(splat, 'missing /console/* redirect')
    assert.ok(spa, 'missing SPA catch-all')
    assert.equal(exact.to, `${CONSOLE_ORIGIN}/`)
    assert.equal(exact.status, 301)
    assert.equal(exact.force, true)
    assert.equal(splat.to, `${CONSOLE_ORIGIN}/:splat`)
    assert.equal(splat.status, 301)
    assert.equal(splat.force, true)
    assert.ok(
      redirects.indexOf(exact) < redirects.indexOf(spa),
      '/console must sit above the SPA catch-all'
    )
    assert.ok(
      redirects.indexOf(splat) < redirects.indexOf(spa),
      '/console/* must sit above the SPA catch-all'
    )
  })

  it('does not 301 unrelated site paths that only contain the word console', () => {
    const froms = redirects.map((r) => r.from)
    assert.equal(froms.includes('/blog/*'), false)
    assert.equal(froms.some((f) => f.includes('*console*')), false)
  })
})

describe('AuthMenu account shortcut', () => {
  const vue = read('src/components/AuthMenu.vue')

  it('uses absolute console host URLs, not relative /console paths', () => {
    assert.match(vue, /href="https:\/\/console\.brenon\.cloud\/"/)
    assert.match(vue, /href="https:\/\/console\.brenon\.cloud\/hermes"/)
    assert.match(vue, /href="https:\/\/console\.brenon\.cloud\/account"/)
    assert.equal(vue.includes('to="/console'), false)
    assert.equal(vue.includes("to='/console"), false)
    assert.equal(vue.includes('href="/console'), false)
  })
})

describe('Site OIDC client stays brenon-cloud', () => {
  const auth = read('src/config/auth.js')

  it('keeps client_id brenon-cloud and the home issuer', () => {
    assert.match(auth, /AUTH_CLIENT_ID = 'brenon-cloud'/)
    assert.match(auth, /application\/o\/home\//)
    assert.equal(auth.includes("client_id: 'console'"), false)
    assert.equal(auth.includes('application/o/console/'), false)
  })

  it('does not default optional login back to the old /console path', () => {
    const store = read('src/stores/authStore.js')
    assert.equal(store.includes("returnTo = '/console'"), false)
    const cont = read('src/pages/AuthContinue.vue')
    assert.equal(cont.includes("login('/console')"), false)
  })
})

describe('Published site bundle omits the console shell', () => {
  it('does not statically import ConsoleLayout or console pages from the site entry', () => {
    const graph = collectLocalImports('src/main.js')
    const files = [...graph].map((f) => f.replace(/\\/g, '/'))
    assert.equal(files.some((f) => f.endsWith('layouts/ConsoleLayout.vue')), false)
    assert.equal(files.some((f) => f.includes('pages/console/')), false)
    assert.equal(files.some((f) => f.includes('components/console/')), false)
    const main = read('src/main.js')
    assert.equal(main.includes("path: '/console'"), false)
    assert.equal(main.includes("path: '/console/"), false)
  })

  it('built assets do not embed the console shell skip-link target', function () {
    const distJs = join(root, 'dist', 'assets')
    if (!existsSync(distJs)) {
      this.skip()
      return
    }
    const blobs = readdirSync(distJs)
      .filter((name) => extname(name) === '.js')
      .map((name) => readFileSync(join(distJs, name), 'utf8'))
      .join('\n')
    assert.equal(blobs.includes('console-main'), false)
    assert.equal(blobs.includes('ConsoleSidebar'), false)
    assert.equal(blobs.includes('/console/hermes'), false)
  })
})
