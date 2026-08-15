<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
    <header class="text-center max-w-3xl mx-auto mb-12">
      <h1 class="text-4xl sm:text-5xl font-bold mb-4">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          {{ t('pathToGlory.title') }}
        </span>
      </h1>
      <p class="text-lg text-gray-300 mb-4">{{ t('pathToGlory.subtitle') }}</p>
      <p class="text-gray-400 leading-relaxed">{{ t('pathToGlory.intro') }}</p>
    </header>

    <aside class="max-w-3xl mx-auto mb-16 rounded-xl border border-amber-500/30 bg-amber-500/5 px-5 py-4 text-sm text-amber-100/90 leading-relaxed">
      {{ t('pathToGlory.disclaimer') }}
    </aside>

    <section class="mb-20">
      <div class="mb-8">
        <h2 class="text-2xl sm:text-3xl font-semibold mb-2">{{ t('pathToGlory.roadmaps.title') }}</h2>
        <p class="text-gray-400">{{ t('pathToGlory.roadmaps.description') }}</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          v-for="item in roadmaps"
          :key="item.id"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative flex flex-col rounded-xl bg-gray-800/50 backdrop-blur-sm ring-1 ring-white/10 p-6 hover:ring-blue-500/40 hover:bg-gray-800 transition-all"
        >
          <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 text-white">{{ item.title }}</h3>
          <p class="text-gray-300 text-sm leading-relaxed flex-1">{{ item.description }}</p>
          <span class="mt-4 inline-flex items-center gap-1 text-sm text-blue-400 group-hover:text-blue-300">
            roadmap.sh/{{ item.id }}
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v7H3V3h7"/>
            </svg>
          </span>
        </a>
      </div>
    </section>

    <section class="mb-20">
      <div class="mb-8">
        <h2 class="text-2xl sm:text-3xl font-semibold mb-2">{{ t('pathToGlory.books.title') }}</h2>
        <p class="text-gray-400">{{ t('pathToGlory.books.description') }}</p>
      </div>

      <h3 class="text-sm uppercase tracking-wider text-blue-300 mb-4">{{ t('pathToGlory.books.technical') }}</h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <a
          v-for="item in technicalBooks"
          :key="item.slug"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex flex-col rounded-xl bg-gray-800/50 backdrop-blur-sm ring-1 ring-white/10 p-6 hover:ring-blue-500/40 hover:bg-gray-800 transition-all"
        >
          <span v-if="item.tag" class="self-start text-xs uppercase tracking-wider text-blue-400 mb-3">{{ item.tag }}</span>
          <h3 class="text-lg font-semibold mb-1 text-white">{{ item.title }}</h3>
          <p class="text-sm text-gray-400 mb-3">{{ item.author }}<span v-if="item.year"> · {{ item.year }}</span></p>
          <p class="text-gray-300 text-sm leading-relaxed flex-1">{{ item.why }}</p>
          <span class="mt-4 inline-flex items-center gap-1 text-sm text-blue-400 group-hover:text-blue-300">
            {{ t('pathToGlory.openLink') }}
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v7H3V3h7"/>
            </svg>
          </span>
        </a>
      </div>

      <h3 class="text-sm uppercase tracking-wider text-emerald-300 mb-4">{{ t('pathToGlory.books.nonTechnical') }}</h3>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          v-for="item in generalBooks"
          :key="item.slug"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex flex-col rounded-xl bg-gray-800/50 backdrop-blur-sm ring-1 ring-white/10 p-6 hover:ring-emerald-500/40 hover:bg-gray-800 transition-all"
        >
          <span v-if="item.tag" class="self-start text-xs uppercase tracking-wider text-emerald-400 mb-3">{{ item.tag }}</span>
          <h3 class="text-lg font-semibold mb-1 text-white">{{ item.title }}</h3>
          <p class="text-sm text-gray-400 mb-3">{{ item.author }}<span v-if="item.year"> · {{ item.year }}</span></p>
          <p class="text-gray-300 text-sm leading-relaxed flex-1">{{ item.why }}</p>
          <span class="mt-4 inline-flex items-center gap-1 text-sm text-emerald-400 group-hover:text-emerald-300">
            {{ t('pathToGlory.openLink') }}
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v7H3V3h7"/>
            </svg>
          </span>
        </a>
      </div>
    </section>

    <section>
      <div class="mb-8">
        <h2 class="text-2xl sm:text-3xl font-semibold mb-2">{{ t('pathToGlory.videos.title') }}</h2>
        <p class="text-gray-400">{{ t('pathToGlory.videos.description') }}</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <a
          v-for="item in videos"
          :key="item.slug"
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group flex flex-col overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm ring-1 ring-white/10 hover:ring-red-500/40 hover:bg-gray-800 transition-all"
        >
          <img
            v-if="item.thumb"
            :src="item.thumb"
            :alt="item.title"
            class="w-full aspect-video object-cover bg-gray-900"
            loading="lazy"
          />
          <div class="flex flex-col flex-1 p-6">
            <span v-if="item.tag" class="self-start text-xs uppercase tracking-wider text-red-400 mb-3">{{ item.tag }}</span>
            <h3 class="text-lg font-semibold mb-1 text-white">{{ item.title }}</h3>
            <p class="text-sm text-gray-400 mb-3">{{ item.author }}</p>
            <p class="text-gray-300 text-sm leading-relaxed flex-1">{{ item.why }}</p>
            <span class="mt-4 inline-flex items-center gap-1 text-sm text-red-400 group-hover:text-red-300">
              {{ t('pathToGlory.openLink') }}
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v7H3V3h7"/>
              </svg>
            </span>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { usePathToGlory } from '../composables/usePathToGlory'

const { t } = useI18n()
const { roadmaps, technicalBooks, generalBooks, videos } = usePathToGlory()
</script>
