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

export function humanHermesError(err, fallback) {
  const msg = String(err?.message || err || '')
  if (/load failed|failed to fetch|networkerror/i.test(msg)) return fallback
  return msg || fallback
}
