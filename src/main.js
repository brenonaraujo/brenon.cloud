import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Import pages
import Home from './pages/Home.vue'
import Service from './pages/Service.vue'

// Create router
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

// Create Vue app
const app = createApp(App)

// Use router
app.use(router)

// Mount app
app.mount('#app')