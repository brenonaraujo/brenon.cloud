<template>
  <div>
    <ConsoleBreadcrumb :items="[{ label: t('console.nav.billing') }]" />

    <h1 class="text-3xl font-semibold tracking-tight text-white">{{ t('console.billing.title') }}</h1>
    <p class="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">{{ t('console.billing.subtitle') }}</p>

    <p
      v-if="flash"
      class="mt-6 rounded-md border px-4 py-3 text-sm"
      :class="flash.ok ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200' : 'border-amber-500/30 bg-amber-500/10 text-amber-200'"
    >
      {{ flash.text }}
    </p>
    <p v-if="error" class="mt-6 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
      {{ error }}
    </p>

    <div class="mt-10 grid gap-4 lg:grid-cols-3">
      <article
        v-for="plan in plans"
        :key="plan.id"
        class="flex flex-col rounded-lg border p-6"
        :class="plan.id === currentPlan ? 'border-blue-500/50 bg-blue-500/10' : 'border-white/10 bg-gray-900'"
      >
        <p class="text-[11px] uppercase tracking-[0.12em] text-gray-500">{{ t('console.account.plan') }}</p>
        <h2 class="mt-2 text-xl font-semibold text-white">{{ planLabel(plan.id) }}</h2>
        <p class="mt-3 text-3xl font-semibold tracking-tight text-white">{{ formatMoney(plan.amountCents, 'BRL', locale) }}</p>
        <p class="mt-1 text-xs text-gray-500">{{ t('console.billing.perMonth') }}</p>
        <ul class="mt-6 space-y-2 text-sm leading-relaxed text-gray-300">
          <li v-for="line in planLines(plan.id)" :key="line">{{ line }}</li>
        </ul>
        <div class="mt-8 flex-1" />
        <p v-if="plan.id === currentPlan" class="text-sm text-blue-300">{{ t('console.billing.current') }}</p>
        <button
          v-else-if="plan.id !== 'free'"
          type="button"
          class="inline-flex min-h-[44px] items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
          :disabled="busy"
          @click="upgrade(plan.id)"
        >
          {{ t('console.billing.upgrade') }}
        </button>
      </article>
    </div>

    <div class="mt-10 grid gap-6 lg:grid-cols-3">
      <section class="rounded-lg border border-white/10 bg-gray-900 p-6 lg:col-span-2">
        <p class="text-[11px] uppercase tracking-[0.12em] text-gray-500">{{ t('console.billing.thisPeriod') }}</p>
        <p class="mt-2 text-sm text-gray-400">{{ period }}</p>
        <p class="mt-4 text-4xl font-semibold tracking-tight text-white">{{ amount }}</p>
        <p class="mt-4 max-w-xl text-sm leading-relaxed text-gray-400">
          {{ me?.status && me.status !== 'none' ? t('console.billing.stripeHint') : t('console.billing.zeroHint') }}
        </p>
      </section>
      <section class="rounded-lg border border-white/10 bg-gray-900 p-6">
        <h2 class="text-sm font-semibold text-white">{{ t('console.billing.payment') }}</h2>
        <p class="mt-2 text-sm leading-relaxed text-gray-400">
          {{ me?.customerId ? t('console.billing.paymentReady') : t('console.billing.paymentEmpty') }}
        </p>
        <button
          v-if="me?.customerId"
          type="button"
          class="mt-6 inline-flex min-h-[44px] items-center rounded-md border border-white/15 px-4 text-sm text-gray-200 hover:bg-white/5 disabled:opacity-50"
          :disabled="busy"
          @click="portal"
        >
          {{ t('console.billing.manage') }}
        </button>
        <p class="mt-4 text-xs text-gray-500">{{ t('console.billing.planHint') }}</p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import { primaryPlan } from '../../config/console-taxonomy.mjs'
import { currentPeriodLabel, formatMoney } from '../../config/console-overview.mjs'
import {
  FALLBACK_PLANS,
  fetchBillingMe,
  fetchBillingPlans,
  startCheckout,
  startPortal
} from '../../api/billingApi.js'
import ConsoleBreadcrumb from '../../components/console/ConsoleBreadcrumb.vue'

const { t, te, locale } = useI18n()
const route = useRoute()
const auth = useAuthStore()

const plans = ref(FALLBACK_PLANS)
const me = ref(null)
const error = ref('')
const busy = ref(false)

const currentPlan = computed(() => {
  if (me.value?.plan && me.value.status && me.value.status !== 'canceled' && me.value.status !== 'none') {
    return me.value.plan
  }
  return primaryPlan(auth.groups)
})
const amount = computed(() => {
  const row = plans.value.find((p) => p.id === currentPlan.value)
  return formatMoney(row?.amountCents || 0, 'BRL', locale.value)
})
const period = computed(() => currentPeriodLabel(locale.value))
const flash = computed(() => {
  if (route.query.checkout === 'success') {
    return { ok: true, text: t('console.billing.checkoutSuccess') }
  }
  if (route.query.checkout === 'cancel') {
    return { ok: false, text: t('console.billing.checkoutCancel') }
  }
  return null
})

function planLabel(id) {
  const key = `console.plan.${id}`
  return te(key) ? t(key) : id
}

function planLines(id) {
  const key = `console.billing.features.${id}`
  if (!te(key)) return []
  const value = t(key)
  return String(value)
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)
}

async function load() {
  error.value = ''
  try {
    const data = await fetchBillingPlans()
    if (Array.isArray(data.plans) && data.plans.length) plans.value = data.plans
  } catch {
    plans.value = FALLBACK_PLANS
  }
  if (!auth.idToken) return
  try {
    me.value = await fetchBillingMe(auth.idToken)
  } catch (err) {
    me.value = null
    error.value = err?.message || t('console.billing.loadError')
  }
}

async function upgrade(plan) {
  error.value = ''
  if (!auth.idToken) {
    error.value = t('console.billing.needSession')
    return
  }
  busy.value = true
  try {
    window.location.href = await startCheckout(auth.idToken, plan)
  } catch (err) {
    error.value = err?.message || t('console.billing.checkoutError')
    busy.value = false
  }
}

async function portal() {
  error.value = ''
  busy.value = true
  try {
    window.location.href = await startPortal(auth.idToken)
  } catch (err) {
    error.value = err?.message || t('console.billing.portalError')
    busy.value = false
  }
}

onMounted(load)
</script>
