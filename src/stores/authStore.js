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

  async function login() {
    await getManager().signinRedirect({
      state: { returnTo: window.location.pathname + window.location.search }
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
    return typeof returnTo === 'string' && returnTo.startsWith('/') ? returnTo : '/'
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
    hydrate,
    login,
    signup,
    completeLogin,
    logout
  }
})
