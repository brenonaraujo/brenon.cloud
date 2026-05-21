import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Blog Store
 * Caches parsed posts per locale so listing and detail pages share state.
 */
export const useBlogStore = defineStore('blog', () => {
  // Map<locale, BlogPost[]>
  const postsByLocale = ref({})
  const loading = ref(false)
  const error = ref(null)

  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)

  const getPosts = (locale) => postsByLocale.value[locale] || []

  async function fetchPosts(blogService, locale, force = false) {
    if (!blogService) {
      error.value = 'BlogService not available'
      return []
    }
    if (!force && postsByLocale.value[locale]) {
      return postsByLocale.value[locale]
    }

    loading.value = true
    error.value = null
    try {
      const posts = await blogService.getAllPosts(locale)
      postsByLocale.value = { ...postsByLocale.value, [locale]: posts }
      return posts
    } catch (err) {
      error.value = err?.message || 'Failed to load posts'
      return []
    } finally {
      loading.value = false
    }
  }

  async function fetchPostBySlug(blogService, slug, locale) {
    if (!blogService) {
      error.value = 'BlogService not available'
      return null
    }
    const cached = (postsByLocale.value[locale] || []).find(p => p.slug === slug)
    if (cached) return cached

    loading.value = true
    error.value = null
    try {
      return await blogService.getPostBySlug(slug, locale)
    } catch (err) {
      error.value = err?.message || 'Failed to load post'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    postsByLocale,
    loading,
    error,
    isLoading,
    hasError,
    getPosts,
    fetchPosts,
    fetchPostBySlug
  }
})
