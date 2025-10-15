<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
    <nav class="flex items-center mb-8" aria-label="Breadcrumb">
        <router-link to="/" class="text-gray-400 hover:text-white flex items-center gap-2 group">
          <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>{{ t('servicePage.backToHome') }}</span>
        </router-link>
      </nav>
      
      <!-- Loading state -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-blue-500"></div>
        <p class="mt-4 text-gray-400">{{ t('common.loading') }}</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-12">
        <p class="text-red-400 mb-4">{{ t('common.error') }}: {{ error }}</p>
        <router-link to="/" class="text-blue-400 hover:underline">{{ t('servicePage.notFound.returnHome') }}</router-link>
      </div>
      
      <div v-else-if="service" class="space-y-16">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Hero Section -->
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-24 h-24 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-700/50 mb-6 p-4">
            <img 
              v-if="service.image" 
              :src="service.image" 
              :alt="service.shortName + ' logo'"
              class="w-full h-full object-contain"
              @error="$event.target.style.display = 'none'"
            />
            <ServiceIcon v-else :type="service.icon" class="w-12 h-12 text-blue-400" />
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-white">{{ service.title }}</h1>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{{ service.description }}</p>
        </div>

        <!-- Architecture Diagram -->
        <div v-if="service.mermaidDiagram" class="space-y-8">
          <h2 class="text-2xl font-semibold text-center text-white">{{ t('servicePage.architecture.title', { name: service.shortName }) }}</h2>
          <MermaidDiagram :diagram="service.mermaidDiagram" />
        </div>

        <!-- Features & Use Cases Grid -->
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Features -->
          <div class="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 class="text-2xl font-semibold mb-8 text-white flex items-center gap-3">
              <svg class="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              {{ t('servicePage.features.title') }}
            </h2>
            <div class="grid gap-4">
              <div v-for="feature in service.features" :key="feature" class="flex items-start gap-3 p-4 rounded-lg bg-gray-900/30">
                <svg class="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-300 text-sm">{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Use Cases -->
          <div class="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 class="text-2xl font-semibold mb-8 text-white flex items-center gap-3">
              <svg class="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              {{ t('servicePage.useCases.title') }}
            </h2>
            <div class="space-y-6">
              <div v-for="useCase in service.useCases" :key="useCase.title" class="p-4 rounded-lg bg-gray-900/30">
                <h3 class="font-medium text-white mb-2">{{ useCase.title }}</h3>
                <p class="text-sm text-gray-400">{{ useCase.description }}</p>
              </div>
            </div>
          </div>
        </div>



        <!-- Getting Started -->
        <div class="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-2xl p-8 border border-gray-700/50">
          <h2 class="text-2xl font-semibold mb-6 text-white text-center">{{ t('servicePage.gettingStarted.title') }}</h2>
          <div class="max-w-4xl mx-auto">
            <div class="prose prose-invert prose-lg max-w-none">
              <p v-html="service.gettingStarted"></p>
            </div>
            
            <!-- Quick Start Steps -->
            <div v-if="service.quickStart" class="mt-8">
              <h3 class="text-lg font-medium text-white mb-6">{{ t('servicePage.gettingStarted.quickStart') }}</h3>
              <div class="grid md:grid-cols-3 gap-6">
                <div v-for="(step, index) in service.quickStart" :key="index" class="text-center">
                  <div class="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4 text-blue-400 font-bold">
                    {{ index + 1 }}
                  </div>
                  <h4 class="font-medium text-white mb-2">{{ step.title }}</h4>
                  <p class="text-sm text-gray-400">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="text-center">
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              v-if="service.demoUrl" 
              :href="service.demoUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all duration-200 text-white font-medium transform hover:scale-105"
            >
              {{ t('servicePage.actions.launch', { name: service.shortName }) }}
              <svg class="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 3h7v7"></path>
                <path d="M10 14L21 3"></path>
                <path d="M21 14v7H3V3h7"></path>
              </svg>
            </a>
            <a 
              href="https://docs.brenon.cloud" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all duration-200 text-white font-medium transform hover:scale-105"
            >
              {{ t('servicePage.actions.viewDocs') }}
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5l7 7-7 7"></path>
                <path d="M5 12h14"></path>
              </svg>
            </a>
          </div>
        </div>
        </div>
      </div>

      <div v-else class="text-center">
      <h1 class="text-2xl font-bold text-red-500">{{ t('servicePage.notFound.title') }}</h1>
      <p class="mt-4 text-gray-300">{{ t('servicePage.notFound.description') }}</p>
      <router-link 
        to="/" 
        class="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
      >
        {{ t('servicePage.notFound.returnHome') }}
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5"></path>
          <path d="M12 19l-7-7 7-7"></path>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, h, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import MermaidDiagram from '../components/MermaidDiagram.vue'
import { useServices } from '../composables/useServices'

const route = useRoute()
const { t } = useI18n()
const { loadService, loadServices, loading, error } = useServices()
const service = ref(null)

// Simple icon components
const ServiceIcon = ({ type }) => {
  const iconPaths = {
    shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    server: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
    cube: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    cog: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
  }
  
  return h('svg', {
    class: 'w-10 h-10 text-blue-400',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2'
  }, [
    h('path', { d: iconPaths[type] || iconPaths.server })
  ])
}

// Computed page title for i18n
const pageTitle = computed(() => {
  if (service.value && service.value.id) {
    return t(`servicePage.architecture.title`, { name: service.value.shortName })
  }
  return ''
})

// Load service data on mount
onMounted(async () => {
  const serviceId = route.query.service
  if (serviceId) {
    try {
      const data = await loadService(serviceId)
      service.value = data
    } catch (err) {
      // Service loading failed - user will see empty state
    }
  }
})
</script>
