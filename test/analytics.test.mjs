import test from 'node:test'
import assert from 'node:assert/strict'
import { allowPath, applyOptOut, createTracker } from '../src/analytics.js'

function mem() {
  const m = new Map()
  return {
    getItem: (k) => m.has(k) ? m.get(k) : null,
    setItem: (k, v) => m.set(k, v),
    removeItem: (k) => m.delete(k)
  }
}

test('public paths only', () => {
  assert.equal(allowPath('/'), true)
  assert.equal(allowPath('/blog'), true)
  assert.equal(allowPath('/blog/akash-network-cloud-marketplace.pt'), true)
  assert.equal(allowPath('/console'), false)
  assert.equal(allowPath('/blog/../x'), false)
  assert.equal(allowPath('/auth/callback'), false)
})

test('opt out sticks until cleared', () => {
  const storage = mem()
  assert.equal(applyOptOut('?nocount=1', storage), true)
  assert.equal(applyOptOut('', storage), true)
  assert.equal(applyOptOut('?nocount=0', storage), false)
})

test('start emits a view and beat adds visible time', () => {
  const sent = []
  let t = 1000
  const tracker = createTracker({
    storage: mem(),
    sessionStorage: mem(),
    send: (body) => sent.push(JSON.parse(body)),
    now: () => t,
    hidden: () => false
  })
  tracker.start('/blog/post-a')
  assert.equal(sent.at(-1).path, '/blog/post-a')
  assert.equal(sent.at(-1).visible_ms, 0)
  t = 16000
  tracker.beat()
  assert.equal(sent.at(-1).visible_ms, 15000)
  tracker.start('/console')
  assert.equal(sent.at(-1).path, '/blog/post-a')
})

test('opted out sends nothing', () => {
  const storage = mem()
  storage.setItem('brenon-analytics-off', '1')
  const sent = []
  const tracker = createTracker({
    storage,
    sessionStorage: mem(),
    send: (body) => sent.push(body),
    now: () => 1,
    hidden: () => false
  })
  tracker.start('/')
  assert.equal(sent.length, 0)
})
