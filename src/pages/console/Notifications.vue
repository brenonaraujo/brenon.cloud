<template>
  <div>
    <ConsoleBreadcrumb :items="[{ label: t('console.nav.notifications') }]" />

    <h1 class="text-3xl font-semibold tracking-tight text-white">{{ t('console.notifications.title') }}</h1>
    <p class="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">{{ t('console.notifications.subtitle') }}</p>

    <div
      v-if="!notes.length"
      class="mt-10 rounded-lg border border-dashed border-white/15 px-6 py-12 text-center"
    >
      <BellIcon class="mx-auto h-8 w-8 text-gray-600" />
      <h2 class="mt-4 text-lg font-semibold text-white">{{ t('console.notifications.emptyTitle') }}</h2>
      <p class="mt-2 text-sm text-gray-400">{{ t('console.notifications.empty') }}</p>
    </div>

    <ul v-else class="mt-10 divide-y divide-white/10 rounded-lg border border-white/10 bg-gray-900">
      <li v-for="note in notes" :key="note.id">
        <component
          :is="note.to ? 'router-link' : 'div'"
          :to="note.to || undefined"
          class="flex items-start gap-4 px-4 py-4"
          :class="note.to ? 'transition-colors hover:bg-white/5' : ''"
        >
          <span
            class="mt-1 h-2 w-2 shrink-0 rounded-full"
            :class="note.level === 'warning' ? 'bg-amber-400' : 'bg-blue-400'"
          />
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-white">{{ t('console.notifications.items.' + note.key + '.title') }}</p>
            <p class="mt-1 text-sm leading-relaxed text-gray-400">
              {{ t('console.notifications.items.' + note.key + '.body') }}
            </p>
          </div>
          <ChevronRightIcon v-if="note.to" class="mt-1 h-4 w-4 shrink-0 text-gray-600" />
        </component>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../stores/authStore'
import { useConsoleStore } from '../../stores/consoleStore'
import { buildNotifications } from '../../config/console-overview.mjs'
import ConsoleBreadcrumb from '../../components/console/ConsoleBreadcrumb.vue'
import { BellIcon, ChevronRightIcon } from '../../components/icons/Icons.js'

const { t } = useI18n()
const auth = useAuthStore()
const catalog = useConsoleStore()

const notes = computed(() =>
  buildNotifications({ catalogOffline: Boolean(catalog.error), groups: auth.groups })
)
</script>
