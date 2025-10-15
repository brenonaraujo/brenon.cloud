# Brenon.Cloud - AI Coding Instructions

## Project Overview
This is a Vue 3 + Vite landing page for Brenon.Cloud, a personal cloud infrastructure platform. The site showcases Docker-based services and serves as a gateway to personal cloud services. The application implements **Clean Architecture** with layered separation of concerns, dependency injection, and SOLID principles.

## Architecture Overview

### Technology Stack
- **Vue 3** with Composition API
- **Vite** for build tooling and HMR
- **Pinia** for state management
- **Vue Router** for navigation
- **Vue I18n** for internationalization
- **Tailwind CSS** for styling
- **Mermaid** for diagram rendering

### Clean Architecture Layers
```
src/
├── api/              # Infrastructure - HTTP clients and data access
├── services/         # Domain - Business logic and rules
├── stores/           # Application - State management (Pinia)
├── composables/      # Application - Reusable composition functions
├── components/       # Presentation - UI components
├── locales/          # Infrastructure - Translation files
└── types/           # Domain - Type definitions and contracts
```

### Data Flow Pattern
The application follows a unidirectional data flow:
```
API Client → Service Layer → Pinia Store → Composable → Component
                         ↓
                   i18n Service → Translation Keys → Component
```

### Component Architecture
- **UI Components** (`src/components/ui/`): Atomic, pure presentation components
- **Layout Components** (`src/components/layout/`): Structural layout containers  
- **Feature Components**: Business-specific components that consume stores/composables
- **Icons**: Custom Vue render functions using `h()` pattern

### Build & Development
- **Dev server**: `npm run dev` (Vite with HMR)
- **Build**: `npm run build` (includes type checking)
- **Preview**: `npm run preview` (test production build)
- **Available task**: "Build and Run Locally" (Tailwind watch mode)

### Deployment
- **Netlify deployment** via `netlify.toml`
- **Environment variables**: Configure API endpoints per environment
- **SPA routing**: Redirects all routes to `/index.html`

## SOLID Principles in Practice

### Single Responsibility Principle (SRP)
Each layer has a single, well-defined responsibility:
- **API clients**: Handle HTTP requests and data fetching
- **Service classes**: Implement business logic and domain rules
- **Stores**: Manage application state and coordinate data flow
- **Composables**: Provide reusable reactive logic
- **Components**: Handle presentation and user interaction

### Open/Closed Principle (OCP)
The architecture supports extension without modification:
- Service rendering through configurable patterns
- Icon system with pluggable icon components
- Extensible API clients and service layers

### Dependency Inversion Principle (DIP)
Components depend on abstractions, not implementations:
- Use `inject()` for service dependencies
- Consume stores through composables
- Access translations through `useI18n()` composable

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

### Component Guidelines

#### UI Components (`src/components/ui/`)
**Purpose**: Pure, reusable, atomic components
- Use Tailwind CSS for styling
- Accept generic `variant` and `size` props
- Emit semantic events, not DOM events
- Use slots for content distribution
- No business logic or state management

#### Feature Components
**Purpose**: Business-specific components that consume stores/composables
- Access data through composables like `useServices()`
- Use `useI18n()` for translations
- Implement proper loading and error states

#### Component Principles
```javascript
// ✅ Good: Separated concerns
// ServiceCard.vue - only presentation
// useServices.js - data management  
// serviceStore.js - state management
// i18n - translations
```

### Dependency Injection Pattern
Components should depend on abstractions, not implementations:
```vue
<script setup>
// ✅ Good: Use composables and abstractions
const apiService = inject('serviceService')
const { t } = useI18n()
const { services, loading, error } = useServices()

// ❌ Avoid: Direct imports create tight coupling
// import { fetchServices } from '../api/services.js'
</script>
```

### Data Flow Architecture
Follow the established unidirectional data flow:
```
ServicesApiClient → ServiceService → serviceStore → useServices() → Component
                                 ↓
                            i18n → useI18n() → Component
```

### Error Handling & Loading States
Implement consistent patterns across components:
```vue
<template>
  <div>
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <ServiceGrid v-else :services="services" />
  </div>
</template>
```

### Icon System
Current implementation uses `h()` render functions in `src/components/icons/Icons.js`
- Icons are registered in a centralized file
- Components import icons from `src/components/icons/index.js`
- Follow the existing pattern for new icons

### Service Data Structure
Services follow a defined type structure (see `src/types/service.js`):
- Each service has: `id`, `title`, `description`, `icon`, `color`, `url`
- Extended properties: `quickStart`, `useCases`, `category`
- Mock data is currently in `ServicesApiClient` for development


## To following at the end of any implementation
- Create a pull request with a detailed description of changes e a new branch
- Branch created for each feature has to following this patter to name
  - feature/short-description
  - fix/short-description
  - chore/short-description
- Setup a short resumed description of the changes mades and how to test it.
