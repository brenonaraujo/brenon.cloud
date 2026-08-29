const MAX_RECENT = 8

export function prefsKey(email) {
  return `brenon-console:${String(email || 'anon').toLowerCase()}`
}

export function emptyPrefs() {
  return { recent: [], favorites: [] }
}

export function readPrefs(storage, email) {
  if (!storage) return emptyPrefs()
  try {
    const raw = storage.getItem(prefsKey(email))
    if (!raw) return emptyPrefs()
    const parsed = JSON.parse(raw)
    return {
      recent: Array.isArray(parsed.recent) ? parsed.recent.map(String).filter(Boolean) : [],
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites.map(String).filter(Boolean) : []
    }
  } catch {
    return emptyPrefs()
  }
}

export function writePrefs(storage, email, prefs) {
  if (!storage) return emptyPrefs()
  const next = {
    recent: (prefs?.recent || []).slice(0, MAX_RECENT),
    favorites: [...new Set(prefs?.favorites || [])]
  }
  storage.setItem(prefsKey(email), JSON.stringify(next))
  return next
}

export function recordVisit(storage, email, id) {
  const key = String(id || '').trim()
  const prefs = readPrefs(storage, email)
  if (!key) return prefs
  const recent = [key, ...prefs.recent.filter((item) => item !== key)].slice(0, MAX_RECENT)
  return writePrefs(storage, email, { ...prefs, recent })
}

export function toggleFavorite(storage, email, id) {
  const key = String(id || '').trim()
  const prefs = readPrefs(storage, email)
  if (!key) return prefs
  const has = prefs.favorites.includes(key)
  const favorites = has ? prefs.favorites.filter((item) => item !== key) : [...prefs.favorites, key]
  return writePrefs(storage, email, { ...prefs, favorites })
}

export function resolveByIds(services, ids) {
  const map = new Map((services || []).map((svc) => [svc.id, svc]))
  return (ids || []).map((id) => map.get(id)).filter(Boolean)
}
