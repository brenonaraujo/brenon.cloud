import { apiClient } from './client'

/**
 * Services API Client
 * Handles all HTTP requests related to services
 * Following the Repository pattern for data access
 */

export class ServicesApiClient {
  /**
   * Fetch all services
   * @returns {Promise<Service[]>} List of all services
   */
  async getServices() {
    // Using mock data - replace with API call when backend is ready
    return this._getMockServices()
  }

  /**
   * Fetch a single service by ID
   * @param {string} id - Service ID
   * @returns {Promise<Service|null>} Service object or null if not found
   */
  async getServiceById(id) {
    // Using mock data - replace with API call when backend is ready
    const services = this._getMockServices()
    return services.find(s => s.id === id) || null
  }

  /**
   * Mock data service (temporary until API is ready)
   * @private
   * @returns {Service[]} Mock services data
   */
  _getMockServices() {
    return [
      {
        id: 'authentik',
        title: 'Identity & Access (Authentik)',
        shortName: 'Authentik',
        description: 'Centralize login with SSO, MFA, and fine‑grained policies for your apps and services.',
        icon: 'checkmark',
        color: 'blue',
        learnMoreUrl: '/service?service=authentik',
        image: 'https://goauthentik.io/img/icon.png',
        features: [
          'Single Sign-On (SSO) for all services',
          'Multi-Factor Authentication (MFA)',
          'OAuth2 and SAML2 provider',
          'Fine-grained access policies',
          'User self-service portal',
          'LDAP provider for legacy apps'
        ],
        useCases: [
          {
            title: 'Unified Access',
            description: 'Single login for all your cloud services with centralized user management'
          },
          {
            title: 'Enhanced Security',
            description: 'Enforce MFA and conditional access policies based on user, device, or location'
          },
          {
            title: 'Identity Provider',
            description: 'Act as OAuth2/SAML provider for modern and legacy applications'
          }
        ],
        gettingStarted: 'Authentik is already configured as the identity provider for Brenon.Cloud. Access the admin panel to manage users, groups, and applications.',
        quickStart: [
          {
            title: 'Access Admin',
            description: 'Log in to the Authentik admin interface'
          },
          {
            title: 'Configure Apps',
            description: 'Add applications and configure SSO'
          },
          {
            title: 'Manage Users',
            description: 'Create users and assign permissions'
          }
        ],
        demoUrl: 'https://authentik.brenon.cloud',
        mermaidDiagram: `graph TB
    User[User] --> Kong[Kong Gateway]
    Kong --> Auth{Authentik<br/>Authentication}
    Auth -->|Authenticated| Service[Your Service]
    Auth -->|Not Authenticated| Login[Login Page]
    Login --> Auth`
      },
      {
        id: 'kong',
        title: 'API & Edge (Kong)',
        shortName: 'Kong',
        description: 'Secure and route traffic, apply auth and rate‑limits, and expose services safely to the web.',
        icon: 'bolt',
        color: 'green',
        learnMoreUrl: '/service?service=kong',
        image: 'https://konghq.com/wp-content/uploads/2018/05/kong-logo-github-readme.png',
        features: [
          'API Gateway and reverse proxy',
          'Traffic routing and load balancing',
          'Rate limiting and throttling',
          'Authentication plugins',
          'SSL/TLS termination',
          'Request/response transformation'
        ],
        useCases: [
          {
            title: 'Edge Security',
            description: 'Protect services with authentication, rate limiting, and SSL termination'
          },
          {
            title: 'Traffic Management',
            description: 'Route requests, load balance, and implement circuit breakers'
          },
          {
            title: 'API Gateway',
            description: 'Centralized entry point for all microservices and APIs'
          }
        ],
        gettingStarted: 'Kong is the edge gateway for all Brenon.Cloud services. Configure routes, plugins, and consumers through Kong Manager.',
        quickStart: [
          {
            title: 'Open Manager',
            description: 'Access Kong Manager UI'
          },
          {
            title: 'Add Service',
            description: 'Define upstream services'
          },
          {
            title: 'Configure Route',
            description: 'Set up routing rules and plugins'
          }
        ],
        demoUrl: 'https://kong.brenon.cloud',
        mermaidDiagram: `graph LR
    Internet[Internet] --> Kong[Kong Gateway]
    Kong --> Auth[Authentik]
    Kong --> Docker[Docker Services]
    Kong --> Portainer[Portainer]
    Kong --> Grafana[Grafana]`
      },
      {
        id: 'docker',
        title: 'Deployments (Docker)',
        shortName: 'Docker',
        description: 'Package services as containers or Compose stacks and run them reliably on Brenon.Cloud.',
        icon: 'cube',
        color: 'cyan',
        learnMoreUrl: '/service?service=docker',
        image: 'https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png',
        features: [
          'Docker Swarm orchestration',
          'Container isolation and security',
          'Multi-node cluster deployment',
          'Service discovery and DNS',
          'Secrets and config management',
          'Rolling updates and rollbacks'
        ],
        useCases: [
          {
            title: 'Microservices',
            description: 'Deploy and scale containerized applications across multiple nodes'
          },
          {
            title: 'CI/CD Integration',
            description: 'Automated deployments with zero-downtime updates'
          },
          {
            title: 'Resource Optimization',
            description: 'Efficient resource utilization with container orchestration'
          }
        ],
        gettingStarted: 'Docker Swarm powers all deployments on Brenon.Cloud. Use Portainer to manage stacks or deploy via CLI.',
        quickStart: [
          {
            title: 'Write Compose',
            description: 'Create docker-compose.yml file'
          },
          {
            title: 'Deploy Stack',
            description: 'Deploy via Portainer or CLI'
          },
          {
            title: 'Scale Services',
            description: 'Adjust replicas as needed'
          }
        ],
        mermaidDiagram: `graph TB
    Compose[Docker Compose] --> Portainer[Portainer]
    Portainer --> Swarm[Docker Swarm]
    Swarm --> Node1[Node 1]
    Swarm --> Node2[Node 2]
    Swarm --> NodeN[Node N]`
      },
      {
        id: 'uptime-kuma',
        title: 'Monitoring (Uptime Kuma)',
        shortName: 'Uptime Kuma',
        description: 'Track availability and response times with alerts to your preferred channels.',
        icon: 'chart',
        color: 'green',
        learnMoreUrl: '/service?service=uptime-kuma',
        image: 'https://uptime.kuma.pet/img/icon.svg',
        features: [
          'HTTP(s), TCP, and ping monitoring',
          'Status pages (public/private)',
          'Multi-channel notifications',
          'Response time tracking',
          'SSL certificate monitoring',
          'Customizable check intervals'
        ],
        useCases: [
          {
            title: 'Service Health',
            description: 'Monitor uptime and performance of all your services'
          },
          {
            title: 'Incident Alerts',
            description: 'Get notified via Discord, Slack, email when services go down'
          },
          {
            title: 'Public Status Page',
            description: 'Share service status with users transparently'
          }
        ],
        gettingStarted: 'Uptime Kuma monitors all critical Brenon.Cloud services. View the status page or configure monitors.',
        quickStart: [
          {
            title: 'Add Monitor',
            description: 'Configure endpoint to monitor'
          },
          {
            title: 'Set Alerts',
            description: 'Configure notification channels'
          },
          {
            title: 'View Status',
            description: 'Check dashboard and status page'
          }
        ],
        demoUrl: 'https://uptime.brenon.cloud',
        mermaidDiagram: `graph LR
    Kuma[Uptime Kuma] -->|Checks| Services[Services]
    Kuma -->|Alerts| Discord[Discord]
    Kuma -->|Alerts| Email[Email]
    Services --> Status[Status Page]`
      },
      {
        id: 'grafana',
        title: 'Dashboards (Grafana)',
        shortName: 'Grafana',
        description: 'Visualize metrics and logs across services with reusable, shareable dashboards.',
        icon: 'settings',
        color: 'orange',
        learnMoreUrl: '/service?service=grafana',
        image: 'https://grafana.com/static/img/logos/grafana_logo.svg',
        features: [
          'Multi-source data visualization',
          'Custom dashboards and panels',
          'Alerting and notifications',
          'Time-series analysis',
          'Log aggregation and search',
          'Plugin ecosystem'
        ],
        useCases: [
          {
            title: 'Infrastructure Metrics',
            description: 'Visualize CPU, memory, network, and disk metrics across nodes'
          },
          {
            title: 'Application Monitoring',
            description: 'Track application performance, errors, and user metrics'
          },
          {
            title: 'Log Analysis',
            description: 'Search and analyze logs from all services in one place'
          }
        ],
        gettingStarted: 'Grafana provides real-time insights into Brenon.Cloud infrastructure and applications.',
        quickStart: [
          {
            title: 'Explore Dashboards',
            description: 'View pre-built dashboards'
          },
          {
            title: 'Create Panels',
            description: 'Build custom visualizations'
          },
          {
            title: 'Set Alerts',
            description: 'Configure threshold alerts'
          }
        ],
        demoUrl: 'https://grafana.brenon.cloud',
        mermaidDiagram: `graph TB
    Prometheus[Prometheus] --> Grafana[Grafana]
    Loki[Loki] --> Grafana
    Services[Services] --> Prometheus
    Services --> Loki
    Grafana --> Dashboards[Dashboards]`
      },
      {
        id: 'n8n',
        title: 'Automation (n8n)',
        shortName: 'n8n',
        description: 'Automate tasks with visual workflows that connect APIs, databases, and services.',
        icon: 'workflow',
        color: 'blue',
        learnMoreUrl: '/service?service=n8n',
        image: 'https://n8n.io/favicon.ico',
        features: [
          'Visual workflow editor',
          '200+ integrations',
          'Scheduled and webhook triggers',
          'Conditional logic and branching',
          'Error handling and retries',
          'Self-hosted automation'
        ],
        useCases: [
          {
            title: 'Service Integration',
            description: 'Connect different services and automate data flows'
          },
          {
            title: 'Scheduled Tasks',
            description: 'Run backups, reports, and maintenance tasks automatically'
          },
          {
            title: 'Event-Driven Actions',
            description: 'Respond to webhooks and trigger automated workflows'
          }
        ],
        gettingStarted: 'n8n enables powerful automation across Brenon.Cloud services without writing code.',
        quickStart: [
          {
            title: 'Create Workflow',
            description: 'Use visual editor to build flows'
          },
          {
            title: 'Add Nodes',
            description: 'Connect services and add logic'
          },
          {
            title: 'Activate & Test',
            description: 'Enable workflow and monitor runs'
          }
        ],
        demoUrl: 'https://n8n.brenon.cloud',
        mermaidDiagram: `graph LR
    Trigger[Webhook/Schedule] --> n8n[n8n Workflow]
    n8n --> API[External APIs]
    n8n --> DB[Databases]
    n8n --> Services[Brenon Services]
    n8n --> Notify[Notifications]`
      }
    ]
  }
}

// Export singleton instance
export const servicesApi = new ServicesApiClient()
