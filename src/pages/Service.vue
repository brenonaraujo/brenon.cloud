<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
    <nav class="flex items-center mb-8" aria-label="Breadcrumb">
        <router-link to="/" class="text-gray-400 hover:text-white flex items-center gap-2 group">
          <svg class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Home</span>
        </router-link>
      </nav>
      
      <div v-if="service" class="space-y-16">
        <!-- Hero Section -->
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-24 h-24 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-700/50 mb-6 p-4">
            <img 
              v-if="service.image" 
              :src="service.image" 
              :alt="service.shortName + ' logo'"
              class="w-full h-full object-contain"
              @error="$event.target.style.display = 'none'"
            />
            <ServiceIcon v-else :type="service.icon" class="w-12 h-12 text-blue-400" />
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold mb-4 text-white">{{ service.title }}</h1>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{{ service.description }}</p>
        </div>

        <!-- Architecture Diagram -->
        <div v-if="service.architecture" class="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <h2 class="text-2xl font-semibold mb-8 text-center text-white">How {{ service.shortName }} Fits in Brenon.Cloud</h2>
          <component :is="service.architecture" />
        </div>

        <!-- Features & Use Cases Grid -->
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Features -->
          <div class="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 class="text-2xl font-semibold mb-8 text-white flex items-center gap-3">
              <svg class="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              Core Features
            </h2>
            <div class="grid gap-4">
              <div v-for="feature in service.features" :key="feature" class="flex items-start gap-3 p-4 rounded-lg bg-gray-900/30">
                <svg class="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-300 text-sm">{{ feature }}</span>
              </div>
            </div>
          </div>

          <!-- Use Cases -->
          <div class="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <h2 class="text-2xl font-semibold mb-8 text-white flex items-center gap-3">
              <svg class="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              Use Cases
            </h2>
            <div class="space-y-6">
              <div v-for="useCase in service.useCases" :key="useCase.title" class="p-4 rounded-lg bg-gray-900/30">
                <h3 class="font-medium text-white mb-2">{{ useCase.title }}</h3>
                <p class="text-sm text-gray-400">{{ useCase.description }}</p>
              </div>
            </div>
          </div>
        </div>



        <!-- Getting Started -->
        <div class="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 rounded-2xl p-8 border border-gray-700/50">
          <h2 class="text-2xl font-semibold mb-6 text-white text-center">Getting Started</h2>
          <div class="max-w-4xl mx-auto">
            <div class="prose prose-invert prose-lg max-w-none">
              <p v-html="service.gettingStarted"></p>
            </div>
            
            <!-- Quick Start Steps -->
            <div v-if="service.quickStart" class="mt-8">
              <h3 class="text-lg font-medium text-white mb-6">Quick Start Guide</h3>
              <div class="grid md:grid-cols-3 gap-6">
                <div v-for="(step, index) in service.quickStart" :key="index" class="text-center">
                  <div class="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4 text-blue-400 font-bold">
                    {{ index + 1 }}
                  </div>
                  <h4 class="font-medium text-white mb-2">{{ step.title }}</h4>
                  <p class="text-sm text-gray-400">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="text-center">
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              v-if="service.demoUrl" 
              :href="service.demoUrl" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all duration-200 text-white font-medium transform hover:scale-105"
            >
              Launch {{ service.shortName }}
              <svg class="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 3h7v7"></path>
                <path d="M10 14L21 3"></path>
                <path d="M21 14v7H3V3h7"></path>
              </svg>
            </a>
            <a 
              href="https://docs.brenon.cloud" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gray-700 hover:bg-gray-600 transition-all duration-200 text-white font-medium transform hover:scale-105"
            >
              View Documentation
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 5l7 7-7 7"></path>
                <path d="M5 12h14"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

    <div v-else class="text-center">
      <h1 class="text-2xl font-bold text-red-500">Service Not Found</h1>
      <p class="mt-4 text-gray-300">The requested service could not be found.</p>
      <router-link 
        to="/" 
        class="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
      >
        Return Home
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5"></path>
          <path d="M12 19l-7-7 7-7"></path>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import { useRoute } from 'vue-router'

// Simple icon components
const ServiceIcon = ({ type }) => {
  const iconPaths = {
    shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    server: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
    cube: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    cog: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
  }
  
  return h('svg', {
    class: 'w-10 h-10 text-blue-400',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2'
  }, [
    h('path', { d: iconPaths[type] || iconPaths.server })
  ])
}

// Architecture diagram components
const AuthentikArchitecture = () => {
  return h('div', { class: 'text-center' }, [
    h('div', { class: 'flex flex-col md:flex-row items-center justify-center gap-8' }, [
      h('div', { class: 'flex flex-col items-center' }, [
        h('div', { class: 'w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3' }, [
          ServiceIcon({ type: 'shield' })
        ]),
        h('span', { class: 'text-white font-medium' }, 'Users')
      ]),
      h('svg', { class: 'w-8 h-8 text-gray-600 rotate-90 md:rotate-0', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
        h('path', { d: 'M5 12h14m-7-7l7 7-7 7', 'stroke-width': '2' })
      ]),
      h('div', { class: 'flex flex-col items-center bg-purple-500/10 p-6 rounded-xl border-2 border-purple-500/20' }, [
        h('div', { class: 'w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mb-3' }, [
          ServiceIcon({ type: 'shield' })
        ]),
        h('span', { class: 'text-white font-medium' }, 'Authentik'),
        h('span', { class: 'text-sm text-gray-400' }, 'Identity Hub')
      ]),
      h('svg', { class: 'w-8 h-8 text-gray-600 rotate-90 md:rotate-0', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor' }, [
        h('path', { d: 'M5 12h14m-7-7l7 7-7 7', 'stroke-width': '2' })
      ]),
      h('div', { class: 'grid grid-cols-2 gap-4' }, [
        h('div', { class: 'flex flex-col items-center' }, [
          h('div', { class: 'w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-2' }, [
            h('span', { class: 'text-xs text-green-400 font-bold' }, 'G')
          ]),
          h('span', { class: 'text-xs text-gray-400' }, 'Grafana')
        ]),
        h('div', { class: 'flex flex-col items-center' }, [
          h('div', { class: 'w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-2' }, [
            h('span', { class: 'text-xs text-blue-400 font-bold' }, 'P')
          ]),
          h('span', { class: 'text-xs text-gray-400' }, 'Portainer')
        ])
      ])
    ])
  ])
}

const KongArchitecture = () => {
  return h('div', { class: 'text-center' }, [
    h('div', { class: 'flex flex-col md:flex-row items-center justify-center gap-8' }, [
      h('div', { class: 'flex flex-col items-center' }, [
        h('div', { class: 'w-16 h-16 bg-gray-500/20 rounded-xl flex items-center justify-center mb-3' }, [
          h('span', { class: 'text-2xl' }, '🌐')
        ]),
        h('span', { class: 'text-white font-medium' }, 'Internet')
      ]),
      h('span', { class: 'text-2xl' }, '→'),
      h('div', { class: 'flex flex-col items-center bg-blue-500/10 p-6 rounded-xl border-2 border-blue-500/20' }, [
        h('div', { class: 'w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3' }, [
          ServiceIcon({ type: 'server' })
        ]),
        h('span', { class: 'text-white font-medium' }, 'Kong Gateway'),
        h('span', { class: 'text-sm text-gray-400' }, 'Route • Auth • Rate Limit')
      ]),
      h('span', { class: 'text-2xl' }, '→'),
      h('div', { class: 'grid grid-cols-2 gap-4' }, [
        h('div', { class: 'text-center' }, [
          h('div', { class: 'w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-2 mx-auto' }, [
            h('span', { class: 'text-xs text-emerald-400 font-bold' }, '🐳')
          ]),
          h('div', { class: 'text-xs text-gray-400' }, 'Containers')
        ])
      ])
    ])
  ])
}

// Simplified architecture components for other services
const DockerArchitecture = () => h('div', { class: 'text-center py-8' }, [
  h('div', { class: 'text-4xl mb-4' }, '🐳'),
  h('p', { class: 'text-gray-400' }, 'Multi-node Swarm Cluster with automatic scaling and failover')
])

const UptimeArchitecture = () => h('div', { class: 'text-center py-8' }, [
  h('div', { class: 'text-4xl mb-4' }, '📊'),
  h('p', { class: 'text-gray-400' }, 'Continuous monitoring with instant alerts and status reporting')
])

const GrafanaArchitecture = () => h('div', { class: 'text-center py-8' }, [
  h('div', { class: 'text-4xl mb-4' }, '📈'),
  h('p', { class: 'text-gray-400' }, 'Collect metrics from all services and visualize in unified dashboards')
])

const N8nArchitecture = () => h('div', { class: 'text-center py-8' }, [
  h('div', { class: 'text-4xl mb-4' }, '⚡'),
  h('p', { class: 'text-gray-400' }, 'Connect and automate workflows between all Brenon.Cloud services')
])

const PortainerArchitecture = () => h('div', { class: 'text-center py-8' }, [
  h('div', { class: 'text-4xl mb-4' }, '🖥️'),
  h('p', { class: 'text-gray-400' }, 'Visual interface for managing Docker containers and stacks')
])

const route = useRoute()
const service = ref(null)

const services = {
  'authentik': {
    title: 'Authentik - Identity Provider',
    shortName: 'Authentik',
    description: 'The security foundation block that enables zero-trust architecture across your entire cloud-native stack, eliminating the complexity and cost of managing separate authentication systems',
    icon: 'ShieldCheckIcon',
    image: 'https://avatars.githubusercontent.com/u/82976448?v=4',
    features: [
      'Single Sign-On (SSO) across all applications',
      'Multi-Factor Authentication (MFA) with TOTP, WebAuthn',
      'Fine-grained access policies and permissions',
      'User management with groups and roles',
      'OAuth2, SAML, and OpenID Connect support',
      'LDAP integration for enterprise environments',
      'Custom branding and theming',
      'Audit logs and security monitoring'
    ],
    useCases: [
      {
        title: 'Zero-Trust Security Architecture',
        description: 'Every Golang microservice, Python API, and web application deployed on Brenon.Cloud is protected by Authentik. Users authenticate once and gain secure access to all authorized services without managing multiple credentials.'
      },
      {
        title: 'Developer Team Management',
        description: 'Create developer groups with specific permissions - frontend teams access monitoring dashboards, DevOps teams manage containers via Portainer, and business teams view analytics in Grafana, all through role-based access control.'
      },
      {
        title: 'AI Agent Authentication',
        description: 'Secure your AI bots and automation agents with service accounts in Authentik. N8n workflows, Discord bots, and Telegram integrations authenticate seamlessly using OAuth2 tokens, ensuring secure two-way communication.'
      }
    ],
    integrations: [
      { name: 'Kong Gateway', description: 'Authentication enforcement at API level' },
      { name: 'Grafana', description: 'SSO login for dashboard access' },
      { name: 'Portainer', description: 'Container management authentication' },
      { name: 'n8n', description: 'Workflow automation security' }
    ],
    quickStart: [
      { title: 'Access Admin Panel', description: 'Login to Authentik admin interface' },
      { title: 'Configure Application', description: 'Add your service as a new application' },
      { title: 'Test SSO', description: 'Verify single sign-on functionality' }
    ],
    gettingStarted: 'Authentik is your security foundation - deploy it once, secure everything forever. Like a LEGO baseplate, it provides the stable foundation that all other services connect to. Every new service you deploy automatically inherits enterprise-grade security without additional configuration. <a href="https://auth.brenon.cloud" class="text-blue-400 hover:underline">Start building your secure cloud ecosystem here</a>.',
    architecture: 'AuthentikArchitecture',
    demoUrl: 'https://auth.brenon.cloud'
  },
  'kong': {
    title: 'Kong API Gateway',
    shortName: 'Kong',
    description: 'The networking building block that transforms simple containerized services into enterprise-grade APIs with routing, security, and observability - no expensive API management platforms required',
    icon: 'ServerIcon',
    image: 'https://images.seeklogo.com/logo-png/39/2/kong-logo-png_seeklogo-394595.png',
    features: [
      'Intelligent API routing and load balancing',
      'Authentication and authorization plugins',
      'Rate limiting and traffic control',
      'Request/response transformation',
      'API analytics and monitoring',
      'SSL termination and security',
      'Plugin ecosystem with 50+ plugins',
      'Service discovery and health checks'
    ],
    useCases: [
      {
        title: 'Golang Microservices Gateway',
        description: 'Deploy containerized Golang REST APIs behind Kong. Automatically route /api/users to your user service, /api/orders to order service, with built-in load balancing across multiple container replicas and zero-downtime deployments.'
      },
      {
        title: 'Authentication & Authorization Layer',
        description: 'Kong applies the Authentik OIDC plugin to every API endpoint. Users authenticate once through Authentik, Kong validates JWT tokens, and applies role-based routing - admins access admin APIs, users access public APIs.'
      },
      {
        title: 'AI & Bot API Management',
        description: 'Rate limit AI model APIs, apply different quotas for premium vs free users, and route WhatsApp/Telegram bot webhooks to appropriate n8n workflows. Kong transforms requests and responses, ensuring consistent API contracts.'
      }
    ],
    integrations: [
      { name: 'Authentik SSO', description: 'Integrate with identity provider for auth' },
      { name: 'Grafana Metrics', description: 'Monitor API performance and usage' },
      { name: 'Docker Services', description: 'Route to containerized applications' },
      { name: 'Uptime Monitoring', description: 'Health checks and status monitoring' }
    ],
    quickStart: [
      { title: 'Define Service', description: 'Register your backend service in Kong' },
      { title: 'Create Route', description: 'Map URLs to your service endpoints' },
      { title: 'Add Plugins', description: 'Enable auth, rate limiting, or other features' }
    ],
    gettingStarted: 'Kong is your networking Swiss Army knife - it transforms any simple HTTP service into a professional API. Like LEGO Technic beams that connect and strengthen your build, Kong connects your services with enterprise features. Deploy a Golang API container, point Kong to it, add the Authentik plugin, and instantly have a secure, rate-limited, monitored API. <a href="https://api.brenon.cloud" class="text-blue-400 hover:underline">See the magic in action</a>.',
    architecture: 'KongArchitecture',
    demoUrl: 'https://api.brenon.cloud'
  },
  'docker': {
    title: 'Docker Swarm Orchestration',
    shortName: 'Docker',
    description: 'The infrastructure building block that provides enterprise-grade container orchestration using commodity hardware, delivering 90% cost savings compared to managed Kubernetes platforms',
    icon: 'CubeIcon',
    image: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png',
    features: [
      'Docker Swarm cluster orchestration',
      'Compose v3 stack deployments',
      'Rolling updates with zero downtime',
      'Service scaling and load balancing',
      'Health checks and auto-recovery',
      'Secrets and config management',
      'Multi-node high availability',
      'Resource constraints and limits'
    ],
    useCases: [
      {
        title: 'Cloud-Native Golang Deployments',
        description: 'Build multi-stage Docker images for Golang services with scratch base images (2-10MB final size). Deploy via docker-compose stacks with health checks, resource limits, and automatic restarts. Services auto-register with Kong for instant API access.'
      },
      {
        title: 'Cost-Efficient Scaling Strategy',
        description: 'Run 10+ microservices on 2 mini PCs using efficient resource allocation. Each Golang service uses ~50MB RAM, Python APIs use ~100MB. Docker Swarm automatically schedules containers across nodes for optimal resource utilization.'
      },
      {
        title: 'Development-to-Production Pipeline',
        description: 'Developers push to Git, GitHub Actions builds containers, Portainer deploys to staging environment for testing, then promotes to production with rolling updates. Zero infrastructure management overhead.'
      }
    ],
    integrations: [
      { name: 'Portainer UI', description: 'Visual management of containers and stacks' },
      { name: 'Kong Routing', description: 'Automatic service discovery and routing' },
      { name: 'Grafana Monitoring', description: 'Container metrics and performance data' },
      { name: 'Authentik Security', description: 'Secure container access and authentication' }
    ],
    quickStart: [
      { title: 'Create Stack', description: 'Define services in docker-compose.yml' },
      { title: 'Deploy Stack', description: 'Launch your application stack on the cluster' },
      { title: 'Monitor Health', description: 'Check service status and performance' }
    ],
    gettingStarted: 'Deploy your applications as Docker containers or Compose stacks. Use our Portainer interface to manage deployments, or deploy directly via Docker CLI. All services run on our multi-node Swarm cluster for high availability.',
    architecture: 'DockerArchitecture',
    demoUrl: 'http://portainer.brenon.cloud'
  },
  'portainer': {
    title: 'Portainer - Container Management',
    description: 'Visual interface for managing Docker Swarm deployments',
    features: [
      'Visual Docker Swarm management',
      'Stack deployment from Compose files',
      'Container monitoring and logs',
      'Resource usage analytics',
      'User access control and teams',
      'Template library for common services',
      'Network and volume management',
      'Registry integration'
    ],
    gettingStarted: 'Portainer provides a web-based interface for managing your Docker deployments. Access it at <a href="http://portainer.brenon.cloud" class="text-blue-400 hover:underline">portainer.brenon.cloud</a> to deploy stacks, monitor services, and manage your containerized applications.',
    demoUrl: 'http://portainer.brenon.cloud'
  },
  'uptime-kuma': {
    title: 'Uptime Kuma - Service Monitor',
    shortName: 'Uptime Kuma',
    description: 'The reliability building block that provides enterprise-level monitoring and alerting without the complexity and cost of traditional APM solutions, keeping your services available 99.9% of the time',
    icon: 'ChartBarIcon',
    image: 'https://uptimekuma.org/wp-content/uploads/2025/01/Uptime-Kuma-Logo.png',
    features: [
      'HTTP/HTTPS endpoint monitoring',
      'TCP port and ping monitoring', 
      'SSL certificate expiration tracking',
      'Custom status pages',
      'Multi-channel notifications (Discord, Slack, Email)',
      'Response time tracking and charts',
      'Maintenance windows scheduling',
      'Public status page sharing'
    ],
    useCases: [
      {
        title: 'Proactive Infrastructure Monitoring',
        description: 'Monitor all Golang APIs, Python services, and web applications with sub-second response time tracking. Uptime Kuma checks every endpoint through Kong Gateway, detecting issues before users notice them.'
      },
      {
        title: 'Intelligent Alert Integration',
        description: 'When services go down, Uptime Kuma triggers n8n workflows that analyze the issue, check related services, and send contextual alerts to Discord, Telegram, or WhatsApp with automated recovery suggestions and status updates.'
      },
      {
        title: 'Transparent Service Status',
        description: 'Public status page at status.brenon.cloud shows real-time availability of all services. Users can subscribe to updates via Telegram bot, and AI agents can query status programmatically to provide intelligent support responses.'
      }
    ],
    integrations: [
      { name: 'Kong Gateway', description: 'Monitor API gateway health and performance' },
      { name: 'Docker Services', description: 'Track container and application uptime' },
      { name: 'Grafana Alerts', description: 'Visualize monitoring data in dashboards' },
      { name: 'n8n Automation', description: 'Trigger workflows based on service status' }
    ],
    quickStart: [
      { title: 'Add Monitor', description: 'Configure monitoring for your service endpoint' },
      { title: 'Set Alerts', description: 'Configure notification channels and thresholds' },
      { title: 'Create Status Page', description: 'Build public status page for transparency' }
    ],
    gettingStarted: 'Monitor all your services with Uptime Kuma. Set up monitors for your applications and receive alerts when issues occur. View service status and uptime statistics at our monitoring dashboard.',
    architecture: 'UptimeArchitecture',
    demoUrl: 'https://uptime.brenon.cloud'
  },
  'grafana': {
    title: 'Grafana - Observability Platform',
    shortName: 'Grafana',
    description: 'The observability building block that transforms your infrastructure into a data-driven operation, providing enterprise-grade analytics at a fraction of the cost of commercial monitoring solutions',
    icon: 'ChartLineIcon',
    image: 'https://images.icon-icons.com/2699/PNG/512/grafana_logo_icon_171048.png',
    features: [
      'Custom dashboard creation with drag-and-drop',
      'Multi-datasource support (Prometheus, InfluxDB, etc)',
      'Advanced visualization options and chart types',
      'Alerting and notification rules',
      'Team collaboration and sharing features',
      'Dashboard templating and variables',
      'Plugin ecosystem for extensions',
      'Time-series data analysis and forecasting'
    ],
    useCases: [
      {
        title: 'Real-Time Infrastructure Observability',
        description: 'Track CPU, memory, and disk usage across mini PC cluster nodes. Monitor Docker container resources, Kong API gateway metrics, and Golang service performance. Prometheus collectors feed data to beautiful Grafana dashboards with 1-second granularity.'
      },
      {
        title: 'Application Performance Intelligence',
        description: 'Custom Golang metrics expose business KPIs directly in code using prometheus/client_golang. Track API response times, user registrations, payment transactions, and error rates. Alert via n8n when SLA thresholds are breached.'
      },
      {
        title: 'Cost Optimization Dashboards',
        description: 'Visualize resource efficiency - containers per node, cost per service, and scaling recommendations. Business stakeholders see real-time user analytics while developers monitor technical debt metrics, all in unified dashboards.'
      }
    ],
    integrations: [
      { name: 'Kong Metrics', description: 'Visualize API gateway performance and usage' },
      { name: 'Docker Stats', description: 'Monitor container resources and health' },
      { name: 'Uptime Data', description: 'Display service uptime and response times' },
      { name: 'Authentik SSO', description: 'Secure dashboard access with single sign-on' }
    ],
    quickStart: [
      { title: 'Connect Data Source', description: 'Link Prometheus or other metrics source' },
      { title: 'Create Dashboard', description: 'Build custom visualizations and panels' },
      { title: 'Set Up Alerts', description: 'Configure notifications for threshold breaches' }
    ],
    gettingStarted: 'Create powerful dashboards to visualize your infrastructure metrics. Connect to data sources like Prometheus and build custom charts to monitor performance, resource usage, and application health.',
    architecture: 'GrafanaArchitecture',
    demoUrl: 'https://grafana.brenon.cloud'
  },
  'n8n': {
    title: 'n8n - Automation Engine',
    shortName: 'n8n',
    description: 'The automation building block that connects all your services with AI-powered workflows, enabling intelligent operations and two-way communication channels that would cost thousands in enterprise integration platforms',
    icon: 'CogIcon',
    image: 'https://brandlogos.net/wp-content/uploads/2025/05/n8n_icon-logo_brandlogos.net_3mw34-512x270.png',
    features: [
      'Visual workflow designer with drag-and-drop',
      '200+ pre-built integrations and nodes',
      'Custom JavaScript code execution',
      'Scheduled and event-triggered workflows',
      'HTTP webhooks and API endpoints',
      'Advanced data transformation and processing',
      'Error handling and retry logic',
      'Workflow templates and community sharing'
    ],
    useCases: [
      {
        title: 'AI-Powered Infrastructure Automation',
        description: 'When Grafana alerts fire, n8n workflows analyze the issue using OpenAI GPT, check service dependencies, attempt automatic recovery (restart containers, scale replicas), and send intelligent reports to WhatsApp/Telegram with suggested actions and impact assessment.'
      },
      {
        title: 'Two-Way Communication Bridge',
        description: 'Users send commands to Telegram bot (@brenoncloud_bot), n8n processes requests, deploys services via Portainer API, checks status through Kong, and responds with deployment URLs. Admins get WhatsApp notifications for approvals, creating human-in-the-loop automation.'
      },
      {
        title: 'No-Code Business Process Integration',
        description: 'Connect Stripe webhook → validate payment → trigger Golang user activation API → send welcome email via SendGrid → create Grafana dashboard access → notify Discord channel. All without coding, using visual workflows with error handling and retry logic.'
      }
    ],
    integrations: [
      { name: 'Uptime Alerts', description: 'Trigger workflows when services go down' },
      { name: 'Grafana Webhooks', description: 'Process monitoring alerts and metrics' },
      { name: 'Kong API Calls', description: 'Automate API interactions and data flows' },
      { name: 'Authentik Users', description: 'Manage user provisioning and access' }
    ],
    quickStart: [
      { title: 'Design Workflow', description: 'Use visual editor to create automation logic' },
      { title: 'Connect Services', description: 'Link your Brenon.Cloud services together' },
      { title: 'Test & Deploy', description: 'Validate workflow and set it live' }
    ],
    gettingStarted: 'Automate repetitive tasks by connecting different services and APIs. Create workflows that trigger on events, process data, and integrate your tools seamlessly. Build powerful automations without writing code.',
    architecture: 'N8nArchitecture',
    demoUrl: 'https://n8n.brenon.cloud'
  },
  'portainer': {
    title: 'Portainer - Container Management',
    shortName: 'Portainer',
    description: 'The management building block that democratizes container operations, allowing any developer to deploy and scale cloud-native applications without DevOps expertise or expensive orchestration training',
    icon: 'ServerIcon',
    image: 'https://www.portainer.io/hubfs/Brand%20Assets/Logos/Portainer%20Logo%20Solid%20All%20-%20Blue%20no%20padding.svg',
    features: [
      'Visual Docker Swarm management interface',
      'Stack deployment from Compose files',
      'Real-time container monitoring and logs',
      'Resource usage analytics and insights',
      'User access control and team management',
      'Template library for common services',
      'Network and volume management tools',
      'Registry integration and image management'
    ],
    useCases: [
      {
        title: 'Visual DevOps for Non-Experts',
        description: 'Developers with zero Docker Swarm knowledge deploy Golang services by uploading docker-compose.yml files through Portainer UI. Set resource limits, health checks, and secrets through forms instead of YAML configuration, making cloud-native accessible to all skill levels.'
      },
      {
        title: 'Template-Driven Service Deployment',
        description: 'Pre-built templates for common patterns: "Golang REST API + PostgreSQL", "Python ML Model + Redis Cache", "Static Website + CDN". One-click deployment with automatic Kong route creation, Authentik integration, and Grafana monitoring setup.'
      },
      {
        title: 'Cost-Conscious Resource Management',
        description: 'Visual resource allocation across mini PC cluster. See real-time CPU/memory usage per container, identify resource-hungry services, and optimize placement. Stack deployment wizard calculates resource requirements and suggests optimal node distribution for maximum efficiency.'
      }
    ],
    integrations: [
      { name: 'Docker Swarm', description: 'Direct management of the container orchestration' },
      { name: 'Kong Services', description: 'Deploy API gateway configurations' },
      { name: 'Grafana Monitoring', description: 'Container metrics collection and display' },
      { name: 'Authentik Access', description: 'Secure container management with SSO' }
    ],
    quickStart: [
      { title: 'Access Interface', description: 'Login to Portainer web management console' },
      { title: 'Deploy Stack', description: 'Upload compose file and deploy services' },
      { title: 'Monitor Services', description: 'Track container health and performance' }
    ],
    gettingStarted: 'Portainer provides a web-based interface for managing your Docker deployments. Access it at <a href="http://portainer.brenon.cloud" class="text-blue-400 hover:underline">portainer.brenon.cloud</a> to deploy stacks, monitor services, and manage your containerized applications.',
    architecture: 'PortainerArchitecture',
    demoUrl: 'http://portainer.brenon.cloud'
  }
}

onMounted(() => {
  const serviceId = route.query.service
  if (serviceId && services[serviceId]) {
    service.value = services[serviceId]
    document.title = `${services[serviceId].title} - Brenon.Cloud`
  }
})
</script>