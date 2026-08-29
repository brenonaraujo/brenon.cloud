<template>
  <div>
    <h1 class="text-3xl font-semibold tracking-tight text-white">
      {{ t('console.home.greeting', { name: firstName }) }}
    </h1>

    <div v-if="!auth.ready || catalog.loading" class="mt-8 grid gap-6 lg:grid-cols-2">
      <div v-for="n in 2" :key="n" class="h-48 animate-pulse rounded-lg border border-white/10 bg-gray-900" />
    </div>

    <div v-else class="mt-8 grid gap-6 lg:grid-cols-2">
      <section class="flex min-h-[16rem] flex-col rounded-lg border border-white/10 bg-gray-900">
        <h2 class="border-b border-white/10 px-4 py-3 text-sm font-semibold text-white">
          {{ t('console.home.recent') }}
        </h2>
        <ul v-if="recent.length" class="flex-1">
          <ConsoleServiceRow v-for="app in recent" :key="'r-' + app.id" :app="app" />
        </ul>
        <p v-else class="flex flex-1 items-center px-4 py-8 text-sm text-gray-500">
          {{ t('console.home.recentEmpty') }}
        </p>
      </section>

      <section class="flex min-h-[16rem] flex-col rounded-lg border border-white/10 bg-gray-900">
        <h2 class="border-b border-white/10 px-4 py-3 text-sm font-semibold text-white">
          {{ t('console.home.favorites') }}
        </h2>
        <ul v-if="favorites.length" class="flex-1">
          <ConsoleServiceRow v-for="app in favorites" :key="'f-' + app.id" :app="app" />
        </ul>
        <p v-else class="flex flex-1 items-center px-4 py-8 text-sm text-gray-500">
          {{ t('console.home.favoritesEmpty') }}
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../stores/authStore'
import { useConsoleStore } from '../../stores/consoleStore'
import ConsoleServiceRow from '../../components/console/ConsoleServiceRow.vue'

const { t } = useI18n()
const auth = useAuthStore()
const catalog = useConsoleStore()

const firstName = computed(() => {
  const name = auth.displayName || auth.email || ''
  return String(name).trim().split(/\s+/)[0] || '—'
})

const recent = computed(() => catalog.recentApps(auth.groups).slice(0, 8))
const favorites = computed(() => catalog.favoriteApps(auth.groups))
</script>
