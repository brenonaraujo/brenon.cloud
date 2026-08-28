import { getService, isConfigured, json } from './_runtime.mjs'

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return json(204, {})
  }
  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, error: 'method_not_allowed' })
  }
  if (!isConfigured()) {
    return json(503, { ok: false, error: 'not_configured' })
  }

  let body = {}
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { ok: false, error: 'invalid_json' })
  }

  try {
    const result = await getService().subscribe({
      email: body.email,
      locale: body.locale,
      website: body.website
    })
    const status = result.ok ? 200 : result.error === 'invalid_email' ? 400 : 400
    return json(status, result)
  } catch (err) {
    console.error('newsletter-subscribe', err)
    const name = err && err.name ? String(err.name) : ''
    if (name.includes('Blob')) {
      return json(500, { ok: false, error: 'store_failed' })
    }
    return json(500, { ok: false, error: 'send_failed' })
  }
}
