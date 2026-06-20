<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header with back link + title -->
    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        <router-link
          to="/games"
          class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-3"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          {{ t('games.backToList') }}
        </router-link>
        <h1 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          {{ game?.title || slug }}
        </h1>
        <p v-if="game?.description" class="mt-2 text-gray-300 max-w-2xl">
          {{ game.description }}
        </p>
      </div>
      <div v-if="game" class="flex flex-wrap items-center gap-2">
        <span class="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs uppercase tracking-wide">
          {{ t(`games.categories.${game.category}`, game.category) }}
        </span>
        <span class="px-2.5 py-1 rounded-md bg-gray-700/40 text-gray-300 border border-gray-600/40 text-xs uppercase tracking-wide">
          {{ game.players === 'multi' ? t('games.playersMulti') : t('games.playersSingle') }}
        </span>
        <span
          v-if="game.locale && game.locale !== locale"
          class="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs uppercase tracking-wide"
        >
          {{ game.locale }}
        </span>
      </div>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-blue-500"></div>
      <p class="mt-4 text-gray-400">{{ t('common.loading') }}</p>
    </div>

    <div v-else-if="error || !game" class="text-center py-12">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 mb-6">
        <svg class="w-8 h-8 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 class="text-2xl font-semibold text-white mb-2">{{ t('games.notFound.title') }}</h2>
      <p class="text-gray-400 max-w-md mx-auto mb-6">
        {{ error ? `${t('common.error')}: ${error}` : t('games.notFound.description') }}
      </p>
      <router-link
        to="/games"
        class="inline-block px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
      >
        {{ t('games.backToList') }}
      </router-link>
    </div>

    <!-- Iframe container. We center it and let the game dictate its
         own intrinsic size; the page background keeps the dark theme.
         max-height keeps very tall games from forcing the user to scroll
         past the host page on small screens. -->
    <div
      v-else
      class="flex justify-center"
    >
      <div
        class="relative w-full max-w-full rounded-2xl overflow-hidden border border-gray-700/60 bg-gray-900 shadow-2xl"
        :style="{
          aspectRatio: `${game.width} / ${game.height}`,
          maxHeight: '78vh'
        }"
      >
        <iframe
          :key="iframeKey"
          :src="game.iframe"
          :title="game.title"
          class="absolute inset-0 w-full h-full bg-gray-900"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
          referrerpolicy="no-referrer"
        ></iframe>
      </div>
    </div>

    <!-- Tips / footer about the game -->
    <p
      v-if="game"
      class="mt-6 text-center text-xs text-gray-500"
    >
      {{ t('games.scoreStoredHint', { unit: t(`games.units.${game.scoreUnit}`, game.scoreUnit) }) }}
    </p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useGames } from '../composables/useGames'

const { t } = useI18n()
const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
const { games, loading, error, locale, loadGame } = useGames()

// Force iframe remount on locale/slug change so the embedded game
// re-bootstraps with fresh state instead of carrying over a stale frame.
const iframeKey = computed(() => `${slug.value}-${locale.value}`)

const game = ref(null)
const syncGame = async () => {
  if (!slug.value) return
  game.value = await loadGame(slug.value)
}

onMounted(syncGame)
watch(slug, syncGame)
watch(locale, syncGame)
</script>
