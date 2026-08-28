import { test } from 'node:test'
import assert from 'node:assert/strict'
import { MemorySubscriberStore } from '../lib/subscribers.mjs'
import { createNewsletterService } from '../lib/newsletter-service.mjs'

function setup() {
  const sent = []
  const store = new MemorySubscriberStore()
  const service = createNewsletterService({
    store,
    sendEmail: async (msg) => {
      sent.push(msg)
    },
    secret: 'test-secret',
    siteUrl: 'https://brenon.cloud',
    from: 'Brenon.Cloud <news@brenon.cloud>',
    now: () => 1_700_000_000_000
  })
  return { sent, store, service }
}

test('subscribe ignores honeypot and does not send mail', async () => {
  const { sent, service } = setup()
  const result = await service.subscribe({
    email: 'bot@example.com',
    locale: 'pt',
    website: 'http://spam.test'
  })
  assert.deepEqual(result, { ok: true, ignored: true })
  assert.equal(sent.length, 0)
})

test('subscribe rejects invalid email', async () => {
  const { sent, service } = setup()
  const result = await service.subscribe({ email: 'not-an-email', locale: 'pt' })
  assert.equal(result.ok, false)
  assert.equal(result.error, 'invalid_email')
  assert.equal(sent.length, 0)
})

test('subscribe sends confirmation and confirm adds the reader', async () => {
  const { sent, store, service } = setup()
  const pending = await service.subscribe({ email: 'Reader@Example.com', locale: 'pt' })
  assert.equal(pending.ok, true)
  assert.equal(pending.pending, true)
  assert.equal(store.list('pt').length, 0)
  assert.equal(sent.length, 1)
  assert.equal(sent[0].to, 'reader@example.com')
  assert.match(sent[0].subject, /confirm/i)
  assert.match(sent[0].html, /\/newsletter\/confirm\?token=/)

  const token = sent[0].html.match(/token=([^"&\s]+)/)[1]
  const confirmed = await service.confirm(token)
  assert.equal(confirmed.ok, true)
  assert.deepEqual(store.list('pt').map((s) => s.email), ['reader@example.com'])
})

test('broadcast sends only to confirmed readers of that locale', async () => {
  const { sent, service } = setup()
  await service.subscribe({ email: 'pt@example.com', locale: 'pt' })
  await service.subscribe({ email: 'en@example.com', locale: 'en' })
  const ptToken = sent[0].html.match(/token=([^"&\s]+)/)[1]
  await service.confirm(ptToken)
  sent.length = 0

  const result = await service.broadcast({
    slug: 'hello-cloud',
    locale: 'pt',
    title: 'Olá nuvem',
    description: 'Primeiro aviso',
    urlPath: '/blog/hello-cloud'
  })

  assert.equal(result.sent, 1)
  assert.equal(sent.length, 1)
  assert.equal(sent[0].to, 'pt@example.com')
  assert.match(sent[0].subject, /Olá nuvem/)
  assert.match(sent[0].html, /https:\/\/brenon.cloud\/blog\/hello-cloud/)
  assert.match(sent[0].html, /\/newsletter\/unsubscribe\?token=/)
})

test('unsubscribe stops further broadcasts', async () => {
  const { sent, store, service } = setup()
  await service.subscribe({ email: 'pt@example.com', locale: 'pt' })
  const confirmToken = sent[0].html.match(/token=([^"&\s]+)/)[1]
  await service.confirm(confirmToken)
  sent.length = 0
  await service.broadcast({
    slug: 'one',
    locale: 'pt',
    title: 'One',
    description: 'd',
    urlPath: '/blog/one'
  })
  const unsubToken = sent[0].html.match(/unsubscribe\?token=([^"&\s]+)/)[1]
  const unsub = await service.unsubscribe(unsubToken)
  assert.equal(unsub.ok, true)
  assert.equal(store.list('pt').length, 0)
  sent.length = 0
  const again = await service.broadcast({
    slug: 'two',
    locale: 'pt',
    title: 'Two',
    description: 'd',
    urlPath: '/blog/two'
  })
  assert.equal(again.sent, 0)
  assert.equal(sent.length, 0)
})
