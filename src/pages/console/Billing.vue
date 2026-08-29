<template>
  <div>
    <ConsoleBreadcrumb :items="[{ label: t('console.nav.billing') }]" />

    <h1 class="text-3xl font-semibold tracking-tight text-white">{{ t('console.billing.title') }}</h1>
    <p class="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">{{ t('console.billing.subtitle') }}</p>

    <div class="mt-10 grid gap-6 lg:grid-cols-3">
      <section class="rounded-lg border border-white/10 bg-gray-900 p-6 lg:col-span-2">
        <p class="text-[11px] uppercase tracking-[0.12em] text-gray-500">{{ t('console.billing.thisPeriod') }}</p>
        <p class="mt-2 text-sm text-gray-400">{{ period }}</p>
        <p class="mt-4 text-4xl font-semibold tracking-tight text-white">{{ amount }}</p>
        <p class="mt-4 max-w-xl text-sm leading-relaxed text-gray-400">{{ t('console.billing.zeroHint') }}</p>
      </section>
      <section class="rounded-lg border border-white/10 bg-gray-900 p-6">
        <h2 class="text-sm font-semibold text-white">{{ t('console.account.plan') }}</h2>
        <p class="mt-4 text-lg text-white">{{ planLabel }}</p>
        <p class="mt-2 text-sm text-gray-400">{{ t('console.billing.planHint') }}</p>
        <router-link
          to="/console/account"
          class="mt-6 inline-flex min-h-[44px] items-center text-sm text-blue-300 hover:text-white"
        >
          {{ t('console.nav.account') }}
        </router-link>
      </section>
    </div>

    <section class="mt-8 rounded-lg border border-white/10 bg-gray-900">
      <h2 class="border-b border-white/10 px-4 py-3 text-sm font-semibold text-white">
        {{ t('console.billing.invoices') }}
      </h2>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[32rem] text-left text-sm">
          <thead class="border-b border-white/10 text-xs uppercase tracking-[0.12em] text-gray-500">
            <tr>
              <th class="px-4 py-3 font-medium">{{ t('console.billing.colPeriod') }}</th>
              <th class="px-4 py-3 font-medium">{{ t('console.billing.colAmount') }}</th>
              <th class="px-4 py-3 font-medium">{{ t('console.billing.colStatus') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="3" class="px-4 py-12 text-center text-sm text-gray-500">
                {{ t('console.billing.invoicesEmpty') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mt-8 rounded-lg border border-white/10 bg-gray-900 p-6">
      <h2 class="text-sm font-semibold text-white">{{ t('console.billing.payment') }}</h2>
      <p class="mt-2 max-w-2xl text-sm leading-relaxed text-gray-400">{{ t('console.billing.paymentEmpty') }}</p>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../../stores/authStore'
import { primaryPlan } from '../../config/console-taxonomy.mjs'
import {
  billingSnapshot,
  currentPeriodLabel,
  formatMoney
} from '../../config/console-overview.mjs'
import ConsoleBreadcrumb from '../../components/console/ConsoleBreadcrumb.vue'

const { t, te, locale } = useI18n()
const auth = useAuthStore()

const planLabel = computed(() => {
  const plan = primaryPlan(auth.groups)
  const key = `console.plan.${plan}`
  return te(key) ? t(key) : plan
})
const billing = computed(() => billingSnapshot(auth.groups))
const amount = computed(() => formatMoney(billing.value.amountCents, billing.value.currency, locale.value))
const period = computed(() => currentPeriodLabel(locale.value))
</script>
