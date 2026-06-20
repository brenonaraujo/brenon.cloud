<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
    <header class="text-center mb-16">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          {{ t('games.title') }}
        </span>
      </h1>
      <p class="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
        {{ t('games.subtitle') }}
      </p>
    </header>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-blue-500"></div>
      <p class="mt-4 text-gray-400">{{ t('common.loading') }}</p>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-400 mb-4">{{ t('common.error') }}: {{ error }}</p>
      <button
        @click="loadGames(true)"
        class="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
      >
        {{ t('common.retry') }}
      </button>
    </div>

    <div v-else-if="!games.length" class="text-center py-16">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 mb-6">
        <svg class="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-5.197-3.03A1 1 0 008 9v6a1 1 0 001.555.832l5.197-3.03a1 1 0 000-1.664z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 class="text-2xl font-semibold text-white mb-2">{{ t('games.empty.title') }}</h2>
      <p class="text-gray-400 max-w-md mx-auto">{{ t('games.empty.description') }}</p>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link
        v-for="game in games"
        :key="game.slug"
        :to="`/games/${game.slug}`"
        class="group flex flex-col bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/60 hover:bg-gray-800/70 transition-all duration-200"
      >
        <!-- Preview tile: gradient background + glyph + category badge -->
        <div
          class="relative aspect-[16/9] overflow-hidden bg-gradient-to-br"
          :class="categoryGradient(game.category)"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-6xl font-black text-white/15 tracking-widest uppercase">
              {{ game.slug }}
            </span>
          </div>
          <div class="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-xs text-white/80 uppercase tracking-wide border border-white/10">
            {{ t(`games.categories.${game.category}`, game.category) }}
          </div>
          <div
            v-if="game.locale && game.locale !== locale"
            class="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase tracking-wide text-xs"
            :title="t('games.translationFallback')"
          >
            {{ game.locale }}
          </div>
        </div>

        <div class="p-6 flex flex-col flex-1">
          <h2 class="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {{ game.title }}
          </h2>
          <p class="text-gray-300 text-sm leading-relaxed flex-1">
            {{ game.description }}
          </p>
          <div class="mt-6 inline-flex items-center gap-2 text-blue-400 text-sm font-medium">
            {{ t('games.play') }}
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGames } from '../composables/useGames'

const { t } = useI18n()
const { games, loading, error, locale, loadGames } = useGames()

const CATEGORY_GRADIENTS = {
  puzzle: 'from-blue-500/30 via-purple-500/20 to-gray-900',
  arcade: 'from-pink-500/30 via-rose-500/20 to-gray-900',
  action: 'from-orange-500/30 via-red-500/20 to-gray-900',
  casual: 'from-emerald-500/30 via-teal-500/20 to-gray-900'
}

const categoryGradient = (cat) => CATEGORY_GRADIENTS[cat] || CATEGORY_GRADIENTS.arcade

onMounted(() => loadGames())
watch(locale, () => loadGames())
</script>
