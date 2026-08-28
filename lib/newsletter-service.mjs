import { createToken, verifyToken } from './newsletter-token.mjs'
import { renderConfirmEmail, renderPostEmail } from './newsletter-email.mjs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function normalizeLocale(locale) {
  return locale === 'pt' ? 'pt' : 'en'
}

function site(siteUrl) {
  return String(siteUrl || '').replace(/\/$/, '')
}

export function createNewsletterService({ store, sendEmail, secret, siteUrl, from, now = Date.now }) {
  const base = site(siteUrl)

  function tokenFor(email, locale, purpose, ttlMs) {
    return createToken({ email, locale, purpose }, { secret, now: now(), ttlMs })
  }

  return {
    async subscribe({ email, locale, website } = {}) {
      if (website) return { ok: true, ignored: true }
      const normalized = normalizeEmail(email)
      if (!EMAIL_RE.test(normalized)) return { ok: false, error: 'invalid_email' }
      const loc = normalizeLocale(locale)
      let existing = null
      try {
        existing = await store.get(normalized, loc)
      } catch {
        existing = null
      }
      if (existing) return { ok: true, already: true }

      const token = tokenFor(normalized, loc, 'confirm', 48 * 60 * 60 * 1000)
      const confirmUrl = `${base}/newsletter/confirm?token=${encodeURIComponent(token)}`
      await sendEmail({
        from,
        to: normalized,
        subject:
          loc === 'pt'
            ? 'Confirme sua inscrição no blog do Brenon.Cloud'
            : 'Confirm your Brenon.Cloud blog subscription',
        html: renderConfirmEmail({ locale: loc, confirmUrl })
      })
      return { ok: true, pending: true }
    },

    async confirm(token) {
      const payload = verifyToken(token, { secret, now: now() })
      if (!payload || payload.purpose !== 'confirm') return { ok: false, error: 'invalid_token' }
      await store.addConfirmed({ email: payload.email, locale: payload.locale })
      return { ok: true, email: payload.email, locale: payload.locale }
    },

    async unsubscribe(token) {
      const payload = verifyToken(token, { secret, now: now() })
      if (!payload || payload.purpose !== 'unsub') return { ok: false, error: 'invalid_token' }
      await store.remove(payload.email, payload.locale)
      return { ok: true, email: payload.email, locale: payload.locale }
    },

    async broadcast(post) {
      const loc = normalizeLocale(post.locale)
      const readers = await store.listConfirmed(loc)
      const postUrl = `${base}${post.urlPath || `/blog/${post.slug}`}`
      let sent = 0
      for (const reader of readers) {
        const unsubToken = tokenFor(reader.email, loc, 'unsub', 365 * 24 * 60 * 60 * 1000)
        const unsubUrl = `${base}/newsletter/unsubscribe?token=${encodeURIComponent(unsubToken)}`
        await sendEmail({
          from,
          to: reader.email,
          subject: loc === 'pt' ? `Novo post: ${post.title}` : `New post: ${post.title}`,
          html: renderPostEmail({
            locale: loc,
            title: post.title,
            description: post.description || '',
            postUrl,
            unsubUrl
          }),
          headers: {
            'List-Unsubscribe': `<${unsubUrl}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
          }
        })
        sent += 1
      }
      return { ok: true, sent }
    }
  }
}
