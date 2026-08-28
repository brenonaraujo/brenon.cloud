const LANGUAGE = {
  pt: 'pt-BR',
  en: 'en-US'
}

export function escapeXml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function rfc822(dateValue) {
  const parsed = dateValue ? new Date(`${dateValue}T00:00:00Z`) : new Date()
  if (Number.isNaN(parsed.getTime())) return new Date().toUTCString()
  return parsed.toUTCString()
}

export function postUrl(siteUrl, slug) {
  const base = String(siteUrl || '').replace(/\/$/, '')
  return `${base}/blog/${slug}`
}

export function buildRssFeed({ siteUrl, locale, title, description, posts }) {
  const base = String(siteUrl || '').replace(/\/$/, '')
  const lang = LANGUAGE[locale] || locale || 'en'
  const feedUrl = locale === 'en' ? `${base}/feed.en.xml` : `${base}/feed.pt.xml`
  const items = [...(posts || [])].sort((a, b) => {
    const da = a.date ? Date.parse(a.date) : 0
    const db = b.date ? Date.parse(b.date) : 0
    return db - da
  })

  const itemXml = items
    .map((post) => {
      const link = postUrl(base, post.slug)
      const guid = `${link}?lang=${locale || 'en'}`
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(guid)}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <description>${escapeXml(post.description)}</description>
      ${post.author ? `<author>${escapeXml(post.author)}</author>` : ''}
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(base)}/blog</link>
    <description>${escapeXml(description)}</description>
    <language>${escapeXml(lang)}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml"/>
${itemXml}
  </channel>
</rss>
`
}
