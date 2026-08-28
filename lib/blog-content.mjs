const LOCALE_ALIASES = {
  en: 'en',
  eng: 'en',
  pt: 'pt',
  ptbr: 'pt',
  'pt-br': 'pt'
}

export function normalizeLocale(value) {
  if (!value) return null
  return LOCALE_ALIASES[String(value).toLowerCase()] || null
}

export function parseFilename(path) {
  const name = String(path).split('/').pop().replace(/\.md$/, '')
  const match = name.match(/^(.+)\.([A-Za-z-]{2,5})$/)
  if (match) {
    const locale = normalizeLocale(match[2])
    if (locale) {
      return { slug: match[1], locale }
    }
  }
  return { slug: name, locale: null }
}

const FRONTMATTER_RE = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/

function unquote(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }
  return value
}

export function parseFrontmatter(raw) {
  const match = String(raw).match(FRONTMATTER_RE)
  if (!match) {
    return { data: {}, body: String(raw) }
  }
  const [, fmBlock, body] = match
  const data = {}
  const lines = fmBlock.split(/\r?\n/)
  let currentKey = null
  let currentList = null

  for (const line of lines) {
    if (!line.trim()) continue

    if (currentList && /^\s+-\s+/.test(line)) {
      currentList.push(unquote(line.replace(/^\s+-\s+/, '').trim()))
      continue
    } else if (currentList) {
      data[currentKey] = currentList
      currentList = null
      currentKey = null
    }

    const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/)
    if (!kv) continue
    const key = kv[1]
    const value = kv[2].trim()

    if (value === '') {
      currentKey = key
      currentList = []
      continue
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map((s) => unquote(s.trim()))
        .filter(Boolean)
      continue
    }

    data[key] = unquote(value)
  }

  if (currentList && currentKey) {
    data[currentKey] = currentList
  }

  return { data, body }
}

export function toPostRecord(path, raw) {
  const { slug, locale } = parseFilename(path)
  const { data } = parseFrontmatter(raw)
  return {
    slug,
    locale,
    title: data.title || slug,
    description: data.description || '',
    date: data.date || '',
    author: data.author || ''
  }
}

export function postsForLocale(records, locale) {
  const grouped = new Map()
  for (const record of records || []) {
    if (!grouped.has(record.slug)) grouped.set(record.slug, [])
    grouped.get(record.slug).push(record)
  }
  const posts = []
  for (const [, variants] of grouped) {
    const picked =
      variants.find((v) => v.locale === locale) ||
      variants.find((v) => v.locale === null) ||
      variants[0]
    if (!picked) continue
    posts.push(picked)
  }
  posts.sort((a, b) => {
    const da = a.date ? Date.parse(a.date) : 0
    const db = b.date ? Date.parse(b.date) : 0
    return db - da
  })
  return posts
}
