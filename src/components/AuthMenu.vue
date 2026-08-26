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
        class="absolute right-0 z-50 mt-2 min-w-[12rem] rounded-md border border-white/10 bg-gray-900/95 py-1 shadow-xl backdrop-blur-sm"
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
        <a
          href="https://draw.brenon.cloud"
          class="block px-3 py-2 text-sm text-gray-200 hover:bg-white/5 hover:text-white"
          role="menuitem"
          @click="open = false"
        >
          Draw
        </a>
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
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/authStore'

const { t } = useI18n()
const auth = useAuthStore()
const open = ref(false)

const onDocClick = (event) => {
  if (!event.target.closest?.('[aria-haspopup="menu"]') && !event.target.closest?.('[role="menu"]')) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>
