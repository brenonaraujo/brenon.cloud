import { connectLambda, getStore } from '@netlify/blobs'
import { createBlobSubscriberStore } from '../../lib/blob-subscribers.mjs'
import { createNewsletterService } from '../../lib/newsletter-service.mjs'
import { sendResendEmail } from '../../lib/resend-mail.mjs'

export function siteUrl() {
  return (process.env.SITE_URL || 'https://brenon.cloud').replace(/\/$/, '')
}

export function isConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.NEWSLETTER_SIGNING_SECRET)
}

export function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    },
    body: JSON.stringify(body)
  }
}

export function redirect(status, location) {
  return {
    statusCode: status,
    headers: {
      Location: location,
      'Cache-Control': 'no-store'
    },
    body: ''
  }
}

function fallbackStore() {
  return {
    async get() {
      return null
    },
    async addConfirmed() {
      throw new Error('blobs unavailable')
    },
    async remove() {},
    async listConfirmed() {
      return []
    }
  }
}

export function getService(event) {
  if (!isConfigured()) {
    throw new Error('newsletter is not configured')
  }
  if (event) {
    try {
      connectLambda(event)
    } catch (err) {
      console.error('newsletter connectLambda', err)
    }
  }
  let store
  try {
    store = createBlobSubscriberStore(getStore('newsletter-subscribers'))
  } catch (err) {
    console.error('newsletter blobs unavailable', err)
    store = fallbackStore()
  }
  return createNewsletterService({
    store,
    sendEmail: (msg) => sendResendEmail(process.env.RESEND_API_KEY, msg),
    secret: process.env.NEWSLETTER_SIGNING_SECRET,
    siteUrl: siteUrl(),
    from: process.env.NEWSLETTER_FROM || 'Brenon.Cloud <news@brenon.cloud>'
  })
}
