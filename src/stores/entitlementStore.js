import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchBillingMe } from '../api/billingApi.js'

export const useEntitlementStore = defineStore('entitlement', () => {
  const plan = ref('')
  const status = ref('')
  const loaded = ref(false)

  const billing = computed(() => ({ plan: plan.value, status: status.value }))

  async function load(idToken) {
    if (!idToken) {
      plan.value = ''
      status.value = ''
      loaded.value = true
      return
    }
    try {
      const me = await fetchBillingMe(idToken)
      plan.value = me?.plan || ''
      status.value = me?.status || ''
    } catch {
      plan.value = ''
      status.value = ''
    } finally {
      loaded.value = true
    }
  }

  return { plan, status, loaded, billing, load }
})
