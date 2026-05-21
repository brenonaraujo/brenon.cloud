<template>
  <div class="min-h-screen bg-gray-900 flex flex-col">
    <Navbar />
    <div class="flex-1">
      <slot></slot>
    </div>
    <footer class="border-t border-gray-800 mt-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <div class="text-center sm:text-left">
          <p class="text-gray-200 font-medium">{{ profile.name }}</p>
          <p>{{ t('footer.tagline') }}</p>
        </div>
        <div class="flex items-center gap-4">
          <a
            v-for="link in visibleSocialLinks"
            :key="link.id"
            :href="link.url"
            :aria-label="link.label"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-white transition-colors"
          >
            {{ link.label }}
          </a>
        </div>
        <p class="text-gray-500">© {{ currentYear }} Brenon.Cloud — {{ t('footer.rights') }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from '../components/Navbar.vue'
import { profile, visibleSocialLinks } from '../config/profile'

const { t } = useI18n()
const currentYear = computed(() => new Date().getFullYear())
</script>