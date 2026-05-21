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
   * Returns all posts sorted from newest to oldest.
   * @returns {Promise<import('../types/blogPost').BlogPost[]>}
   */
  async getAllPosts() {
    const raw = await this.apiClient.getRawPosts()
    const posts = raw
      .map(({ slug, raw }) => this._toPost(slug, raw))
      .filter(Boolean)

    posts.sort((a, b) => {
      const da = a.date ? Date.parse(a.date) : 0
      const db = b.date ? Date.parse(b.date) : 0
      return db - da
    })

    return posts
  }

  /**
   * Returns a single post by slug or null when not found.
   * @param {string} slug
   * @returns {Promise<import('../types/blogPost').BlogPost | null>}
   */
  async getPostBySlug(slug) {
    const raw = await this.apiClient.getRawPostBySlug(slug)
    if (!raw) return null
    return this._toPost(raw.slug, raw.raw)
  }

  _toPost(slug, raw) {
    if (typeof raw !== 'string' || !raw.trim()) return null
    const { data, body } = parseFrontmatter(raw)
    const content = body.trim()
    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
      author: data.author || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      cover: data.cover || '',
      content,
      html: md.render(content),
      readingTime: estimateReadingTime(content)
    }
  }
}
