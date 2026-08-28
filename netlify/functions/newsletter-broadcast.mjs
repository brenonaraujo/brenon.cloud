import { getService, isConfigured, json } from './_runtime.mjs'

function unauthorized() {
  return json(401, { ok: false, error: 'unauthorized' })
}

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, error: 'method_not_allowed' })
  }

  const secret = process.env.NEWSLETTER_BROADCAST_SECRET
  const header = event.headers?.authorization || event.headers?.Authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!secret || token !== secret) return unauthorized()

  if (!isConfigured()) {
    return json(503, { ok: false, error: 'not_configured' })
  }

  let body = {}
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { ok: false, error: 'invalid_json' })
  }

  if (!body.slug || !body.title) {
    return json(400, { ok: false, error: 'invalid_post' })
  }

  try {
    const result = await getService(event).broadcast({
      slug: body.slug,
      locale: body.locale,
      title: body.title,
      description: body.description || '',
      urlPath: body.urlPath || `/blog/${body.slug}`
    })
    return json(200, result)
  } catch (err) {
    console.error('newsletter-broadcast', err)
    return json(500, { ok: false, error: 'send_failed' })
  }
}
