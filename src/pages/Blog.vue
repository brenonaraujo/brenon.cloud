<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
    <header class="text-center mb-16">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          {{ t('blog.title') }}
        </span>
      </h1>
      <p class="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
        {{ t('blog.subtitle') }}
      </p>
    </header>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-blue-500"></div>
      <p class="mt-4 text-gray-400">{{ t('common.loading') }}</p>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-400 mb-4">{{ t('common.error') }}: {{ error }}</p>
      <button
        @click="loadPosts(true)"
        class="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
      >
        {{ t('common.retry') }}
      </button>
    </div>

    <div v-else-if="!posts.length" class="text-center py-16">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 mb-6">
        <svg class="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 4v6h6" />
        </svg>
      </div>
      <h2 class="text-2xl font-semibold text-white mb-2">{{ t('blog.empty.title') }}</h2>
      <p class="text-gray-400 max-w-md mx-auto">{{ t('blog.empty.description') }}</p>
    </div>

    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link
        v-for="post in posts"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="group flex flex-col bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/60 hover:bg-gray-800/70 transition-all duration-200"
      >
        <div
          v-if="post.cover"
          class="aspect-[16/9] overflow-hidden bg-gray-900"
        >
          <img
            :src="post.cover"
            :alt="post.title"
            :data-fallback-src="post.coverFallback || ''"
            referrerpolicy="no-referrer"
            loading="lazy"
            decoding="async"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            @error="handleCoverError"
          />
        </div>
        <div class="p-6 flex flex-col flex-1">
          <div class="flex items-center gap-3 text-xs text-gray-400 mb-3">
            <span v-if="post.date">{{ formatDate(post.date) }}</span>
            <span v-if="post.date && post.readingTime" class="text-gray-600">•</span>
            <span v-if="post.readingTime">{{ t('blog.readingTime', { min: post.readingTime }) }}</span>
            <span
              v-if="post.locale && post.locale !== locale"
              class="ml-auto px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase tracking-wide"
              :title="t('blog.translationFallback')"
            >
              {{ post.locale }}
            </span>
          </div>
          <h2 class="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {{ post.title }}
          </h2>
          <p class="text-gray-300 text-sm leading-relaxed flex-1">
            {{ post.description }}
          </p>
          <div v-if="post.tags?.length" class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="px-2 py-1 text-xs rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20"
            >
              #{{ tag }}
            </span>
          </div>
          <div class="mt-6 inline-flex items-center gap-2 text-blue-400 text-sm font-medium">
            {{ t('blog.readMore') }}
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBlog } from '../composables/useBlog'

const { t } = useI18n()
const { posts, loading, error, locale, loadPosts, formatDate } = useBlog()

function handleCoverError(event) {
  const image = event.currentTarget
  const fallbackSrc = image.dataset.fallbackSrc

  if (fallbackSrc && image.getAttribute('src') !== fallbackSrc) {
    image.src = fallbackSrc
    return
  }

  image.style.display = 'none'
}

onMounted(() => loadPosts())
watch(locale, () => loadPosts())
</script>
