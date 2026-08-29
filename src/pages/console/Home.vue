<template>
  <div>
    <ConsoleBreadcrumb />

    <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-[11px] uppercase tracking-[0.12em] text-gray-500">{{ t('console.eyebrow') }}</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight text-white">
          {{ t('console.home.greeting', { name: firstName }) }}
        </h1>
        <p class="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">
          {{ t('console.subtitle') }}
        </p>
      </div>
    </div>

    <div v-if="!auth.ready || catalog.loading" class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="n in 6" :key="n" class="h-36 animate-pulse rounded-lg border border-white/10 bg-gray-900" />
    </div>

    <template v-else>
      <section class="mt-8">
        <router-link
          to="/console/hermes"
          class="flex flex-col gap-4 rounded-lg border border-blue-500/20 bg-blue-500/5 p-6 transition-colors hover:border-blue-400/40 sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-start gap-4">
            <div class="flex h-10 w-10 items-center justify-center rounded-md bg-blue-500/15">
              <BoltIcon class="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p class="text-xs font-medium uppercase tracking-[0.12em] text-blue-300/80">
                {{ t('console.hermes.eyebrow') }}
              </p>
              <h2 class="mt-1 text-lg font-semibold text-white">{{ t('console.hermes.homeCard') }}</h2>
              <p class="mt-1 max-w-xl text-sm text-gray-400">{{ t('console.hermes.homeCardBody') }}</p>
            </div>
          </div>
          <span class="inline-flex items-center gap-1 text-sm text-blue-300">
            {{ t('console.view') }}
            <ChevronRightIcon class="h-4 w-4" />
          </span>
        </router-link>
      </section>

      <section class="mt-10">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">{{ t('console.home.recent') }}</h2>
        </div>
        <div v-if="recent.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ConsoleServiceCard v-for="app in recent" :key="'r-' + app.id" :app="app" />
        </div>
        <p v-else class="rounded-lg border border-dashed border-white/10 px-4 py-8 text-sm text-gray-500">
          {{ t('console.home.recentEmpty') }}
        </p>
      </section>

      <section class="mt-10">
        <h2 class="mb-4 text-lg font-semibold text-white">{{ t('console.home.favorites') }}</h2>
        <div v-if="favorites.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ConsoleServiceCard v-for="app in favorites" :key="'f-' + app.id" :app="app" />
        </div>
        <p v-else class="rounded-lg border border-dashed border-white/10 px-4 py-8 text-sm text-gray-500">
          {{ t('console.home.favoritesEmpty') }}
        </p>
      </section>

      <section v-if="applications.length" class="mt-10">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-white">{{ t('console.home.applications') }}</h2>
          <router-link to="/console/services" class="text-sm text-gray-400 hover:text-white">
            {{ t('console.home.all') }}
          </router-link>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ConsoleServiceCard v-for="app in applications" :key="app.id" :app="app" />
        </div>
      </section>

      <section v-if="platform.length" class="mt-10">
        <h2 class="mb-4 text-lg font-semibold text-white">{{ t('console.home.platform') }}</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ConsoleServiceCard v-for="app in platform" :key="app.id" :app="app" />
        </div>
      </section>

      <div
        v-if="!applications.length && !platform.length"
        class="mt-10 rounded-lg border border-dashed border-white/15 px-6 py-12 text-center"
      >
        <InboxIcon class="mx-auto h-8 w-8 text-gray-600" />
        <h2 class="mt-4 text-lg font-semibold text-white">{{ t('console.emptyTitle') }}</h2>
        <p class="mt-2 text-sm text-gray-400">{{ t('console.empty') }}</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../stores/authStore'
import { useConsoleStore } from '../../stores/consoleStore'
import ConsoleBreadcrumb from '../../components/console/ConsoleBreadcrumb.vue'
import ConsoleServiceCard from '../../components/console/ConsoleServiceCard.vue'
import { BoltIcon, ChevronRightIcon, InboxIcon } from '../../components/icons/Icons.js'

const { t } = useI18n()
const auth = useAuthStore()
const catalog = useConsoleStore()

const firstName = computed(() => {
  const name = auth.displayName || auth.email || ''
  return String(name).trim().split(/\s+/)[0] || '—'
})

const grouped = computed(() => catalog.groupedFor(auth.groups))
const applications = computed(() => grouped.value.applications)
const platform = computed(() => grouped.value.platform)
const recent = computed(() => catalog.recentApps(auth.groups))
const favorites = computed(() => catalog.favoriteApps(auth.groups))
</script>
