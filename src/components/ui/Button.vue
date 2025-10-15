<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 transition-colors',
      variant === 'primary' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-gray-800 hover:bg-gray-700',
      'text-white'
    ]"
  >
    <slot></slot>
    <svg v-if="withArrow" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14"/>
      <path d="M12 5l7 7-7 7"/>
    </svg>
  </component>
</template>

<script setup>
defineProps({
  href: {
    type: String,
    required: false,
    default: undefined
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value)
  },
  withArrow: {
    type: Boolean,
    default: false
  }
})
</script>