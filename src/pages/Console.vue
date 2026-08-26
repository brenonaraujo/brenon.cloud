<template>
  <div class="min-h-[70vh] px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-5xl">
      <p class="font-mono text-xs tracking-widest text-gray-500">brenon.cloud</p>
      <h1 class="mt-2 text-3xl font-semibold text-white">{{ t('console.title') }}</h1>
      <p class="mt-2 max-w-2xl text-gray-400">{{ t('console.subtitle') }}</p>

      <p v-if="!auth.ready" class="mt-10 text-gray-400">{{ t('auth.completing') }}</p>

      <div v-else-if="apps.length" class="mt-10 grid gap-4 sm:grid-cols-2">
        <a
          v-for="app in apps"
          :key="app.id"
          :href="app.url"
          class="block rounded-xl border border-white/10 bg-gray-900/60 p-5 transition-colors hover:border-white/25 hover:bg-gray-900"
        >
          <h2 class="text-lg font-medium text-white">{{ label(app.title) }}</h2>
          <p class="mt-2 text-sm text-gray-400">{{ label(app.description) }}</p>
          <p class="mt-4 font-mono text-xs text-gray-500">{{ host(app.url) }}</p>
        </a>
      </div>

      <p v-else class="mt-10 rounded-xl border border-white/10 bg-gray-900/40 p-6 text-gray-400">
        {{ t('console.empty') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/authStore'
import { listForGroups } from '../config/console-registry'

const { t, locale } = useI18n()
const auth = useAuthStore()

const apps = computed(() => listForGroups(auth.groups))

const label = (obj) => obj?.[locale.value] || obj?.en || ''
const host = (url) => {
  try {
    return new URL(url).host
  } catch {
    return url
  }
}

const ensureSession = () => {
  if (auth.ready && !auth.isAuthenticated) {
    auth.login('/console')
  }
}

onMounted(ensureSession)
watch(() => auth.ready, ensureSession)
</script>
