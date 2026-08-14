<template>
  <Card>
    <template #header>
      <div class="mb-4 flex items-center gap-4">
        <div :class="[`p-3 rounded-lg bg-${color}-400/10`]">
          <component
            :is="iconComponent"
            :class="[`h-8 w-8 text-${color}-400`]"
          />
        </div>
        <div class="min-w-0">
          <h3 class="text-lg font-semibold leading-snug">{{ title }}</h3>
          <p v-if="hostname" class="text-xs text-gray-500 mt-1 truncate font-mono">{{ hostname }}</p>
        </div>
      </div>
    </template>

    <p class="text-gray-400 text-base leading-relaxed min-h-[4.5rem]">{{ truncatedDescription }}</p>

    <template #footer>
      <div class="mt-6 flex items-center justify-between gap-4">
        <a
          :href="learnMoreUrl"
          :class="[
            'inline-flex items-center gap-2 text-sm font-medium',
            `text-${color}-400 hover:text-${color}-300 transition-colors`
          ]"
        >
          {{ t('serviceCard.learnMore') }}
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14"/>
            <path d="M12 5l7 7-7 7"/>
          </svg>
        </a>

        <a
          v-if="demoUrl"
          :href="demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          :class="[
            'inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
            `bg-${color}-500 hover:bg-${color}-600 text-white`
          ]"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15,3 21,3 21,9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          {{ t('serviceCard.open') }}
        </a>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from './ui/Card.vue'
import { CheckmarkIcon, BoltIcon, CubeIcon, ChartIcon, SettingsIcon, WorkflowIcon, CloudStorageIcon } from './icons/Icons.js'

const { t } = useI18n()

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
  },
  demoUrl: {
    type: String,
    required: false
  },
  hostname: {
    type: String,
    required: false,
    default: ''
  }
})

const iconComponent = computed(() => {
  const icons = {
    checkmark: CheckmarkIcon,
    bolt: BoltIcon,
    cube: CubeIcon,
    chart: ChartIcon,
    settings: SettingsIcon,
    workflow: WorkflowIcon,
    cloudstorage: CloudStorageIcon,
    // legacy PascalCase ids from older mock data
    ShieldCheckIcon: CheckmarkIcon,
    ServerIcon: CubeIcon,
    CubeIcon: CubeIcon,
    ChartBarIcon: ChartIcon,
    ChartLineIcon: ChartIcon,
    CogIcon: SettingsIcon
  }

  return icons[props.icon] ?? icons.cube
})

const truncatedDescription = computed(() => {
  if (!props.description || props.description.length <= 150) {
    return props.description
  }

  const truncated = props.description.substring(0, 150)
  const lastSpaceIndex = truncated.lastIndexOf(' ')

  if (lastSpaceIndex > 120) {
    return truncated.substring(0, lastSpaceIndex) + '...'
  }

  return truncated + '...'
})
</script>
