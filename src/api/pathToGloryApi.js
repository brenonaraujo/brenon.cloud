/**
 * Path to Glory API Client
 * Loads curated resources from local JSON manifests at build time.
 *
 *   books.technical.json     -> section=books.technical, locale=null
 *   books.technical.pt.json  -> section=books.technical, locale=pt
 *   videos.json              -> section=videos, locale=null
 *
 * Neutral files carry canonical metadata (author, year, url, kind).
 * Locale files override title / why / tag.
 */

const rawEntries = import.meta.glob('../content/path-to-glory/*.json', {
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
      return { section: match[1], locale }
    }
  }
  return { section: name, locale: null }
}

function safeParse(raw, source) {
  try {
    return JSON.parse(raw)
  } catch (err) {
    console.error(`[pathToGloryApi] failed to parse ${source}:`, err)
    return null
  }
}

export class PathToGloryApiClient {
  async getRawEntries() {
    const out = []
    for (const [path, raw] of Object.entries(rawEntries)) {
      const { section, locale } = parseFilename(path)
      const items = safeParse(raw, path)
      if (!Array.isArray(items)) continue
      out.push({ section, locale, items })
    }
    return out
  }

  async getRawEntriesBySection(section) {
    const entries = await this.getRawEntries()
    return entries.filter((e) => e.section === section)
  }
}

export const pathToGloryApi = new PathToGloryApiClient()
