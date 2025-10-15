import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import './style.css'

// Pages
import Home from './pages/Home.vue'
import Service from './pages/Service.vue'

// Clean Architecture Layers
import { servicesApi } from './api/servicesApi'
import { ServiceService } from './services/serviceService'

// i18n translations
import en from './locales/en.json'
import pt from './locales/pt.json'

// Router configuration
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/service',
      name: 'service',
      component: Service,
      props: route => ({ serviceId: route.query.service })
    },
    {
      path: '/status',
      beforeEnter: (to, from, next) => {
        window.location.href = 'https://uptime.brenon.cloud/status/services';
      }
    }
  ]
})

// Pinia store
const pinia = createPinia()

// Get saved language preference or use browser default
const getInitialLocale = () => {
  const savedLanguage = localStorage.getItem('preferred-language')
  if (savedLanguage && ['en', 'pt'].includes(savedLanguage)) {
    return savedLanguage
  }
  return navigator.language.startsWith('pt') ? 'pt' : 'en'
}

// i18n configuration
const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: getInitialLocale(), // Load saved preference or use browser default
  fallbackLocale: 'en',
  messages: {
    en,
    pt
  }
})

// Dependency Injection: Service Layer
const serviceService = new ServiceService(servicesApi)

// Create and configure app
const app = createApp(App)

// Register plugins
app.use(router)
app.use(pinia)
app.use(i18n)

// Provide dependencies (Dependency Injection)
app.provide('serviceService', serviceService)

app.mount('#app')