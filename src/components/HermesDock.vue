<template>
  <div
    v-if="readyUrl"
    class="pointer-events-none fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
  >
    <transition name="hermes-dock">
      <div
        v-if="open"
        class="pointer-events-auto flex h-[min(42rem,calc(100vh-5.5rem))] w-[min(28rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gray-950 shadow-2xl"
      >
        <div class="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div class="min-w-0">
            <p class="text-sm font-semibold text-white">{{ t('console.hermes.dockTitle') }}</p>
            <p class="truncate font-mono text-xs text-gray-400">{{ host }}</p>
          </div>
          <div class="flex items-center gap-1">
            <button
              type="button"
              class="rounded-full px-2.5 py-1 text-[11px] text-gray-400 hover:bg-white/5 hover:text-white"
              @click="newSession"
            >
              {{ t('console.hermes.dockNew') }}
            </button>
            <button
              type="button"
              class="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-white/5 hover:text-white"
              :aria-label="t('console.hermes.dockClose')"
              @click="open = false"
            >
              <svg viewBox="0 0 16 16" class="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </div>
        <iframe
          v-if="frameSrc"
          :src="frameSrc"
          title="Hermes"
          class="min-h-0 w-full flex-1 bg-gray-900"
          referrerpolicy="no-referrer-when-downgrade"
        />
        <div class="flex gap-2 border-t border-white/10 p-3">
          <a
            :href="readyUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex h-11 flex-1 items-center justify-center rounded-2xl bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-500"
          >
            {{ t('console.hermes.dockOpen') }}
          </a>
        </div>
      </div>
    </transition>

    <button
      type="button"
      class="hermes-fab pointer-events-auto"
      :class="{ 'is-open': open }"
      :aria-label="open ? t('console.hermes.dockClose') : t('console.hermes.dockTitle')"
      @click="toggle"
    >
      <span class="hermes-fab__glow" aria-hidden="true" />
      <span class="hermes-fab__face">
        <svg v-if="!open" viewBox="0 0 32 32" class="h-6 w-6" fill="none" aria-hidden="true">
          <path d="M8 10.5h16v11a2.5 2.5 0 0 1-2.5 2.5H16l-4 4v-4H10.5A2.5 2.5 0 0 1 8 21.5v-11Z" stroke="#fff" stroke-width="1.7" />
          <path d="M12 15h8M12 19h5" stroke="#fff" stroke-width="1.7" stroke-linecap="round" />
        </svg>
        <svg v-else viewBox="0 0 16 16" class="h-4 w-4" fill="none" aria-hidden="true">
          <path d="M3 3l10 10M13 3L3 13" stroke="#fff" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/authStore'
import { canManageHermes } from '../config/console-taxonomy.mjs'
import { fetchHermesInstances } from '../api/hermesApi.js'

const { t } = useI18n()
const auth = useAuthStore()
const open = ref(false)
const frameSrc = ref('')
const instance = ref(null)

const readyUrl = computed(() => {
  const row = instance.value
  if (!row?.ready || !row.hostname) return ''
  return row.launchUrl || `https://${row.hostname}/hermes`
})
const host = computed(() => instance.value?.hostname || '')

async function load() {
  if (!auth.isAuthenticated || !auth.idToken || !canManageHermes(auth.groups)) {
    instance.value = null
    return
  }
  try {
    const data = await fetchHermesInstances(auth.idToken)
    const rows = Array.isArray(data.instances) ? data.instances : []
    const mine = rows.filter((row) =>
      ['running', 'provisioning', 'pending', 'stopped'].includes(row.status)
    )
    instance.value = mine.find((row) => row.email === auth.email && row.ready) || null
  } catch {
    instance.value = null
  }
}

function toggle() {
  open.value = !open.value
  if (open.value && readyUrl.value) frameSrc.value = readyUrl.value
}

function newSession() {
  if (!readyUrl.value) return
  frameSrc.value = `${readyUrl.value}${readyUrl.value.includes('?') ? '&' : '?'}new=1`
  window.open(readyUrl.value, '_blank', 'noopener')
}

watch(
  () => [auth.ready, auth.isAuthenticated, auth.idToken, auth.email],
  () => {
    if (auth.ready) load()
  },
  { immediate: true }
)

onMounted(load)
</script>

<style scoped>
.hermes-fab {
  position: relative;
  display: flex;
  height: 56px;
  width: 56px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: #2563eb;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.35);
  transition: transform 200ms ease-out, background-color 150ms ease-out;
}
.hermes-fab:hover {
  background: #3b82f6;
}
.hermes-fab.is-open {
  background: #1e293b;
}
.hermes-fab__glow {
  position: absolute;
  inset: -4px;
  border-radius: 9999px;
  border: 2px solid rgba(96, 165, 250, 0.45);
  animation: hermes-pulse 2.4s ease-out infinite;
}
.hermes-fab.is-open .hermes-fab__glow {
  display: none;
}
.hermes-fab__face {
  position: relative;
  z-index: 1;
  display: flex;
}
@keyframes hermes-pulse {
  0% { transform: scale(1); opacity: 0.7; }
  70% { transform: scale(1.18); opacity: 0; }
  100% { transform: scale(1.18); opacity: 0; }
}
.hermes-dock-enter-active,
.hermes-dock-leave-active {
  transition: opacity 200ms ease-out, transform 200ms ease-out;
}
.hermes-dock-enter-from,
.hermes-dock-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>
