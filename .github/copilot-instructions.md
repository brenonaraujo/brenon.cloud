# Brenon.Cloud - AI Coding Instructions

## Project Overview
This is a Vue 3 + Vite landing page for Brenon.Cloud, a personal cloud infrastructure platform. The site showcases Docker-based services and serves as a gateway to personal cloud services. **Current architecture is transitioning toward clean, scalable patterns with REST API integration, internationalization, and centralized state management.**

## Clean Architecture & SOLID Principles

### Current State & Improvement Goals
- **Current**: Hardcoded service data in components, mixed concerns, tight coupling
- **Target**: Layered architecture with separation of concerns, dependency injection, and clean abstractions

### Planned Architecture Layers
```
src/
├── api/              # API layer - REST client abstractions
├── stores/           # State management - Pinia stores 
├── services/         # Business logic layer
├── composables/      # Reusable composition functions
├── components/       # Presentation layer
├── locales/          # i18n translation files
└── types/           # TypeScript definitions
```

### Component Structure (Clean Architecture)
- **UI Components** (`src/components/ui/`): Atomic, reusable, no business logic
- **Feature Components** (`src/components/features/`): Service-specific, consume stores/composables
- **Layout Components** (`src/components/layout/`): Structural components
- **Icons**: Custom Vue render functions in `src/components/icons/Icons.js` using `h()` pattern

### SOLID Principles Implementation

#### Single Responsibility Principle (SRP)
```javascript
// ❌ Current: ServiceCard handles display + data + logic
// ✅ Target: Separate concerns
// ServiceCard.vue - only presentation
// useService.js - data fetching logic  
// serviceStore.js - state management
```

#### Open/Closed Principle (OCP)
```javascript
// ✅ Extendable service rendering without modification
const serviceRenderers = {
  default: DefaultServiceRenderer,
  enhanced: EnhancedServiceRenderer
}
```

#### Dependency Inversion Principle (DIP)
```javascript
// ✅ Components depend on abstractions, not concrete implementations
// useApiService() instead of direct fetch calls
// useI18n() instead of hardcoded strings
```

### Data Flow Architecture

#### Current Issues to Refactor
1. **Hardcoded service data** in `Home.vue` and `Service.vue` (lines 212-270)
2. **Mixed presentation/data logic** in components
3. **No centralized state management** for service data
4. **Hardcoded strings** throughout components

#### Target Data Flow
```
REST API → API Service → Pinia Store → Composable → Component
                    ↓
              i18n Service → Translation Keys → Component
```

## Planned Feature Implementation

### 1. REST API Integration
**Target Structure:**
```javascript
// src/api/services.js
export class ServicesApiClient {
  async getServices() { /* GET /api/services */ }
  async getService(id) { /* GET /api/services/:id */ }
}

// src/services/serviceService.js  
export class ServiceService {
  constructor(apiClient, i18nService) {
    this.apiClient = apiClient
    this.i18nService = i18nService
  }
}
```

**Replace hardcoded data in:**
- `Home.vue` services array (lines 212-270)
- `Service.vue` services object (lines 100+)

### 2. Internationalization (i18n)
**Setup Pattern:**
```javascript
// src/locales/en.json
{
  "services": {
    "authentik": {
      "title": "Identity & Access (Authentik)",
      "description": "Centralize login with SSO..."
    }
  }
}

// Component usage
const { t } = useI18n()
const title = computed(() => t('services.authentik.title'))
```

**Files needing i18n:**
- All hardcoded strings in `Home.vue`, `Service.vue`, `Navbar.vue`
- Service descriptions and feature lists
- UI labels and buttons

### 3. Pinia State Management
**Store Architecture:**
```javascript
// src/stores/serviceStore.js
export const useServiceStore = defineStore('services', () => {
  const services = ref([])
  const loading = ref(false)
  const error = ref(null)
  
  const fetchServices = async () => { /* API call */ }
  const getServiceById = (id) => services.value.find(s => s.id === id)
  
  return { services, loading, error, fetchServices, getServiceById }
})
```

### 4. Composables for Reusability
**Target Composables:**
```javascript
// src/composables/useServices.js
export function useServices() {
  const store = useServiceStore()
  const { t } = useI18n()
  
  return {
    services: computed(() => store.services),
    loading: computed(() => store.loading),
    fetchServices: store.fetchServices
  }
}
```

## Development Workflow & Refactoring Strategy

### Phase 1: Setup Infrastructure
1. **Install dependencies**: `pinia`, `vue-i18n`, `axios/ofetch`
2. **Create directory structure**: `api/`, `stores/`, `composables/`, `locales/`
3. **Setup Pinia and i18n plugins** in `main.js`

### Phase 2: Extract Hardcoded Data
1. **Move service data** from components to JSON/API
2. **Create service store** and API client
3. **Replace direct data access** with store composables

### Phase 3: Implement i18n
1. **Extract all strings** to translation files
2. **Replace hardcoded text** with `$t()` calls
3. **Add language switcher** component

### Phase 4: Clean Architecture
1. **Create service layer** abstractions
2. **Implement dependency injection** patterns
3. **Add error boundaries** and loading states

### Build & Development
- **Dev server**: `npm run dev` (Vite with HMR)
- **Build**: `npm run build` (includes type checking)
- **Preview**: `npm run preview` (test production build)
- **Available task**: "Build and Run Locally" (Tailwind watch mode)

### Deployment
- **Netlify deployment** via `netlify.toml`
- **Environment variables**: Configure API endpoints per environment
- **SPA routing**: Redirects all routes to `/index.html`

## Key Files & Refactoring Priorities

### Current Critical Files (Refactor Priority)
1. **`src/pages/Home.vue`** - Extract hardcoded services array to store
2. **`src/pages/Service.vue`** - Replace hardcoded service objects with API calls
3. **`src/components/ServiceCard.vue`** - Make generic, consume from props/store
4. **`src/main.js`** - Setup Pinia, i18n, and API client injection

### New Files to Create
- `src/stores/serviceStore.js` - Centralized service state
- `src/api/client.js` - HTTP client configuration
- `src/services/serviceService.js` - Business logic layer
- `src/locales/en.json`, `src/locales/pt.json` - Translation files
- `src/composables/useServices.js` - Reusable service logic

### Dependencies to Add
```json
{
  "pinia": "^2.1.7",
  "vue-i18n": "^9.8.0", 
  "ofetch": "^1.3.3",
  "@pinia/nuxt": "^0.5.1"
}
```

## Component Development Guidelines

### Clean Component Architecture

#### UI Components (`src/components/ui/`)
**Principles**: Pure, reusable, no business logic
```vue
<!-- ✅ Good: Pure UI component -->
<template>
  <button :class="buttonClasses" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script setup>
// Only presentation logic, no data fetching
const props = defineProps(['variant', 'size'])
const emit = defineEmits(['click'])
const buttonClasses = computed(() => ({ /* styling logic */ }))
</script>
```

#### Feature Components (`src/components/features/`)
**Principles**: Business logic, consume stores/composables
```vue
<!-- ✅ Good: Feature component with clean dependencies -->
<template>
  <div>
    <ServiceCard v-for="service in services" :key="service.id" :service="service" />
  </div>
</template>

<script setup>
// Business logic through composables
const { services, loading, error } = useServices()
const { t } = useI18n()
</script>
```

### SOLID Component Patterns

#### Single Responsibility Examples
```javascript
// ❌ Bad: Component doing too much
// ServiceCard.vue handling: display + data fetching + routing + i18n

// ✅ Good: Separated concerns
// ServiceCard.vue - only display
// useServices.js - data management  
// useNavigation.js - routing logic
// i18n composable - translations
```

#### Dependency Inversion in Components
```vue
<!-- ✅ Good: Depend on abstractions -->
<script setup>
// Inject services through composables
const apiService = inject('apiService') // Abstract interface
const { t } = useI18n() // Translation abstraction
</script>

<!-- ❌ Bad: Direct dependencies -->
<script setup>
// Direct imports create tight coupling
import { fetchServices } from '../api/services.js'
</script>
```

### New UI Components
Place in `src/components/ui/` following atomic design:
- **Atoms**: `Button.vue`, `Input.vue`, `Icon.vue`
- **Molecules**: `SearchBox.vue`, `ServiceCard.vue`
- **Organisms**: `ServiceGrid.vue`, `NavigationBar.vue`

**Requirements:**
- Use Tailwind with design tokens
- Accept generic `variant` and `size` props
- Emit semantic events, not DOM events
- Use slots for content distribution
- No business logic or state management

### Icon System Enhancement
Current: `src/components/icons/Icons.js` using `h()` render functions
**Improvement needed**: Dynamic icon loading with TypeScript
```javascript
// Target: Icon registry pattern
export const iconRegistry = {
  checkmark: () => import('./CheckmarkIcon.vue'),
  bolt: () => import('./BoltIcon.vue')
}

export function useIcon(name) {
  return computed(() => iconRegistry[name]?.())
}
```

### Service Integration (Clean Architecture)
**Current**: Hardcoded objects in `Home.vue`
**Target**: API-driven with proper abstractions

```javascript
// ❌ Current: Hardcoded in component
const services = [
  { id: 'authentik', title: 'Identity...', /* ... */ }
]

// ✅ Target: Clean service layer
// 1. API Client (Infrastructure)
class ServiceApiClient {
  async getServices() { /* HTTP call */ }
}

// 2. Service Layer (Domain)  
class ServiceService {
  constructor(apiClient) { this.apiClient = apiClient }
  async getAllServices() { /* Business logic */ }
}

// 3. Store (Application)
const useServiceStore = defineStore('services', () => {
  const service = inject('serviceService')
  const services = ref([])
  
  async function fetchServices() {
    services.value = await service.getAllServices()
  }
  
  return { services, fetchServices }
})

// 4. Composable (Presentation)
function useServices() {
  const store = useServiceStore()
  return {
    services: computed(() => store.services),
    fetchServices: store.fetchServices
  }
}

// 5. Component (UI)
const { services } = useServices()
```

### Error Handling & Loading States
**Pattern**: Consistent error boundaries across components
```vue
<template>
  <div>
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <ServiceGrid v-else :services="services" />
  </div>
</template>

<script setup>
const { services, loading, error } = useServices()
</script>
```

### TypeScript Integration (Future)
**Preparation**: Structure code for easy TS migration
- Use explicit prop definitions
- Type composable return values
- Define service interfaces
- Create type-safe API clients