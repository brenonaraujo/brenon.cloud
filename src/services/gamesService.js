/**
 * Games Service
 * Resolves game entries against an i18n locale and merges per-locale
 * translations on top of the neutral (technical) manifest.
 *
 * Resolution order for a given slug:
 *   1. exact locale match       (tetris.pt.json)
 *   2. neutral fallback file    (tetris.json)
 *   3. first available locale
 *
 * The neutral file is required because it carries the runtime config
 * (iframe path, dimensions, score unit). A slug with no neutral file is
 * silently dropped.
 */

export class GamesService {
  /**
   * @param {import('../api/gamesApi').GamesApiClient} apiClient
   */
  constructor(apiClient) {
    this.apiClient = apiClient
  }

  /**
   * Returns all games resolved for the given locale, in stable order
   * (sorted by slug so the catalog doesn't shuffle between locales).
   *
   * @param {string} locale
   * @returns {Promise<import('../types/game').Game[]>}
   */
  async getAllGames(locale = 'en') {
    const raw = await this.apiClient.getRawEntries()
    const grouped = new Map()
    for (const entry of raw) {
      if (!grouped.has(entry.slug)) grouped.set(entry.slug, [])
      grouped.get(entry.slug).push(entry)
    }

    const games = []
    for (const [slug, variants] of grouped) {
      const picked = this._pickVariant(variants, locale)
      if (!picked) continue
      const neutral = variants.find(v => v.locale === null)
      if (!neutral) continue  // neutral manifest is required
      const game = this._toGame(slug, neutral.data, picked.data)
      if (!game) continue
      game.availableLocales = variants
        .map(v => v.locale)
        .filter(Boolean)
      games.push(game)
    }

    games.sort((a, b) => a.slug.localeCompare(b.slug))
    return games
  }

  /**
   * Returns a single game by slug for the requested locale.
   *
   * @param {string} slug
   * @param {string} locale
   * @returns {Promise<import('../types/game').Game | null>}
   */
  async getGameBySlug(slug, locale = 'en') {
    const variants = await this.apiClient.getRawEntriesBySlug(slug)
    if (!variants.length) return null
    const neutral = variants.find(v => v.locale === null)
    if (!neutral) return null
    const picked = this._pickVariant(variants, locale) || neutral
    const game = this._toGame(slug, neutral.data, picked.data)
    if (!game) return null
    game.availableLocales = variants.map(v => v.locale).filter(Boolean)
    return game
  }

  _pickVariant(variants, locale) {
    return (
      variants.find(v => v.locale === locale) ||
      variants.find(v => v.locale === null) ||
      variants[0] ||
      null
    )
  }

  _toGame(slug, neutralData, localeData) {
    // localeData may only override title/description; everything else comes
    // from the neutral manifest. We trust the neutral file for config.
    const merged = { ...neutralData, ...localeData }
    if (!merged.iframe) return null  // a game without an iframe cannot run
    return {
      slug,
      locale: localeData && localeData !== neutralData
        ? (localeData.locale || null)
        : null,
      title: merged.title || slug,
      description: merged.description || '',
      category: merged.category || 'arcade',
      players: merged.players || 'single',
      scoreUnit: merged.scoreUnit || 'points',
      iframe: merged.iframe,
      width: Number(merged.width) || 1100,
      height: Number(merged.height) || 720,
      availableLocales: []
    }
  }
}
