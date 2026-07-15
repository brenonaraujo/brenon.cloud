<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
    <nav class="flex items-center mb-8" aria-label="Breadcrumb">
      <router-link to="/blog" class="text-gray-400 hover:text-white flex items-center gap-2 group">
        <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>{{ t('blog.backToList') }}</span>
      </router-link>
    </nav>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-blue-500"></div>
      <p class="mt-4 text-gray-400">{{ t('common.loading') }}</p>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-400 mb-4">{{ t('common.error') }}: {{ error }}</p>
      <router-link to="/blog" class="text-blue-400 hover:underline">
        {{ t('blog.backToList') }}
      </router-link>
    </div>

    <article v-else-if="post" class="space-y-8">
      <div
        v-if="post.locale && post.locale !== locale"
        class="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-200 flex items-center gap-3"
      >
        <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
        <span>
          {{ t('blog.translationNotice', { locale: post.locale.toUpperCase() }) }}
        </span>
      </div>
      <header class="space-y-4 text-center border-b border-gray-800 pb-8">
        <div class="flex items-center justify-center gap-3 text-sm text-gray-400">
          <span v-if="post.date">{{ formatDate(post.date) }}</span>
          <span v-if="post.date && post.readingTime" class="text-gray-600">•</span>
          <span v-if="post.readingTime">{{ t('blog.readingTime', { min: post.readingTime }) }}</span>
        </div>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          {{ post.title }}
        </h1>
        <p v-if="post.description" class="text-lg text-gray-300 max-w-2xl mx-auto">
          {{ post.description }}
        </p>
        <div v-if="post.author" class="text-sm text-gray-400">
          {{ t('blog.by') }} <span class="text-white">{{ post.author }}</span>
        </div>
        <div v-if="post.tags?.length" class="flex flex-wrap gap-2 justify-center">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="px-2 py-1 text-xs rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20"
          >
            #{{ tag }}
          </span>
        </div>
      </header>

      <img
        v-if="post.cover"
        :src="post.cover"
        :alt="post.title"
        :data-fallback-src="post.coverFallback || ''"
        referrerpolicy="no-referrer"
        loading="eager"
        decoding="async"
        class="w-full rounded-2xl border border-gray-800"
        @error="handleCoverError"
      />

      <div ref="blogContent" class="prose-blog" v-html="post.html"></div>
    </article>

    <div v-else class="text-center py-12">
      <h1 class="text-2xl font-bold text-white mb-2">{{ t('blog.notFound.title') }}</h1>
      <p class="text-gray-400 mb-6">{{ t('blog.notFound.description') }}</p>
      <router-link
        to="/blog"
        class="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
      >
        {{ t('blog.backToList') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useBlog } from '../composables/useBlog'
import mermaid from 'mermaid'

const route = useRoute()
const { t } = useI18n()
const { loadPost, loading, error, locale, formatDate } = useBlog()
const post = ref(null)
const blogContent = ref(null)

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    darkMode: true,
    primaryColor: '#3B82F6',
    primaryTextColor: '#FFFFFF',
    primaryBorderColor: '#1F2937',
    lineColor: '#6B7280',
    secondaryColor: '#1F2937',
    secondaryTextColor: '#FFFFFF',
    tertiaryColor: '#374151',
    tertiaryTextColor: '#FFFFFF',
    background: '#111827',
    mainBkg: '#1F2937',
    secondBkg: '#374151',
    tertiaryBkg: '#4B5563',
    textColor: '#FFFFFF',
    nodeTextColor: '#FFFFFF',
    c0: '#3B82F6',
    c1: '#10B981',
    c2: '#F59E0B',
    c3: '#EF4444',
    c4: '#8B5CF6',
    c5: '#06B6D4',
    c6: '#84CC16',
    c7: '#F97316'
  },
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis'
  },
  securityLevel: 'loose',
  suppressErrorRendering: false
})

function handleCoverError(event) {
  const image = event.currentTarget
  const fallbackSrc = image.dataset.fallbackSrc

  if (fallbackSrc && image.getAttribute('src') !== fallbackSrc) {
    image.src = fallbackSrc
    return
  }

  image.style.display = 'none'
}

async function renderMermaid() {
  if (!blogContent.value) return
  const mermaidDivs = blogContent.value.querySelectorAll('.mermaid')
  if (mermaidDivs.length === 0) return

  for (let i = 0; i < mermaidDivs.length; i++) {
    const el = mermaidDivs[i]
    const code = el.textContent
    if (!code.trim()) continue
    try {
      const id = `mermaid-blog-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 6)}`
      const { svg } = await mermaid.render(id, code)
      el.innerHTML = svg
      const svgEl = el.querySelector('svg')
      if (svgEl) {
        svgEl.style.display = 'block'
        svgEl.style.background = 'transparent'
        svgEl.style.maxWidth = '100%'
      }
      el.classList.add('bg-gray-800/30', 'backdrop-blur-sm', 'rounded-xl', 'p-6', 'border', 'border-gray-700/50', 'overflow-x-auto')
    } catch (err) {
      console.error('Mermaid render error:', err)
      el.innerHTML = `<div class="text-red-400 p-4 text-center text-sm"><p>Diagram render error</p><p class="text-gray-500 mt-2 text-xs">${err.message}</p></div>`
    }
  }
}

const fetch = async (slug) => {
  post.value = await loadPost(slug)
  await nextTick()
  renderMermaid()
}

onMounted(() => fetch(route.params.slug))
watch(() => route.params.slug, (slug) => {
  if (slug) fetch(slug)
})
watch(locale, () => {
  if (route.params.slug) fetch(route.params.slug)
})
</script>
