import MarkdownIt from 'markdown-it'

/**
 * Blog Service
 * Parses markdown + frontmatter and exposes domain-shaped BlogPost objects.
 */

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  breaks: false
})

// Open external links in a new tab and render code blocks with a default class.
const defaultLinkRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const href = tokens[idx].attrGet('href') || ''
  if (/^https?:\/\//.test(href)) {
    tokens[idx].attrSet('target', '_blank')
    tokens[idx].attrSet('rel', 'noopener noreferrer')
  }
  return defaultLinkRender(tokens, idx, options, env, self)
}

const defaultImageRender =
  md.renderer.rules.image ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

const defaultFenceRender =
  md.renderer.rules.fence ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

md.renderer.rules.fence = function (tokens, idx, options, env, self) {
  const token = tokens[idx]
  const lang = token.info.trim()
  if (lang === 'mermaid') {
    const code = token.content
    return `<div class="mermaid">${code}</div>`
  }
  return defaultFenceRender(tokens, idx, options, env, self)
}

md.renderer.rules.image = function (tokens, idx, options, env, self) {
  const src = tokens[idx].attrGet('src') || ''
  tokens[idx].attrSet('loading', 'lazy')
  tokens[idx].attrSet('decoding', 'async')

  if (/^https?:\/\//.test(src)) {
    tokens[idx].attrSet('referrerpolicy', 'no-referrer')
  }

  return defaultImageRender(tokens, idx, options, env, self)
}

const FRONTMATTER_RE = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/

/**
 * Minimal YAML-ish frontmatter parser.
 * Supports `key: value`, quoted strings, ISO dates, inline arrays `[a, b, "c"]`,
 * and YAML list blocks (`- item` lines).
 */
function parseFrontmatter(raw) {
  const match = raw.match(FRONTMATTER_RE)
  if (!match) {
    return { data: {}, body: raw }
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
        .map(s => unquote(s.trim()))
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

function unquote(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }
  return value
}

function estimateReadingTime(text) {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export class BlogService {
  /**
   * @param {import('../api/blogApi').BlogApiClient} apiClient
   */
  constructor(apiClient) {
    this.apiClient = apiClient
  }

  /**
   * Returns the post list resolved for a given locale, sorted from
   * newest to oldest. For each slug we pick the variant in this order:
   *   1. exact locale match
   *   2. neutral file (no locale suffix)
   *   3. any other available locale
   *
   * Posts that exist in other locales are still listed (using the
   * fallback variant) so readers always see the full catalogue.
   *
   * @param {string} locale
   * @returns {Promise<import('../types/blogPost').BlogPost[]>}
   */
  async getAllPosts(locale = 'en') {
    const raw = await this.apiClient.getRawPosts()
    const grouped = new Map()
    for (const entry of raw) {
      if (!grouped.has(entry.slug)) grouped.set(entry.slug, [])
      grouped.get(entry.slug).push(entry)
    }

    const posts = []
    for (const [slug, variants] of grouped) {
      const picked = this._pickVariant(variants, locale)
      if (!picked) continue
      const post = this._toPost(slug, picked.raw, picked.locale)
      if (!post) continue
      post.availableLocales = variants
        .map(v => v.locale)
        .filter(Boolean)
      posts.push(post)
    }

    posts.sort((a, b) => {
      const da = a.date ? Date.parse(a.date) : 0
      const db = b.date ? Date.parse(b.date) : 0
      return db - da
    })

    return posts
  }

  /**
   * Returns a single post by slug for the requested locale (with the
   * same fallback strategy as `getAllPosts`).
   *
   * @param {string} slug
   * @param {string} locale
   * @returns {Promise<import('../types/blogPost').BlogPost | null>}
   */
  async getPostBySlug(slug, locale = 'en') {
    const variants = await this.apiClient.getRawPostsBySlug(slug)
    if (!variants.length) return null
    const picked = this._pickVariant(variants, locale)
    if (!picked) return null
    const post = this._toPost(slug, picked.raw, picked.locale)
    if (!post) return null
    post.availableLocales = variants.map(v => v.locale).filter(Boolean)
    return post
  }

  _pickVariant(variants, locale) {
    return (
      variants.find(v => v.locale === locale) ||
      variants.find(v => v.locale === null) ||
      variants[0] ||
      null
    )
  }

  _toPost(slug, raw, locale) {
    if (typeof raw !== 'string' || !raw.trim()) return null
    const { data, body } = parseFrontmatter(raw)
    const content = body.trim()
    return {
      slug,
      locale: locale || null,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
      author: data.author || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      cover: data.cover || '',
      coverFallback: data.coverFallback || '',
      content,
      html: md.render(content),
      readingTime: estimateReadingTime(content),
      availableLocales: []
    }
  }
}
