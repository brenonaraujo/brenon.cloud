<template>
  <nav class="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <router-link to="/" class="group flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img src="/brenon-cloud-logo.png" alt="Brenon.Cloud Logo" class="h-12 w-12">
          <div>
            <span class="font-medium text-white text-lg">Brenon.Cloud</span>
            <span class="text-sm text-gray-400 block">Personal Cloud Services</span>
          </div>
        </router-link>
        <!-- Mobile menu button -->
        <button 
          @click="toggleMobileMenu" 
          :aria-expanded="isMobileMenuOpen" 
          aria-controls="mobile-menu" 
          class="sm:hidden inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <!-- Desktop menu -->
        <div class="hidden sm:flex items-center space-x-8">
          <nav class="flex space-x-8">
            <template v-for="item in menuItems" :key="item.to">
              <a v-if="item.external"
                :href="item.to"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-300 hover:text-white transition-colors"
              >
                {{ item.text }}
              </a>
              <a 
                v-else
                href="#"
                @click.prevent="scrollToSection(item.to)"
                class="text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {{ item.text }}
              </a>
            </template>
          </nav>
          <!-- Language Selector -->
          <LanguageSelector />
          <!-- Social Links -->
          <div class="flex items-center space-x-4">
            <a href="https://github.com/brenonaraujo" target="_blank" rel="noopener noreferrer">
              <svg class="w-6 h-6 text-gray-400 hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/brenonaraujo" target="_blank" rel="noopener noreferrer">
              <svg class="w-6 h-6 text-gray-400 hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <!-- Mobile menu -->
      <div 
        id="mobile-menu" 
        :class="{ 'hidden': !isMobileMenuOpen }" 
        class="sm:hidden fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50"
      >
        <div class="p-4">
          <div class="flex justify-end">
            <button 
              @click="toggleMobileMenu"
              class="p-2 text-gray-400 hover:text-white"
            >
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav class="mt-8">
            <div class="space-y-4">
              <template v-for="item in menuItems" :key="item.to">
                <a v-if="item.external"
                  :href="item.to"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block text-center text-lg font-medium text-gray-300 hover:text-white py-3 transition-colors"
                  @click="toggleMobileMenu"
                >
                  {{ item.text }}
                </a>
                <a 
                  v-else
                  href="#"
                  @click.prevent="scrollToSection(item.to)"
                  class="block text-center text-lg font-medium text-gray-300 hover:text-white py-3 transition-colors cursor-pointer"
                >
                  {{ item.text }}
                </a>
              </template>
            </div>
            <!-- Language Selector for Mobile -->
            <div class="mt-8 flex justify-center">
              <LanguageSelector />
            </div>
          </nav>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import SocialLinks from './SocialLinks.vue'
import LanguageSelector from './ui/LanguageSelector.vue'

const router = useRouter()
const { t } = useI18n()
const isMobileMenuOpen = ref(false)

const menuItems = computed(() => [
  { to: 'how-it-works', text: t('navbar.howItWorks') },
  { to: 'docker', text: t('navbar.services') },
  { to: 'about', text: t('navbar.about') },
  { to: 'https://uptime.brenon.cloud/status/services', text: t('navbar.status'), external: true }
])

const scrollToSection = (sectionId) => {
  if (isMobileMenuOpen.value) {
  }

  // If we're not on the home page, navigate there first
  if (router.currentRoute.value.path !== '/') {
  router.push('/')
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
    return
  }

  // If we're already on the home page
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>