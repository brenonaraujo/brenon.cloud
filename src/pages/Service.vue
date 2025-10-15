<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
    <nav class="flex items-center mb-8" aria-label="Breadcrumb">
        <router-link to="/" class="text-gray-400 hover:text-white flex items-center gap-2 group">
          <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </router-link>
      </nav>
      <div v-if="service" class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-gray-800">
        <div class="mb-8 text-center">
          <h1 class="text-4xl font-bold mb-4 text-white">{{ service.title }}</h1>
          <p class="text-lg text-gray-300">{{ service.description }}</p>
        </div>

      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-2xl font-semibold mb-6 text-white">Features</h2>
          <ul class="space-y-4">
            <li v-for="feature in service.features" :key="feature" class="flex items-start">
              <svg class="h-6 w-6 text-emerald-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-300">{{ feature }}</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-4">Getting Started</h2>
          <div class="prose prose-invert">
            <p v-html="service.gettingStarted"></p>
          </div>
        </div>
      </div>

      <div class="mt-12 flex flex-wrap justify-center gap-4">
        <a 
          v-if="service.demoUrl" 
          :href="service.demoUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-white font-medium"
        >
          Launch Service
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
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white font-medium"
        >
          Documentation
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5l7 7-7 7"></path>
            <path d="M5 12h14"></path>
          </svg>
        </a>
      </div>
    </div>

    <div v-else class="text-center">
      <h1 class="text-2xl font-bold text-red-500">Service Not Found</h1>
      <p class="mt-4 text-gray-300">The requested service could not be found.</p>
      <router-link 
        to="/" 
        class="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
      >
        Return Home
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5"></path>
          <path d="M12 19l-7-7 7-7"></path>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const service = ref(null)

const services = {
  'authentik': {
    title: 'Authentik - Identity Provider',
    description: 'Centralized authentication and authorization for all your services',
    features: [
      'Single Sign-On (SSO)',
      'Multi-Factor Authentication (MFA)',
      'Fine-grained access policies',
      'User management and groups',
      'OAuth2 and SAML support'
    ],
    gettingStarted: 'Access Authentik at <a href="https://auth.brenon.cloud" class="text-blue-400 hover:underline">auth.brenon.cloud</a>',
    demoUrl: 'https://auth.brenon.cloud'
  },
  'kong': {
    title: 'Kong API Gateway',
    description: 'Advanced API management and routing platform',
    features: [
      'API routing and load balancing',
      'Authentication and authorization',
      'Rate limiting and traffic control',
      'API analytics and monitoring',
      'Plugin ecosystem'
    ],
    gettingStarted: 'Kong manages API traffic at <a href="https://api.brenon.cloud" class="text-blue-400 hover:underline">api.brenon.cloud</a>',
    demoUrl: 'https://api.brenon.cloud'
  }
  // Add more services as needed
}

onMounted(() => {
  const serviceId = route.query.service
  if (serviceId && services[serviceId]) {
    service.value = services[serviceId]
    document.title = `${services[serviceId].title} - Brenon.Cloud`
  }
})
</script>