<template>
  <div class="mt-10 flex flex-col items-center gap-3 text-gray-400 text-sm">
    <div class="flex flex-wrap items-center justify-center gap-2">
      <span 
        v-for="(step, index) in steps" 
        :key="index" 
        class="flex items-center"
      >
        <span class="px-2 py-1 rounded bg-gray-800">{{ step }}</span>
        <span v-if="index < steps.length - 1" class="mx-2">→</span>
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  steps: {
    type: Array,
    required: true
  }
})
</script>