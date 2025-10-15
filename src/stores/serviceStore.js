import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Services Store
 * Centralized state management for services data
 * Using Composition API pattern for better TypeScript support
 */
export const useServiceStore = defineStore('services', () => {
  // State
  const services = ref([])
  const loading = ref(false)
  const error = ref(null)
  const lastFetch = ref(null)

  // Getters
  const allServices = computed(() => services.value)
  
  const isLoading = computed(() => loading.value)
  
  const hasError = computed(() => error.value !== null)
  
  const getServiceById = computed(() => {
    return (id) => services.value.find(s => s.id === id) || null
  })

  const servicesByColor = computed(() => {
    return (color) => services.value.filter(s => s.color === color)
  })

  // Actions
  async function fetchServices(serviceService, force = false) {
    // Cache strategy: don't refetch if we have data and it's less than 5 minutes old
    const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
    const now = Date.now()
    
    if (!serviceService) {
      error.value = 'ServiceService not available'
      loading.value = false
      return []
    }
    
    if (!force && services.value.length > 0 && lastFetch.value) {
      if (now - lastFetch.value < CACHE_DURATION) {
        return services.value
      }
    }

    loading.value = true
    error.value = null

    try {
      const data = await serviceService.getAllServices()
      if (Array.isArray(data) && data.length > 0) {
        services.value = data
        lastFetch.value = now
      } else {
        services.value = []
      }
      return data
    } catch (err) {
      error.value = err.message || 'Failed to fetch services'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchServiceById(serviceService, id) {
    // Check cache first
    const cached = services.value.find(s => s.id === id)
    if (cached) {
      return cached
    }
    
    loading.value = true
    error.value = null

    try {
      const service = await serviceService.getServiceById(id)
      
      // Add to cache if found
      if (service && !services.value.find(s => s.id === service.id)) {
        services.value.push(service)
      }
      
      return service
    } catch (err) {
      error.value = err.message || `Failed to fetch service ${id}`
      throw err
    } finally {
      loading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  function resetStore() {
    services.value = []
    loading.value = false
    error.value = null
    lastFetch.value = null
  }

  return {
    // State
    services,
    loading,
    error,
    lastFetch,
    // Getters
    allServices,
    isLoading,
    hasError,
    getServiceById,
    servicesByColor,
    // Actions
    fetchServices,
    fetchServiceById,
    clearError,
    resetStore
  }
})
