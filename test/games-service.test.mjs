import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { GamesService } from '../src/services/gamesService.js'

const dir = new URL('../src/content/games/', import.meta.url)
const entries = readdirSync(dir).filter(f => f.endsWith('.json')).map(f => {
  const m = f.replace(/\.json$/, '').match(/^(.+)\.(pt|en)$/)
  return { slug: m ? m[1] : f.replace(/\.json$/, ''), locale: m ? m[2] : null, data: JSON.parse(readFileSync(new URL(f, dir), 'utf8')) }
})
const service = new GamesService({
  getRawEntries: async () => entries,
  getRawEntriesBySlug: async slug => entries.filter(e => e.slug === slug)
})

test('embedded games keep their iframe and are not external', async () => {
  const tetris = await service.getGameBySlug('tetris', 'pt')
  assert.equal(tetris.iframe, '/games/tetris.html')
  assert.equal(tetris.external, null)
  assert.equal(tetris.requiresLogin, false)
})

test('Tiballz is listed as an external, login-gated online game', async () => {
  const all = await service.getAllGames('pt')
  const tiballz = all.find(g => g.slug === 'tiballz')
  assert.ok(tiballz, 'tiballz is in the catalog')
  assert.equal(tiballz.external, 'https://tiballz.brenon.cloud')
  assert.equal(tiballz.iframe, null)
  assert.equal(tiballz.requiresLogin, true)
  assert.equal(tiballz.players, 'online')
  assert.match(tiballz.description, /Esferas Estelares/)
  assert.match((await service.getGameBySlug('tiballz', 'en')).description, /Star Spheres/)
})

test('a manifest with neither iframe nor external is dropped', async () => {
  const broken = new GamesService({ getRawEntries: async () => [{ slug: 'x', locale: null, data: { title: 'X' } }], getRawEntriesBySlug: async () => [] })
  assert.deepEqual(await broken.getAllGames('en'), [])
})
