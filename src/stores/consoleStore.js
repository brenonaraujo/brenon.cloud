import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchLiveCatalog } from '../api/consoleCatalogApi'
import { visibleForGroups } from '../config/console-acl.mjs'
import { CONSOLE_SERVICES } from '../config/console-registry'

export const useConsoleStore = defineStore('console', () => {
  const services = ref([])
  const loaded = ref(false)
  const loading = ref(false)
  const source = ref('fallback')

  async function load(force = false) {
    if (loaded.value && !force) return
    loading.value = true
    try {
      const live = await fetchLiveCatalog()
      if (live.length) {
        services.value = live
        source.value = 'live'
      } else {
        services.value = CONSOLE_SERVICES
        source.value = 'fallback'
      }
    } catch {
      services.value = CONSOLE_SERVICES
      source.value = 'fallback'
    } finally {
      loaded.value = true
      loading.value = false
    }
  }

  function appsFor(userGroups) {
    const list = services.value.length ? services.value : CONSOLE_SERVICES
    return visibleForGroups(list, userGroups)
  }

  return { services, loaded, loading, source, load, appsFor }
})
