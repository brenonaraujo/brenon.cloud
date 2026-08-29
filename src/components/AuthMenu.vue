<template>
  <div class="relative shrink-0">
    <button
      v-if="!auth.isAuthenticated"
      type="button"
      class="whitespace-nowrap rounded border border-white/20 px-3 py-1 text-sm text-gray-200 transition-colors hover:border-white/40 hover:text-white"
      @click="auth.login()"
    >
      {{ t('navbar.console') }}
    </button>

    <div v-else class="relative">
      <button
        type="button"
        class="inline-flex items-center gap-1.5 whitespace-nowrap rounded border border-white/20 px-3 py-1 text-sm text-gray-200 transition-colors hover:border-white/40 hover:text-white"
        :aria-expanded="open"
        aria-haspopup="menu"
        @click.stop="open = !open"
      >
        <span class="max-w-[9rem] truncate">{{ auth.displayName }}</span>
        <svg class="h-3 w-3 opacity-70" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
          <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
        </svg>
      </button>
      <div
        v-if="open"
        class="absolute right-0 z-50 mt-2 min-w-[14rem] rounded-md border border-white/10 bg-gray-900/95 py-1 shadow-xl backdrop-blur-sm"
        role="menu"
      >
        <router-link
          to="/console"
          class="block px-3 py-2 text-sm text-gray-200 hover:bg-white/5 hover:text-white"
          role="menuitem"
          @click="open = false"
        >
          {{ t('navbar.console') }}
        </router-link>
        <router-link
          to="/console/hermes"
          class="block px-3 py-2 text-sm text-gray-200 hover:bg-white/5 hover:text-white"
          role="menuitem"
          @click="open = false"
        >
          {{ t('console.nav.hermes') }}
        </router-link>
        <router-link
          to="/console/account"
          class="block px-3 py-2 text-sm text-gray-200 hover:bg-white/5 hover:text-white"
          role="menuitem"
          @click="open = false"
        >
          {{ t('console.nav.account') }}
        </router-link>
        <div v-if="apps.length" class="max-h-72 overflow-y-auto border-t border-white/10">
          <a
            v-for="app in apps"
            :key="app.id"
            :href="app.url"
            class="block px-3 py-2 text-sm text-gray-200 hover:bg-white/5 hover:text-white"
            role="menuitem"
            target="_blank"
            rel="noopener noreferrer"
            @click="open = false"
          >
            {{ label(app.title) }}
          </a>
        </div>
        <button
          type="button"
          class="block w-full border-t border-white/10 px-3 py-2 text-left text-sm text-gray-400 hover:bg-white/5 hover:text-white"
          role="menuitem"
          @click="auth.logout()"
        >
          {{ t('navbar.logout') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/authStore'
import { useConsoleStore } from '../stores/consoleStore'

const { t, locale } = useI18n()
const auth = useAuthStore()
const catalog = useConsoleStore()
const open = ref(false)

const apps = computed(() => catalog.appsFor(auth.groups))
const label = (obj) => obj?.[locale.value] || obj?.en || ''

const onDocClick = (event) => {
  if (!event.target.closest?.('[aria-haspopup="menu"]') && !event.target.closest?.('[role="menu"]')) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
  catalog.load()
})
watch(
  () => auth.isAuthenticated,
  (ok) => {
    if (ok) catalog.load()
  }
)
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>
