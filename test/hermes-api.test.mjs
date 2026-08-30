import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { agentSlug, humanHermesError, stripAgentPrefix } from '../src/api/hermesApi.js'

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
