import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Blog Store
 * Caches the parsed blog posts so listing and detail pages share state.
 */
export const useBlogStore = defineStore('blog', () => {
  const posts = ref([])
  const loading = ref(false)
  const error = ref(null)
  const loaded = ref(false)

  const allPosts = computed(() => posts.value)
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)

  const getPostBySlug = computed(() => {
    return (slug) => posts.value.find(p => p.slug === slug) || null
  })

  async function fetchPosts(blogService, force = false) {
    if (!blogService) {
      error.value = 'BlogService not available'
      return []
    }
    if (loaded.value && !force) {
      return posts.value
    }

    loading.value = true
    error.value = null
    try {
      posts.value = await blogService.getAllPosts()
      loaded.value = true
      return posts.value
    } catch (err) {
      error.value = err?.message || 'Failed to load posts'
      return []
    } finally {
      loading.value = false
    }
  }

  async function fetchPostBySlug(blogService, slug) {
    if (!blogService) {
      error.value = 'BlogService not available'
      return null
    }
    // Prefer the cache when available.
    const cached = posts.value.find(p => p.slug === slug)
    if (cached) return cached

    loading.value = true
    error.value = null
    try {
      const post = await blogService.getPostBySlug(slug)
      if (post && !posts.value.find(p => p.slug === post.slug)) {
        posts.value = [...posts.value, post]
      }
      return post
    } catch (err) {
      error.value = err?.message || 'Failed to load post'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    posts,
    loading,
    error,
    allPosts,
    isLoading,
    hasError,
    getPostBySlug,
    fetchPosts,
    fetchPostBySlug
  }
})
