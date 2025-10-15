/**
 * Service Business Logic Layer
 * Implements domain logic and orchestrates API calls
 * Following Single Responsibility Principle
 */

export class ServiceService {
  /**
   * @param {ServicesApiClient} apiClient - Injected API client
   */
  constructor(apiClient) {
    this.apiClient = apiClient
  }

  /**
   * Get all services
   * @returns {Promise<Service[]>} List of services
   */
  async getAllServices() {
    try {
      const services = await this.apiClient.getServices()
      
      // Defensive: Ensure we have an array
      if (!Array.isArray(services)) {
        return []
      }
      
      // Business logic: Sort services by ID for consistent ordering
      return services.sort((a, b) => a.id.localeCompare(b.id))
    } catch (error) {
      throw error
    }
  }

  /**
   * Get service by ID
   * @param {string} id - Service ID
   * @returns {Promise<Service|null>} Service or null
   */
  async getServiceById(id) {
    try {
      if (!id) {
        throw new Error('Service ID is required')
      }
      return await this.apiClient.getServiceById(id)
    } catch (error) {
      throw error
    }
  }

  /**
   * Filter services by color
   * @param {Service[]} services - Services array
   * @param {string} color - Color to filter by
   * @returns {Service[]} Filtered services
   */
  filterByColor(services, color) {
    if (!color) return services
    return services.filter(s => s.color === color)
  }

  /**
   * Search services by query
   * @param {Service[]} services - Services array
   * @param {string} query - Search query
   * @returns {Service[]} Matching services
   */
  searchServices(services, query) {
    if (!query) return services
    const lowerQuery = query.toLowerCase()
    return services.filter(s => 
      s.title.toLowerCase().includes(lowerQuery) ||
      s.description.toLowerCase().includes(lowerQuery) ||
      s.shortName.toLowerCase().includes(lowerQuery)
    )
  }
}
