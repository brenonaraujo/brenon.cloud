/**
 * @typedef {Object} ServiceQuickStartStep
 * @property {string} title - Step title
 * @property {string} description - Step description
 */

/**
 * @typedef {Object} ServiceUseCase
 * @property {string} title - Use case title
 * @property {string} description - Use case description
 */

/**
 * @typedef {Object} Service
 * @property {string} id - Unique service identifier
 * @property {string} title - Service full title
 * @property {string} shortName - Service short name
 * @property {string} description - Brief service description
 * @property {string} icon - Icon identifier
 * @property {string} color - Theme color (blue, green, cyan, orange, purple)
 * @property {string} learnMoreUrl - URL to service detail page
 * @property {string[]} features - List of service features
 * @property {ServiceUseCase[]} useCases - List of use cases
 * @property {string} [image] - Optional logo image URL
 * @property {string} [mermaidDiagram] - Optional Mermaid diagram definition
 * @property {string} [gettingStarted] - Getting started HTML content
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
