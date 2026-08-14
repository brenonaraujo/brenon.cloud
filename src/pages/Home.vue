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
          <router-link
            to="/blog"
            class="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white transition-colors min-w-[160px]"
          >
            {{ t('home.hero.getStarted') }}
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
            </svg>
          </router-link>
          <Button href="#products" variant="secondary" class="min-w-[160px]" withArrow>
            {{ t('navbar.products') }}
          </Button>
        </div>
      </div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
    </header>

    <main>
      <!-- About Me -->
      <section id="about-me" class="py-16 sm:py-20">
        <div class="grid md:grid-cols-[auto,1fr] gap-10 items-center max-w-5xl mx-auto">
          <div class="flex justify-center">
            <div class="relative w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/30 to-emerald-500/30 ring-1 ring-white/10">
              <img
                v-if="!photoFailed"
                :src="profile.photo"
                :alt="profile.name"
                class="w-full h-full object-cover"
                @error="photoFailed = true"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-4xl font-semibold text-white">
                {{ profile.initials }}
              </div>
            </div>
          </div>
          <div>
            <p class="text-sm uppercase tracking-widest text-blue-400 mb-2">{{ t('home.aboutMe.eyebrow') }}</p>
            <h2 class="text-3xl sm:text-4xl font-bold mb-4">{{ t('home.aboutMe.title') }}</h2>
            <div class="flex flex-wrap gap-2 mb-6">
              <span
                v-for="role in profile.roles"
                :key="role"
                class="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-200 ring-1 ring-white/10"
              >
                {{ t(`home.aboutMe.roles.${role}`) }}
              </span>
            </div>
            <div class="space-y-4 text-gray-300 leading-relaxed">
              <p v-for="(paragraph, idx) in tm('home.aboutMe.bio')" :key="idx">{{ paragraph }}</p>
            </div>
            <div class="mt-6 flex flex-wrap items-center gap-4">
              <router-link
                to="/blog"
                class="inline-flex items-center gap-2 rounded-lg px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                {{ t('home.aboutMe.ctaBlog') }}
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </router-link>
              <router-link
                to="/path"
                class="inline-flex items-center gap-2 rounded-lg px-5 py-3 bg-gray-800 hover:bg-gray-700 text-white transition-colors"
              >
                {{ t('home.aboutMe.ctaPath') }}
              </router-link>
              <div class="flex items-center gap-3 ml-auto">
                <a
                  v-for="link in visibleSocialLinks"
                  :key="link.id"
                  :href="link.url"
                  :aria-label="link.label"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-gray-400 hover:text-white transition-colors text-sm underline-offset-4 hover:underline"
                >
                  {{ link.label }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Products we built -->
      <Section
        id="products"
        :title="t('home.products.title')"
        :description="t('home.products.description')"
        contentClass="space-y-8"
      >
        <p class="text-sm uppercase tracking-widest text-emerald-400 -mt-4 mb-2">{{ t('home.products.eyebrow') }}</p>

        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-blue-500"></div>
          <p class="mt-4 text-gray-400">{{ t('common.loading') }}</p>
        </div>

        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-400 mb-4">{{ t('common.error') }}: {{ error }}</p>
          <Button @click="loadServices(true)" variant="primary">{{ t('common.retry') }}</Button>
        </div>

        <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          <ServiceCard
            v-for="service in validProducts"
            :key="service.id"
            :title="service.shortName || service.title"
            :description="service.description"
            :icon="service.icon"
            :color="service.color"
            :learnMoreUrl="service.learnMoreUrl"
            :demoUrl="service.demoUrl"
            :hostname="service.hostname"
          />
        </div>
      </Section>

      <!-- Platform building blocks -->
      <Section
        id="platform"
        :title="t('home.docker.title')"
        :description="t('home.docker.description')"
        contentClass="space-y-12"
      >
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-blue-500"></div>
          <p class="mt-4 text-gray-400">{{ t('common.loading') }}</p>
        </div>

        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-400 mb-4">{{ t('common.error') }}: {{ error }}</p>
          <Button @click="loadServices(true)" variant="primary">{{ t('common.retry') }}</Button>
        </div>

        <template v-else>
          <div v-if="validPlatform?.length" class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-fr">
            <ServiceCard
              v-for="service in validPlatform"
              :key="service.id"
              :title="service.shortName || service.title"
              :description="service.description"
              :icon="service.icon"
              :color="service.color"
              :learnMoreUrl="service.learnMoreUrl"
              :demoUrl="service.demoUrl"
            />
          </div>

          <div v-if="!validPlatform?.length && !loading" class="text-center py-8">
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
        </div>

        <FlowLine class="mt-6" :steps="['Write compose', 'Deploy as Swarm stack', 'Schedule on 3 nodes', 'Rolling update', 'Monitor & dashboards']" />
      </Section>

      <!-- Blog Teaser -->
      <section class="py-12">
        <div class="max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 ring-1 ring-white/10 p-8 sm:p-10 text-center">
          <p class="text-sm uppercase tracking-widest text-emerald-400 mb-2">{{ t('home.blogTeaser.eyebrow') }}</p>
          <h2 class="text-2xl sm:text-3xl font-bold mb-3">{{ t('home.blogTeaser.title') }}</h2>
          <p class="text-gray-300 max-w-2xl mx-auto mb-6">{{ t('home.blogTeaser.description') }}</p>
          <router-link
            to="/blog"
            class="inline-flex items-center gap-2 rounded-lg px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            {{ t('home.blogTeaser.cta') }}
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </router-link>
        </div>
      </section>

      <Section
        id="infrastructure"
        :title="t('home.about.title')"
        :description="t('home.about.description')"
      >
        <div class="space-y-16">
          <div class="text-center max-w-3xl mx-auto">
            <p class="text-lg text-gray-300 leading-relaxed">
              {{ t('home.about.vision') }}
            </p>
          </div>

          <!-- Live cluster snapshot -->
          <div class="relative overflow-hidden rounded-2xl bg-gray-900/80 ring-1 ring-white/10">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 pointer-events-none"></div>
            <div class="relative p-6 sm:p-8 space-y-8">
              <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <p class="text-sm uppercase tracking-widest text-blue-400 mb-2">Docker Swarm</p>
                  <h3 class="text-xl sm:text-2xl font-semibold">{{ t('home.about.cluster.title') }}</h3>
                  <p class="text-sm text-gray-400 mt-1">{{ t('home.about.cluster.subtitle') }}</p>
                </div>
                <span class="inline-flex items-center gap-2 self-start rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-medium px-3 py-1 ring-1 ring-emerald-400/30">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Up
                </span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div
                  v-for="stat in clusterStats"
                  :key="stat.key"
                  class="rounded-xl bg-gray-800/70 ring-1 ring-white/5 px-4 py-3"
                >
                  <p class="text-xs uppercase tracking-wide text-gray-500 mb-1">{{ stat.label }}</p>
                  <p class="text-lg font-semibold text-white">{{ stat.value }}</p>
                </div>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-300 mb-3">{{ t('home.about.cluster.nodesTitle') }}</h4>
                <div class="overflow-x-auto rounded-xl ring-1 ring-white/10">
                  <table class="min-w-full text-sm">
                    <thead class="bg-gray-800/80 text-gray-400 text-left">
                      <tr>
                        <th class="px-4 py-3 font-medium">Name</th>
                        <th class="px-4 py-3 font-medium">Role</th>
                        <th class="px-4 py-3 font-medium">CPU</th>
                        <th class="px-4 py-3 font-medium">Memory</th>
                        <th class="px-4 py-3 font-medium">Engine</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                      <tr
                        v-for="node in clusterNodes"
                        :key="node.name"
                        class="bg-gray-900/40 hover:bg-gray-800/40 transition-colors"
                      >
                        <td class="px-4 py-3 font-mono text-blue-300">{{ node.name }}</td>
                        <td class="px-4 py-3">
                          <span
                            class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1"
                            :class="node.role === 'manager'
                              ? 'bg-purple-500/15 text-purple-300 ring-purple-400/30'
                              : 'bg-cyan-500/15 text-cyan-300 ring-cyan-400/30'"
                          >
                            {{ node.role }}
                          </span>
                        </td>
                        <td class="px-4 py-3 text-gray-200">{{ node.cpu }}</td>
                        <td class="px-4 py-3 text-gray-200">{{ node.memory }}</td>
                        <td class="px-4 py-3 text-gray-400">{{ node.engine }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
              <Button href="#platform" variant="primary" withArrow>
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
import { onMounted, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ServiceCard from '../components/ServiceCard.vue'
import Button from '../components/ui/Button.vue'
import Section from '../components/ui/Section.vue'
import FlowLine from '../components/ui/FlowLine.vue'
import { useServices } from '../composables/useServices'
import { profile, visibleSocialLinks } from '../config/profile'

const { t, tm } = useI18n()
const { platformServices, productServices, loading, error, loadServices } = useServices()
const photoFailed = ref(false)

const validPlatform = computed(() => {
  const svc = platformServices.value || []
  return svc.filter(service => service && service.id && service.title)
})

const validProducts = computed(() => {
  const svc = productServices.value || []
  return svc.filter(service => service && service.id && service.title)
})

const clusterStats = computed(() => {
  const s = tm('home.about.cluster.stats') || {}
  return [
    { key: 'nodes', label: 'Nodes', value: s.nodes },
    { key: 'cpu', label: 'CPU', value: s.cpu },
    { key: 'ram', label: 'RAM', value: s.ram },
    { key: 'stacks', label: 'Stacks', value: s.stacks },
    { key: 'services', label: 'Services', value: s.services },
    { key: 'containers', label: 'Containers', value: s.containers },
    { key: 'volumes', label: 'Volumes', value: s.volumes },
    { key: 'images', label: 'Images', value: s.images }
  ]
})

const clusterNodes = computed(() => {
  const nodes = tm('home.about.cluster.nodes')
  return Array.isArray(nodes) ? nodes : []
})

onMounted(async () => {
  try {
    await loadServices()
  } catch (err) {
    // Services loading failed - user will see empty grid
  }
})
</script>
