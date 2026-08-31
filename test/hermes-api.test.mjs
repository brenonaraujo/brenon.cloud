import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  agentSlug,
  hermesTuiLoginUrl,
  hermesTuiUrl,
  humanHermesError,
  pickReadyHermesInstance,
  stripAgentPrefix
} from '../src/api/hermesApi.js'

describe('humanHermesError', () => {
  it('does not surface fetch failures', () => {
    assert.equal(humanHermesError(new Error('Failed to fetch'), 'soon'), 'soon')
    assert.equal(humanHermesError(new Error('Load failed'), 'soon'), 'soon')
    assert.equal(humanHermesError(new Error('Basic or Pro required'), 'soon'), 'Basic or Pro required')
  })
})

describe('agentSlug', () => {
  it('locks the agent- prefix', () => {
    assert.equal(agentSlug('brenonaraujo'), 'agent-brenonaraujo')
    assert.equal(agentSlug('agent-studio'), 'agent-studio')
    assert.equal(stripAgentPrefix('agent-agent-x'), 'x')
  })
})

describe('pickReadyHermesInstance', () => {
  it('prefers the ready row for the signed-in email', () => {
    const mine = { email: 'me@x', ready: true, hostname: 'agent-me.brenon.cloud' }
    const other = { email: 'you@x', ready: true, hostname: 'agent-you.brenon.cloud' }
    assert.equal(pickReadyHermesInstance([other, mine], 'me@x'), mine)
  })

  it('falls back to the first ready hostname when emails do not match', () => {
    const ready = { email: 'stored@x', ready: true, hostname: 'agent-brenonaraujo.brenon.cloud' }
    assert.equal(pickReadyHermesInstance([ready], 'jwt@x'), ready)
  })

  it('ignores rows that are not ready to chat', () => {
    assert.equal(
      pickReadyHermesInstance([{ email: 'me@x', ready: false, hostname: 'h' }], 'me@x'),
      null
    )
  })
})

describe('hermesTuiUrl', () => {
  it('uses tuiUrl from the API when present', () => {
    assert.equal(
      hermesTuiUrl({ tuiUrl: 'https://agent-x.brenon.cloud/hermes/tui' }),
      'https://agent-x.brenon.cloud/hermes/tui'
    )
  })

  it('falls back to /hermes/tui on a .brenon.cloud hostname', () => {
    assert.equal(
      hermesTuiUrl({ hostname: 'agent-brenonaraujo.brenon.cloud' }),
      'https://agent-brenonaraujo.brenon.cloud/hermes/tui'
    )
  })

  it('returns empty when the backend has not published a host yet', () => {
    assert.equal(hermesTuiUrl({}), '')
    assert.equal(hermesTuiUrl(null), '')
  })

  it('rejects off-host and dashboard URLs', () => {
    assert.equal(hermesTuiUrl({ tuiUrl: 'https://evil.example/hermes/tui' }), '')
    assert.equal(hermesTuiUrl({ hostname: 'evil.example' }), '')
    assert.equal(
      hermesTuiUrl({ tuiUrl: 'https://agent-x.brenon.cloud/hermes/sessions' }),
      ''
    )
    assert.equal(
      hermesTuiUrl({ tuiUrl: 'https://agent-x.brenon.cloud/hermes/chat' }),
      ''
    )
    assert.equal(hermesTuiUrl({ tuiUrl: 'https://agent-x.brenon.cloud/hermes' }), '')
    assert.equal(
      hermesTuiUrl({
        hostname: 'agent-x.brenon.cloud',
        tuiUrl: 'https://agent-y.brenon.cloud/hermes/tui'
      }),
      'https://agent-x.brenon.cloud/hermes/tui'
    )
  })
})

describe('hermesTuiLoginUrl', () => {
  it('opens tenant login with next=/hermes/tui', () => {
    assert.equal(
      hermesTuiLoginUrl({ hostname: 'agent-x.brenon.cloud' }),
      'https://agent-x.brenon.cloud/hermes/login?next=/hermes/tui'
    )
  })
})

describe('Hermes dock stays on brenon.cloud', () => {
  it('may iframe /hermes/tui only; never dashboard or top-nav', () => {
    const dock = readFileSync(new URL('../src/components/HermesDock.vue', import.meta.url), 'utf8')
    const page = readFileSync(new URL('../src/pages/console/Hermes.vue', import.meta.url), 'utf8')
    assert.match(dock, /<iframe/)
    assert.match(dock, /hermesTuiUrl/)
    assert.match(dock, /\/hermes\/tui/)
    assert.match(dock, /allow-scripts/)
    assert.match(dock, /allow-same-origin/)
    assert.match(dock, /allow-forms/)
    assert.match(dock, /allow-popups/)
    assert.match(dock, /allow-popups-to-escape-sandbox/)
    assert.match(dock, /window\.open/)
    assert.match(dock, /hermes-fab/)
    assert.match(dock, /pickReadyHermesInstance/)
    assert.doesNotMatch(dock, /allow-top-navigation/)
    assert.doesNotMatch(dock, /sendHermesChat/)
    assert.doesNotMatch(dock, /hermes\/sessions/)
    assert.doesNotMatch(dock, /hermes-mascot/)
    assert.doesNotMatch(dock, /\/hermes\/chat/)
    assert.equal(/href=.*\/hermes['"]/.test(dock), false)
    assert.equal(page.includes('<iframe'), false)
    assert.equal(page.includes('hermes/sessions'), false)
    assert.equal(page.includes('hermes-mascot'), false)
    assert.equal(page.includes('/hermes/chat'), false)
    assert.equal(/href=.*\/hermes['"]/.test(page), false)
  })
})
