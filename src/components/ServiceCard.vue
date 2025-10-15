<template>
  <Card>
    <template #header>
      <div class="mb-4 flex items-center gap-4">
        <div :class="[`p-3 rounded-lg bg-${color}-400/10`]">
          <component 
            :is="iconComponent" 
            :class="[`h-6 w-6 text-${color}-400`]"
          />
        </div>
        <h3 class="text-lg font-semibold">{{ title }}</h3>
      </div>
    </template>
    
    <p class="text-gray-400 text-base leading-relaxed min-h-[3rem]">{{ description }}</p>
    
    <template #footer>
      <a 
        :href="learnMoreUrl" 
        :class="[
          'mt-6 inline-flex items-center gap-2 text-sm font-medium',
          `text-${color}-400 hover:text-${color}-300 transition-colors`
        ]"
      >
        Learn more
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/>
          <path d="M12 5l7 7-7 7"/>
        </svg>
      </a>
    </template>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import Card from './ui/Card.vue'
import { CheckmarkIcon, BoltIcon, CubeIcon, ChartIcon, SettingsIcon, WorkflowIcon } from './icons/Icons.js'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  learnMoreUrl: {
    type: String,
    required: true
  }
})

const iconComponent = computed(() => {
  const icons = {
    checkmark: CheckmarkIcon,
    bolt: BoltIcon,
    cube: CubeIcon,
    chart: ChartIcon,
    settings: SettingsIcon,
    workflow: WorkflowIcon
  }

  return icons[props.icon] ?? icons.cube
})
</script>