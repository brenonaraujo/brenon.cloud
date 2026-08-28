import { createHmac, timingSafeEqual } from 'node:crypto'

function b64url(buf) {
  return Buffer.from(buf)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function fromB64url(value) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/')
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4))
  return Buffer.from(padded + pad, 'base64')
}

function sign(payloadB64, secret) {
  return b64url(createHmac('sha256', secret).update(payloadB64).digest())
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a))
  const right = Buffer.from(String(b))
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

export function createToken({ email, locale, purpose }, { secret, now = Date.now(), ttlMs = 48 * 60 * 60 * 1000 } = {}) {
  if (!secret) throw new Error('missing signing secret')
  const payload = {
    email: String(email).trim().toLowerCase(),
    locale: locale === 'pt' ? 'pt' : 'en',
    purpose,
    exp: now + ttlMs
  }
  const payloadB64 = b64url(JSON.stringify(payload))
  return `${payloadB64}.${sign(payloadB64, secret)}`
}

export function verifyToken(token, { secret, now = Date.now() } = {}) {
  if (!secret || !token || !token.includes('.')) return null
  const [payloadB64, sig] = token.split('.')
  if (!payloadB64 || !sig) return null
  const expected = sign(payloadB64, secret)
  if (!safeEqual(sig, expected)) return null
  try {
    const payload = JSON.parse(fromB64url(payloadB64).toString('utf8'))
    if (!payload?.email || !payload?.purpose) return null
    if (typeof payload.exp !== 'number' || payload.exp < now) return null
    payload.locale = payload.locale === 'pt' ? 'pt' : 'en'
    return payload
  } catch {
    return null
  }
}
