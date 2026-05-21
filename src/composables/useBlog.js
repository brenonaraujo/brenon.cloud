import { computed, inject } from 'vue'
import { useBlogStore } from '../stores/blogStore'
import { useI18n } from 'vue-i18n'

/**
 * Blog Composable
 * Reactive entry point for components. Posts are resolved against the
 * active i18n locale; switching language re-fetches the correct variant.
 */
export function useBlog() {
  const store = useBlogStore()
  const blogService = inject('blogService')
  const { locale } = useI18n()

  const loadPosts = (force = false) =>
    store.fetchPosts(blogService, locale.value, force)

  const loadPost = (slug) =>
    store.fetchPostBySlug(blogService, slug, locale.value)

  const posts = computed(() => store.getPosts(locale.value))
  const loading = computed(() => store.isLoading)
  const error = computed(() => store.error)

  /**
   * Format an ISO date string using the active i18n locale.
   * @param {string} iso
   */
  const formatDate = (iso) => {
    if (!iso) return ''
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return d.toLocaleDateString(locale.value === 'pt' ? 'pt-BR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return {
    posts,
    loading,
    error,
    locale,
    loadPosts,
    loadPost,
    formatDate
  }
}
