/**
 * Blog API Client
 * Loads blog posts from local markdown files at build time.
 * Markdown files live in `src/content/blog/*.md` and are bundled by Vite.
 */

// Eagerly import all markdown files as raw strings.
const rawPosts = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

export class BlogApiClient {
  /**
   * Returns an array of `{ slug, raw }` for every markdown file found.
   * Parsing is delegated to the service layer.
   * @returns {Promise<Array<{ slug: string, raw: string }>>}
   */
  async getRawPosts() {
    return Object.entries(rawPosts).map(([path, raw]) => ({
      slug: this._slugFromPath(path),
      raw
    }))
  }

  /**
   * Returns a single raw post by slug or null.
   * @param {string} slug
   * @returns {Promise<{ slug: string, raw: string } | null>}
   */
  async getRawPostBySlug(slug) {
    const posts = await this.getRawPosts()
    return posts.find(p => p.slug === slug) || null
  }

  _slugFromPath(path) {
    return path.split('/').pop().replace(/\.md$/, '')
  }
}

export const blogApi = new BlogApiClient()
