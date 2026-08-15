import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePathToGloryStore = defineStore('path-to-glory', () => {
  const sectionsByLocale = ref({})
  const loading = ref(false)
  const error = ref(null)
  const lastFetch = ref({})

  const CACHE_TTL_MS = 5 * 60 * 1000

  const isCacheValid = (locale) => {
    const ts = lastFetch.value[locale]
    return ts && Date.now() - ts < CACHE_TTL_MS
  }

  const fetchSections = async (pathToGloryService, locale, force = false) => {
    if (!force && sectionsByLocale.value[locale] && isCacheValid(locale)) {
      return sectionsByLocale.value[locale]
    }
    loading.value = true
    error.value = null
    try {
      const sections = await pathToGloryService.getAllSections(locale)
      sectionsByLocale.value = { ...sectionsByLocale.value, [locale]: sections }
      lastFetch.value = { ...lastFetch.value, [locale]: Date.now() }
      return sections
    } catch (err) {
      error.value = err.message || String(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getSections = (locale) => sectionsByLocale.value[locale] || []
  const getSectionItems = (locale, id) => {
    const section = (sectionsByLocale.value[locale] || []).find((s) => s.id === id)
    return section ? section.items : []
  }

  return {
    sectionsByLocale,
    loading,
    error,
    fetchSections,
    getSections,
    getSectionItems
  }
})
