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
      </div>
      <p id="hermes-create-hint" class="mb-4 text-sm text-gray-500">{{ hint }}</p>
      <p v-if="error" class="mb-4 text-sm text-amber-300">{{ error }}</p>
      <p v-if="waiting" class="mb-4 rounded-md border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
        {{ t('console.hermes.startingHint') }}
      </p>

      <form
        v-if="!hasLive && !loading"
        class="mb-8 rounded-lg border border-white/10 bg-gray-900 p-5"
        @submit.prevent="create"
      >
        <label for="hermes-public-name" class="block text-sm font-medium text-white">{{ t('console.hermes.publicName') }}</label>
        <p class="mt-1 text-sm leading-relaxed text-gray-400">{{ t('console.hermes.publicNameHint') }}</p>
        <div class="mt-4 flex min-h-[44px] max-w-lg overflow-hidden rounded-md border border-white/15 bg-black/30">
          <span class="flex items-center border-r border-white/10 px-3 font-mono text-sm text-gray-400">agent-</span>
          <input
            id="hermes-public-name"
            v-model="publicName"
            type="text"
            autocomplete="off"
            spellcheck="false"
            class="min-w-0 flex-1 bg-transparent px-3 text-sm text-white placeholder:text-gray-600 focus:outline-none"
            :placeholder="defaultName"
          >
        </div>
        <p v-if="previewHost" class="mt-3 font-mono text-sm text-blue-200">{{ previewHost }}</p>
        <p class="mt-2 text-xs leading-relaxed text-gray-500">{{ t('console.hermes.publicLater') }}</p>

        <label for="hermes-provider" class="mt-6 block text-sm font-medium text-white">{{ t('console.hermes.modelTitle') }}</label>
        <p class="mt-1 text-sm leading-relaxed text-gray-400">{{ t('console.hermes.modelHint') }}</p>
        <div class="mt-3 grid gap-3 sm:grid-cols-2">
          <select
            id="hermes-provider"
            v-model="providerId"
            class="min-h-[44px] rounded-md border border-white/15 bg-black/30 px-3 text-sm text-white"
          >
            <option v-for="p in providers" :key="p.id" :value="p.id">{{ p.label }}</option>
          </select>
          <input
            v-model="modelName"
            type="text"
            class="min-h-[44px] rounded-md border border-white/15 bg-black/30 px-3 text-sm text-white"
            :placeholder="t('console.hermes.modelPlaceholder')"
          >
        </div>
        <input
          v-model="apiKey"
          type="password"
          autocomplete="off"
          class="mt-3 min-h-[44px] w-full rounded-md border border-white/15 bg-black/30 px-3 text-sm text-white"
          :placeholder="t('console.hermes.apiKeyPlaceholder')"
        >
        <button
          type="submit"
          class="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-600/40 disabled:text-white/70"
          :disabled="creating || !previewSlug || !apiKey"
        >
          {{ creating ? t('console.hermes.creating') : t('console.hermes.create') }}
        </button>
      </form>

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
              <td class="px-4 py-3 text-gray-300">{{ isStarting(row) ? t('console.hermes.starting') : row.status }}</td>
              <td class="px-4 py-3 text-gray-300">{{ row.plan }} · {{ row.diskGb }} GB</td>
              <td class="px-4 py-3 text-gray-300">{{ row.region }}</td>
              <td class="px-4 py-3 text-right">
                <div class="flex items-center justify-end gap-4">
                  <a
                    v-if="canOpen(row)"
                    :href="'https://' + row.hostname + '/'"
                    target="_blank"
                    rel="noopener"
                    class="text-sm text-blue-300 hover:text-blue-200"
                  >{{ t('console.site.open') }}</a>
                  <a
                    v-if="canOpen(row)"
                    :href="row.launchUrl || ('https://' + row.hostname + '/hermes')"
                    target="_blank"
                    rel="noopener"
                    class="text-sm text-blue-300 hover:text-blue-200"
                  >{{ t('console.hermes.open') }}</a>
                  <a
                    v-if="canOpen(row) && row.cliUrl"
                    :href="row.cliUrl"
                    target="_blank"
                    rel="noopener"
                    class="text-sm text-blue-300 hover:text-blue-200"
                  >{{ t('console.hermes.cliOpen') }}</a>
                  <span v-else-if="isStarting(row)" class="text-sm text-gray-500">{{ t('console.hermes.starting') }}</span>
                  <button
                    v-if="row.status !== 'deleted'"
                    type="button"
                    class="text-sm text-red-300 hover:text-red-200 disabled:opacity-40"
                    :disabled="destroying === row.id"
                    @click="askDestroy(row)"
                  >{{ destroying === row.id ? t('console.hermes.destroying') : t('console.hermes.destroy') }}</button>
                </div>
                <p v-if="row.error" class="mt-1 text-xs text-amber-300">{{ row.error }}</p>
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

    <section
      v-if="canManage && pageInstance"
      class="mt-10 rounded-lg border border-white/10 bg-gray-900 p-5"
    >
      <h2 class="text-lg font-semibold text-white">{{ t('console.hermes.publicTitle') }}</h2>
      <p class="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">{{ t('console.hermes.publicRenameHint') }}</p>
      <form class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center" @submit.prevent="rename">
        <div class="flex min-h-[44px] max-w-lg flex-1 overflow-hidden rounded-md border border-white/15 bg-black/30">
          <span class="flex items-center border-r border-white/10 px-3 font-mono text-sm text-gray-400">agent-</span>
          <input
            v-model="publicName"
            type="text"
            autocomplete="off"
            spellcheck="false"
            class="min-w-0 flex-1 bg-transparent px-3 text-sm text-white focus:outline-none"
          >
        </div>
        <button
          type="submit"
          class="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/15 px-4 text-sm text-gray-200 hover:bg-white/5 disabled:opacity-40"
          :disabled="renaming || !previewSlug || previewSlug === pageInstance.slug"
        >
          {{ renaming ? t('console.hermes.publicSaving') : t('console.hermes.publicSave') }}
        </button>
      </form>
      <p class="mt-3 font-mono text-sm text-blue-200">{{ previewHost }}</p>
      <p v-if="pageInstance.hostname" class="mt-2 text-xs text-gray-500">{{ t('console.hermes.webhookHint', { url: 'https://' + pageInstance.hostname + '/hermes/hooks' }) }}</p>
    </section>

    <section
      v-if="canManage && pageInstance && pageInstance.cliUrl"
      class="mt-10 rounded-lg border border-white/10 bg-gray-900 p-5"
    >
      <h2 class="text-lg font-semibold text-white">{{ t('console.hermes.cliTitle') }}</h2>
      <p class="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">{{ t('console.hermes.cliHint') }}</p>
      <p class="mt-3 font-mono text-sm text-blue-200">{{ t('console.hermes.cliUser') }}: {{ pageInstance.cliUser }}</p>
      <p class="font-mono text-sm text-blue-200">{{ t('console.hermes.cliPass') }}: {{ pageInstance.cliPassword }}</p>
      <a
        :href="pageInstance.cliUrl"
        target="_blank"
        rel="noopener"
        class="mt-4 inline-flex min-h-[44px] items-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500"
      >{{ t('console.hermes.cliOpen') }}</a>
    </section>

    <section
      v-if="canManage && pageInstance"
      class="mt-10 rounded-lg border border-white/10 bg-gray-900 p-5"
    >
      <h2 class="text-lg font-semibold text-white">{{ t('console.hermes.modelTitle') }}</h2>
      <p class="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">{{ t('console.hermes.modelHint') }}</p>
      <p v-if="providerStatus?.configured" class="mt-2 text-sm text-blue-200">{{ t('console.hermes.modelConfigured', { provider: providerStatus.id, model: providerStatus.model }) }}</p>
      <div class="mt-4 grid gap-3 sm:grid-cols-2">
        <select
          v-model="providerId"
          class="min-h-[44px] rounded-md border border-white/15 bg-black/30 px-3 text-sm text-white"
        >
          <option v-for="p in providers" :key="p.id" :value="p.id">{{ p.label }}</option>
        </select>
        <input
          v-model="modelName"
          type="text"
          class="min-h-[44px] rounded-md border border-white/15 bg-black/30 px-3 text-sm text-white"
          :placeholder="t('console.hermes.modelPlaceholder')"
        >
      </div>
      <input
        v-model="apiKey"
        type="password"
        autocomplete="off"
        class="mt-3 min-h-[44px] w-full rounded-md border border-white/15 bg-black/30 px-3 text-sm text-white"
        :placeholder="providerStatus?.configured ? t('console.hermes.apiKeyReplace') : t('console.hermes.apiKeyPlaceholder')"
      >
      <button
        type="button"
        class="mt-4 inline-flex min-h-[44px] items-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-40"
        :disabled="savingProvider || !apiKey || !providerId"
        @click="saveProvider"
      >
        {{ savingProvider ? t('console.hermes.modelSaving') : t('console.hermes.modelSave') }}
      </button>
    </section>

    <ConsoleHostPage v-if="canManage && pageInstance" :instance="pageInstance" />

    <div
      v-if="pending"
      class="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hermes-destroy-title"
    >
      <div class="w-full max-w-md rounded-lg border border-white/10 bg-gray-900 p-6">
        <h2 id="hermes-destroy-title" class="text-lg font-semibold text-white">{{ t('console.hermes.destroyTitle') }}</h2>
        <p class="mt-3 text-sm leading-relaxed text-gray-300">{{ t('console.hermes.destroyBody', { host: pending.hostname || pending.slug }) }}</p>
        <div class="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            class="inline-flex min-h-[44px] items-center justify-center rounded-md border border-white/15 px-4 text-sm text-gray-200 hover:bg-white/5"
            :disabled="!!destroying"
            @click="pending = null"
          >{{ t('console.hermes.destroyCancel') }}</button>
          <button
            type="button"
            class="inline-flex min-h-[44px] items-center justify-center rounded-md bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-40"
            :disabled="!!destroying"
            @click="destroy"
          >{{ destroying ? t('console.hermes.destroying') : t('console.hermes.destroyConfirm') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../stores/authStore'
import {
  canManageHermes,
  hermesDiskGb,
  isHermesOperator,
  isHermesSubscriber
} from '../../config/console-taxonomy.mjs'
import {
  agentSlug,
  createHermesInstance,
  deleteHermesInstance,
  fetchHermesInstances,
  fetchHermesProvider,
  fetchHermesProviders,
  humanHermesError,
  renameHermesInstance,
  saveHermesProvider,
  stripAgentPrefix
} from '../../api/hermesApi.js'
import ConsoleBreadcrumb from '../../components/console/ConsoleBreadcrumb.vue'
import ConsoleHostPage from '../../components/console/ConsoleHostPage.vue'
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
const renaming = ref(false)
const destroying = ref('')
const pending = ref(null)
const error = ref('')
const publicName = ref('')
const providers = ref([])
const providerId = ref('xai')
const modelName = ref('grok-4.6')
const apiKey = ref('')
const providerStatus = ref(null)
const savingProvider = ref(false)

const defaultName = computed(() => {
  const fromUser = stripAgentPrefix(String(auth.username || '').trim())
  if (fromUser) return slugify(fromUser)
  const local = String(auth.email || '').split('@')[0]
  return slugify(local)
})

const hasLive = computed(() =>
  instances.value.some((row) => ['pending', 'provisioning', 'running', 'stopped'].includes(row.status))
)
const pageInstance = computed(() => {
  const live = instances.value.filter((row) =>
    ['running', 'provisioning', 'pending', 'stopped'].includes(row.status)
  )
  return live.find((row) => row.email === auth.email) || live[0] || null
})
const previewSlug = computed(() => agentSlug(publicName.value || defaultName.value))
const previewHost = computed(() => (previewSlug.value ? `${previewSlug.value}.brenon.cloud` : ''))
const waiting = computed(() => instances.value.some(isStarting))
const hint = computed(() => {
  if (waiting.value) return t('console.hermes.startingHint')
  if (hasLive.value) return t('console.hermes.createHintDone')
  return t('console.hermes.createHint')
})

function canOpen(row) {
  return Boolean(row?.ready && row.hostname)
}
function isStarting(row) {
  return Boolean(row) && !row.ready && ['pending', 'provisioning', 'running'].includes(row.status)
}

function slugify(raw) {
  return String(raw || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function mapSlugError(err, fallback) {
  const msg = humanHermesError(err, fallback)
  if (/subdomain taken/i.test(msg)) return t('console.hermes.publicTaken')
  if (/reserved/i.test(msg)) return t('console.hermes.publicReserved')
  if (/too short/i.test(msg)) return t('console.hermes.publicShort')
  if (/invalid public name/i.test(msg)) return t('console.hermes.publicInvalid')
  return msg
}

function syncPublicName() {
  if (pageInstance.value?.slug) {
    publicName.value = stripAgentPrefix(pageInstance.value.slug)
    return
  }
  if (!publicName.value) publicName.value = defaultName.value
}

async function load(quiet = false) {
  if (!canManage.value || !auth.idToken) return
  if (!quiet) loading.value = true
  if (!quiet) error.value = ''
  try {
    const data = await fetchHermesInstances(auth.idToken)
    instances.value = Array.isArray(data.instances) ? data.instances : []
    syncPublicName()
  } catch (err) {
    if (!quiet) {
      error.value = humanHermesError(err, t('console.hermes.loadFallback'))
      instances.value = []
    }
  } finally {
    if (!quiet) loading.value = false
  }
}

async function create() {
  if (!auth.idToken || creating.value || hasLive.value) return
  creating.value = true
  error.value = ''
  try {
    const row = await createHermesInstance(auth.idToken, previewSlug.value, {
      provider: providerId.value,
      apiKey: apiKey.value,
      model: modelName.value
    })
    if (row?.id) {
      instances.value = [row, ...instances.value.filter((x) => x.id !== row.id)]
      syncPublicName()
      apiKey.value = ''
    } else {
      await load()
    }
  } catch (err) {
    error.value = mapSlugError(err, t('console.hermes.createFallback'))
  } finally {
    creating.value = false
  }
}

async function rename() {
  const row = pageInstance.value
  if (!auth.idToken || !row?.id || renaming.value) return
  if (previewSlug.value === row.slug) return
  renaming.value = true
  error.value = ''
  try {
    const updated = await renameHermesInstance(auth.idToken, row.id, previewSlug.value)
    instances.value = instances.value.map((x) => (x.id === row.id ? { ...x, ...updated } : x))
    syncPublicName()
  } catch (err) {
    error.value = mapSlugError(err, t('console.hermes.publicSaveFallback'))
  } finally {
    renaming.value = false
  }
}

function askDestroy(row) {
  if (!row?.id || destroying.value) return
  pending.value = row
}

async function destroy() {
  const row = pending.value
  if (!auth.idToken || !row?.id || destroying.value) return
  destroying.value = row.id
  error.value = ''
  try {
    await deleteHermesInstance(auth.idToken, row.id)
    pending.value = null
    instances.value = instances.value.filter((x) => x.id !== row.id)
    publicName.value = defaultName.value
  } catch (err) {
    error.value = humanHermesError(err, t('console.hermes.destroyFallback'))
  } finally {
    destroying.value = ''
  }
}

async function saveProvider() {
  const row = pageInstance.value
  if (!auth.idToken || !row?.id || savingProvider.value || !apiKey.value) return
  savingProvider.value = true
  error.value = ''
  try {
    providerStatus.value = await saveHermesProvider(auth.idToken, row.id, {
      provider: providerId.value,
      apiKey: apiKey.value,
      model: modelName.value
    })
    apiKey.value = ''
  } catch (err) {
    error.value = humanHermesError(err, t('console.hermes.modelSaveFallback'))
  } finally {
    savingProvider.value = false
  }
}

async function loadCatalog() {
  if (!auth.idToken) return
  try {
    const data = await fetchHermesProviders(auth.idToken)
    providers.value = Array.isArray(data.providers) ? data.providers : []
    if (!providerId.value && providers.value[0]) providerId.value = providers.value[0].id
  } catch {
    providers.value = [{ id: 'xai', label: 'xAI', defaultModel: 'grok-4.6' }]
  }
}

async function loadProviderStatus() {
  const row = pageInstance.value
  if (!auth.idToken || !row?.id) {
    providerStatus.value = null
    return
  }
  try {
    const st = await fetchHermesProvider(auth.idToken, row.id)
    providerStatus.value = st
    if (st.id) providerId.value = st.id
    if (st.model) modelName.value = st.model
  } catch {
    providerStatus.value = null
  }
}

let waitTimer = 0
function stopWait() {
  if (waitTimer) {
    clearInterval(waitTimer)
    waitTimer = 0
  }
}
function startWait() {
  if (waitTimer) return
  waitTimer = setInterval(() => {
    load(true)
  }, 2500)
}

watch(waiting, (on) => {
  if (on) startWait()
  else stopWait()
}, { immediate: true })

watch(defaultName, (name) => {
  if (!hasLive.value && !publicName.value && name) publicName.value = name
})

watch(
  () => pageInstance.value?.id,
  () => {
    loadProviderStatus()
  }
)

watch(providerId, (id) => {
  const p = providers.value.find((x) => x.id === id)
  if (p?.defaultModel && !pageInstance.value) modelName.value = p.defaultModel
})

onMounted(async () => {
  await loadCatalog()
  await load()
  await loadProviderStatus()
})
onUnmounted(stopWait)
</script>
