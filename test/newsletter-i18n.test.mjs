import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('newsletter locale strings must not contain @ (vue-i18n linked messages)', () => {
  for (const file of ['src/locales/en.json', 'src/locales/pt.json']) {
    const json = JSON.parse(readFileSync(file, 'utf8'))
    const blob = JSON.stringify(json.blog.newsletter)
    assert.equal(
      blob.includes('@'),
      false,
      `${file} blog.newsletter contains @ which crashes vue-i18n (INVALID_LINKED_FORMAT)`
    )
  }
})
