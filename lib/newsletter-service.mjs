import { createToken, verifyToken } from './newsletter-token.mjs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function normalizeLocale(locale) {
  return locale === 'pt' ? 'pt' : 'en'
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const COPY = {
  pt: {
    confirmSubject: 'Confirme sua inscrição no blog do Brenon.Cloud',
    confirmHtml: ({ confirmUrl }) =>
      `<p>Oi.</p><p>Confirme para receber um e-mail quando sair post novo no blog do Brenon.Cloud.</p><p><a href="${confirmUrl}">Confirmar inscrição</a></p><p>Se você não pediu isso, ignore este e-mail.</p>`,
    postSubject: (title) => `Novo post: ${title}`,
    postHtml: ({ title, description, postUrl, unsubUrl }) =>
      `<p>Saiu um post novo.</p><p><a href="${postUrl}"><strong>${escapeHtml(title)}</strong></a></p><p>${escapeHtml(description)}</p><p><a href="${postUrl}">Ler no site</a></p><p style="color:#64748b;font-size:12px"><a href="${unsubUrl}">Descadastrar</a></p>`
  },
  en: {
    confirmSubject: 'Confirm your Brenon.Cloud blog subscription',
    confirmHtml: ({ confirmUrl }) =>
      `<p>Hi.</p><p>Confirm to get an email when a new Brenon.Cloud blog post goes live.</p><p><a href="${confirmUrl}">Confirm subscription</a></p><p>If you did not request this, ignore this email.</p>`,
    postSubject: (title) => `New post: ${title}`,
    postHtml: ({ title, description, postUrl, unsubUrl }) =>
      `<p>A new post is up.</p><p><a href="${postUrl}"><strong>${escapeHtml(title)}</strong></a></p><p>${escapeHtml(description)}</p><p><a href="${postUrl}">Read on the site</a></p><p style="color:#64748b;font-size:12px"><a href="${unsubUrl}">Unsubscribe</a></p>`
  }
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
      const copy = COPY[loc]
      await sendEmail({
        from,
        to: normalized,
        subject: copy.confirmSubject,
        html: copy.confirmHtml({ confirmUrl })
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
      const copy = COPY[loc]
      const readers = await store.listConfirmed(loc)
      const postUrl = `${base}${post.urlPath || `/blog/${post.slug}`}`
      let sent = 0
      for (const reader of readers) {
        const unsubToken = tokenFor(reader.email, loc, 'unsub', 365 * 24 * 60 * 60 * 1000)
        const unsubUrl = `${base}/newsletter/unsubscribe?token=${encodeURIComponent(unsubToken)}`
        await sendEmail({
          from,
          to: reader.email,
          subject: copy.postSubject(post.title),
          html: copy.postHtml({
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
