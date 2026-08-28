import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createToken, verifyToken } from '../lib/newsletter-token.mjs'

const SECRET = 'test-signing-secret'

test('createToken round-trips email locale and purpose before expiry', () => {
  const token = createToken(
    { email: 'reader@example.com', locale: 'pt', purpose: 'confirm' },
    { secret: SECRET, now: 1_700_000_000_000, ttlMs: 60 * 60 * 1000 }
  )
  const payload = verifyToken(token, { secret: SECRET, now: 1_700_000_000_000 + 1000 })
  assert.equal(payload.email, 'reader@example.com')
  assert.equal(payload.locale, 'pt')
  assert.equal(payload.purpose, 'confirm')
})

test('verifyToken rejects expired and tampered tokens', () => {
  const token = createToken(
    { email: 'reader@example.com', locale: 'en', purpose: 'unsub' },
    { secret: SECRET, now: 1_700_000_000_000, ttlMs: 1000 }
  )
  assert.equal(verifyToken(token, { secret: SECRET, now: 1_700_000_002_000 }), null)
  assert.equal(verifyToken(token.slice(0, -2) + 'ab', { secret: SECRET, now: 1_700_000_000_000 }), null)
  assert.equal(verifyToken(token, { secret: 'other', now: 1_700_000_000_000 }), null)
})
