/**
 * Blog Post type contract.
 *
 * @typedef {Object} BlogPost
 * @property {string} slug          URL-safe identifier derived from filename.
 * @property {string} title         Post title (frontmatter `title`).
 * @property {string} description   Short summary used in listing/SEO (frontmatter `description`).
 * @property {string} date          ISO date string (frontmatter `date`).
 * @property {string} [author]      Optional author name.
 * @property {string[]} [tags]      Optional tag list.
 * @property {string} [cover]       Optional cover image URL.
 * @property {string} [coverFallback] Optional fallback image URL or path.
 * @property {string} content       Raw markdown body (without frontmatter).
 * @property {string} html          Rendered HTML body.
 * @property {number} readingTime   Approximate reading time in minutes.
 */

export const BlogPost = {}
