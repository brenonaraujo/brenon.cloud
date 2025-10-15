import { computed, inject } from 'vue'
import { useServiceStore } from '../stores/serviceStore'
import { useI18n } from 'vue-i18n'

/**
 * Services Composable
 * Provides a clean interface for components to access service data
 * Encapsulates store and service layer interactions
 */
export function useServices() {
  const store = useServiceStore()
  const serviceService = inject('serviceService')
  const { t } = useI18n()

  /**
   * Load all services
   * @param {boolean} force - Force refresh from API
   * @returns {Promise<Service[]>}
   */
  const loadServices = async (force = false) => {
    return await store.fetchServices(serviceService, force)
  }

  /**
   * Load a specific service by ID
   * @param {string} id - Service ID
   * @returns {Promise<Service|null>}
   */
  const loadService = async (id) => {
    return await store.fetchServiceById(serviceService, id)
  }

  /**
   * Get translated service title
   * @param {string} serviceId - Service ID
   * @returns {string} Translated title
   */
  const getServiceTitle = (serviceId) => {
    return t(`services.${serviceId}.title`, { defaultValue: serviceId })
  }

  /**
   * Get translated service description
   * @param {string} serviceId - Service ID
   * @returns {string} Translated description
   */
  const getServiceDescription = (serviceId) => {
    return t(`services.${serviceId}.description`, { defaultValue: '' })
  }

  return {
    // State
    services: computed(() => store.allServices),
    loading: computed(() => store.isLoading),
    error: computed(() => store.error),
    hasError: computed(() => store.hasError),
    
    // Getters
    getServiceById: (id) => store.getServiceById(id),
    servicesByColor: (color) => store.servicesByColor(color),
    
    // Actions
    loadServices,
    loadService,
    clearError: store.clearError,
    
    // i18n helpers
    getServiceTitle,
    getServiceDescription
  }
}
