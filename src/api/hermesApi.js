const BASE = 'https://control.brenon.cloud'

async function readJSON(res) {
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch {
    return { error: text || res.statusText }
  }
}

function authHeaders(idToken) {
  return { Authorization: `Bearer ${idToken}` }
}

export async function fetchHermesInstances(idToken) {
  const res = await fetch(`${BASE}/api/v1/hermes/instances`, {
    headers: authHeaders(idToken)
  })
  const data = await readJSON(res)
  if (!res.ok) throw new Error(data.error || `hermes ${res.status}`)
  return data
}

export async function createHermesInstance(idToken) {
  const res = await fetch(`${BASE}/api/v1/hermes/instances`, {
    method: 'POST',
    headers: { ...authHeaders(idToken), 'Content-Type': 'application/json' },
    body: '{}'
  })
  const data = await readJSON(res)
  if (res.status === 409 && data.instance) return data.instance
  if (!res.ok) throw new Error(data.error || `create ${res.status}`)
  return data
}

export async function deleteHermesInstance(idToken, id) {
  const res = await fetch(
    `${BASE}/api/v1/hermes/instances/${encodeURIComponent(id)}?confirm=destroy`,
    { method: 'DELETE', headers: authHeaders(idToken) }
  )
  const data = await readJSON(res)
  if (!res.ok) throw new Error(data.error || `delete ${res.status}`)
  return data
}

export async function fetchHermesSite(idToken, slug) {
  const q = slug ? `?slug=${encodeURIComponent(slug)}` : ''
  const res = await fetch(`${BASE}/api/v1/hermes/site${q}`, { headers: authHeaders(idToken) })
  const data = await readJSON(res)
  if (!res.ok) throw new Error(data.error || `site ${res.status}`)
  return data
}

export async function saveHermesSite(idToken, body, slug) {
  const q = slug ? `?slug=${encodeURIComponent(slug)}` : ''
  const res = await fetch(`${BASE}/api/v1/hermes/site${q}`, {
    method: 'PUT',
    headers: { ...authHeaders(idToken), 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const data = await readJSON(res)
  if (!res.ok) throw new Error(data.error || `site ${res.status}`)
  return data
}

export async function grantHostSession(idToken, host) {
  const res = await fetch(`${BASE}/api/v1/hermes/site/session`, {
    method: 'POST',
    credentials: 'include',
    headers: { ...authHeaders(idToken), 'Content-Type': 'application/json' },
    body: JSON.stringify({ host })
  })
  const data = await readJSON(res)
  if (!res.ok) throw new Error(data.error || `session ${res.status}`)
  return data
}

export function humanHermesError(err, fallback) {
  const msg = String(err?.message || err || '')
  if (/load failed|failed to fetch|networkerror/i.test(msg)) return fallback
  return msg || fallback
}
