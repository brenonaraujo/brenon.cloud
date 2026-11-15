import test from 'node:test'
import assert from 'node:assert/strict'
import {
  allowPath,
  applyOptOut,
  cleanReferrer,
  doNotTrackEnabled,
  resolveAnalyticsConfig,
  trackingDecision
} from '../src/analytics.js'

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

test('config off unless url and website id are both set', () => {
  assert.equal(resolveAnalyticsConfig('', 'db5485ed-47f0-433d-925e-342e60f8c477'), null)
  assert.equal(resolveAnalyticsConfig('https://analytics.brenon.cloud', ''), null)
  assert.equal(resolveAnalyticsConfig('not a url', 'id'), null)
  assert.deepEqual(
    resolveAnalyticsConfig('https://analytics.brenon.cloud/', 'db5485ed-47f0-433d-925e-342e60f8c477'),
    {
      scriptUrl: 'https://analytics.brenon.cloud/script.js',
      websiteId: 'db5485ed-47f0-433d-925e-342e60f8c477'
    }
  )
})

test('decision is the path only, and only when allowed', () => {
  assert.deepEqual(trackingDecision({ path: '/blog/post-a', host: 'brenon.cloud' }), { url: '/blog/post-a' })
  assert.equal(trackingDecision({ path: '/console', host: 'brenon.cloud' }), null)
  assert.equal(trackingDecision({ path: '/', optedOut: true, host: 'brenon.cloud' }), null)
  assert.equal(trackingDecision({ path: '/', doNotTrack: true, host: 'brenon.cloud' }), null)
  assert.equal(trackingDecision({ path: '/', host: 'localhost' }), null)
  assert.equal(trackingDecision({ path: '/', host: '::1' }), null)
})

test('referrer drops query and fragment', () => {
  assert.equal(cleanReferrer('https://news.example/a?utm=1#x'), 'https://news.example/a')
  assert.equal(cleanReferrer(''), '')
})

test('same-origin referrer keeps only a public path', () => {
  const origin = 'https://brenon.cloud'
  assert.equal(cleanReferrer('https://brenon.cloud/blog/post-a?x=1', origin), '/blog/post-a')
  assert.equal(cleanReferrer('https://brenon.cloud/auth/callback?code=1', origin), '')
  assert.equal(cleanReferrer('https://news.example/a?utm=1', origin), 'https://news.example/a')
})

test('do not track is the browser signal 1', () => {
  assert.equal(doNotTrackEnabled({ doNotTrack: '1' }), true)
  assert.equal(doNotTrackEnabled({ doNotTrack: '0' }), false)
  assert.equal(doNotTrackEnabled(null), false)
})
