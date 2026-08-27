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
          type="button"
          @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-menu"
          class="sm:hidden inline-flex items-center justify-center rounded-lg p-2 min-h-[44px] min-w-[44px] text-white hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <!-- Desktop menu -->
        <div class="hidden sm:flex items-center gap-6">
          <nav class="flex items-center gap-6">
            <template v-for="item in menuItems" :key="item.to">
              <a v-if="item.external"
                :href="item.to"
                target="_blank"
                rel="noopener noreferrer"
                class="whitespace-nowrap text-gray-300 hover:text-white transition-colors"
              >
                {{ item.text }}
              </a>
              <router-link
                v-else-if="item.route"
                :to="item.to"
                class="whitespace-nowrap text-gray-300 hover:text-white transition-colors"
              >
                {{ item.text }}
              </router-link>
              <a
                v-else
                href="#"
                @click.prevent="scrollToSection(item.to)"
                class="whitespace-nowrap text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {{ item.text }}
              </a>
            </template>
          </nav>
          <AuthMenu />
          <!-- Language Selector -->
          <LanguageSelector />
        </div>
      </div>
    </div>
  </nav>

  <!--
    Teleport to body: the sticky nav uses backdrop-filter, which becomes the
    containing block for position:fixed descendants. Nested inset-0 then sizes
    to the 80px bar instead of the viewport, so the overlay "disappears" into
    the page. Rendering on <body> keeps the sheet viewport-fixed.
  -->
  <Teleport to="body">
    <div
      v-if="isMobileMenuOpen"
      id="mobile-menu"
      class="sm:hidden fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-gray-900"
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
    >
      <div class="p-4 min-h-full">
        <div class="flex justify-end">
          <button
            type="button"
            @click="closeMobileMenu"
            class="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-gray-400 hover:text-white"
          >
            <span class="sr-only">Close menu</span>
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
                class="block text-center text-lg font-medium text-gray-300 hover:text-white py-3 min-h-[44px] transition-colors"
                @click="closeMobileMenu"
              >
                {{ item.text }}
              </a>
              <router-link
                v-else-if="item.route"
                :to="item.to"
                class="block text-center text-lg font-medium text-gray-300 hover:text-white py-3 min-h-[44px] transition-colors"
                @click="closeMobileMenu"
              >
                {{ item.text }}
              </router-link>
              <a
                v-else
                href="#"
                @click.prevent="scrollToSection(item.to)"
                class="block text-center text-lg font-medium text-gray-300 hover:text-white py-3 min-h-[44px] transition-colors cursor-pointer"
              >
                {{ item.text }}
              </a>
            </template>
          </div>
          <div class="mt-8 flex justify-center">
            <AuthMenu />
          </div>
          <div class="mt-6 flex justify-center">
            <LanguageSelector />
          </div>
        </nav>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LanguageSelector from './ui/LanguageSelector.vue'
import AuthMenu from './AuthMenu.vue'

const router = useRouter()
const { t } = useI18n()
const isMobileMenuOpen = ref(false)

const menuItems = computed(() => [
  { to: '/blog', text: t('navbar.blog'), route: true },
  { to: 'products', text: t('navbar.products') },
  { to: 'platform', text: t('navbar.platform') },
  { to: '/games', text: t('navbar.games'), route: true },
  { to: '/path', text: t('navbar.pathToGlory'), route: true },
  { to: 'infrastructure', text: t('navbar.about') },
  { to: 'https://uptime.brenon.cloud/status/services', text: t('navbar.status'), external: true }
])

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const scrollToSection = (sectionId) => {
  closeMobileMenu()

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

  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

watch(isMobileMenuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

const onKeydown = (event) => {
  if (event.key === 'Escape') closeMobileMenu()
}

let desktopMq
const onDesktopMq = (event) => {
  if (event.matches) closeMobileMenu()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  desktopMq = window.matchMedia('(min-width: 640px)')
  desktopMq.addEventListener('change', onDesktopMq)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  desktopMq?.removeEventListener('change', onDesktopMq)
  document.body.style.overflow = ''
})
</script>
