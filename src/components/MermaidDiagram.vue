<template>
  <div class="mermaid-container">
    <!-- Normal View with Expand Button -->
    <div class="relative group">
      <div 
        ref="mermaidElement" 
        :id="elementId"
        class="mermaid-diagram bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 overflow-x-auto cursor-pointer transition-all hover:border-blue-500/50"
        @click="openMaximized"
      >
        {{ diagram }}
      </div>
      
      <!-- Expand Button Overlay -->
      <button
        @click="openMaximized"
        class="absolute top-4 right-4 bg-gray-900/80 backdrop-blur-sm text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-600 z-10"
        title="Expand diagram"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
        </svg>
      </button>
    </div>

    <!-- Maximized/Fullscreen Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div 
          v-if="isMaximized"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          @click.self="closeMaximized"
        >
          <!-- Modal Container -->
          <div class="relative w-full h-full max-w-7xl max-h-screen p-4 sm:p-8 flex flex-col">
            
            <!-- Header with Controls -->
            <div class="flex items-center justify-between mb-4 bg-gray-900/80 backdrop-blur-sm rounded-lg px-4 py-3">
              <div class="flex items-center gap-4">
                <h3 class="text-white font-semibold text-lg">Architecture Diagram</h3>
                <div class="flex items-center gap-2 border-l border-gray-700 pl-4">
                  <span class="text-gray-400 text-sm">Zoom:</span>
                  <button
                    @click="zoomOut"
                    class="p-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors"
                    title="Zoom Out"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"/>
                    </svg>
                  </button>
                  <span class="text-white text-sm font-mono min-w-[3.5rem] text-center">{{ zoomLevel }}%</span>
                  <button
                    @click="zoomIn"
                    class="p-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors"
                    title="Zoom In"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                    </svg>
                  </button>
                  <button
                    @click="resetZoom"
                    class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded transition-colors"
                    title="Reset Zoom"
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <!-- Close Button -->
              <button
                @click="closeMaximized"
                class="p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors"
                title="Close (ESC)"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Diagram Container with Zoom and Pan -->
            <div 
              ref="maximizedContainer"
              class="flex-1 bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden relative"
              @wheel.prevent="handleWheel"
              @mousedown="startDrag"
              @mousemove="onDrag"
              @mouseup="endDrag"
              @mouseleave="endDrag"
              :class="{ 'cursor-grab': !isDragging, 'cursor-grabbing': isDragging }"
            >
              <div class="absolute inset-0 flex items-center justify-center">
                <div 
                  ref="maximizedDiagram"
                  class="mermaid-diagram-maximized"
                  :style="{ 
                    transform: `translate(${panX}px, ${panY}px) scale(${zoomLevel / 100})`,
                    transformOrigin: 'center center',
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                  }"
                >
                  <!-- Diagram will be rendered here -->
                </div>
              </div>
            </div>

            <!-- Footer Info -->
            <div class="mt-4 text-center text-gray-400 text-sm">
              <p>Scroll wheel to zoom (50%-800%) • Click and drag to navigate anywhere • <kbd class="px-2 py-1 bg-gray-800 rounded text-gray-300">ESC</kbd> to close</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
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
const maximizedDiagram = ref(null)
const maximizedContainer = ref(null)
const elementId = ref(`mermaid-${Math.random().toString(36).substr(2, 9)}`)
const isMaximized = ref(false)
    const zoomLevel = ref(100)
    const panX = ref(0)
    const panY = ref(0)
    const isDragging = ref(false)
    const dragStart = ref({ x: 0, y: 0 })
    const panStart = ref({ x: 0, y: 0 })

// Configure Mermaid with dark theme
const initializeMermaid = () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: props.theme,
    themeVariables: {
      darkMode: true,
      primaryColor: '#3B82F6',
      primaryTextColor: '#FFFFFF',
      primaryBorderColor: '#1F2937',
      lineColor: '#6B7280',
      secondaryColor: '#1F2937',
      secondaryTextColor: '#FFFFFF',
      tertiaryColor: '#374151',
      tertiaryTextColor: '#FFFFFF',
      background: '#111827',
      mainBkg: '#1F2937',
      secondBkg: '#374151',
      tertiaryBkg: '#4B5563',
      // Ensure all text is white for contrast
      textColor: '#FFFFFF',
      nodeTextColor: '#FFFFFF',
      c0: '#3B82F6', // Light blue nodes
      c1: '#10B981', // Green nodes  
      c2: '#F59E0B', // Orange nodes
      c3: '#EF4444', // Red nodes
      c4: '#8B5CF6', // Purple nodes
      c5: '#06B6D4', // Cyan nodes
      c6: '#84CC16', // Lime nodes
      c7: '#F97316'  // Orange nodes
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
    },
    // Enable security level for interactive features
    securityLevel: 'loose',
    // Enable click events and interactions
    suppressErrorRendering: false,
    // Enable pan and zoom
    panZoom: {
      enabled: true,
      minZoom: 0.5,
      maxZoom: 3,
      step: 0.1
    }
  })
}

const renderDiagram = async (targetElement = mermaidElement) => {
  if (!targetElement.value || !props.diagram) return

  try {
    // Clear previous content
    targetElement.value.innerHTML = ''
    
    // Generate unique ID for this render
    const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Render the diagram
    const { svg } = await mermaid.render(id, props.diagram)
    
    // Insert the rendered SVG
    targetElement.value.innerHTML = svg
    
    // Style the SVG
    const svgElement = targetElement.value.querySelector('svg')
    if (svgElement) {
      svgElement.style.display = 'block'
      svgElement.style.background = 'transparent'
    }
  } catch (error) {
    console.error('Mermaid rendering error:', error)
    targetElement.value.innerHTML = `
      <div class="text-red-400 p-4 text-center">
        <p>Error rendering diagram</p>
        <p class="text-sm text-gray-500 mt-2">${error.message}</p>
      </div>
    `
  }
}

// Maximization functions
const openMaximized = async () => {
  isMaximized.value = true
  
  // Reset pan position to center and start with higher zoom
  panX.value = 0
  panY.value = 0
  zoomLevel.value = 300 // Start at 300% instead of 100%
  
  await nextTick()
  await renderDiagram(maximizedDiagram)
  
  // Calculate initial zoom to fit diagram in viewport with proper centering
  await nextTick()
  setTimeout(() => {
    fitDiagramToView()
  }, 150) // Slightly longer delay to ensure proper rendering
  
  document.body.style.overflow = 'hidden'
}

const closeMaximized = () => {
  isMaximized.value = false
  zoomLevel.value = 100
  panX.value = 0
  panY.value = 0
  document.body.style.overflow = ''
}

// Fit diagram to viewport on initial open
const fitDiagramToView = () => {
  if (!maximizedContainer.value || !maximizedDiagram.value) return
  
  const container = maximizedContainer.value
  const svgElement = maximizedDiagram.value.querySelector('svg')
  
  if (!svgElement) return
  
  // Reset position first to get accurate measurements
  panX.value = 0
  panY.value = 0
  zoomLevel.value = 100
  
  // Wait a moment for the reset to take effect
  setTimeout(() => {
    const containerRect = container.getBoundingClientRect()
    
    // Get SVG natural dimensions
    let svgWidth = svgElement.width?.baseVal?.value || svgElement.clientWidth
    let svgHeight = svgElement.height?.baseVal?.value || svgElement.clientHeight
    
    // Fallback to getBBox for more accurate content dimensions
    if (!svgWidth || !svgHeight) {
      try {
        const bbox = svgElement.getBBox()
        svgWidth = bbox.width
        svgHeight = bbox.height
      } catch (e) {
        const rect = svgElement.getBoundingClientRect()
        svgWidth = rect.width
        svgHeight = rect.height
      }
    }
    
    // Calculate scale to fit with padding (85% of container for better visibility)
    const scaleX = (containerRect.width * 0.85) / svgWidth
    const scaleY = (containerRect.height * 0.85) / svgHeight
    const fitScale = Math.min(scaleX, scaleY)
    
    // Start with at least 300% scale or the fit scale, whichever is larger
    const minScale = 3.0 // 300%
    const targetScale = Math.max(fitScale, minScale)
    
    // Set the calculated zoom level (minimum 300%, maximum 800%)
    zoomLevel.value = Math.min(800, Math.max(300, Math.round(targetScale * 100)))
  }, 10)
}

// Zoom functions
const zoomIn = () => {
  if (zoomLevel.value < 800) {
    zoomLevel.value += 100
  }
}

const zoomOut = () => {
  if (zoomLevel.value > 50) {
    zoomLevel.value -= 100
  }
}

const resetZoom = () => {
  fitDiagramToView()
}

// Mouse wheel zoom with pan adjustment
const handleWheel = (event) => {
  event.preventDefault()
  
  if (!maximizedContainer.value) return
  
  const oldZoom = zoomLevel.value
  
  if (event.deltaY < 0) {
    // Scroll up - zoom in
    zoomLevel.value = Math.min(800, zoomLevel.value + 35)
  } else {
    // Scroll down - zoom out
    zoomLevel.value = Math.max(50, zoomLevel.value - 35)
  }
  
  // Adjust pan to zoom towards mouse position
  const rect = maximizedContainer.value.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  
  const zoomFactor = zoomLevel.value / oldZoom
  panX.value = (panX.value - (mouseX - centerX)) * zoomFactor + (mouseX - centerX)
  panY.value = (panY.value - (mouseY - centerY)) * zoomFactor + (mouseY - centerY)
}

// Drag to pan
const startDrag = (event) => {
  if (!maximizedContainer.value) return
  
  // Don't drag on interactive elements
  const target = event.target
  if (target.tagName === 'A' || target.closest('a')) {
    return
  }
  
  isDragging.value = true
  dragStart.value = {
    x: event.clientX,
    y: event.clientY
  }
  panStart.value = {
    x: panX.value,
    y: panY.value
  }
  
  event.preventDefault()
}

const onDrag = (event) => {
  if (!isDragging.value) return
  
  const dx = event.clientX - dragStart.value.x
  const dy = event.clientY - dragStart.value.y
  
  panX.value = panStart.value.x + dx
  panY.value = panStart.value.y + dy
}

const endDrag = () => {
  isDragging.value = false
}

// Keyboard shortcuts
const handleKeyDown = (event) => {
  if (!isMaximized.value) return
  
  if (event.key === 'Escape') {
    closeMaximized()
  } else if (event.key === '+' || event.key === '=') {
    event.preventDefault()
    zoomIn()
  } else if (event.key === '-') {
    event.preventDefault()
    zoomOut()
  } else if (event.key === '0') {
    event.preventDefault()
    resetZoom()
  }
}

onMounted(async () => {
  initializeMermaid()
  await nextTick()
  renderDiagram()
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = '' // Cleanup
})

// Watch for diagram changes
watch(() => props.diagram, () => {
  renderDiagram()
  if (isMaximized.value) {
    renderDiagram(maximizedDiagram)
  }
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

.mermaid-diagram-maximized {
  transition: transform 0.2s ease-out;
  text-align: center;
  user-select: none;
}

/* Cursor styles for dragging */
.cursor-grab {
  cursor: grab;
}

.cursor-grabbing {
  cursor: grabbing !important;
}

/* Enable interactions on SVG elements */
:deep(svg) {
  pointer-events: auto !important;
}

/* Modal animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar for maximized view */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #111827;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #4B5563;
}

/* Keyboard shortcut styling */
kbd {
  font-family: monospace;
  font-size: 0.875rem;
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
  color: #FFFFFF !important;
  fill: #FFFFFF !important;
}

:deep(.edgePath .path) {
  stroke: #6B7280 !important;
}

:deep(.edgeLabel) {
  background-color: #1F2937 !important;
  color: #FFFFFF !important;
}

/* Ensure all text elements are white for maximum contrast */
:deep(text) {
  fill: #FFFFFF !important;
  color: #FFFFFF !important;
}

:deep(.nodeLabel) {
  color: #FFFFFF !important;
  fill: #FFFFFF !important;
}

:deep(.label) {
  color: #FFFFFF !important;
  fill: #FFFFFF !important;
}

:deep(.actor) {
  fill: #374151 !important;
  stroke: #6B7280 !important;
}

:deep(.actor-text) {
  fill: #FFFFFF !important;
  color: #FFFFFF !important;
}

:deep(.section) {
  fill: #FFFFFF !important;
  color: #FFFFFF !important;
}
</style>