import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { UserManager } from 'oidc-client-ts'
import { ENROLLMENT_FLOW, oidcSettings } from '../config/auth'

let manager

function getManager() {
  if (!manager) {
    manager = new UserManager(oidcSettings())
  }
  return manager
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const ready = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => Boolean(user.value?.access_token || user.value?.id_token))
  const displayName = computed(() => {
    const p = user.value?.profile || {}
    return p.name || p.preferred_username || p.email || ''
  })
  const email = computed(() => user.value?.profile?.email || '')
  const groups = computed(() => {
    const raw = user.value?.profile?.groups || user.value?.profile?.all_groups || ''
    if (Array.isArray(raw)) return raw.filter(Boolean)
    return String(raw)
      .split(',')
      .map((g) => g.trim())
      .filter(Boolean)
  })

  async function hydrate() {
    error.value = null
    try {
      const current = await getManager().getUser()
      user.value = current && !current.expired ? current : null
    } catch (err) {
      error.value = err?.message || 'auth'
      user.value = null
    } finally {
      ready.value = true
    }
  }

  async function login(returnTo = '/console') {
    const next = typeof returnTo === 'string' && returnTo.startsWith('/') ? returnTo : '/console'
    await getManager().signinRedirect({
      state: { returnTo: next }
    })
  }

  function signup() {
    const next = encodeURIComponent(`${window.location.origin}/auth/continue`)
    window.location.href = `${ENROLLMENT_FLOW}?next=${next}`
  }

  async function completeLogin() {
    const result = await getManager().signinRedirectCallback()
    user.value = result
    ready.value = true
    const returnTo = result?.state?.returnTo
    return typeof returnTo === 'string' && returnTo.startsWith('/') ? returnTo : '/console'
  }

  async function logout() {
    await getManager().signoutRedirect()
  }

  return {
    user,
    ready,
    error,
    isAuthenticated,
    displayName,
    email,
    groups,
    hydrate,
    login,
    signup,
    completeLogin,
    logout
  }
})
