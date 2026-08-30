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
          class="inline-flex min-h-[44px] items-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-600/40 disabled:text-white/70"
          :disabled="creating || hasLive"
          @click="create"
        >
          {{ creating ? t('console.hermes.creating') : t('console.hermes.create') }}
        </button>
      </div>
      <p id="hermes-create-hint" class="mb-4 text-sm text-gray-500">{{ hint }}</p>
      <p v-if="error" class="mb-4 text-sm text-amber-300">{{ error }}</p>

      <div class="overflow-x-auto rounded-lg border border-white/10">
        <table class="w-full min-w-[36rem] text-left text-sm">
          <thead class="border-b border-white/10 bg-gray-900 text-xs uppercase tracking-[0.12em] text-gray-500">
            <tr>
              <th class="px-4 py-3 font-medium">{{ t('console.hermes.colName') }}</th>
              <th class="px-4 py-3 font-medium">{{ t('console.hermes.colStatus') }}</th>
              <th class="px-4 py-3 font-medium">{{ t('console.hermes.colPlan') }}</th>
              <th class="px-4 py-3 font-medium">{{ t('console.hermes.colRegion') }}</th>
              <th class="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="px-4 py-12 text-center text-sm text-gray-500">{{ t('console.hermes.loading') }}</td>
            </tr>
            <tr v-else-if="!instances.length">
              <td colspan="5" class="px-4 py-12 text-center">
                <InboxIcon class="mx-auto h-8 w-8 text-gray-600" />
                <p class="mt-4 font-medium text-white">{{ t('console.hermes.emptyTitle') }}</p>
                <p class="mt-2 text-sm text-gray-400">{{ t('console.hermes.empty') }}</p>
                <p v-if="operator" class="mt-2 text-sm text-gray-500">{{ t('console.hermes.emptyOperator') }}</p>
              </td>
            </tr>
            <tr v-for="row in instances" :key="row.id" class="border-t border-white/5">
              <td class="px-4 py-3 text-white">
                <p class="font-medium">{{ row.hostname || row.slug }}</p>
                <p class="text-xs text-gray-500">{{ row.username }}</p>
              </td>
              <td class="px-4 py-3 text-gray-300">{{ row.status }}</td>
              <td class="px-4 py-3 text-gray-300">{{ row.plan }} · {{ row.diskGb }} GB</td>
              <td class="px-4 py-3 text-gray-300">{{ row.region }}</td>
              <td class="px-4 py-3 text-right">
                <a
                  v-if="row.status === 'running' && row.hostname"
                  :href="'https://' + row.hostname"
                  target="_blank"
                  rel="noopener"
                  class="text-sm text-blue-300 hover:text-blue-200"
                >{{ t('console.hermes.open') }}</a>
                <span v-else-if="row.error" class="text-xs text-amber-300">{{ row.error }}</span>
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
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../stores/authStore'
import {
  canManageHermes,
  hermesDiskGb,
  isHermesOperator,
  isHermesSubscriber
} from '../../config/console-taxonomy.mjs'
import { createHermesInstance, fetchHermesInstances, humanHermesError } from '../../api/hermesApi.js'
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

const instances = ref([])
const loading = ref(false)
const creating = ref(false)
const error = ref('')

const hasLive = computed(() =>
  instances.value.some((row) => ['pending', 'provisioning', 'running', 'stopped'].includes(row.status))
)
const hint = computed(() => {
  if (hasLive.value) return t('console.hermes.createHintDone')
  return t('console.hermes.createHint')
})

async function load() {
  if (!canManage.value || !auth.idToken) return
  loading.value = true
  error.value = ''
  try {
    const data = await fetchHermesInstances(auth.idToken)
    instances.value = Array.isArray(data.instances) ? data.instances : []
  } catch (err) {
    error.value = humanHermesError(err, t('console.hermes.loadFallback'))
    instances.value = []
  } finally {
    loading.value = false
  }
}

async function create() {
  if (!auth.idToken || creating.value || hasLive.value) return
  creating.value = true
  error.value = ''
  try {
    const row = await createHermesInstance(auth.idToken)
    if (row?.id) {
      instances.value = [row, ...instances.value.filter((x) => x.id !== row.id)]
    } else {
      await load()
    }
  } catch (err) {
    error.value = humanHermesError(err, t('console.hermes.createFallback'))
  } finally {
    creating.value = false
  }
}

onMounted(load)
</script>
