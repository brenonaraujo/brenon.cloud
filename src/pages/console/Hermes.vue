<template>
  <div>
    <ConsoleBreadcrumb :items="[{ label: t('console.nav.hermes') }]" />

    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p class="text-[11px] uppercase tracking-[0.12em] text-blue-300/80">{{ t('console.hermes.eyebrow') }}</p>
        <h1 class="mt-2 text-3xl font-semibold tracking-tight text-white">{{ t('console.hermes.title') }}</h1>
        <p class="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">{{ t('console.hermes.subtitle') }}</p>
        <p v-if="disk" class="mt-2 text-sm text-blue-200">{{ t('console.hermes.disk', { gb: disk }) }}</p>
      </div>
      <span
        class="inline-flex w-fit items-center rounded-md px-2 py-1 text-[11px] font-medium uppercase tracking-wide"
        :class="canManage ? 'bg-blue-500/20 text-blue-300' : 'bg-white/5 text-gray-400'"
      >
        {{ badge }}
      </span>
    </div>

    <section class="mt-10 grid gap-4 md:grid-cols-3">
      <article v-for="item in features" :key="item.title" class="rounded-lg border border-white/10 bg-gray-900 p-4">
        <h2 class="text-base font-semibold text-white">{{ item.title }}</h2>
        <p class="mt-2 text-sm leading-relaxed text-gray-400">{{ item.body }}</p>
      </article>
    </section>

    <section v-if="canManage" class="mt-10">
      <div class="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 class="text-lg font-semibold text-white">{{ t('console.hermes.instances') }}</h2>
        <button
          type="button"
          class="inline-flex min-h-[44px] cursor-not-allowed items-center rounded-md bg-blue-600/40 px-4 text-sm font-medium text-white/70"
          disabled
          aria-describedby="hermes-create-hint"
        >
          {{ t('console.hermes.create') }}
        </button>
      </div>
      <p id="hermes-create-hint" class="mb-4 text-sm text-gray-500">{{ t('console.hermes.createHint') }}</p>

      <div class="overflow-x-auto rounded-lg border border-white/10">
        <table class="w-full min-w-[36rem] text-left text-sm">
          <thead class="border-b border-white/10 bg-gray-900 text-xs uppercase tracking-[0.12em] text-gray-500">
            <tr>
              <th class="px-4 py-3 font-medium">{{ t('console.hermes.colName') }}</th>
              <th class="px-4 py-3 font-medium">{{ t('console.hermes.colStatus') }}</th>
              <th class="px-4 py-3 font-medium">{{ t('console.hermes.colPlan') }}</th>
              <th class="px-4 py-3 font-medium">{{ t('console.hermes.colRegion') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" class="px-4 py-12 text-center">
                <InboxIcon class="mx-auto h-8 w-8 text-gray-600" />
                <p class="mt-4 font-medium text-white">{{ t('console.hermes.emptyTitle') }}</p>
                <p class="mt-2 text-sm text-gray-400">{{ t('console.hermes.empty') }}</p>
                <p v-if="operator" class="mt-2 text-sm text-gray-500">{{ t('console.hermes.emptyOperator') }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section
      v-else
      class="mt-10 rounded-lg border border-white/10 bg-gray-900 px-6 py-10"
    >
      <h2 class="text-lg font-semibold text-white">{{ t('console.hermes.lockedTitle') }}</h2>
      <p class="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">{{ t('console.hermes.locked') }}</p>
      <router-link
        to="/console/billing"
        class="mt-6 inline-flex min-h-[44px] items-center rounded-md border border-white/15 px-4 text-sm text-gray-200 hover:bg-white/5"
      >
        {{ t('console.nav.billing') }}
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../stores/authStore'
import {
  canManageHermes,
  hermesDiskGb,
  isHermesOperator,
  isHermesSubscriber
} from '../../config/console-taxonomy.mjs'
import ConsoleBreadcrumb from '../../components/console/ConsoleBreadcrumb.vue'
import { InboxIcon } from '../../components/icons/Icons.js'

const { t } = useI18n()
const auth = useAuthStore()

const canManage = computed(() => canManageHermes(auth.groups))
const operator = computed(() => isHermesOperator(auth.groups))
const disk = computed(() => hermesDiskGb(auth.groups))
const badge = computed(() => {
  if (isHermesSubscriber(auth.groups)) return t('console.hermes.badgePlan')
  if (operator.value) return t('console.hermes.badgeOperator')
  return t('console.hermes.badgeSoon')
})

const features = computed(() => [
  { title: t('console.hermes.what1Title'), body: t('console.hermes.what1') },
  { title: t('console.hermes.what2Title'), body: t('console.hermes.what2') },
  { title: t('console.hermes.what3Title'), body: t('console.hermes.what3') }
])
</script>
