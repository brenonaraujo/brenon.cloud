/**
 * Blog API Client
 * Loads blog posts from local markdown files at build time.
 *
 * Files live in `src/content/blog/*.md`. The filename encodes both the
 * post slug and (optionally) its locale:
 *
 *   welcome.md            -> slug=welcome, locale=null (fallback for any locale)
 *   welcome.en.md         -> slug=welcome, locale=en
 *   welcome.pt.md         -> slug=welcome, locale=pt
 *   welcome.eng.md        -> slug=welcome, locale=en (alias)
 *
 * If the suffix is not a recognized locale, it is treated as part of
 * the slug (e.g. `release-1.2.md` stays a single post).
 */

const rawPosts = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

const LOCALE_ALIASES = {
  en: 'en',
  eng: 'en',
  pt: 'pt',
  ptbr: 'pt',
  'pt-br': 'pt'
}

export function normalizeLocale(value) {
  if (!value) return null
  return LOCALE_ALIASES[value.toLowerCase()] || null
}

export function parseFilename(path) {
  const name = path.split('/').pop().replace(/\.md$/, '')
  const match = name.match(/^(.+)\.([A-Za-z-]{2,5})$/)
  if (match) {
    const locale = normalizeLocale(match[2])
    if (locale) {
      return { slug: match[1], locale }
    }
  }
  return { slug: name, locale: null }
}

export class BlogApiClient {
  /**
   * Returns every raw markdown entry along with the slug and locale
   * derived from the filename. Parsing of the body is delegated to the
   * service layer.
   * @returns {Promise<Array<{ slug: string, locale: string|null, raw: string }>>}
   */
  async getRawPosts() {
    return Object.entries(rawPosts).map(([path, raw]) => {
      const { slug, locale } = parseFilename(path)
      return { slug, locale, raw }
    })
  }

  /**
   * Returns every raw entry that matches a slug (across all locales).
   * @param {string} slug
   * @returns {Promise<Array<{ slug: string, locale: string|null, raw: string }>>}
   */
  async getRawPostsBySlug(slug) {
    const posts = await this.getRawPosts()
    return posts.filter(p => p.slug === slug)
  }
}

export const blogApi = new BlogApiClient()
