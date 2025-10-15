<template>
  <div :class="containerClass">
    <a
      v-for="link in socialLinks"
      :key="link.href"
      :href="link.href"
      :aria-label="link.label"
      :class="linkClass"
      target="_blank"
      rel="noopener noreferrer"
    >
      <component :is="link.icon" />
      <span v-if="mobile" class="ml-2">{{ link.label }}</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  mobile: {
    type: Boolean,
    default: false
  }
})

const containerClass = computed(() => 
  props.mobile ? '' : 'inline-flex items-center space-x-3'
)

const linkClass = computed(() => 
  props.mobile
    ? 'flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-800'
    : 'p-2 text-white hover:text-gray-300'
)

const socialLinks = [
  {
    href: 'https://github.com/brenonaraujo/brenon.cloud',
    label: 'GitHub',
    icon: {
      template: `
        <svg class="h-7 w-7" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path fill-rule="evenodd" d="M12 .5C5.73.5.98 5.24.98 11.52c0 4.87 3.16 9 7.55 10.45.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.06-3.07.67-3.72-1.31-3.72-1.31-.5-1.27-1.22-1.61-1.22-1.61-.99-.67.07-.66.07-.66 1.09.08 1.66 1.12 1.66 1.12.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.69-1.48-2.45-.28-5.02-1.22-5.02-5.42 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.41.11-2.94 0 0 .93-.3 3.04 1.13.88-.24 1.83-.36 2.77-.37.94 0 1.89.13 2.77.37 2.11-1.43 3.04-1.13 3.04-1.13.6 1.53.22 2.66.11 2.94.7.77 1.13 1.75 1.13 2.95 0 4.21-2.58 5.14-5.04 5.41.39.33.73.98.73 1.98 0 1.43-.01 2.58-.01 2.93 0 .29.2.64.75.53 4.39-1.46 7.55-5.58 7.55-10.45C23.02 5.24 18.27.5 12 .5z" clip-rule="evenodd" />
        </svg>
      `
    }
  },
  {
    href: 'https://www.linkedin.com/in/brenonaraujo',
    label: 'LinkedIn',
    icon: {
      template: `
        <svg class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.451 20.451h-3.554v-5.569c0-1.328-.027-3.036-1.85-3.036-1.853 0-2.136 1.447-2.136 2.943v5.662H9.357V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.601 0 4.267 2.371 4.267 5.454v6.286zM5.337 7.433a2.063 2.063 0 110-4.126 2.063 2.063 0 010 4.126zM7.114 20.451H3.56V9h3.554v11.451z"/>
        </svg>
      `
    }
  }
]
</script>