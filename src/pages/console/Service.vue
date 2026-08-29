<template>
  <div>
    <ConsoleBreadcrumb :items="crumbs" />

    <div v-if="catalog.loading" class="h-48 animate-pulse rounded-lg border border-white/10 bg-gray-900" />

    <div
      v-else-if="!app"
      class="rounded-lg border border-dashed border-white/15 px-6 py-12 text-center"
    >
      <InboxIcon class="mx-auto h-8 w-8 text-gray-600" />
      <h1 class="mt-4 text-2xl font-semibold text-white">{{ t('console.services.notFoundTitle') }}</h1>
      <p class="mt-2 text-sm text-gray-400">{{ t('console.services.notFound') }}</p>
      <router-link
        to="/console/services"
        class="mt-6 inline-flex min-h-[44px] items-center rounded-md border border-white/15 px-4 text-sm text-gray-200 hover:bg-white/5"
      >
        {{ t('console.services.back') }}
      </router-link>
    </div>

    <template v-else>
      <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div class="flex items-start gap-4">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-md"
            :class="iconWrap(app.color)"
          >
            <component :is="iconOf(app.icon)" class="h-6 w-6" :class="iconColor(app.color)" />
          </div>
          <div>
            <p class="text-[11px] uppercase tracking-[0.12em] text-gray-500">{{ kindLabel }}</p>
            <h1 class="mt-1 text-3xl font-semibold tracking-tight text-white">{{ label(app.title) }}</h1>
            <p class="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">{{ label(app.description) }}</p>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            class="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-white/15 px-4 text-sm text-gray-200 hover:bg-white/5"
            :aria-pressed="starred"
            @click="catalog.star(app.id, auth.email)"
          >
            <StarSolidIcon v-if="starred" class="h-4 w-4 text-amber-400" />
            <StarIcon v-else class="h-4 w-4" />
            {{ starred ? t('console.unstar') : t('console.star') }}
          </button>
          <a
            :href="app.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500"
            @click="catalog.visit(app.id, auth.email)"
          >
            {{ t('console.openService') }}
            <ExternalIcon class="h-4 w-4" />
          </a>
        </div>
      </div>

      <dl class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div class="rounded-lg border border-white/10 bg-gray-900 p-4">
          <dt class="text-xs uppercase tracking-[0.12em] text-gray-500">{{ t('console.services.host') }}</dt>
          <dd class="mt-2 font-mono text-sm text-gray-200">{{ host(app.url) }}</dd>
        </div>
        <div class="rounded-lg border border-white/10 bg-gray-900 p-4">
          <dt class="text-xs uppercase tracking-[0.12em] text-gray-500">{{ t('console.services.required') }}</dt>
          <dd class="mt-2 text-sm text-gray-200">{{ accessLabel }}</dd>
        </div>
        <div class="rounded-lg border border-white/10 bg-gray-900 p-4">
          <dt class="text-xs uppercase tracking-[0.12em] text-gray-500">{{ t('console.services.plan') }}</dt>
          <dd class="mt-2 text-sm text-gray-200">{{ planLabel }}</dd>
        </div>
      </dl>

      <section v-if="facts?.bullets?.length" class="mt-8 rounded-lg border border-white/10 bg-gray-900 p-6">
        <h2 class="text-sm font-semibold text-white">{{ t('console.services.about') }}</h2>
        <ul class="mt-4 space-y-2 text-sm leading-relaxed text-gray-300">
          <li v-for="line in facts.bullets" :key="line">{{ line }}</li>
        </ul>
        <div class="mt-6 flex flex-wrap gap-4 text-sm">
          <a
            v-if="facts.docsUrl"
            :href="facts.docsUrl"
            class="text-blue-300 hover:text-white"
          >{{ t('console.services.docs') }}</a>
          <a
            v-if="facts.statusUrl"
            :href="facts.statusUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-300 hover:text-white"
          >{{ t('console.services.status') }}</a>
        </div>
      </section>
      <p class="mt-4 text-xs text-gray-500">{{ t('console.services.external') }}</p>
    </template>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import { useConsoleStore } from '../../stores/consoleStore'
import { useConsoleUi } from '../../composables/useConsoleUi'
import { serviceKind } from '../../config/console-taxonomy.mjs'
import { factsFor } from '../../config/console-service-facts.mjs'
import ConsoleBreadcrumb from '../../components/console/ConsoleBreadcrumb.vue'
import { ExternalIcon, InboxIcon, StarIcon, StarSolidIcon } from '../../components/icons/Icons.js'

const { t, te, locale } = useI18n()
const route = useRoute()
const auth = useAuthStore()
const catalog = useConsoleStore()
const { label, host, iconOf, iconWrap, iconColor } = useConsoleUi()

const app = computed(() => catalog.appsFor(auth.groups).find((item) => item.id === route.params.id) || null)
const starred = computed(() => app.value && catalog.isFavorite(app.value.id))
const kindLabel = computed(() =>
  app.value && serviceKind(app.value) === 'application'
    ? t('console.services.kindApplication')
    : t('console.services.kindPlatform')
)
const accessLabel = computed(() => {
  const groups = app.value?.groups || []
  if (groups.includes('*')) return t('console.services.anyAccount')
  return groups.join(', ')
})
const facts = computed(() => (app.value ? factsFor(app.value.id, locale.value) : null))
const planLabel = computed(() => {
  const plan = facts.value?.plan || 'free'
  const key = plan === 'staff' ? 'console.account.staff' : `console.plan.${plan}`
  return te(key) ? t(key) : plan
})
const crumbs = computed(() => [
  { label: t('console.nav.services'), to: '/console/services' },
  { label: app.value ? label(app.value.title) : t('console.services.notFoundTitle') }
])

watch(
  [app, () => auth.email],
  ([svc, email]) => {
    if (svc && email) catalog.visit(svc.id, email)
  },
  { immediate: true }
)
</script>
