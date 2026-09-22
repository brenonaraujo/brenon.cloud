const OFF = 'brenon-analytics-off'
const COLLECT = 'https://control.brenon.cloud/api/v1/analytics/collect'

const allowed = /^\/(?:$|blog(?:\/[a-z0-9][a-z0-9._-]{0,120})?|service|path|games(?:\/[a-z0-9][a-z0-9._-]{0,80})?)$/

export function allowPath(path) {
  return typeof path === 'string' && !path.includes('..') && allowed.test(path)
}

export function applyOptOut(search, storage) {
  const q = new URLSearchParams(search)
  if (q.get('nocount') === '1') storage.setItem(OFF, '1')
  if (q.get('nocount') === '0') storage.removeItem(OFF)
  return storage.getItem(OFF) === '1'
}

export function ensureId(storage, key) {
  const cur = storage.getItem(key)
  if (cur) return cur
  const id = crypto.randomUUID()
  storage.setItem(key, id)
  return id
}

export function createTracker({ storage, sessionStorage, send, now, hidden }) {
  let active = null

  function optedOut() {
    return storage.getItem(OFF) === '1'
  }

  function emit(path, ms) {
    send(JSON.stringify({
      visitor_id: ensureId(storage, 'brenon-visitor'),
      session_id: ensureId(sessionStorage, 'brenon-session'),
      path,
      visible_ms: Math.round(ms)
    }))
  }

  function flush() {
    if (!active || hidden()) return
    const t = now()
    active.acc += t - active.t
    active.t = t
    emit(active.path, active.acc)
  }

  return {
    start(path) {
      applyOptOut(globalThis.location ? globalThis.location.search : '', storage)
      if (active && !hidden()) {
        active.acc += now() - active.t
        emit(active.path, active.acc)
      }
      active = null
      if (!allowPath(path) || optedOut()) return
      active = { path, t: now(), acc: 0 }
      emit(path, 0)
    },
    beat() {
      if (!active || hidden()) return
      flush()
    },
    hide() {
      if (!active) return
      const t = now()
      active.acc += t - active.t
      active.t = t
      emit(active.path, active.acc)
    },
    show() {
      if (!active) return
      active.t = now()
    },
    stop() {
      if (!active) return
      if (!hidden()) flush()
      active = null
    },
  }
}

export function installAnalytics(router) {
  try {
    wireAnalytics(router)
  } catch (err) {
    console.error('analytics install:', err)
  }
}

function wireAnalytics(router) {
  applyOptOut(location.search, localStorage)
  if (location.search.includes('nocount=')) {
    const url = new URL(location.href)
    url.searchParams.delete('nocount')
    history.replaceState({}, '', url.pathname + url.search + url.hash)
  }
  const tracker = createTracker({
    storage: localStorage,
    sessionStorage,
    send: (body) => {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(COLLECT, new Blob([body], { type: 'text/plain' }))
        return
      }
      fetch(COLLECT, { method: 'POST', mode: 'cors', headers: { 'Content-Type': 'text/plain' }, body, keepalive: true }).catch(() => {})
    },
    now: () => performance.now(),
    hidden: () => document.hidden
  })
  router.afterEach((to) => tracker.start(to.path))
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) tracker.hide()
    else tracker.show()
  })
  window.addEventListener('pagehide', () => tracker.stop())
  setInterval(() => tracker.beat(), 15000)
  tracker.start(router.currentRoute.value.path)
}
