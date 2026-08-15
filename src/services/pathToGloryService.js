/**
 * Path to Glory Service
 * Merges per-locale overrides onto the neutral manifest by slug.
 */

export class PathToGloryService {
  constructor(apiClient) {
    this.apiClient = apiClient
  }

  async getAllSections(locale = 'en') {
    const raw = await this.apiClient.getRawEntries()
    const grouped = new Map()
    for (const entry of raw) {
      if (!grouped.has(entry.section)) grouped.set(entry.section, [])
      grouped.get(entry.section).push(entry)
    }

    const sections = []
    for (const [id, variants] of grouped) {
      const neutral = variants.find((v) => v.locale === null)
      if (!neutral) continue
      const picked = this._pickVariant(variants, locale)
      if (!picked) continue
      const items = this._mergeItems(neutral.items, picked.items)
      if (items.length) sections.push({ id, items })
    }

    sections.sort((a, b) => a.id.localeCompare(b.id))
    return sections
  }

  async getSection(id, locale = 'en') {
    const variants = await this.apiClient.getRawEntriesBySection(id)
    if (!variants.length) return null
    const neutral = variants.find((v) => v.locale === null)
    if (!neutral) return null
    const picked = this._pickVariant(variants, locale) || neutral
    const items = this._mergeItems(neutral.items, picked.items)
    return items.length ? { id, items } : null
  }

  _pickVariant(variants, locale) {
    return (
      variants.find((v) => v.locale === locale) ||
      variants.find((v) => v.locale === null) ||
      variants[0] ||
      null
    )
  }

  _mergeItems(neutralItems, localeItems) {
    const overrides = new Map()
    for (const item of localeItems || []) {
      if (item && item.slug) overrides.set(item.slug, item)
    }
    return (neutralItems || [])
      .filter((item) => item && item.slug)
      .map((item) => ({ ...item, ...(overrides.get(item.slug) || {}) }))
  }
}
