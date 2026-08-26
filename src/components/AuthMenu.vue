<template>
  <div class="flex items-center gap-2">
    <template v-if="auth.isAuthenticated">
      <span class="hidden max-w-[10rem] truncate text-sm text-gray-300 sm:inline" :title="auth.email">
        {{ auth.displayName }}
      </span>
      <button
        type="button"
        class="rounded-lg px-3 py-1.5 text-sm text-gray-300 transition-colors hover:bg-gray-800/70 hover:text-white"
        @click="auth.logout()"
      >
        {{ t('navbar.logout') }}
      </button>
    </template>
    <template v-else>
      <button
        type="button"
        class="rounded-lg px-3 py-1.5 text-sm text-gray-300 transition-colors hover:bg-gray-800/70 hover:text-white"
        @click="auth.login()"
      >
        {{ t('navbar.login') }}
      </button>
      <button
        type="button"
        class="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-500"
        @click="auth.signup()"
      >
        {{ t('navbar.signup') }}
      </button>
    </template>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/authStore'

const { t } = useI18n()
const auth = useAuthStore()
</script>
