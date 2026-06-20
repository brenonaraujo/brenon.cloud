/**
 * Games API Client
 * Loads game entries from local JSON manifests at build time.
 *
 * Files live in `src/content/games/*.json`. The filename encodes both the
 * game slug and (optionally) its locale, mirroring the blog convention:
 *
 *   tetris.json            -> slug=tetris, locale=null (fallback)
 *   tetris.en.json         -> slug=tetris, locale=en
 *   tetris.pt.json         -> slug=tetris, locale=pt
 *
 * If the suffix is not a recognized locale, it is treated as part of the
 * slug (e.g. `release-1.2.json` stays a single entry).
 *
 * The neutral file is mandatory and carries the technical config
 * (iframe path, dimensions, score unit) that does not change per locale.
 * Per-locale files only override translatable strings (title, description).
 */

const rawEntries = import.meta.glob('../content/games/*.json', {
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
  const name = path.split('/').pop().replace(/\.json$/, '')
  const match = name.match(/^(.+)\.([A-Za-z-]{2,5})$/)
  if (match) {
    const locale = normalizeLocale(match[2])
    if (locale) {
      return { slug: match[1], locale }
    }
  }
  return { slug: name, locale: null }
}

function safeParse(raw, source) {
  try {
    return JSON.parse(raw)
  } catch (err) {
    console.error(`[gamesApi] failed to parse ${source}:`, err)
    return null
  }
}

export class GamesApiClient {
  /**
   * Returns every raw JSON entry along with the slug and locale derived
   * from the filename.
   * @returns {Promise<Array<{ slug: string, locale: string|null, data: object }>>}
   */
  async getRawEntries() {
    const out = []
    for (const [path, raw] of Object.entries(rawEntries)) {
      const { slug, locale } = parseFilename(path)
      const data = safeParse(raw, path)
      if (!data) continue
      out.push({ slug, locale, data })
    }
    return out
  }

  /**
   * Returns every raw entry that matches a slug (across all locales).
   * @param {string} slug
   * @returns {Promise<Array<{ slug: string, locale: string|null, data: object }>>}
   */
  async getRawEntriesBySlug(slug) {
    const entries = await this.getRawEntries()
    return entries.filter(e => e.slug === slug)
  }
}

export const gamesApi = new GamesApiClient()
