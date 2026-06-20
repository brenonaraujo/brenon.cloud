import { computed, inject } from 'vue'
import { useGamesStore } from '../stores/gamesStore'
import { useI18n } from 'vue-i18n'

/**
 * Games Composable
 * Reactive entry point for components. Catalog and individual games are
 * resolved against the active i18n locale; switching language re-fetches.
 */
export function useGames() {
  const store = useGamesStore()
  const gamesService = inject('gamesService')
  const { locale } = useI18n()

  const loadGames = (force = false) =>
    store.fetchGames(gamesService, locale.value, force)

  const loadGame = (slug, force = false) =>
    store.fetchGameBySlug(gamesService, slug, locale.value, force)

  const games = computed(() => store.getGames(locale.value))
  const loading = computed(() => store.isLoading)
  const error = computed(() => store.error)

  return {
    games,
    loading,
    error,
    locale,
    loadGames,
    loadGame
  }
}
