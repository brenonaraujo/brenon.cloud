import { ofetch } from 'ofetch'

/**
 * HTTP Client Configuration
 * Provides a configured fetch instance for API calls
 */

// Base URL from environment or default to mock
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

/**
 * Create a configured HTTP client
 * @returns {typeof ofetch} Configured fetch instance
 */
export const createApiClient = () => {
  return ofetch.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    },
    // Retry configuration
    retry: 1,
    retryDelay: 500,
    // Error handling
    onResponseError({ response }) {
      console.error('API Error:', response.status, response.statusText)
    }
  })
}

// Export singleton instance
export const apiClient = createApiClient()
