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
        title: 'Authentik - Identity Provider',
        shortName: 'Authentik',
        description: 'The security foundation block that enables zero-trust architecture across your entire cloud-native stack, eliminating the complexity and cost of managing separate authentication systems',
        icon: 'ShieldCheckIcon',
        color: 'blue',
        learnMoreUrl: '/service?service=authentik',
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
        mermaidDiagram: `
graph TD
    A[Users] --> B[Authentik Identity Provider]
    B --> C[Kong Gateway]
    B --> D[Grafana Dashboards]
    B --> E[Portainer Management]
    B --> F[n8n Workflows]
    
    C --> G[Golang APIs]
    C --> H[Python Services]
    C --> I[AI Agents]
    
    style B fill:#9333ea,stroke:#7c3aed,color:#fff
    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style C fill:#10b981,stroke:#059669,color:#fff
    style D fill:#f59e0b,stroke:#d97706,color:#fff
    style E fill:#ef4444,stroke:#dc2626,color:#fff
    style F fill:#8b5cf6,stroke:#7c3aed,color:#fff
`,
        demoUrl: 'https://auth.brenon.cloud'
      },
      {
        id: 'kong',
        title: 'Kong API Gateway',
        shortName: 'Kong',
        description: 'The networking building block that transforms simple containerized services into enterprise-grade APIs with routing, security, and observability - no expensive API management platforms required',
        icon: 'ServerIcon',
        color: 'green',
        learnMoreUrl: '/service?service=kong',
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
        mermaidDiagram: `
graph LR
    A[Internet Traffic] --> B[Kong Gateway]
    
    B --> C[Rate Limiting]
    B --> D[Authentication]
    B --> E[Load Balancing]
    
    C --> F[Golang APIs]
    D --> G[Python Services]
    E --> H[Static Sites]
    
    F --> I[User Service]
    F --> J[Order Service]
    G --> K[AI Models]
    G --> L[Data APIs]
    
    M[Authentik] --> D
    N[Grafana] --> B
    O[Uptime Kuma] --> B
    
    style B fill:#00d4aa,stroke:#00b894,color:#fff
    style A fill:#636e72,stroke:#2d3436,color:#fff
    style M fill:#9333ea,stroke:#7c3aed,color:#fff
    style N fill:#f59e0b,stroke:#d97706,color:#fff
    style O fill:#ef4444,stroke:#dc2626,color:#fff
`,
        demoUrl: 'https://api.brenon.cloud'
      },
      {
        id: 'docker',
        title: 'Docker Swarm Orchestration',
        shortName: 'Docker',
        description: 'The infrastructure building block that provides enterprise-grade container orchestration using commodity hardware, delivering 90% cost savings compared to managed Kubernetes platforms',
        icon: 'CubeIcon',
        color: 'cyan',
        learnMoreUrl: '/service?service=docker',
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
        mermaidDiagram: `
graph TB
    A[Developer] --> B[Git Push]
    B --> C[GitHub Actions]
    C --> D[Docker Build]
    D --> E[Container Registry]
    
    E --> F[Docker Swarm Manager]
    F --> G[Node 1 - Mini PC]
    F --> H[Node 2 - Mini PC]
    
    G --> I[Golang Service<br/>~50MB RAM]
    G --> J[Python API<br/>~100MB RAM]
    H --> K[Web App<br/>~30MB RAM]
    H --> L[Database<br/>~200MB RAM]
    
    M[Portainer] --> F
    N[Kong] --> I
    N --> J
    N --> K
    
    O[Grafana] --> G
    O --> H
    
    click M "?service=portainer"
    click N "?service=kong"
    click O "?service=grafana"
    
    style F fill:#0ea5e9,stroke:#0284c7,color:#fff
    style G fill:#22c55e,stroke:#16a34a,color:#fff
    style H fill:#22c55e,stroke:#16a34a,color:#fff
    style M fill:#8b5cf6,stroke:#7c3aed,color:#fff,stroke-width:3px
    style N fill:#00d4aa,stroke:#00b894,color:#fff,stroke-width:3px
    style O fill:#f59e0b,stroke:#d97706,color:#fff,stroke-width:3px
`,
        demoUrl: 'http://portainer.brenon.cloud'
      },
      {
        id: 'uptime-kuma',
        title: 'Uptime Kuma - Service Monitor',
        shortName: 'Uptime Kuma',
        description: 'The reliability building block that provides enterprise-level monitoring and alerting without the complexity and cost of traditional APM solutions, keeping your services available 99.9% of the time',
        icon: 'ChartBarIcon',
        color: 'green',
        learnMoreUrl: '/service?service=uptime-kuma',
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
        mermaidDiagram: `
graph TB
    subgraph "Monitoring Engine"
        uptime[Uptime Kuma]
        checks[Health Checks]
        status[Status Tracker]
    end
    
    subgraph "Service Targets"
        kong[Kong Gateway]
        auth[Authentik Login]
        portainer[Portainer UI]
        grafana[Grafana Dashboards]
        n8n[n8n Workflows]
    end
    
    subgraph "Alert Channels"
        discord[Discord Bot]
        telegram[Telegram Bot]
        email[Email Alerts]
        webhook[Webhooks]
    end
    
    subgraph "Public Interface"
        statuspage[Public Status Page]
        api[Status API]
        widget[Embed Widget]
    end
    
    uptime --> checks
    checks -->|HTTP/TCP| kong
    checks -->|HTTPS| auth
    checks -->|API Health| portainer
    checks -->|Endpoint Check| grafana
    checks -->|Workflow Status| n8n
    
    checks --> status
    status -->|Service Down| discord
    status -->|Alert Fired| telegram
    status -->|Critical Issue| email
    status -->|Trigger n8n| webhook
    
    status --> statuspage
    status --> api
    statuspage --> widget
    
    kong -.->|Response Time| uptime
    auth -.->|SSL Cert Status| uptime
    
    classDef monitor fill:#4ade80,stroke:#22c55e,stroke-width:2px
    classDef targets fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px
    classDef alerts fill:#ef4444,stroke:#dc2626,stroke-width:2px
    classDef public fill:#f59e0b,stroke:#d97706,stroke-width:2px
    
    class uptime,checks,status monitor
    class kong,auth,portainer,grafana,n8n targets
    class discord,telegram,email,webhook alerts
    class statuspage,api,widget public
    `,
        demoUrl: 'https://uptime.brenon.cloud'
      },
      {
        id: 'grafana',
        title: 'Grafana - Observability Platform',
        shortName: 'Grafana',
        description: 'The observability building block that transforms your infrastructure into a data-driven operation, providing enterprise-grade analytics at a fraction of the cost of commercial monitoring solutions',
        icon: 'ChartLineIcon',
        color: 'orange',
        learnMoreUrl: '/service?service=grafana',
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
        mermaidDiagram: `
graph TB
    subgraph "Visualization Layer"
        grafana[Grafana Dashboards]
        panels[Custom Panels]
        alerts[Alert Manager]
    end
    
    subgraph "Data Sources"
        prometheus[Prometheus Metrics]
        docker[Docker Stats]
        kong_metrics[Kong Analytics]
        uptime_data[Uptime Kuma Data]
    end
    
    subgraph "Metric Collectors"
        node_exporter[Node Exporter]
        cadvisor[cAdvisor]
        app_metrics[App Metrics]
    end
    
    subgraph "Alert Channels"
        webhook_alerts[n8n Webhooks]
        discord_notify[Discord]
        email_alert[Email]
        telegram_bot[Telegram Bot]
    end
    
    subgraph "Infrastructure"
        mini_pc1[Mini PC 1]
        mini_pc2[Mini PC 2]
        mini_pc3[Mini PC 3]
        containers[Docker Containers]
    end
    
    mini_pc1 --> node_exporter
    mini_pc2 --> node_exporter
    mini_pc3 --> node_exporter
    containers --> cadvisor
    
    node_exporter --> prometheus
    cadvisor --> prometheus
    app_metrics --> prometheus
    docker --> prometheus
    kong_metrics --> prometheus
    uptime_data --> prometheus
    
    prometheus --> grafana
    grafana --> panels
    grafana --> alerts
    
    alerts --> webhook_alerts
    alerts --> discord_notify
    alerts --> email_alert
    alerts --> telegram_bot
    
    webhook_alerts -.->|Auto Recovery| containers
    
    classDef visualization fill:#4ade80,stroke:#22c55e,stroke-width:2px
    classDef data fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px
    classDef collectors fill:#f59e0b,stroke:#d97706,stroke-width:2px
    classDef alerts fill:#ef4444,stroke:#dc2626,stroke-width:2px
    classDef infra fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px
    
    class grafana,panels,alerts visualization
    class prometheus,docker,kong_metrics,uptime_data data
    class node_exporter,cadvisor,app_metrics collectors
    class webhook_alerts,discord_notify,email_alert,telegram_bot alerts
    class mini_pc1,mini_pc2,mini_pc3,containers infra
    `,
        demoUrl: 'https://grafana.brenon.cloud'
      },
      {
        id: 'n8n',
        title: 'n8n - Automation Engine',
        shortName: 'n8n',
        description: 'The automation building block that connects all your services with AI-powered workflows, enabling intelligent operations and two-way communication channels that would cost thousands in enterprise integration platforms',
        icon: 'CogIcon',
        color: 'blue',
        learnMoreUrl: '/service?service=n8n',
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
        mermaidDiagram: `
graph TB
    subgraph "Automation Hub"
        n8n[n8n Workflows]
        triggers[Event Triggers]
        actions[Actions & APIs]
    end
    
    subgraph "External Sources"
        grafana[Grafana Alerts]
        webhook[HTTP Webhooks]
        schedule[Scheduled Tasks]
        telegram[Telegram Bot]
    end
    
    subgraph "Target Systems"
        portainer[Portainer API]
        kong[Kong Gateway]
        auth[Authentik Users]
        notification[WhatsApp/Discord]
    end
    
    grafana -->|Alert Fired| triggers
    webhook -->|HTTP Request| triggers
    schedule -->|Cron Job| triggers
    telegram -->|Bot Command| triggers
    
    triggers --> n8n
    n8n --> actions
    
    actions -->|Deploy Services| portainer
    actions -->|Route Traffic| kong
    actions -->|Manage Users| auth
    actions -->|Send Alerts| notification
    
    n8n -.->|Monitor Status| grafana
    n8n -.->|Log Activities| portainer
    
    classDef automation fill:#4ade80,stroke:#22c55e,stroke-width:2px
    classDef external fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px
    classDef target fill:#f59e0b,stroke:#d97706,stroke-width:2px
    
    class n8n,triggers,actions automation
    class grafana,webhook,schedule,telegram external
    class portainer,kong,auth,notification target
    `,
        demoUrl: 'https://n8n.brenon.cloud'
      },
      {
        id: 'portainer',
        title: 'Portainer - Container Management',
        shortName: 'Portainer',
        description: 'The management building block that democratizes container operations, allowing any developer to deploy and scale cloud-native applications without DevOps expertise or expensive orchestration training',
        icon: 'ServerIcon',
        color: 'purple',
        learnMoreUrl: '/service?service=portainer',
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
        mermaidDiagram: `
graph TB
    subgraph "Management Interface"
        portainer[Portainer Web UI]
        templates[Service Templates]
        stacks[Stack Manager]
    end
    
    subgraph "Docker Swarm Cluster"
        manager[Manager Node]
        worker1[Worker Node 1]
        worker2[Worker Node 2]
        worker3[Worker Node 3]
    end
    
    subgraph "Container Services"
        webapp[Web Apps]
        api[API Services]
        db[Databases]
        cache[Cache Services]
    end
    
    subgraph "Integration Layer"
        kong[Kong Gateway]
        auth[Authentik SSO]
        monitor[Grafana Monitor]
    end
    
    Developer --> portainer
    portainer --> templates
    templates --> stacks
    
    stacks -->|Deploy| manager
    manager -->|Orchestrate| worker1
    manager -->|Orchestrate| worker2
    manager -->|Orchestrate| worker3
    
    worker1 --> webapp
    worker2 --> api
    worker3 --> db
    worker1 --> cache
    
    webapp --> kong
    api --> kong
    webapp -.->|Metrics| monitor
    api -.->|Metrics| monitor
    
    portainer -.->|SSO Login| auth
    stacks -.->|Auto-register| kong
    
    classDef management fill:#4ade80,stroke:#22c55e,stroke-width:2px
    classDef cluster fill:#3b82f6,stroke:#1d4ed8,stroke-width:2px
    classDef services fill:#f59e0b,stroke:#d97706,stroke-width:2px
    classDef integration fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px
    
    class portainer,templates,stacks management
    class manager,worker1,worker2,worker3 cluster
    class webapp,api,db,cache services
    class kong,auth,monitor integration
    `,
        demoUrl: 'http://portainer.brenon.cloud'
      }
    ]
  }
}

// Export singleton instance
export const servicesApi = new ServicesApiClient()
