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
              <router-link
                v-else-if="item.route"
                :to="item.to"
                class="text-gray-300 hover:text-white transition-colors"
              >
                {{ item.text }}
              </router-link>
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
                <router-link
                  v-else-if="item.route"
                  :to="item.to"
                  class="block text-center text-lg font-medium text-gray-300 hover:text-white py-3 transition-colors"
                  @click="toggleMobileMenu"
                >
                  {{ item.text }}
                </router-link>
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
import LanguageSelector from './ui/LanguageSelector.vue'

const router = useRouter()
const { t } = useI18n()
const isMobileMenuOpen = ref(false)

const menuItems = computed(() => [
  { to: '/blog', text: t('navbar.blog'), route: true },
  { to: '/games', text: t('navbar.games'), route: true },
  { to: '/path', text: t('navbar.pathToGlory'), route: true },
  { to: 'infrastructure', text: t('navbar.about') },
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