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
        <!-- Diagram will be rendered here by Mermaid -->
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
    <div v-if="isMaximized" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90" @click.self="closeMaximized">
      <!-- Modal Container -->
      <div class="relative w-full h-full max-w-7xl max-h-screen p-4 sm:p-8 flex flex-col">
        
        <!-- Header with Controls -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 sm:justify-between mb-4 bg-gray-900/80 backdrop-blur-sm rounded-lg px-4 py-3">
          <h3 class="text-white font-semibold text-lg sm:text-xl">Architecture Diagram</h3>
          <div class="flex items-center justify-between w-full sm:w-auto gap-4">
            <div class="flex items-center gap-2 sm:border-l sm:border-gray-700 sm:pl-4">
              <span class="text-gray-400 text-sm">Zoom:</span>
              <button
                @click="zoomOut"
                class="p-2 sm:p-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors touch-manipulation"
                title="Zoom Out"
              >
                <svg class="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"/>
                </svg>
              </button>
              <span class="text-white text-sm font-mono min-w-[3.5rem] text-center">{{ zoomLevel }}%</span>
              <button
                @click="zoomIn"
                class="p-2 sm:p-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors touch-manipulation"
                title="Zoom In"
              >
                <svg class="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                </svg>
              </button>
              <button
                @click="resetZoom"
                class="px-3 py-2 sm:px-3 sm:py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded transition-colors touch-manipulation"
                title="Reset Zoom"
              >
                Reset
              </button>
            </div>
          </div>
          
          <!-- Close Button -->
          <button
            @click="closeMaximized"
            class="p-3 sm:p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors touch-manipulation"
            title="Close"
          >
            <svg class="w-6 h-6 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          @touchstart.prevent="handleTouchStart"
          @touchmove.prevent="handleTouchMove"
          @touchend.prevent="handleTouchEnd"
          :class="{ 'cursor-grab': !isDragging && !isTouch, 'cursor-grabbing': isDragging && !isTouch }"
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
          <p class="hidden sm:block">Scroll wheel to zoom (50%-800%) • Click and drag to navigate anywhere • <kbd class="px-2 py-1 bg-gray-800 rounded text-gray-300">ESC</kbd> to close</p>
          <p class="block sm:hidden">Pinch to zoom (50%-800%) • Touch and drag to navigate • Tap outside to close</p>
        </div>
      </div>
    </div>
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

// Reactive variables
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

// Touch support variables
const lastTouchDistance = ref(0)
const lastTouchCenter = ref({ x: 0, y: 0 })
const isTouch = ref(false)

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
      textColor: '#FFFFFF',
      nodeTextColor: '#FFFFFF',
      c0: '#3B82F6',
      c1: '#10B981',
      c2: '#F59E0B',
      c3: '#EF4444',
      c4: '#8B5CF6',
      c5: '#06B6D4',
      c6: '#84CC16',
      c7: '#F97316'
    },
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: 'basis'
    },
    securityLevel: 'loose',
    suppressErrorRendering: false
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
  zoomLevel.value = 300
  
  await nextTick()
  
  // Render diagram in maximized container
  if (maximizedDiagram.value) {
    await renderDiagram(maximizedDiagram)
  }
  
  // Calculate initial zoom to fit diagram in viewport with proper centering
  await nextTick()
  setTimeout(() => {
    fitDiagramToView()
  }, 200)
  
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
  isTouch.value = false
}

// Touch event handlers for mobile support
const getTouchDistance = (touches) => {
  if (touches.length < 2) return 0
  const touch1 = touches[0]
  const touch2 = touches[1]
  return Math.sqrt(
    Math.pow(touch1.clientX - touch2.clientX, 2) + 
    Math.pow(touch1.clientY - touch2.clientY, 2)
  )
}

const getTouchCenter = (touches) => {
  if (touches.length === 1) {
    return { x: touches[0].clientX, y: touches[0].clientY }
  }
  
  const x = (touches[0].clientX + touches[1].clientX) / 2
  const y = (touches[0].clientY + touches[1].clientY) / 2
  return { x, y }
}

const handleTouchStart = (event) => {
  if (!maximizedContainer.value) return
  
  isTouch.value = true
  
  if (event.touches.length === 1) {
    // Single touch - start pan
    const touch = event.touches[0]
    isDragging.value = true
    dragStart.value = { x: touch.clientX, y: touch.clientY }
    panStart.value = { x: panX.value, y: panY.value }
    lastTouchCenter.value = { x: touch.clientX, y: touch.clientY }
  } else if (event.touches.length === 2) {
    // Two fingers - start pinch zoom
    isDragging.value = false
    lastTouchDistance.value = getTouchDistance(event.touches)
    lastTouchCenter.value = getTouchCenter(event.touches)
  }
}

const handleTouchMove = (event) => {
  if (!maximizedContainer.value) return
  
  if (event.touches.length === 1 && isDragging.value) {
    // Single touch pan
    const touch = event.touches[0]
    const dx = touch.clientX - dragStart.value.x
    const dy = touch.clientY - dragStart.value.y
    
    panX.value = panStart.value.x + dx
    panY.value = panStart.value.y + dy
  } else if (event.touches.length === 2) {
    // Two finger pinch zoom
    const currentDistance = getTouchDistance(event.touches)
    const currentCenter = getTouchCenter(event.touches)
    
    if (lastTouchDistance.value > 0) {
      // Calculate zoom change
      const zoomChange = (currentDistance / lastTouchDistance.value)
      const oldZoom = zoomLevel.value
      const newZoom = Math.min(800, Math.max(50, oldZoom * zoomChange))
      
      // Apply zoom
      zoomLevel.value = newZoom
      
      // Adjust pan to zoom towards touch center (similar to mouse wheel)
      if (maximizedContainer.value) {
        const rect = maximizedContainer.value.getBoundingClientRect()
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const touchX = currentCenter.x - rect.left
        const touchY = currentCenter.y - rect.top
        
        const zoomFactor = newZoom / oldZoom
        panX.value = (panX.value - (touchX - centerX)) * zoomFactor + (touchX - centerX)
        panY.value = (panY.value - (touchY - centerY)) * zoomFactor + (touchY - centerY)
      }
    }
    
    lastTouchDistance.value = currentDistance
    lastTouchCenter.value = currentCenter
  }
}

const handleTouchEnd = (event) => {
  if (event.touches.length === 0) {
    // All touches ended
    isDragging.value = false
    isTouch.value = false
    lastTouchDistance.value = 0
  } else if (event.touches.length === 1) {
    // One finger lifted, switch to pan mode
    const touch = event.touches[0]
    isDragging.value = true
    dragStart.value = { x: touch.clientX, y: touch.clientY }
    panStart.value = { x: panX.value, y: panY.value }
  }
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
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  touch-action: none;
}

/* Cursor styles for dragging */
.cursor-grab {
  cursor: grab;
}

.cursor-grabbing {
  cursor: grabbing !important;
}

/* Touch optimization */
.touch-manipulation {
  touch-action: manipulation;
}

/* Mobile-specific improvements */
@media (max-width: 640px) {
  .mermaid-container {
    -webkit-overflow-scrolling: touch;
  }
}

/* Enable interactions on SVG elements */
:deep(svg) {
  pointer-events: auto !important;
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