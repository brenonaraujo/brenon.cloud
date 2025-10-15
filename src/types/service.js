/**
 * @typedef {Object} LocalizedText
 * @property {string} en - English text (default/fallback)
 * @property {string} [pt] - Portuguese text (optional)
 */

/**
 * @typedef {Object} ServiceQuickStartStep
 * @property {LocalizedText} title - Step title
 * @property {LocalizedText} description - Step description
 */

/**
 * @typedef {Object} ServiceUseCase
 * @property {LocalizedText} title - Use case title
 * @property {LocalizedText} description - Use case description
 */

/**
 * @typedef {Object} ServiceIntegration
 * @property {string} name - Integration name (not localized)
 * @property {LocalizedText} description - Integration description
 */

/**
 * @typedef {Object} Service
 * @property {string} id - Unique service identifier
 * @property {LocalizedText} title - Service full title
 * @property {LocalizedText} shortName - Service short name
 * @property {LocalizedText} description - Brief service description
 * @property {string} icon - Icon identifier
 * @property {string} color - Theme color (blue, green, cyan, orange, purple)
 * @property {string} learnMoreUrl - URL to service detail page
 * @property {LocalizedText[]} features - List of service features
 * @property {ServiceUseCase[]} useCases - List of use cases
 * @property {ServiceIntegration[]} [integrations] - Service integrations
 * @property {string} [image] - Optional logo image URL
 * @property {string} [mermaidDiagram] - Optional Mermaid diagram definition
 * @property {LocalizedText} [gettingStarted] - Getting started HTML content
 * @property {ServiceQuickStartStep[]} [quickStart] - Quick start steps
 * @property {string} [demoUrl] - Optional demo/launch URL
 */

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Whether the request was successful
 * @property {*} data - Response data
 * @property {string} [error] - Error message if failed
 */

export {}
