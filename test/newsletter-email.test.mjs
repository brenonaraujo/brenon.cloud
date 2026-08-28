import { test } from 'node:test'
import assert from 'node:assert/strict'
import { renderConfirmEmail, renderPostEmail } from '../lib/newsletter-email.mjs'

test('confirm email is a full HTML document with a button', () => {
  const html = renderConfirmEmail({
    locale: 'pt',
    confirmUrl: 'https://brenon.cloud/newsletter/confirm?token=abc'
  })
  assert.match(html, /<!DOCTYPE html>/i)
  assert.match(html, /#0f172a/)
  assert.match(html, /Confirmar inscrição/)
  assert.match(html, /https:\/\/brenon.cloud\/newsletter\/confirm\?token=abc/)
  assert.match(html, /min-height:44px/)
  assert.match(html, /https:\/\/brenon\.cloud\/brenon-cloud-logo\.png/)
  assert.match(html, /alt="Brenon.Cloud"/)
  assert.doesNotMatch(html, /<p>Oi\.<\/p>/)
})

test('post email includes title and unsubscribe', () => {
  const html = renderPostEmail({
    locale: 'en',
    title: 'Hello <Cloud>',
    description: 'A & B',
    postUrl: 'https://brenon.cloud/blog/hello',
    unsubUrl: 'https://brenon.cloud/newsletter/unsubscribe?token=x'
  })
  assert.match(html, /Hello &lt;Cloud&gt;/)
  assert.match(html, /A &amp; B/)
  assert.match(html, /Unsubscribe/)
  assert.match(html, /newsletter\/unsubscribe\?token=x/)
})
