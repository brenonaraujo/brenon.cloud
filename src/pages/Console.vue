<template>
  <div class="relative min-h-[calc(100vh-5rem)] overflow-hidden">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.12),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(6,182,212,0.10),_transparent_45%)]" />

    <div class="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-blue-400/80">
            {{ t('console.eyebrow') }}
          </p>
          <h1 class="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {{ t('console.title') }}
          </h1>
          <p class="mt-3 max-w-2xl text-base leading-relaxed text-gray-400">
            {{ t('console.subtitle') }}
          </p>
        </div>

        <div
          v-if="auth.isAuthenticated"
          class="flex items-center gap-3 rounded-xl border border-white/10 bg-gray-900/70 px-4 py-3 backdrop-blur"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15 text-sm font-semibold text-blue-300">
            {{ initials }}
          </div>
          <div class="min-w-0">
            <p class="truncate text-sm font-medium text-white">{{ auth.displayName }}</p>
            <p class="truncate font-mono text-xs text-gray-500">{{ auth.email }}</p>
          </div>
        </div>
      </div>

      <p v-if="!auth.ready" class="mt-12 text-gray-400">{{ t('auth.completing') }}</p>

      <div v-else-if="apps.length" class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="app in apps"
          :key="app.id"
          :href="app.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative flex flex-col rounded-2xl border border-white/10 bg-gray-900/60 p-6 shadow-lg shadow-black/20 transition duration-150 hover:-translate-y-0.5 hover:border-white/20 hover:bg-gray-900/90"
        >
          <div class="flex items-start justify-between gap-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl"
              :class="iconWrap(app.color)"
            >
              <component :is="iconOf(app.icon)" class="h-6 w-6" :class="iconColor(app.color)" />
            </div>
            <span class="inline-flex items-center gap-1 text-xs font-medium text-gray-500 transition group-hover:text-gray-300">
              {{ t('console.open') }}
              <ExternalIcon class="h-3.5 w-3.5" />
            </span>
          </div>

          <h2 class="mt-5 text-lg font-semibold text-white">{{ label(app.title) }}</h2>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-gray-400">{{ label(app.description) }}</p>
          <p class="mt-5 font-mono text-xs text-gray-500">{{ host(app.url) }}</p>
        </a>
      </div>

      <div
        v-else
        class="mt-12 rounded-2xl border border-dashed border-white/15 bg-gray-900/40 px-6 py-12 text-center"
      >
        <p class="text-gray-400">{{ t('console.empty') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/authStore'
import { listForGroups } from '../config/console-registry'
import {
  ChartIcon,
  CloudStorageIcon,
  CubeIcon,
  DrawIcon,
  ExternalIcon,
  SettingsIcon,
  WorkflowIcon
} from '../components/icons/Icons.js'

const { t, locale } = useI18n()
const auth = useAuthStore()

const apps = computed(() => listForGroups(auth.groups))

const initials = computed(() => {
  const name = auth.displayName || auth.email || '?'
  const parts = String(name).trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return String(name).slice(0, 2).toUpperCase()
})

const ICONS = {
  draw: DrawIcon,
  chart: ChartIcon,
  workflow: WorkflowIcon,
  cloudstorage: CloudStorageIcon,
  settings: SettingsIcon,
  cube: CubeIcon
}

const iconOf = (key) => ICONS[key] || CubeIcon

const iconWrap = (color) =>
  ({
    blue: 'bg-blue-500/15',
    green: 'bg-emerald-500/15',
    cyan: 'bg-cyan-500/15',
    orange: 'bg-orange-500/15',
    purple: 'bg-purple-500/15',
    red: 'bg-red-500/15'
  }[color] || 'bg-blue-500/15')

const iconColor = (color) =>
  ({
    blue: 'text-blue-400',
    green: 'text-emerald-400',
    cyan: 'text-cyan-400',
    orange: 'text-orange-400',
    purple: 'text-purple-400',
    red: 'text-red-400'
  }[color] || 'text-blue-400')

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
