import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { mergeCatalog } from '../src/config/console-native.mjs'
import { factsFor } from '../src/config/console-service-facts.mjs'
import { visibleForGroups } from '../src/config/console-acl.mjs'
import {
  canManageHermes,
  groupServices,
  isHermesOperator,
  isHermesSubscriber,
  isStaff,
  primaryPlan,
  searchServices,
  serviceKind
} from '../src/config/console-taxonomy.mjs'
import {
  prefsKey,
  readPrefs,
  recordVisit,
  resolveByIds,
  toggleFavorite,
  markNotificationsRead,
  unreadNotifications,
  paginate
} from '../src/config/console-prefs.mjs'

describe('serviceKind', () => {
  it('treats wildcard products as applications', () => {
    assert.equal(serviceKind({ id: 'draw', groups: ['*'] }), 'application')
  })

  it('treats known ops consoles as platform', () => {
    assert.equal(serviceKind({ id: 'konga', groups: ['api-owner'] }), 'platform')
    assert.equal(serviceKind({ id: 'portainer', groups: ['brenon-admins'] }), 'platform')
    assert.equal(serviceKind({ id: 'authentik', groups: ['brenon-admins'] }), 'platform')
  })

  it('honors explicit kind from the control plane', () => {
    assert.equal(serviceKind({ id: 'draw', groups: ['*'], kind: 'platform' }), 'platform')
    assert.equal(serviceKind({ id: 'custom', category: 'product' }), 'application')
  })
})

describe('groupServices / searchServices', () => {
  const catalog = [
    { id: 'draw', groups: ['*'], title: { en: 'Draw', pt: 'Draw' }, description: { en: 'Whiteboard', pt: 'Quadro' }, url: 'https://draw.brenon.cloud' },
    { id: 'grafana', groups: ['brenon-admins'], title: { en: 'Grafana' }, description: { en: 'Metrics' }, url: 'https://grafana.brenon.cloud' }
  ]

  it('splits application vs platform', () => {
    const grouped = groupServices(catalog)
    assert.deepEqual(grouped.applications.map((s) => s.id), ['draw'])
    assert.deepEqual(grouped.platform.map((s) => s.id), ['grafana'])
  })

  it('searches title, host and id', () => {
    assert.deepEqual(searchServices(catalog, 'draw').map((s) => s.id), ['draw'])
    assert.deepEqual(searchServices(catalog, 'grafana.brenon').map((s) => s.id), ['grafana'])
    assert.equal(searchServices(catalog, 'nope').length, 0)
  })
})

describe('plans and hermes access', () => {
  it('prefers plan-pro, then hermes, then basic, then free', () => {
    assert.equal(primaryPlan(['plan-free', 'plan-pro']), 'pro')
    assert.equal(primaryPlan(['plan-free', 'plan-hermes']), 'hermes')
    assert.equal(primaryPlan(['plan-free', 'plan-basic']), 'basic')
    assert.equal(primaryPlan(['plan-free']), 'free')
    assert.equal(primaryPlan([]), 'free')
  })

  it('keeps staff distinct from the hermes subscriber', () => {
    assert.equal(isStaff(['brenon-admins']), true)
    assert.equal(isStaff(['plan-free']), false)
    assert.equal(isHermesSubscriber(['plan-hermes']), true)
    assert.equal(isHermesSubscriber(['plan-pro']), true)
    assert.equal(isHermesSubscriber(['hermes-owner']), false)
    assert.equal(isHermesOperator(['hermes-owner']), true)
    assert.equal(canManageHermes(['plan-hermes']), true)
    assert.equal(canManageHermes(['plan-pro']), true)
    assert.equal(canManageHermes(['hermes-owner']), true)
    assert.equal(canManageHermes(['plan-free']), false)
  })
})

describe('console prefs', () => {
  it('records recents and favorites per account', () => {
    const storage = new Map()
    const mem = {
      getItem: (k) => (storage.has(k) ? storage.get(k) : null),
      setItem: (k, v) => storage.set(k, v)
    }
    recordVisit(mem, 'a@x.com', 'draw')
    recordVisit(mem, 'a@x.com', 'grafana')
    recordVisit(mem, 'a@x.com', 'draw')
    toggleFavorite(mem, 'a@x.com', 'draw')
    const prefs = readPrefs(mem, 'a@x.com')
    assert.deepEqual(prefs.recent, ['draw', 'grafana'])
    assert.deepEqual(prefs.favorites, ['draw'])
    assert.equal(prefsKey('A@x.com'), 'brenon-console:a@x.com')
    const resolved = resolveByIds(
      [{ id: 'draw' }, { id: 'grafana' }],
      prefs.recent
    )
    assert.deepEqual(resolved.map((s) => s.id), ['draw', 'grafana'])
  })

  it('marks notifications read and paginates', () => {
    const storage = new Map()
    const mem = {
      getItem: (k) => (storage.has(k) ? storage.get(k) : null),
      setItem: (k, v) => storage.set(k, v)
    }
    markNotificationsRead(mem, 'a@x.com', ['catalog-offline'])
    const items = [{ id: 'catalog-offline' }, { id: 'hermes-provision' }]
    const unread = unreadNotifications(items, readPrefs(mem, 'a@x.com').readNotifications)
    assert.deepEqual(unread.map((i) => i.id), ['hermes-provision'])
    const lots = Array.from({ length: 25 }, (_, i) => ({ id: String(i) }))
    const p2 = paginate(lots, 2, 10)
    assert.equal(p2.page, 2)
    assert.equal(p2.pages, 3)
    assert.equal(p2.items.length, 10)
    assert.equal(p2.items[0].id, '10')
  })
})

describe('native authentik + console-air tiles', () => {
  it('is admin-only and merges without duplicating the catalog', () => {
    const merged = mergeCatalog([{ id: 'draw', groups: ['*'] }])
    assert.equal(merged.some((s) => s.id === 'authentik'), true)
    assert.equal(visibleForGroups(merged, ['plan-free']).some((s) => s.id === 'authentik'), false)
    assert.equal(visibleForGroups(merged, ['brenon-admins']).some((s) => s.id === 'authentik'), true)
    const again = mergeCatalog([{ id: 'authentik', groups: ['brenon-admins'] }])
    assert.equal(again.filter((s) => s.id === 'authentik').length, 1)
  })

  it('shows Console Air to any signed-in account including free', () => {
    const merged = mergeCatalog([{ id: 'draw', groups: ['*'] }])
    assert.equal(visibleForGroups(merged, ['plan-free']).some((s) => s.id === 'console-air'), true)
    assert.equal(serviceKind({ id: 'console-air', groups: ['*'] }), 'platform')
  })
})

describe('service facts', () => {
  it('returns real host copy for Console Air and Draw', () => {
    const air = factsFor('console-air', 'en')
    assert.equal(air.plan, 'free')
    assert.match(air.bullets[0], /akash\.brenon\.cloud/)
    const draw = factsFor('draw', 'pt')
    assert.match(draw.bullets[0], /draw\.brenon\.cloud/)
  })
})
