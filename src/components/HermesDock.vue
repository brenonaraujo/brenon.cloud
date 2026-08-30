<template>
  <a
    v-if="chatUrl"
    :href="chatUrl"
    target="_blank"
    rel="noopener"
    class="hermes-fab"
    :aria-label="t('console.site.startChat')"
  >
    <span class="hermes-fab__glow" aria-hidden="true" />
    <img src="/images/hermes-mascot.png" alt="" class="h-12 w-12" width="48" height="48">
  </a>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/authStore'
import { canManageHermes } from '../config/console-taxonomy.mjs'
import { fetchHermesInstances } from '../api/hermesApi.js'

const { t } = useI18n()
const auth = useAuthStore()
const instance = ref(null)

const chatUrl = computed(() => {
  const row = instance.value
  if (!row?.ready || !row.hostname) return ''
  return row.launchUrl || `https://${row.hostname}/hermes`
})

async function load() {
  if (!auth.isAuthenticated || !auth.idToken || !canManageHermes(auth.groups)) {
    instance.value = null
    return
  }
  try {
    const data = await fetchHermesInstances(auth.idToken)
    const rows = Array.isArray(data.instances) ? data.instances : []
    instance.value = rows.find((row) => row.email === auth.email && row.ready) || null
  } catch {
    instance.value = null
  }
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
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 40;
  display: flex;
  height: 64px;
  width: 64px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: #111827;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  transition: transform 150ms ease-out;
}
.hermes-fab:hover {
  transform: translateY(-2px);
}
.hermes-fab__glow {
  position: absolute;
  inset: -4px;
  border-radius: 9999px;
  border: 2px solid rgba(244, 145, 30, 0.45);
  animation: hermes-pulse 2.4s ease-out infinite;
}
@keyframes hermes-pulse {
  0% { transform: scale(1); opacity: 0.7; }
  70% { transform: scale(1.18); opacity: 0; }
  100% { transform: scale(1.18); opacity: 0; }
}
</style>
