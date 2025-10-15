<template>
  <section :id="id" class="py-16 sm:py-20">
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold mb-4">{{ title }}</h2>
      <p v-if="description" class="text-gray-300 text-lg max-w-3xl mx-auto">{{ description }}</p>
    </div>
    <div :class="[contentClass, 'max-w-7xl mx-auto']">
      <slot></slot>
    </div>
  </section>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  contentClass: {
    type: String,
    default: ''
  }
})
</script>