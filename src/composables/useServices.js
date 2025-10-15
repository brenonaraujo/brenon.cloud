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
  const { locale } = useI18n()

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
   * Get localized text from service data with fallback
   * @param {LocalizedText|string} localizedText - Localized text object or plain string
   * @returns {string} Localized text with fallback to English
   */
  const getLocalizedText = (localizedText) => {
    if (typeof localizedText === 'string') {
      return localizedText
    }
    
    if (!localizedText || typeof localizedText !== 'object') {
      return ''
    }

    // Try current locale first, then fallback to English
    const currentLocale = locale.value || 'en'
    return localizedText[currentLocale] || localizedText.en || ''
  }

  /**
   * Get localized service with all text fields translated
   * @param {Service} service - Raw service object
   * @returns {Service} Service with localized text fields
   */
  const getLocalizedService = (service) => {
    if (!service) return null

    return {
      ...service,
      title: getLocalizedText(service.title),
      shortName: getLocalizedText(service.shortName),
      description: getLocalizedText(service.description),
      features: service.features?.map(feature => getLocalizedText(feature)) || [],
      useCases: service.useCases?.map(useCase => ({
        title: getLocalizedText(useCase.title),
        description: getLocalizedText(useCase.description)
      })) || [],
      integrations: service.integrations?.map(integration => ({
        name: integration.name,
        description: getLocalizedText(integration.description)
      })) || [],
      quickStart: service.quickStart?.map(step => ({
        title: getLocalizedText(step.title),
        description: getLocalizedText(step.description)
      })) || [],
      gettingStarted: getLocalizedText(service.gettingStarted)
    }
  }

  /**
   * Get all services with localized content
   * @returns {Array} Array of localized services
   */
  const localizedServices = computed(() => {
    return store.services.map(service => getLocalizedService(service))
  })

  /**
   * Get a specific localized service by ID
   * @param {string} id - Service ID
   * @returns {Service|null} Localized service or null
   */
  const getLocalizedServiceById = (id) => {
    const service = store.services.find(s => s.id === id)
    return getLocalizedService(service)
  }

  return {
    // State
    services: computed(() => store.allServices),
    localizedServices,
    loading: computed(() => store.isLoading),
    error: computed(() => store.error),
    hasError: computed(() => store.hasError),
    
    // Getters
    getServiceById: (id) => store.getServiceById(id),
    getLocalizedServiceById,
    servicesByColor: (color) => store.servicesByColor(color),
    
    // Actions
    loadServices,
    loadService,
    clearError: store.clearError,
    
    // i18n helpers
    getLocalizedText,
    getLocalizedService
  }
}
