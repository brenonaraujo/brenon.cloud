<template>
  <header class="flex h-14 shrink-0 items-center gap-4 border-b border-white/10 bg-gray-950/90 px-4 backdrop-blur">
    <button
      type="button"
      class="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-gray-300 hover:bg-white/5 hover:text-white lg:hidden"
      :aria-label="t('console.nav.menu')"
      @click="$emit('toggle-sidebar')"
    >
      <MenuIcon class="h-5 w-5" />
    </button>

    <div class="hidden min-w-0 flex-1 lg:block">
      <ConsoleSearch />
    </div>
    <div class="flex-1 lg:hidden">
      <ConsoleSearch />
    </div>

    <div class="hidden items-center gap-2 sm:flex">
      <span
        class="rounded border border-white/10 px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-gray-400"
        :title="t('console.regionHint')"
      >
        {{ t('console.region') }}
      </span>
      <span class="rounded border border-white/10 px-2 py-1 text-[11px] uppercase tracking-wide text-gray-400">
        {{ planLabel }}
      </span>
    </div>

    <LanguageSelector />

    <div class="relative" ref="menuRoot">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-md border border-white/10 px-2 py-1 text-sm text-gray-200 transition-colors hover:border-white/20 hover:text-white"
        :aria-expanded="menuOpen"
        aria-haspopup="menu"
        @click.stop="menuOpen = !menuOpen"
      >
        <span class="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-xs font-semibold text-blue-300">
          {{ initials }}
        </span>
        <span class="hidden max-w-[9rem] truncate sm:inline">{{ auth.displayName }}</span>
      </button>
      <div
        v-if="menuOpen"
        class="absolute right-0 z-50 mt-2 w-56 rounded-md border border-white/10 bg-gray-900 py-1 shadow-xl"
        role="menu"
      >
        <div class="border-b border-white/10 px-3 py-2">
          <p class="truncate text-sm text-white">{{ auth.displayName }}</p>
          <p class="truncate font-mono text-xs text-gray-500">{{ auth.email }}</p>
        </div>
        <router-link
          to="/console/account"
          class="block px-3 py-2 text-sm text-gray-200 hover:bg-white/5"
          role="menuitem"
          @click="menuOpen = false"
        >
          {{ t('console.nav.account') }}
        </router-link>
        <button
          type="button"
          class="block w-full px-3 py-2 text-left text-sm text-gray-400 hover:bg-white/5 hover:text-white"
          role="menuitem"
          @click="auth.logout()"
        >
          {{ t('navbar.logout') }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../stores/authStore'
import { primaryPlan } from '../../config/console-taxonomy.mjs'
import { useConsoleUi } from '../../composables/useConsoleUi'
import LanguageSelector from '../ui/LanguageSelector.vue'
import ConsoleSearch from './ConsoleSearch.vue'
import { MenuIcon } from '../icons/Icons.js'

defineEmits(['toggle-sidebar'])

const { t, te } = useI18n()
const auth = useAuthStore()
const { initials } = useConsoleUi()
const menuOpen = ref(false)
const menuRoot = ref(null)

const planLabel = computed(() => {
  const plan = primaryPlan(auth.groups)
  const key = `console.plan.${plan}`
  return te(key) ? t(key) : plan
})

const onDocClick = (event) => {
  if (!menuRoot.value?.contains(event.target)) menuOpen.value = false
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>
