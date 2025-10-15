<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <header class="relative text-center py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-transparent pointer-events-none"></div>
      <div class="relative z-10">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Brenon.Cloud</span>
        </h1>
        <p class="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Your Gateway to a Secure and Integrated Personal Cloud
        </p>
        <div class="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button href="#docker" variant="primary" class="min-w-[160px]" withArrow>
            Get started
          </Button>
          <Button href="#docker" variant="secondary" class="min-w-[160px]" withArrow>
            Explore services
          </Button>
        </div>
      </div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>
    </header>

    <main>
      <Section
        id="docker"
        title="Deploy, deliver, and self‑manage your services"
        description="Use Brenon.Cloud building blocks to run personal services end‑to‑end with security, routing, automation, and observability."
        contentClass="space-y-12"
      >
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ServiceCard
            v-for="service in services.slice(0, 3)"
            :key="service.id"
            v-bind="service"
          />
        </div>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ServiceCard
            v-for="service in services.slice(3)"
            :key="service.id"
            v-bind="service"
          />
        </div>
        <FlowLine :steps="['Auth', 'Edge', 'Deploy', 'Monitor', 'Dashboards', 'Automate']" />
      </Section>

      <Section
        id="how-it-works"
        title="Deploy Any Service with Docker"
        description="We run Docker Swarm on a cluster of mini‑computer nodes and manage it with Portainer. Deploy Compose stacks, scale replicas, and roll out zero‑downtime updates from a simple UI."
      >
        <div class="grid sm:grid-cols-3 gap-6 text-left mb-8">
          <div class="bg-gray-800 rounded-lg p-5">
            <h3 class="font-semibold mb-2">Managed with Portainer</h3>
            <p class="text-gray-400 text-sm">Visual UI to deploy and manage Swarm stacks, networks, volumes, and secrets across nodes.</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-5">
            <h3 class="font-semibold mb-2">Swarm Stacks</h3>
            <p class="text-gray-400 text-sm">Compose v3 with deploy policies, health checks, and rolling updates for reliable releases.</p>
          </div>
          <div class="bg-gray-800 rounded-lg p-5">
            <h3 class="font-semibold mb-2">Scalable &amp; Resilient</h3>
            <p class="text-gray-400 text-sm">Scale replicas per service and leverage node failover to keep apps available.</p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/service?service=docker" variant="primary" withArrow>
            Learn more about Docker deployments
          </Button>
          <Button href="/service?service=portainer" variant="secondary" withArrow>
            How we use Portainer
          </Button>
          <a href="http://portainer.home.server/" target="_blank" rel="noopener noreferrer" 
             class="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition text-white">
            Open Portainer
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 3h7v7"></path>
              <path d="M10 14L21 3"></path>
              <path d="M21 14v7H3V3h7"></path>
            </svg>
          </a>
        </div>

        <FlowLine class="mt-6" :steps="['Write compose', 'Deploy as Swarm stack', 'Scale replicas', 'Rolling update', 'Monitor & dashboards']" />
      </Section>

      <Section
        id="about"
        title="About Brenon.Cloud"
        description="Empowering individuals with enterprise-grade cloud infrastructure"
      >
        <div class="space-y-16">
          <!-- Vision and Mission -->
          <div class="text-center max-w-3xl mx-auto">
            <p class="text-lg text-gray-300 leading-relaxed">
              Brenon.Cloud started with a simple vision: making enterprise-grade cloud infrastructure accessible to individuals. 
              What began with two mini computers has evolved into a robust platform that brings the power of modern cloud architecture to your personal projects.
            </p>
          </div>

          <!-- Key Features Grid -->
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold">Infrastructure Stack</h3>
              <ul class="space-y-2 text-gray-300">
                <li>• Docker Swarm Orchestration</li>
                <li>• Kong API Gateway</li>
                <li>• Authentik Identity Management</li>
                <li>• Automated CI/CD Pipeline</li>
              </ul>
            </div>

            <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <div class="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold">Security & Reliability</h3>
              <ul class="space-y-2 text-gray-300">
                <li>• Zero-trust Architecture</li>
                <li>• SSL/TLS Encryption</li>
                <li>• Automated Backups</li>
                <li>• High Availability Setup</li>
              </ul>
            </div>

            <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold">Automation & Scaling</h3>
              <ul class="space-y-2 text-gray-300">
                <li>• Auto-scaling Services</li>
                <li>• Monitoring & Alerts</li>
                <li>• Resource Optimization</li>
                <li>• Load Balancing</li>
              </ul>
            </div>
          </div>

          <!-- How It Works Flow -->
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 opacity-30 blur-3xl"></div>
            <div class="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8">
              <h3 class="text-xl font-semibold mb-6 text-center">How Your Services Flow</h3>
              <div class="flex flex-col md:flex-row items-center justify-between gap-6 text-center">
                <div class="flex-1">
                  <div class="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                    </svg>
                  </div>
                  <h4 class="font-medium mb-2">Edge Gateway</h4>
                  <p class="text-sm text-gray-400">Traffic routing, SSL termination, and initial security layer</p>
                </div>
                <svg class="w-6 h-6 text-gray-600 rotate-90 md:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14m-7-7l7 7-7 7"/>
                </svg>
                <div class="flex-1">
                  <div class="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <h4 class="font-medium mb-2">Authentication</h4>
                  <p class="text-sm text-gray-400">Identity verification and access control</p>
                </div>
                <svg class="w-6 h-6 text-gray-600 rotate-90 md:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14m-7-7l7 7-7 7"/>
                </svg>
                <div class="flex-1">
                  <div class="w-16 h-16 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                    </svg>
                  </div>
                  <h4 class="font-medium mb-2">Service Layer</h4>
                  <p class="text-sm text-gray-400">Your containerized applications and services</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Call to Action -->
          <div class="text-center">
            <h3 class="text-xl font-semibold mb-4">Ready to Build Your Cloud?</h3>
            <p class="text-gray-300 mb-6">Join us in shaping the future of personal cloud infrastructure.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#how-it-works" variant="primary" withArrow>
                Get Started with Docker
              </Button>
              <Button href="https://github.com/brenonaraujo" variant="secondary" withArrow>
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  </div>
</template>

<script setup>
import ServiceCard from '../components/ServiceCard.vue'
import Button from '../components/ui/Button.vue'
import Section from '../components/ui/Section.vue'
import FlowLine from '../components/ui/FlowLine.vue'

const services = [
  {
    id: 'authentik',
    title: 'Identity & Access (Authentik)',
    description: 'Centralize login with SSO, MFA, and fine‑grained policies for your apps and services.',
    icon: 'checkmark',
    color: 'blue',
    learnMoreUrl: '/service?service=authentik'
  },
  {
    id: 'kong',
    title: 'API & Edge (Kong)',
    description: 'Secure and route traffic, apply auth and rate‑limits, and expose services safely to the web.',
    icon: 'bolt',
    color: 'green',
    learnMoreUrl: '/service?service=kong'
  },
  {
    id: 'docker',
    title: 'Deployments (Docker)',
    description: 'Package services as containers or Compose stacks and run them reliably on Brenon.Cloud.',
    icon: 'cube',
    color: 'cyan',
    learnMoreUrl: '/service?service=docker'
  },
  {
    id: 'uptime',
    title: 'Monitoring (Uptime Kuma)',
    description: 'Track availability and response times with alerts to your preferred channels.',
    icon: 'chart',
    color: 'green',
    learnMoreUrl: '/service?service=uptime-kuma'
  },
  {
    id: 'grafana',
    title: 'Dashboards (Grafana)',
    description: 'Visualize metrics and logs across services with reusable, shareable dashboards.',
    icon: 'settings',
    color: 'orange',
    learnMoreUrl: '/service?service=grafana'
  },
  {
    id: 'n8n',
    title: 'Automation (n8n)',
    description: 'Automate tasks with visual workflows that connect APIs, databases, and services.',
    icon: 'workflow',
    color: 'blue',
    learnMoreUrl: '/service?service=n8n'
  }
]

</script>