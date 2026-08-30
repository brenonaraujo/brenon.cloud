<template>
  <div class="flex h-screen overflow-hidden bg-gray-950 text-gray-100">
    <a
      href="#console-main"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-gray-900 focus:px-4 focus:py-2"
    >
      {{ t('console.skip') }}
    </a>

    <ConsoleSidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <div class="flex min-w-0 flex-1 flex-col">
      <ConsoleTopbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />
      <main id="console-main" class="flex-1 overflow-y-auto outline-none" tabindex="-1">
        <div class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <p v-if="!auth.ready || !auth.isAuthenticated" class="text-sm text-gray-400">
            {{ t('console.loading') }}
          </p>
          <template v-else>
            <ConsoleBanner />
            <router-view v-slot="{ Component }">
              <transition name="console-page" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </template>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { useConsoleStore } from '../stores/consoleStore'
import { useEntitlementStore } from '../stores/entitlementStore'
import ConsoleSidebar from '../components/console/ConsoleSidebar.vue'
import ConsoleTopbar from '../components/console/ConsoleTopbar.vue'
import ConsoleBanner from '../components/console/ConsoleBanner.vue'

const { t } = useI18n()
const route = useRoute()
const auth = useAuthStore()
const catalog = useConsoleStore()
const entitlement = useEntitlementStore()
const sidebarOpen = ref(false)

const ensureSession = () => {
  if (auth.ready && !auth.isAuthenticated) {
    const next = route.fullPath.startsWith('/console') ? route.fullPath : '/console'
    auth.login(next)
  }
}

onMounted(() => {
  catalog.load()
  ensureSession()
  if (auth.email) catalog.hydratePrefs(auth.email)
  if (auth.idToken) entitlement.load(auth.idToken)
})

watch(() => auth.ready, ensureSession)
watch(
  () => auth.email,
  (email) => {
    if (email) catalog.hydratePrefs(email)
  }
)
watch(
  () => auth.idToken,
  (token) => {
    if (token) entitlement.load(token)
  }
)
watch(
  () => route.fullPath,
  () => {
    sidebarOpen.value = false
  }
)
</script>
