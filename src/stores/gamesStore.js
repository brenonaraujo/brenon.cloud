import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Games Store
 * Caches the game catalog per locale. Mirrors blogStore's caching
 * strategy so the Games page loads instantly on locale switches.
 */
export const useGamesStore = defineStore('games', () => {
  const gamesByLocale = ref({})  // { en: Game[], pt: Game[] }
  const gameByLocale = ref({})   // { 'en:tetris': Game }
  const loading = ref(false)
  const error = ref(null)
  const lastFetch = ref({})      // { en: timestamp }

  const CACHE_TTL_MS = 5 * 60 * 1000  // 5 minutes

  const isCacheValid = (locale) => {
    const ts = lastFetch.value[locale]
    return ts && Date.now() - ts < CACHE_TTL_MS
  }

  const fetchGames = async (gamesService, locale, force = false) => {
    if (!force && gamesByLocale.value[locale] && isCacheValid(locale)) {
      return gamesByLocale.value[locale]
    }
    loading.value = true
    error.value = null
    try {
      const games = await gamesService.getAllGames(locale)
      gamesByLocale.value = { ...gamesByLocale.value, [locale]: games }
      lastFetch.value = { ...lastFetch.value, [locale]: Date.now() }
      return games
    } catch (err) {
      error.value = err.message || String(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchGameBySlug = async (gamesService, slug, locale, force = false) => {
    const key = `${locale}:${slug}`
    if (!force && gameByLocale.value[key] && isCacheValid(locale)) {
      return gameByLocale.value[key]
    }
    loading.value = true
    error.value = null
    try {
      const game = await gamesService.getGameBySlug(slug, locale)
      if (game) {
        gameByLocale.value = { ...gameByLocale.value, [key]: game }
        // Refresh last-fetch so the per-slug entry benefits from the same TTL.
        lastFetch.value = { ...lastFetch.value, [locale]: Date.now() }
      }
      return game
    } catch (err) {
      error.value = err.message || String(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getGames = (locale) => gamesByLocale.value[locale] || []
  const getGame = (locale, slug) => gameByLocale.value[`${locale}:${slug}`] || null

  return {
    gamesByLocale,
    gameByLocale,
    loading,
    error,
    fetchGames,
    fetchGameBySlug,
    getGames,
    getGame
  }
})
