<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <header class="relative text-center py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-transparent pointer-events-none"></div>
      <div class="relative z-10">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">{{ t('home.hero.title') }}</span>
        </h1>
        <p class="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          {{ t('home.hero.subtitle') }}
        </p>
        <div class="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button href="#docker" variant="primary" class="min-w-[160px]" withArrow>
            {{ t('home.hero.getStarted') }}
          </Button>
          <Button href="#docker" variant="secondary" class="min-w-[160px]" withArrow>
            {{ t('home.hero.exploreServices') }}
          </Button>
        </div>
      </div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
    </header>

    <main>
      <Section
        id="docker"
        :title="t('home.docker.title')"
        :description="t('home.docker.description')"
        contentClass="space-y-12"
      >
        <!-- Loading state -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-blue-500"></div>
          <p class="mt-4 text-gray-400">{{ t('common.loading') }}</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-400 mb-4">{{ t('common.error') }}: {{ error }}</p>
          <Button @click="loadServices(true)" variant="primary">{{ t('common.retry') }}</Button>
        </div>

        <!-- Services grid -->
        <template v-else>
          <div v-if="validServices?.length > 0" class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <ServiceCard
              v-for="service in validServices.slice(0, 3)"
              :key="service.id"
              :title="service.title"
              :description="service.description"
              :icon="service.icon"
              :color="service.color"
              :learnMoreUrl="service.learnMoreUrl"
            />
          </div>
          <div v-if="validServices?.length > 3" class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            <ServiceCard
              v-for="service in validServices.slice(3)"
              :key="service.id"
              :title="service.title"
              :description="service.description"
              :icon="service.icon"
              :color="service.color"
              :learnMoreUrl="service.learnMoreUrl"
            />
          </div>
          
          <div v-if="!validServices?.length && !loading" class="text-center py-8">
            <p class="text-gray-400">No services available</p>
            <Button @click="loadServices(true)" variant="primary" class="mt-4">{{ t('common.retry') }}</Button>
          </div>
        </template>
        
        <FlowLine :steps="['Auth', 'Edge', 'Deploy', 'Monitor', 'Dashboards', 'Automate']" />
      </Section>

      <Section
        id="how-it-works"
        :title="t('home.howItWorks.title')"
        :description="t('home.howItWorks.description')"
      >
        <div class="grid sm:grid-cols-3 gap-6 text-left mb-8">
          <div class="bg-gray-800 rounded-lg p-5">
            <h3 class="font-semibold mb-2">{{ t('home.docker.features.managed.title') }}</h3>
            <p class="text-gray-400 text-sm">{{ t('home.docker.features.managed.description') }}</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-5">
            <h3 class="font-semibold mb-2">{{ t('home.docker.features.stacks.title') }}</h3>
            <p class="text-gray-400 text-sm">{{ t('home.docker.features.stacks.description') }}</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-5">
            <h3 class="font-semibold mb-2">{{ t('home.docker.features.scalable.title') }}</h3>
            <p class="text-gray-400 text-sm">{{ t('home.docker.features.scalable.description') }}</p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/service?service=docker" variant="primary" withArrow>
            {{ t('home.docker.learnMore') }}
          </Button>
          <Button href="/service?service=portainer" variant="secondary" withArrow>
            {{ t('home.docker.howWeUse') }}
          </Button>
          <a href="http://portainer.home.server/" target="_blank" rel="noopener noreferrer" 
             class="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition text-white">
            {{ t('home.docker.openPortainer') }}
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 3h7v7"></path>
              <path d="M10 14L21 3"></path>
              <path d="M21 14v7H3V3h7"></path>
            </svg>
          </a>
        </div>

        <FlowLine class="mt-6" :steps="['Write compose', 'Deploy as Swarm stack', 'Scale replicas', 'Rolling update', 'Monitor & dashboards']" />
      </Section>

      <Section
        id="about"
        :title="t('home.about.title')"
        :description="t('home.about.description')"
      >
        <div class="space-y-16">
          <!-- Vision and Mission -->
          <div class="text-center max-w-3xl mx-auto">
            <p class="text-lg text-gray-300 leading-relaxed">
              {{ t('home.about.vision') }}
            </p>
          </div>

          <!-- Key Features Grid -->
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold">{{ t('home.about.stack.title') }}</h3>
              <ul class="space-y-2 text-gray-300">
                <li v-for="item in tm('home.about.stack.items')" :key="item">• {{ item }}</li>
              </ul>
            </div>

            <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <div class="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold">{{ t('home.about.security.title') }}</h3>
              <ul class="space-y-2 text-gray-300">
                <li v-for="item in tm('home.about.security.items')" :key="item">• {{ item }}</li>
              </ul>
            </div>

            <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold">{{ t('home.about.automation.title') }}</h3>
              <ul class="space-y-2 text-gray-300">
                <li v-for="item in tm('home.about.automation.items')" :key="item">• {{ item }}</li>
              </ul>
            </div>
          </div>

          <!-- How It Works Flow -->
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 opacity-30 blur-3xl"></div>
            <div class="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8">
              <h3 class="text-xl font-semibold mb-6 text-center">{{ t('home.about.flow.title') }}</h3>
              <div class="flex flex-col md:flex-row items-center justify-between gap-6 text-center">
                <div class="flex-1">
                  <div class="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                    </svg>
                  </div>
                  <h4 class="font-medium mb-2">{{ t('home.about.flow.edge.title') }}</h4>
                  <p class="text-sm text-gray-400">{{ t('home.about.flow.edge.description') }}</p>
                </div>
                <svg class="w-6 h-6 text-gray-600 rotate-90 md:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14m-7-7l7 7-7 7"/>
                </svg>
                <div class="flex-1">
                  <div class="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <h4 class="font-medium mb-2">{{ t('home.about.flow.auth.title') }}</h4>
                  <p class="text-sm text-gray-400">{{ t('home.about.flow.auth.description') }}</p>
                </div>
                <svg class="w-6 h-6 text-gray-600 rotate-90 md:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14m-7-7l7 7-7 7"/>
                </svg>
                <div class="flex-1">
                  <div class="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                    </svg>
                  </div>
                  <h4 class="font-medium mb-2">{{ t('home.about.flow.service.title') }}</h4>
                  <p class="text-sm text-gray-400">{{ t('home.about.flow.service.description') }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Call to Action -->
          <div class="text-center">
            <h3 class="text-xl font-semibold mb-4">{{ t('home.about.cta.title') }}</h3>
            <p class="text-gray-300 mb-6">{{ t('home.about.cta.description') }}</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#how-it-works" variant="primary" withArrow>
                {{ t('home.about.cta.getStarted') }}
              </Button>
              <Button href="https://github.com/brenonaraujo" variant="secondary" withArrow>
                {{ t('home.about.cta.viewGithub') }}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ServiceCard from '../components/ServiceCard.vue'
import Button from '../components/ui/Button.vue'
import Section from '../components/ui/Section.vue'
import FlowLine from '../components/ui/FlowLine.vue'
import { useServices } from '../composables/useServices'

const { t, tm } = useI18n()
const { localizedServices, loading, error, loadServices } = useServices()

// Create a computed that filters valid services
const validServices = computed(() => {
  const svc = localizedServices.value || []
  return svc.filter(service => service && service.id && service.title)
})

// Load services on component mount
onMounted(async () => {
  try {
    await loadServices()
  } catch (err) {
    // Services loading failed - user will see empty grid
  }
})
</script>