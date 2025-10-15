# Brenon.Cloud Architecture Documentation

## Overview
This document describes the clean architecture implementation for Brenon.Cloud, a Vue 3 + Vite landing page showcasing personal cloud infrastructure services. The architecture follows SOLID principles and modern Vue.js best practices with layered separation of concerns.

## Technology Stack

### Core Dependencies
- **Vue 3** (v3.5.22) - Progressive JavaScript framework with Composition API
- **Vite** (v4.4.9) - Build tool with HMR and optimized bundling
- **Pinia** (v3.0.3) - Vue store library for state management
- **Vue Router** (v4.6.0) - Official router for Vue.js applications
- **Vue I18n** (v11.1.12) - Internationalization plugin
- **Ofetch** (v1.4.1) - HTTP client with native fetch API
- **Mermaid** (v11.12.0) - Diagram rendering library
- **Tailwind CSS** (v3.3.3) - Utility-first CSS framework

## Architecture Overview

### Directory Structure
Clean separation of concerns across these layers:
```
src/
├── api/              # Infrastructure - HTTP clients and data access
├── services/         # Domain - Business logic and rules
├── stores/           # Application - State management (Pinia)
├── composables/      # Application - Reusable composition functions
├── components/       # Presentation - UI components
├── locales/          # Infrastructure - Translation files
├── types/           # Domain - Type definitions and contracts
├── pages/           # Presentation - Route components
└── layouts/         # Presentation - Layout components
```

## Clean Architecture Layers

### Infrastructure Layer (`src/api/`)
**Purpose**: Data access and external service communication

- **`client.js`** - Configured ofetch instance with base URL, error handling, and retry logic
- **`servicesApi.js`** - ServicesApiClient class implementing Repository pattern
  - `getServices()` - Fetch all services from API or mock data
  - `getServiceById(id)` - Fetch single service by identifier
  - Includes comprehensive mock data for development and demo purposes

### Domain Layer (`src/services/` & `src/types/`)
**Purpose**: Business logic and domain rules

- **`serviceService.js`** - ServiceService class implementing core business logic
  - `getAllServices()` - Retrieve and sort services with business rules
  - `getServiceById(id)` - Get single service with validation
  - `filterByColor(services, color)` - Filter services by color theme
  - `searchServices(services, query)` - Search functionality with business rules

- **`service.js`** - Type definitions using JSDoc
  - `Service` - Core service entity definition
  - `ServiceQuickStartStep` - Quick start guide step structure
  - `ServiceUseCase` - Use case documentation structure

### Application Layer (`src/stores/` & `src/composables/`)
**Purpose**: Application state and orchestration

#### State Management (`src/stores/`)
- **`serviceStore.js`** - Pinia store using Composition API pattern
  - **State**: services, loading, error, lastFetch timestamp
  - **Getters**: allServices, getServiceById, servicesByColor
  - **Actions**: fetchServices (with 5-minute cache), fetchServiceById
  - **Features**: Intelligent caching, comprehensive error handling, loading states

#### Composables (`src/composables/`)
- **`useServices.js`** - Clean interface for components to access service data
  - Encapsulates store and service layer interactions
  - Provides i18n integration for translated content
  - **Methods**: loadServices(force), loadService(id), getServiceTitle(serviceId), getServiceDescription(serviceId)

### Presentation Layer (`src/components/`, `src/pages/`)
**Purpose**: User interface and user interaction

#### Component Architecture
- **UI Components** (`src/components/ui/`): Atomic, reusable components (Button, Card, Section)
- **Layout Components** (`src/components/layout/`): Structural containers (DefaultLayout)
- **Feature Components**: Service-specific components (ServiceCard, Navbar)
- **Icons**: Centralized icon system using Vue render functions

#### Pages & Routing
- **`Home.vue`** - Main landing page consuming services via useServices()
- **`Service.vue`** - Individual service detail page with dynamic routing
- **Vue Router** - SPA routing with query parameter support

## Internationalization (i18n)

### Translation System
- **`src/locales/en.json`** - English translations (default)
- **`src/locales/pt.json`** - Portuguese translations (browser-detected)

### Translation Structure
```json
{
  "home": {
    "hero": {...},
    "docker": {...},
    "about": {...}
  },
  "services": {
    "authentik": {...},
    "kong": {...},
    ...
  },
  "servicePage": {...},
  "common": {...}
}
```

### i18n Features
- **Auto-detection**: Browser language detection (pt-* → Portuguese, else English)
- **Fallback**: Graceful fallback to English for missing translations
- **Composition API**: Modern `useI18n()` pattern in components
- **Interpolation**: Support for dynamic values in translations

## Dependency Injection Pattern

### Service Registration (`src/main.js`)
```javascript
// Create service instances
const servicesApi = new ServicesApiClient()
const serviceService = new ServiceService(servicesApi)

// Register services for dependency injection
app.provide('serviceService', serviceService)
```

### Service Consumption in Components
```javascript
// Components inject services through abstractions
const serviceService = inject('serviceService')
const { t } = useI18n()
const { services, loading, error } = useServices()
```

## Component Architecture

### Page Components
#### Home.vue
- **Purpose**: Main landing page showcasing all services
- **Data Source**: `useServices()` composable
- **Features**: Loading states, error handling, internationalized content
- **Rendering**: Service grid with ServiceCard components

#### Service.vue  
- **Purpose**: Individual service detail page
- **Data Source**: `useServices().loadService(id)` from route query
- **Features**: Dynamic service loading, not-found handling, comprehensive service information
- **Content**: Service details, quick start guides, use cases

### UI Components
#### ServiceCard.vue
- **Purpose**: Pure presentation component for service display
- **Props**: Service object with all necessary data
- **Features**: Color theming, icon integration, responsive design
- **Architecture**: No business logic, purely presentational

## SOLID Principles Implementation

### Single Responsibility Principle (SRP)
Each layer has a single, well-defined responsibility:
- **API clients**: Handle HTTP requests and data fetching only
- **Service classes**: Implement business logic and domain rules only  
- **Stores**: Manage application state and coordinate data flow only
- **Composables**: Provide reusable reactive logic only
- **Components**: Handle presentation and user interaction only

### Open/Closed Principle (OCP)
The architecture supports extension without modification:
- **Service rendering**: New services added through configuration, not code changes
- **Icon system**: New icons registered without modifying existing components
- **Translation system**: New languages added without touching existing translations

### Liskov Substitution Principle (LSP)
Components can be substituted with enhanced versions:
- **ServiceCard**: Can be replaced with enhanced versions maintaining same interface
- **API clients**: Mock and real implementations are interchangeable

### Interface Segregation Principle (ISP)
Components depend only on methods they actually use:
- **Composables**: Expose only relevant methods to each component type
- **Store actions**: Granular actions instead of monolithic interfaces

### Dependency Inversion Principle (DIP)
High-level modules don't depend on low-level modules:
- **Components**: Depend on abstractions (composables) not concrete implementations
- **Services**: Injected via provide/inject pattern
- **API communication**: Abstracted through service layer

## Data Flow Architecture

### Unidirectional Data Flow
```
User Interaction → Component → Composable → Store → Service → API Client → Network
                       ↓                                                      ↓
                  UI Update ← State Update ← Business Logic ← Data Response ←
```

### Architectural Layers Visualization
```
┌─────────────────────────────────────┐
│  Presentation (Pages/Components)    │  ← User Interface
├─────────────────────────────────────┤
│  Application (Composables/Stores)   │  ← State & Orchestration  
├─────────────────────────────────────┤
│  Domain (Services/Types)            │  ← Business Logic
├─────────────────────────────────────┤
│  Infrastructure (API/i18n)          │  ← External Concerns
└─────────────────────────────────────┘
```

### Service Loading Flow Example
1. **User Action**: User visits Home page
2. **Component**: Home.vue calls `loadServices()` from useServices composable
3. **Composable**: Orchestrates call to store's `fetchServices()` method
4. **Store**: Checks 5-minute cache, calls ServiceService if cache miss
5. **Service Layer**: Implements business logic, calls ServicesApiClient
6. **API Client**: Attempts HTTP call, gracefully falls back to mock data
7. **Data Return**: Response flows back through all layers
8. **UI Update**: Component renders with reactive data and i18n translations

### Cross-Cutting Concerns
- **i18n**: Translation keys resolved at component level via `useI18n()`
- **Error Handling**: Consistent error boundaries at store and component levels
- **Loading States**: Reactive loading indicators throughout the application
- **Caching**: Intelligent caching strategy in stores to optimize performance

## Key Architectural Features

### Intelligent Caching System
- **Duration**: 5-minute cache TTL in Pinia stores
- **Strategy**: Cache-first with force refresh capability
- **Benefits**: Reduces API calls, improves performance, better user experience

### Comprehensive Error Handling
- **Graceful Degradation**: Automatic fallback to mock data when API unavailable
- **User Feedback**: Clear, translated error messages for different failure scenarios
- **Retry Logic**: Built-in retry mechanisms in HTTP client layer

### Reactive Loading States
- **Visual Indicators**: Loading spinners and skeleton screens
- **Layout Stability**: Prevents cumulative layout shift during data loading
- **Progressive Enhancement**: Content loads progressively as data becomes available

### Type Safety & Developer Experience
- **JSDoc Types**: Comprehensive type definitions for all entities
- **IDE Integration**: Enhanced autocomplete and IntelliSense support
- **Documentation**: Inline documentation for better code understanding

### Robust Internationalization
- **Auto-Detection**: Browser language preferences automatically detected
- **Extensible**: Easy addition of new languages through JSON files
- **Consistent**: Centralized translation keys prevent duplicate strings

## Development Patterns

### Adding New Services
1. **Data**: Add service definition to `ServicesApiClient._getMockServices()`
2. **Translations**: Add i18n keys to `locales/en.json` and `locales/pt.json`
3. **Auto-Integration**: Service automatically appears throughout UI via reactive stores

### Adding New Languages
1. **Translation File**: Create `src/locales/{language}.json` with complete translations
2. **Registration**: Import and register in `src/main.js` i18n configuration
3. **Detection**: Add language detection logic if needed

### Component Testing Strategy
```javascript
// Easy mocking through dependency injection
const mockServiceService = {
  getAllServices: vi.fn(() => Promise.resolve(mockServices)),
  getServiceById: vi.fn((id) => Promise.resolve(mockServices[0]))
}

// Test setup
app.provide('serviceService', mockServiceService)
```

### Error Boundary Pattern
```vue
<!-- Consistent error handling across components -->
<template>
  <div>
    <LoadingSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" @retry="handleRetry" />
    <ServiceContent v-else :services="services" />
  </div>
</template>
```

## Performance Considerations

### Bundle Optimization
- **Code Splitting**: Automatic route-based splitting via Vue Router
- **Tree Shaking**: Dead code elimination through ES modules
- **Asset Optimization**: Vite's built-in optimization for images and fonts

### Runtime Performance  
- **Caching Strategy**: Reduces redundant API calls and computation
- **Reactive Updates**: Vue's reactivity system ensures minimal DOM updates
- **Lazy Loading**: Components and routes loaded on-demand

### Development Experience
- **Hot Module Replacement**: Instant feedback during development
- **Type Safety**: JSDoc provides IDE support without TypeScript overhead
- **Consistent Patterns**: Standardized architecture reduces cognitive load

## Architecture Benefits

### Code Quality Metrics

#### Maintainability
- **High Cohesion**: Related functionality grouped in appropriate layers
- **Loose Coupling**: Dependencies flow inward following clean architecture
- **Single Responsibility**: Each class/module has one reason to change
- **DRY Principle**: No code duplication across the application

#### Testability  
- **Dependency Injection**: Easy mocking and testing of isolated components
- **Pure Functions**: Business logic in services is easily unit testable
- **Separation of Concerns**: UI logic separated from business logic
- **Composable Architecture**: Reusable logic can be tested independently

#### Scalability
- **Modular Design**: New features added without modifying existing code
- **Plugin Architecture**: Easy integration of new services and capabilities
- **Layered Structure**: Changes in one layer don't affect others
- **Performance Optimization**: Caching and lazy loading built into architecture

### Development Benefits
- **Consistent Patterns**: Standardized approaches across all features
- **Type Safety**: JSDoc provides compile-time checks and IDE support  
- **Hot Reloading**: Fast development cycles with Vite
- **International Ready**: Built-in i18n support for global deployment

## Future Extensibility

### API Integration
The architecture is designed to seamlessly transition from mock data to real APIs:
- **ServicesApiClient**: Ready to replace mock methods with HTTP calls
- **Error Handling**: Robust error boundaries already implemented
- **Caching**: Intelligent caching system ready for production data

### Feature Additions
New features can be added following established patterns:
- **New Services**: Add through configuration, not code modification
- **New Components**: Follow UI/Feature component separation
- **New Pages**: Leverage existing composables and stores
- **New Languages**: Simple JSON file addition

### Technology Migration
Architecture supports gradual technology upgrades:
- **TypeScript**: JSDoc types provide migration path
- **Testing**: Dependency injection enables comprehensive test coverage
- **State Management**: Pinia stores can evolve with application needs
- **Build System**: Vite configuration supports advanced optimizations

## Summary

This architecture implementation successfully demonstrates:

**Clean Architecture Principles**
- Dependency inversion with abstractions at component boundaries
- Business logic isolated in domain layer (services)
- Infrastructure concerns separated from application logic

**Modern Vue.js Best Practices**
- Composition API for better logic reuse and organization
- Pinia for predictable state management
- Vue Router for SPA navigation
- Vue I18n for internationalization

**SOLID Design Principles**
- Single Responsibility across all layers
- Open/Closed for extension without modification
- Dependency Inversion through injection patterns

**Developer Experience**
- Consistent coding patterns and conventions
- Comprehensive error handling and loading states
- Type safety through JSDoc annotations
- Hot reload development environment

The result is a maintainable, scalable, and extensible codebase that serves as an excellent foundation for the Brenon.Cloud platform and can be used as a template for similar projects.
