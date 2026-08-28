import { getService, isConfigured, redirect, siteUrl } from './_runtime.mjs'

export async function handler(event) {
  const params = event.queryStringParameters || {}
  const token = params.token
  const dest = (status) => redirect(302, `${siteUrl()}/blog?newsletter=${status}`)

  if (!token) return dest('invalid')
  if (!isConfigured()) return dest('error')

  try {
    const result = await getService().unsubscribe(token)
    return dest(result.ok ? 'unsubscribed' : 'invalid')
  } catch (err) {
    console.error('newsletter-unsubscribe', err)
    return dest('error')
  }
}
