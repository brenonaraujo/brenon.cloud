<template>
  <div class="mermaid-container">
    <div 
      ref="mermaidElement" 
      :id="elementId"
      class="mermaid-diagram bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 overflow-x-auto"
    >
      {{ diagram }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import mermaid from 'mermaid'

const props = defineProps({
  diagram: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    default: 'dark'
  }
})

const mermaidElement = ref(null)
const elementId = ref(`mermaid-${Math.random().toString(36).substr(2, 9)}`)

// Configure Mermaid with dark theme
const initializeMermaid = () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: props.theme,
    themeVariables: {
      darkMode: true,
      primaryColor: '#3B82F6',
      primaryTextColor: '#F3F4F6',
      primaryBorderColor: '#1F2937',
      lineColor: '#6B7280',
      secondaryColor: '#1F2937',
      tertiaryColor: '#374151',
      background: '#111827',
      mainBkg: '#1F2937',
      secondBkg: '#374151',
      tertiaryBkg: '#4B5563'
    },
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis'
    },
    sequence: {
      actorMargin: 50,
      width: 150,
      height: 65,
      boxMargin: 10,
      boxTextMargin: 5,
      noteMargin: 10,
      messageMargin: 35
    },
    gantt: {
      useMaxWidth: true,
      leftPadding: 75,
      gridLineStartPadding: 35,
      fontSize: 11,
      sectionFontSize: 11,
      numberSectionStyles: 4
    }
  })
}

const renderDiagram = async () => {
  if (!mermaidElement.value || !props.diagram) return

  try {
    // Clear previous content
    mermaidElement.value.innerHTML = ''
    
    // Generate unique ID for this render
    const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Render the diagram
    const { svg } = await mermaid.render(id, props.diagram)
    
    // Insert the rendered SVG
    mermaidElement.value.innerHTML = svg
    
    // Style the SVG for better dark theme integration
    const svgElement = mermaidElement.value.querySelector('svg')
    if (svgElement) {
      svgElement.style.width = '100%'
      svgElement.style.height = 'auto'
      svgElement.style.background = 'transparent'
    }
  } catch (error) {
    console.error('Mermaid rendering error:', error)
    mermaidElement.value.innerHTML = `
      <div class="text-red-400 p-4 text-center">
        <p>Error rendering diagram</p>
        <p class="text-sm text-gray-500 mt-2">${error.message}</p>
      </div>
    `
  }
}

onMounted(async () => {
  initializeMermaid()
  await nextTick()
  renderDiagram()
})

// Watch for diagram changes
watch(() => props.diagram, () => {
  renderDiagram()
}, { deep: true })
</script>

<style scoped>
.mermaid-container {
  width: 100%;
}

.mermaid-diagram {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Override Mermaid's default styles for dark theme */
:deep(.mermaid) svg {
  background: transparent !important;
}

:deep(.node rect) {
  fill: #374151 !important;
  stroke: #6B7280 !important;
}

:deep(.node .label) {
  color: #F3F4F6 !important;
  fill: #F3F4F6 !important;
}

:deep(.edgePath .path) {
  stroke: #6B7280 !important;
}

:deep(.edgeLabel) {
  background-color: #1F2937 !important;
  color: #F3F4F6 !important;
}
</style>