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
        category: 'platform',
        title: {
          en: 'Authentik - Identity Provider',
          pt: 'Authentik - Provedor de Identidade'
        },
        shortName: {
          en: 'Authentik',
          pt: 'Authentik'
        },
        description: {
          en: 'The security foundation block that enables zero-trust architecture across your entire cloud-native stack, eliminating the complexity and cost of managing separate authentication systems',
          pt: 'O bloco de fundação de segurança que permite arquitetura de confiança zero em toda sua stack nativa de nuvem, eliminando a complexidade e custo de gerenciar sistemas de autenticação separados'
        },
        icon: 'ShieldCheckIcon',
        color: 'blue',
        learnMoreUrl: '/service?service=authentik',
        image: 'https://avatars.githubusercontent.com/u/82976448?v=4',
        features: [
          {
            en: 'Single Sign-On (SSO) across all applications',
            pt: 'Single Sign-On (SSO) em todas as aplicações'
          },
          {
            en: 'Multi-Factor Authentication (MFA) with TOTP, WebAuthn',
            pt: 'Autenticação Multi-Fator (MFA) com TOTP, WebAuthn'
          },
          {
            en: 'Fine-grained access policies and permissions',
            pt: 'Políticas de acesso e permissões granulares'
          },
          {
            en: 'User management with groups and roles',
            pt: 'Gerenciamento de usuários com grupos e papéis'
          },
          {
            en: 'OAuth2, SAML, and OpenID Connect support',
            pt: 'Suporte para OAuth2, SAML e OpenID Connect'
          },
          {
            en: 'LDAP integration for enterprise environments',
            pt: 'Integração LDAP para ambientes empresariais'
          },
          {
            en: 'Custom branding and theming',
            pt: 'Marca personalizada e temas'
          },
          {
            en: 'Audit logs and security monitoring',
            pt: 'Logs de auditoria e monitoramento de segurança'
          }
        ],
        useCases: [
          {
            title: {
              en: 'Zero-Trust Security Architecture',
              pt: 'Arquitetura de Segurança Zero-Trust'
            },
            description: {
              en: 'Every Golang microservice, Python API, and web application deployed on Brenon.Cloud is protected by Authentik. Users authenticate once and gain secure access to all authorized services without managing multiple credentials.',
              pt: 'Cada microsserviço Golang, API Python e aplicação web implantada no Brenon.Cloud é protegida pelo Authentik. Os usuários se autenticam uma vez e obtêm acesso seguro a todos os serviços autorizados sem gerenciar múltiplas credenciais.'
            }
          },
          {
            title: {
              en: 'Developer Team Management',
              pt: 'Gerenciamento de Equipe de Desenvolvedores'
            },
            description: {
              en: 'Create developer groups with specific permissions - frontend teams access monitoring dashboards, DevOps teams manage containers via Portainer, and business teams view analytics in Grafana, all through role-based access control.',
              pt: 'Crie grupos de desenvolvedores com permissões específicas - equipes frontend acessam dashboards de monitoramento, equipes DevOps gerenciam contêineres via Portainer, e equipes de negócios visualizam análises no Grafana, tudo através de controle de acesso baseado em papéis.'
            }
          },
          {
            title: {
              en: 'AI Agent Authentication',
              pt: 'Autenticação de Agentes IA'
            },
            description: {
              en: 'Secure your AI bots and automation agents with service accounts in Authentik. N8n workflows, Discord bots, and Telegram integrations authenticate seamlessly using OAuth2 tokens, ensuring secure two-way communication.',
              pt: 'Proteja seus bots de IA e agentes de automação com contas de serviço no Authentik. Workflows N8n, bots Discord e integrações Telegram se autenticam perfeitamente usando tokens OAuth2, garantindo comunicação bidirecional segura.'
            }
          }
        ],
        integrations: [
          { 
            name: 'Kong Gateway', 
            description: {
              en: 'Authentication enforcement at API level',
              pt: 'Aplicação de autenticação no nível da API'
            }
          },
          { 
            name: 'Grafana', 
            description: {
              en: 'SSO login for dashboard access',
              pt: 'Login SSO para acesso aos dashboards'
            }
          },
          { 
            name: 'Portainer', 
            description: {
              en: 'Container management authentication',
              pt: 'Autenticação para gerenciamento de contêineres'
            }
          },
          { 
            name: 'n8n', 
            description: {
              en: 'Workflow automation security',
              pt: 'Segurança de automação de workflows'
            }
          }
        ],
        quickStart: [
          { 
            title: {
              en: 'Access Admin Panel',
              pt: 'Acessar Painel Administrativo'
            }, 
            description: {
              en: 'Login to Authentik admin interface',
              pt: 'Faça login na interface administrativa do Authentik'
            }
          },
          { 
            title: {
              en: 'Configure Application',
              pt: 'Configurar Aplicação'
            }, 
            description: {
              en: 'Add your service as a new application',
              pt: 'Adicione seu serviço como uma nova aplicação'
            }
          },
          { 
            title: {
              en: 'Test SSO',
              pt: 'Testar SSO'
            }, 
            description: {
              en: 'Verify single sign-on functionality',
              pt: 'Verifique a funcionalidade de single sign-on'
            }
          }
        ],
        gettingStarted: {
          en: 'Authentik is your security foundation - deploy it once, secure everything forever. Like a LEGO baseplate, it provides the stable foundation that all other services connect to. Every new service you deploy automatically inherits enterprise-grade security without additional configuration. <a href="https://auth.brenon.cloud" class="text-blue-400 hover:underline">Start building your secure cloud ecosystem here</a>.',
          pt: 'Authentik é sua fundação de segurança - implante uma vez, proteja tudo para sempre. Como uma base LEGO, fornece a fundação estável que todos os outros serviços se conectam. Cada novo serviço que você implanta herda automaticamente segurança de nível empresarial sem configuração adicional. <a href="https://auth.brenon.cloud" class="text-blue-400 hover:underline">Comece a construir seu ecossistema de nuvem seguro aqui</a>.'
        },
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
        category: 'platform',
        title: {
          en: 'Kong API Gateway',
          pt: 'Kong API Gateway'
        },
        shortName: {
          en: 'Kong',
          pt: 'Kong'
        },
        description: {
          en: 'The networking building block that transforms simple containerized services into enterprise-grade APIs with routing, security, and observability - no expensive API management platforms required',
          pt: 'O bloco de construção de rede que transforma serviços containerizados simples em APIs de nível empresarial com roteamento, segurança e observabilidade - sem necessidade de plataformas caras de gerenciamento de API'
        },
        icon: 'ServerIcon',
        color: 'green',
        learnMoreUrl: '/service?service=kong',
        image: 'https://images.seeklogo.com/logo-png/39/2/kong-logo-png_seeklogo-394595.png',
        features: [
          {
            en: 'Intelligent API routing and load balancing',
            pt: 'Roteamento inteligente de API e balanceamento de carga'
          },
          {
            en: 'Authentication and authorization plugins',
            pt: 'Plugins de autenticação e autorização'
          },
          {
            en: 'Rate limiting and traffic control',
            pt: 'Limitação de taxa e controle de tráfego'
          },
          {
            en: 'Request/response transformation',
            pt: 'Transformação de requisições/respostas'
          },
          {
            en: 'API analytics and monitoring',
            pt: 'Análise e monitoramento de API'
          },
          {
            en: 'SSL termination and security',
            pt: 'Terminação SSL e segurança'
          },
          {
            en: 'Plugin ecosystem with 50+ plugins',
            pt: 'Ecossistema de plugins com mais de 50 plugins'
          },
          {
            en: 'Service discovery and health checks',
            pt: 'Descoberta de serviços e verificações de saúde'
          }
        ],
        useCases: [
          {
            title: {
              en: 'Golang Microservices Gateway',
              pt: 'Gateway de Microsserviços Golang'
            },
            description: {
              en: 'Deploy containerized Golang REST APIs behind Kong. Automatically route /api/users to your user service, /api/orders to order service, with built-in load balancing across multiple container replicas and zero-downtime deployments.',
              pt: 'Implante APIs REST Golang containerizadas atrás do Kong. Roteie automaticamente /api/users para seu serviço de usuário, /api/orders para serviço de pedidos, com balanceamento de carga integrado entre múltiplas réplicas de contêiner e implantações sem tempo de inatividade.'
            }
          },
          {
            title: {
              en: 'Authentication & Authorization Layer',
              pt: 'Camada de Autenticação e Autorização'
            },
            description: {
              en: 'Kong applies the Authentik OIDC plugin to every API endpoint. Users authenticate once through Authentik, Kong validates JWT tokens, and applies role-based routing - admins access admin APIs, users access public APIs.',
              pt: 'Kong aplica o plugin OIDC do Authentik a cada endpoint da API. Os usuários se autenticam uma vez através do Authentik, Kong valida tokens JWT e aplica roteamento baseado em papéis - administradores acessam APIs de admin, usuários acessam APIs públicas.'
            }
          },
          {
            title: {
              en: 'AI & Bot API Management',
              pt: 'Gerenciamento de API de IA e Bots'
            },
            description: {
              en: 'Rate limit AI model APIs, apply different quotas for premium vs free users, and route WhatsApp/Telegram bot webhooks to appropriate n8n workflows. Kong transforms requests and responses, ensuring consistent API contracts.',
              pt: 'Limite a taxa de APIs de modelos de IA, aplique quotas diferentes para usuários premium vs gratuitos, e roteie webhooks de bots WhatsApp/Telegram para workflows n8n apropriados. Kong transforma requisições e respostas, garantindo contratos de API consistentes.'
            }
          }
        ],
        integrations: [
          { 
            name: 'Authentik SSO', 
            description: {
              en: 'Integrate with identity provider for auth',
              pt: 'Integrar com provedor de identidade para autenticação'
            }
          },
          { 
            name: 'Grafana Metrics', 
            description: {
              en: 'Monitor API performance and usage',
              pt: 'Monitorar performance e uso da API'
            }
          },
          { 
            name: 'Docker Services', 
            description: {
              en: 'Route to containerized applications',
              pt: 'Rotear para aplicações containerizadas'
            }
          },
          { 
            name: 'Uptime Monitoring', 
            description: {
              en: 'Health checks and status monitoring',
              pt: 'Verificações de saúde e monitoramento de status'
            }
          }
        ],
        quickStart: [
          { 
            title: {
              en: 'Define Service',
              pt: 'Definir Serviço'
            }, 
            description: {
              en: 'Register your backend service in Kong',
              pt: 'Registre seu serviço backend no Kong'
            }
          },
          { 
            title: {
              en: 'Create Route',
              pt: 'Criar Rota'
            }, 
            description: {
              en: 'Map URLs to your service endpoints',
              pt: 'Mapear URLs para seus endpoints de serviço'
            }
          },
          { 
            title: {
              en: 'Add Plugins',
              pt: 'Adicionar Plugins'
            }, 
            description: {
              en: 'Enable auth, rate limiting, or other features',
              pt: 'Habilitar autenticação, limitação de taxa ou outros recursos'
            }
          }
        ],
        gettingStarted: {
          en: 'Kong is your networking Swiss Army knife - it transforms any simple HTTP service into a professional API. Like LEGO Technic beams that connect and strengthen your build, Kong connects your services with enterprise features. Deploy a Golang API container, point Kong to it, add the Authentik plugin, and instantly have a secure, rate-limited, monitored API. <a href="https://api.brenon.cloud" class="text-blue-400 hover:underline">See the magic in action</a>.',
          pt: 'Kong é seu canivete suíço de rede - transforma qualquer serviço HTTP simples em uma API profissional. Como vigas LEGO Technic que conectam e fortalecem sua construção, Kong conecta seus serviços com recursos empresariais. Implante um contêiner de API Golang, aponte Kong para ele, adicione o plugin Authentik, e instantaneamente tenha uma API segura, com limitação de taxa e monitorada. <a href="https://api.brenon.cloud" class="text-blue-400 hover:underline">Veja a mágica em ação</a>.'
        },
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
        category: 'platform',
        title: {
          en: 'Docker Swarm Orchestration',
          pt: 'Orquestração Docker Swarm'
        },
        shortName: {
          en: 'Docker',
          pt: 'Docker'
        },
        description: {
          en: 'The infrastructure building block: a real 3-node Docker Swarm at home (Server 1 manager + Server 2/3 workers) — 18 CPU / 92 GB RAM, NVIDIA RTX 3080 + RTX 5080, 20+ stacks, rolling updates, Portainer ops, and Grafana observability without a managed K8s bill',
          pt: 'O bloco de infraestrutura: um Docker Swarm real de 3 nós em casa (Server 1 manager + workers Server 2/3) — 18 CPU / 92 GB RAM, NVIDIA RTX 3080 + RTX 5080, 20+ stacks, rolling updates, operação via Portainer e observabilidade com Grafana sem conta de K8s gerenciado'
        },
        icon: 'CubeIcon',
        color: 'cyan',
        learnMoreUrl: '/service?service=docker',
        image: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/97_Docker_logo_logos-512.png',
        features: [
          {
            en: 'Docker Swarm cluster orchestration',
            pt: 'Orquestração de cluster Docker Swarm'
          },
          {
            en: 'Compose v3 stack deployments',
            pt: 'Implantações de stack Compose v3'
          },
          {
            en: 'Rolling updates with zero downtime',
            pt: 'Atualizações contínuas com zero tempo de inatividade'
          },
          {
            en: 'Service scaling and load balancing',
            pt: 'Dimensionamento de serviços e balanceamento de carga'
          },
          {
            en: 'Health checks and auto-recovery',
            pt: 'Verificações de saúde e recuperação automática'
          },
          {
            en: 'Secrets and config management',
            pt: 'Gerenciamento de segredos e configurações'
          },
          {
            en: 'Multi-node high availability',
            pt: 'Alta disponibilidade multi-nó'
          },
          {
            en: 'Resource constraints and limits',
            pt: 'Restrições e limites de recursos'
          }
        ],
        useCases: [
          {
            title: {
              en: 'Cloud-Native Golang Deployments',
              pt: 'Implantações Golang Cloud-Native'
            },
            description: {
              en: 'Build multi-stage Docker images for Golang services with scratch base images (2-10MB final size). Deploy via docker-compose stacks with health checks, resource limits, and automatic restarts. Services auto-register with Kong for instant API access.',
              pt: 'Construa imagens Docker multi-estágio para serviços Golang com imagens base scratch (tamanho final de 2-10MB). Implante via stacks docker-compose com verificações de saúde, limites de recursos e reinicializações automáticas. Serviços se auto-registram com Kong para acesso instantâneo à API.'
            }
          },
          {
            title: {
              en: 'Cost-Efficient Scaling Strategy',
              pt: 'Estratégia de Dimensionamento Eficiente'
            },
            description: {
              en: 'Run dozens of containers across 3 nodes (18 CPU / 92.2 GB RAM pooled) plus two NVIDIA GPUs (RTX 3080 and RTX 5080) for local AI and other GPU workloads. Swarm schedules stacks across Server 1–3; Portainer shows live service health, volumes, and rolling updates, while Grafana tracks metrics.',
              pt: 'Rode dezenas de containers em 3 nós (18 CPU / 92,2 GB RAM no pool) mais duas GPUs NVIDIA (RTX 3080 e RTX 5080) para IA local e outros workloads de GPU. O Swarm agenda stacks entre Server 1–3; o Portainer mostra saúde dos serviços, volumes e rolling updates, e o Grafana acompanha as métricas.',
            }
          },
          {
            title: {
              en: 'Development-to-Production Pipeline',
              pt: 'Pipeline de Desenvolvimento para Produção'
            },
            description: {
              en: 'Developers push to Git, GitHub Actions builds containers, Portainer deploys to staging environment for testing, then promotes to production with rolling updates. Zero infrastructure management overhead.',
              pt: 'Desenvolvedores fazem push para Git, GitHub Actions constrói contêineres, Portainer implanta no ambiente de staging para testes, depois promove para produção com atualizações contínuas. Zero overhead de gerenciamento de infraestrutura.'
            }
          }
        ],
        integrations: [
          { 
            name: 'Portainer UI', 
            description: {
              en: 'Visual management of containers and stacks',
              pt: 'Gerenciamento visual de contêineres e stacks'
            }
          },
          { 
            name: 'Kong Routing', 
            description: {
              en: 'Automatic service discovery and routing',
              pt: 'Descoberta automática de serviços e roteamento'
            }
          },
          { 
            name: 'Grafana Monitoring', 
            description: {
              en: 'Container metrics and performance data',
              pt: 'Métricas de contêineres e dados de performance'
            }
          },
          { 
            name: 'Authentik Security', 
            description: {
              en: 'Secure container access and authentication',
              pt: 'Acesso seguro a contêineres e autenticação'
            }
          }
        ],
        quickStart: [
          { 
            title: {
              en: 'Create Stack',
              pt: 'Criar Stack'
            }, 
            description: {
              en: 'Define services in docker-compose.yml',
              pt: 'Defina serviços no docker-compose.yml'
            }
          },
          { 
            title: {
              en: 'Deploy Stack',
              pt: 'Implantar Stack'
            }, 
            description: {
              en: 'Launch your application stack on the cluster',
              pt: 'Lance sua stack de aplicação no cluster'
            }
          },
          { 
            title: {
              en: 'Monitor Health',
              pt: 'Monitorar Saúde'
            }, 
            description: {
              en: 'Check service status and performance',
              pt: 'Verifique status e performance dos serviços'
            }
          }
        ],
        gettingStarted: {
          en: 'Deploy your applications as Docker containers or Compose stacks. Use our Portainer interface to manage deployments, or deploy directly via Docker CLI. All services run on our multi-node Swarm cluster for high availability.',
          pt: 'Implante suas aplicações como contêineres Docker ou stacks Compose. Use nossa interface Portainer para gerenciar implantações, ou implante diretamente via Docker CLI. Todos os serviços executam em nosso cluster Swarm multi-nó para alta disponibilidade.'
        },
        mermaidDiagram: `
graph TB
    A[Developer] --> B[Git Push]
    B --> C[GitHub Actions]
    C --> D[Docker Build]
    D --> E[Container Registry]
    
    E --> F[Docker Swarm Manager<br/>Server 1]
    F --> G[Server 1 manager<br/>4 CPU / 16.7 GB]
    F --> H[Server 2 worker<br/>12 CPU / 67.4 GB]
    F --> P[Server 3 worker<br/>2 CPU / 8.1 GB]
    
    G --> I[Control plane + stacks]
    H --> J[Heavy workloads]
    P --> K[Edge / light services]
    H --> L[Databases + apps]
    
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
        category: 'platform',
        title: {
          en: 'Uptime Kuma - Service Monitor',
          pt: 'Uptime Kuma - Monitor de Serviços'
        },
        shortName: {
          en: 'Uptime Kuma',
          pt: 'Uptime Kuma'
        },
        description: {
          en: 'The reliability building block that provides enterprise-level monitoring and alerting without the complexity and cost of traditional APM solutions, keeping your services available 99.9% of the time',
          pt: 'O bloco de construção de confiabilidade que fornece monitoramento e alertas de nível empresarial sem a complexidade e custo de soluções APM tradicionais, mantendo seus serviços disponíveis 99,9% do tempo'
        },
        icon: 'ChartBarIcon',
        color: 'green',
        learnMoreUrl: '/service?service=uptime-kuma',
        image: 'https://uptimekuma.org/wp-content/uploads/2025/01/Uptime-Kuma-Logo.png',
        features: [
          {
            en: 'HTTP/HTTPS endpoint monitoring',
            pt: 'Monitoramento de endpoints HTTP/HTTPS'
          },
          {
            en: 'TCP port and ping monitoring',
            pt: 'Monitoramento de portas TCP e ping'
          },
          {
            en: 'SSL certificate expiration tracking',
            pt: 'Rastreamento de expiração de certificados SSL'
          },
          {
            en: 'Custom status pages',
            pt: 'Páginas de status personalizadas'
          },
          {
            en: 'Multi-channel notifications (Discord, Slack, Email)',
            pt: 'Notificações multi-canal (Discord, Slack, Email)'
          },
          {
            en: 'Response time tracking and charts',
            pt: 'Rastreamento de tempo de resposta e gráficos'
          },
          {
            en: 'Maintenance windows scheduling',
            pt: 'Agendamento de janelas de manutenção'
          },
          {
            en: 'Public status page sharing',
            pt: 'Compartilhamento de páginas de status públicas'
          }
        ],
        useCases: [
          {
            title: {
              en: 'Proactive Infrastructure Monitoring',
              pt: 'Monitoramento Proativo de Infraestrutura'
            },
            description: {
              en: 'Monitor all Golang APIs, Python services, and web applications with sub-second response time tracking. Uptime Kuma checks every endpoint through Kong Gateway, detecting issues before users notice them.',
              pt: 'Monitore todas as APIs Golang, serviços Python e aplicações web com rastreamento de tempo de resposta sub-segundo. Uptime Kuma verifica cada endpoint através do Kong Gateway, detectando problemas antes que os usuários os notem.'
            }
          },
          {
            title: {
              en: 'Intelligent Alert Integration',
              pt: 'Integração Inteligente de Alertas'
            },
            description: {
              en: 'When services go down, Uptime Kuma triggers n8n workflows that analyze the issue, check related services, and send contextual alerts to Discord, Telegram, or WhatsApp with automated recovery suggestions and status updates.',
              pt: 'Quando serviços ficam fora do ar, Uptime Kuma aciona workflows n8n que analisam o problema, verificam serviços relacionados e enviam alertas contextuais para Discord, Telegram ou WhatsApp com sugestões de recuperação automatizadas e atualizações de status.'
            }
          },
          {
            title: {
              en: 'Transparent Service Status',
              pt: 'Status de Serviços Transparente'
            },
            description: {
              en: 'Public status page at status.brenon.cloud shows real-time availability of all services. Users can subscribe to updates via Telegram bot, and AI agents can query status programmatically to provide intelligent support responses.',
              pt: 'Página de status público em status.brenon.cloud mostra disponibilidade em tempo real de todos os serviços. Usuários podem se inscrever para atualizações via bot Telegram, e agentes IA podem consultar status programaticamente para fornecer respostas de suporte inteligentes.'
            }
          }
        ],
        integrations: [
          { 
            name: 'Kong Gateway', 
            description: {
              en: 'Monitor API gateway health and performance',
              pt: 'Monitorar saúde e performance do gateway de API'
            }
          },
          { 
            name: 'Docker Services', 
            description: {
              en: 'Track container and application uptime',
              pt: 'Rastrear tempo de atividade de contêineres e aplicações'
            }
          },
          { 
            name: 'Grafana Alerts', 
            description: {
              en: 'Visualize monitoring data in dashboards',
              pt: 'Visualizar dados de monitoramento em dashboards'
            }
          },
          { 
            name: 'n8n Automation', 
            description: {
              en: 'Trigger workflows based on service status',
              pt: 'Acionar workflows baseados no status do serviço'
            }
          }
        ],
        quickStart: [
          { 
            title: {
              en: 'Add Monitor',
              pt: 'Adicionar Monitor'
            }, 
            description: {
              en: 'Configure monitoring for your service endpoint',
              pt: 'Configure monitoramento para seu endpoint de serviço'
            }
          },
          { 
            title: {
              en: 'Set Alerts',
              pt: 'Configurar Alertas'
            }, 
            description: {
              en: 'Configure notification channels and thresholds',
              pt: 'Configure canais de notificação e limites'
            }
          },
          { 
            title: {
              en: 'Create Status Page',
              pt: 'Criar Página de Status'
            }, 
            description: {
              en: 'Build public status page for transparency',
              pt: 'Construa página de status público para transparência'
            }
          }
        ],
        gettingStarted: {
          en: 'Monitor all your services with Uptime Kuma. Set up monitors for your applications and receive alerts when issues occur. View service status and uptime statistics at our monitoring dashboard.',
          pt: 'Monitore todos os seus serviços com Uptime Kuma. Configure monitores para suas aplicações e receba alertas quando problemas ocorrerem. Visualize status de serviços e estatísticas de tempo de atividade em nosso dashboard de monitoramento.'
        },
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
        category: 'platform',
        title: {
          en: 'Grafana - Observability Platform',
          pt: 'Grafana - Plataforma de Observabilidade'
        },
        shortName: {
          en: 'Grafana',
          pt: 'Grafana'
        },
        description: {
          en: 'The observability building block that transforms your infrastructure into a data-driven operation, providing enterprise-grade analytics at a fraction of the cost of commercial monitoring solutions',
          pt: 'O bloco de construção de observabilidade que transforma sua infraestrutura em uma operação baseada em dados, fornecendo análises de nível empresarial por uma fração do custo de soluções de monitoramento comerciais'
        },
        icon: 'ChartLineIcon',
        color: 'orange',
        learnMoreUrl: '/service?service=grafana',
        image: 'https://images.icon-icons.com/2699/PNG/512/grafana_logo_icon_171048.png',
        features: [
          {
            en: 'Custom dashboard creation with drag-and-drop',
            pt: 'Criação de dashboards personalizados com arrastar e soltar'
          },
          {
            en: 'Multi-datasource support (Prometheus, InfluxDB, etc)',
            pt: 'Suporte a múltiplas fontes de dados (Prometheus, InfluxDB, etc)'
          },
          {
            en: 'Advanced visualization options and chart types',
            pt: 'Opções avançadas de visualização e tipos de gráficos'
          },
          {
            en: 'Alerting and notification rules',
            pt: 'Regras de alertas e notificações'
          },
          {
            en: 'Team collaboration and sharing features',
            pt: 'Recursos de colaboração e compartilhamento em equipe'
          },
          {
            en: 'Dashboard templating and variables',
            pt: 'Templates de dashboard e variáveis'
          },
          {
            en: 'Plugin ecosystem for extensions',
            pt: 'Ecossistema de plugins para extensões'
          },
          {
            en: 'Time-series data analysis and forecasting',
            pt: 'Análise de dados de séries temporais e previsões'
          }
        ],
        useCases: [
          {
            title: {
              en: 'Real-Time Infrastructure Observability',
              pt: 'Observabilidade de Infraestrutura em Tempo Real'
            },
            description: {
              en: 'Track CPU, memory, and disk usage across mini PC cluster nodes. Monitor Docker container resources, Kong API gateway metrics, and Golang service performance. Prometheus collectors feed data to beautiful Grafana dashboards with 1-second granularity.',
              pt: 'Acompanhe uso de CPU, memória e disco em nós do cluster de mini PCs. Monitore recursos de contêineres Docker, métricas do gateway de API Kong e performance de serviços Golang. Coletores Prometheus alimentam dados para dashboards Grafana lindos com granularidade de 1 segundo.'
            }
          },
          {
            title: {
              en: 'Application Performance Intelligence',
              pt: 'Inteligência de Performance de Aplicações'
            },
            description: {
              en: 'Custom Golang metrics expose business KPIs directly in code using prometheus/client_golang. Track API response times, user registrations, payment transactions, and error rates. Alert via n8n when SLA thresholds are breached.',
              pt: 'Métricas personalizadas Golang expõem KPIs de negócio diretamente no código usando prometheus/client_golang. Acompanhe tempos de resposta de API, registros de usuário, transações de pagamento e taxas de erro. Alerte via n8n quando limites de SLA são violados.'
            }
          },
          {
            title: {
              en: 'Cost Optimization Dashboards',
              pt: 'Dashboards de Otimização de Custos'
            },
            description: {
              en: 'Visualize resource efficiency - containers per node, cost per service, and scaling recommendations. Business stakeholders see real-time user analytics while developers monitor technical debt metrics, all in unified dashboards.',
              pt: 'Visualize eficiência de recursos - contêineres por nó, custo por serviço e recomendações de dimensionamento. Stakeholders de negócio veem análises de usuário em tempo real enquanto desenvolvedores monitoram métricas de débito técnico, tudo em dashboards unificados.'
            }
          }
        ],
        integrations: [
          { 
            name: 'Kong Metrics', 
            description: {
              en: 'Visualize API gateway performance and usage',
              pt: 'Visualizar performance e uso do gateway de API'
            }
          },
          { 
            name: 'Docker Stats', 
            description: {
              en: 'Monitor container resources and health',
              pt: 'Monitorar recursos e saúde de contêineres'
            }
          },
          { 
            name: 'Uptime Data', 
            description: {
              en: 'Display service uptime and response times',
              pt: 'Exibir tempo de atividade e tempos de resposta dos serviços'
            }
          },
          { 
            name: 'Authentik SSO', 
            description: {
              en: 'Secure dashboard access with single sign-on',
              pt: 'Acesso seguro ao dashboard com single sign-on'
            }
          }
        ],
        quickStart: [
          { 
            title: {
              en: 'Connect Data Source',
              pt: 'Conectar Fonte de Dados'
            }, 
            description: {
              en: 'Link Prometheus or other metrics source',
              pt: 'Conecte Prometheus ou outra fonte de métricas'
            }
          },
          { 
            title: {
              en: 'Create Dashboard',
              pt: 'Criar Dashboard'
            }, 
            description: {
              en: 'Build custom visualizations and panels',
              pt: 'Construa visualizações e painéis personalizados'
            }
          },
          { 
            title: {
              en: 'Set Up Alerts',
              pt: 'Configurar Alertas'
            }, 
            description: {
              en: 'Configure notifications for threshold breaches',
              pt: 'Configure notificações para violações de limite'
            }
          }
        ],
        gettingStarted: {
          en: 'Create powerful dashboards to visualize your infrastructure metrics. Connect to data sources like Prometheus and build custom charts to monitor performance, resource usage, and application health.',
          pt: 'Crie dashboards poderosos para visualizar suas métricas de infraestrutura. Conecte a fontes de dados como Prometheus e construa gráficos personalizados para monitorar performance, uso de recursos e saúde de aplicações.'
        },
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
        category: 'platform',
        title: {
          en: 'n8n - Automation Engine',
          pt: 'n8n - Motor de Automação'
        },
        shortName: {
          en: 'n8n',
          pt: 'n8n'
        },
        description: {
          en: 'The automation building block that connects all your services with AI-powered workflows, enabling intelligent operations and two-way communication channels that would cost thousands in enterprise integration platforms',
          pt: 'O bloco de construção de automação que conecta todos os seus serviços com workflows alimentados por IA, habilitando operações inteligentes e canais de comunicação bidirecionais que custariam milhares em plataformas empresariais de integração'
        },
        icon: 'CogIcon',
        color: 'blue',
        learnMoreUrl: '/service?service=n8n',
        image: 'https://brandlogos.net/wp-content/uploads/2025/05/n8n_icon-logo_brandlogos.net_3mw34-512x270.png',
        features: [
          {
            en: 'Visual workflow designer with drag-and-drop',
            pt: 'Designer de workflows visual com arrastar e soltar'
          },
          {
            en: '200+ pre-built integrations and nodes',
            pt: 'Mais de 200 integrações e nós pré-construídos'
          },
          {
            en: 'Custom JavaScript code execution',
            pt: 'Execução de código JavaScript personalizado'
          },
          {
            en: 'Scheduled and event-triggered workflows',
            pt: 'Workflows agendados e acionados por eventos'
          },
          {
            en: 'HTTP webhooks and API endpoints',
            pt: 'Webhooks HTTP e endpoints de API'
          },
          {
            en: 'Advanced data transformation and processing',
            pt: 'Transformação e processamento avançado de dados'
          },
          {
            en: 'Error handling and retry logic',
            pt: 'Tratamento de erros e lógica de repetição'
          },
          {
            en: 'Workflow templates and community sharing',
            pt: 'Templates de workflow e compartilhamento da comunidade'
          }
        ],
        useCases: [
          {
            title: {
              en: 'AI-Powered Infrastructure Automation',
              pt: 'Automação de Infraestrutura com IA'
            },
            description: {
              en: 'When Grafana alerts fire, n8n workflows analyze the issue using OpenAI GPT, check service dependencies, attempt automatic recovery (restart containers, scale replicas), and send intelligent reports to WhatsApp/Telegram with suggested actions and impact assessment.',
              pt: 'Quando alertas do Grafana disparam, workflows n8n analisam o problema usando OpenAI GPT, verificam dependências de serviços, tentam recuperação automática (reiniciar contêineres, escalar réplicas) e enviam relatórios inteligentes para WhatsApp/Telegram com ações sugeridas e avaliação de impacto.'
            }
          },
          {
            title: {
              en: 'Two-Way Communication Bridge',
              pt: 'Ponte de Comunicação Bidirecional'
            },
            description: {
              en: 'Users send commands to Telegram bot (@brenoncloud_bot), n8n processes requests, deploys services via Portainer API, checks status through Kong, and responds with deployment URLs. Admins get WhatsApp notifications for approvals, creating human-in-the-loop automation.',
              pt: 'Usuários enviam comandos para bot Telegram (@brenoncloud_bot), n8n processa requisições, implanta serviços via API Portainer, verifica status através do Kong e responde com URLs de implantação. Admins recebem notificações WhatsApp para aprovações, criando automação com humano no loop.'
            }
          },
          {
            title: {
              en: 'No-Code Business Process Integration',
              pt: 'Integração de Processos de Negócio Sem Código'
            },
            description: {
              en: 'Connect Stripe webhook → validate payment → trigger Golang user activation API → send welcome email via SendGrid → create Grafana dashboard access → notify Discord channel. All without coding, using visual workflows with error handling and retry logic.',
              pt: 'Conecte webhook Stripe → valide pagamento → acione API de ativação de usuário Golang → envie email de boas-vindas via SendGrid → crie acesso ao dashboard Grafana → notifique canal Discord. Tudo sem codificação, usando workflows visuais com tratamento de erros e lógica de repetição.'
            }
          }
        ],
        integrations: [
          { 
            name: 'Uptime Alerts', 
            description: {
              en: 'Trigger workflows when services go down',
              pt: 'Acionar workflows quando serviços ficam fora do ar'
            }
          },
          { 
            name: 'Grafana Webhooks', 
            description: {
              en: 'Process monitoring alerts and metrics',
              pt: 'Processar alertas de monitoramento e métricas'
            }
          },
          { 
            name: 'Kong API Calls', 
            description: {
              en: 'Automate API interactions and data flows',
              pt: 'Automatizar interações de API e fluxos de dados'
            }
          },
          { 
            name: 'Authentik Users', 
            description: {
              en: 'Manage user provisioning and access',
              pt: 'Gerenciar provisionamento e acesso de usuários'
            }
          }
        ],
        quickStart: [
          { 
            title: {
              en: 'Design Workflow',
              pt: 'Projetar Workflow'
            }, 
            description: {
              en: 'Use visual editor to create automation logic',
              pt: 'Use editor visual para criar lógica de automação'
            }
          },
          { 
            title: {
              en: 'Connect Services',
              pt: 'Conectar Serviços'
            }, 
            description: {
              en: 'Link your Brenon.Cloud services together',
              pt: 'Conecte seus serviços Brenon.Cloud entre si'
            }
          },
          { 
            title: {
              en: 'Test & Deploy',
              pt: 'Testar e Implantar'
            }, 
            description: {
              en: 'Validate workflow and set it live',
              pt: 'Valide o workflow e coloque-o em produção'
            }
          }
        ],
        gettingStarted: {
          en: 'Automate repetitive tasks by connecting different services and APIs. Create workflows that trigger on events, process data, and integrate your tools seamlessly. Build powerful automations without writing code.',
          pt: 'Automatize tarefas repetitivas conectando diferentes serviços e APIs. Crie workflows que são acionados por eventos, processam dados e integram suas ferramentas perfeitamente. Construa automações poderosas sem escrever código.'
        },
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
        category: 'platform',
        title: {
          en: 'Portainer - Container Management',
          pt: 'Portainer - Gerenciamento de Contêineres'
        },
        shortName: {
          en: 'Portainer',
          pt: 'Portainer'
        },
        description: {
          en: 'The management building block that democratizes container operations, allowing any developer to deploy and scale cloud-native applications without DevOps expertise or expensive orchestration training',
          pt: 'O bloco de construção de gerenciamento que democratiza operações de contêineres, permitindo que qualquer desenvolvedor implante e dimensione aplicações cloud-native sem expertise DevOps ou treinamento caro de orquestração'
        },
        icon: 'ServerIcon',
        color: 'purple',
        learnMoreUrl: '/service?service=portainer',
        image: 'https://www.portainer.io/hubfs/Brand%20Assets/Logos/Portainer%20Logo%20Solid%20All%20-%20Blue%20no%20padding.svg',
        features: [
          {
            en: 'Visual Docker Swarm management interface',
            pt: 'Interface de gerenciamento visual do Docker Swarm'
          },
          {
            en: 'Stack deployment from Compose files',
            pt: 'Implantação de stacks a partir de arquivos Compose'
          },
          {
            en: 'Real-time container monitoring and logs',
            pt: 'Monitoramento e logs de contêineres em tempo real'
          },
          {
            en: 'Resource usage analytics and insights',
            pt: 'Análises e insights de uso de recursos'
          },
          {
            en: 'User access control and team management',
            pt: 'Controle de acesso de usuários e gerenciamento de equipes'
          },
          {
            en: 'Template library for common services',
            pt: 'Biblioteca de templates para serviços comuns'
          },
          {
            en: 'Network and volume management tools',
            pt: 'Ferramentas de gerenciamento de rede e volumes'
          },
          {
            en: 'Registry integration and image management',
            pt: 'Integração de registro e gerenciamento de imagens'
          }
        ],
        useCases: [
          {
            title: {
              en: 'Visual DevOps for Non-Experts',
              pt: 'DevOps Visual para Não-Especialistas'
            },
            description: {
              en: 'Developers with zero Docker Swarm knowledge deploy Golang services by uploading docker-compose.yml files through Portainer UI. Set resource limits, health checks, and secrets through forms instead of YAML configuration, making cloud-native accessible to all skill levels.',
              pt: 'Desenvolvedores com zero conhecimento de Docker Swarm implantam serviços Golang enviando arquivos docker-compose.yml através da UI do Portainer. Definem limites de recursos, verificações de saúde e segredos através de formulários em vez de configuração YAML, tornando cloud-native acessível para todos os níveis de habilidade.'
            }
          },
          {
            title: {
              en: 'Template-Driven Service Deployment',
              pt: 'Implantação de Serviços Baseada em Templates'
            },
            description: {
              en: 'Pre-built templates for common patterns: "Golang REST API + PostgreSQL", "Python ML Model + Redis Cache", "Static Website + CDN". One-click deployment with automatic Kong route creation, Authentik integration, and Grafana monitoring setup.',
              pt: 'Templates pré-construídos para padrões comuns: "API REST Golang + PostgreSQL", "Modelo ML Python + Cache Redis", "Website Estático + CDN". Implantação com um clique com criação automática de rotas Kong, integração Authentik e configuração de monitoramento Grafana.'
            }
          },
          {
            title: {
              en: 'Cost-Conscious Resource Management',
              pt: 'Gerenciamento de Recursos Consciente de Custos'
            },
            description: {
              en: 'Visual resource allocation across mini PC cluster. See real-time CPU/memory usage per container, identify resource-hungry services, and optimize placement. Stack deployment wizard calculates resource requirements and suggests optimal node distribution for maximum efficiency.',
              pt: 'Alocação visual de recursos no cluster de mini PCs. Veja uso de CPU/memória em tempo real por contêiner, identifique serviços que consomem muitos recursos e otimize a colocação. Assistente de implantação de stack calcula requisitos de recursos e sugere distribuição otimizada de nós para máxima eficiência.'
            }
          }
        ],
        integrations: [
          { 
            name: 'Docker Swarm', 
            description: {
              en: 'Direct management of the container orchestration',
              pt: 'Gerenciamento direto da orquestração de contêineres'
            }
          },
          { 
            name: 'Kong Services', 
            description: {
              en: 'Deploy API gateway configurations',
              pt: 'Implantar configurações de gateway de API'
            }
          },
          { 
            name: 'Grafana Monitoring', 
            description: {
              en: 'Container metrics collection and display',
              pt: 'Coleta e exibição de métricas de contêineres'
            }
          },
          { 
            name: 'Authentik Access', 
            description: {
              en: 'Secure container management with SSO',
              pt: 'Gerenciamento seguro de contêineres com SSO'
            }
          }
        ],
        quickStart: [
          { 
            title: {
              en: 'Access Interface',
              pt: 'Acessar Interface'
            }, 
            description: {
              en: 'Login to Portainer web management console',
              pt: 'Faça login no console de gerenciamento web do Portainer'
            }
          },
          { 
            title: {
              en: 'Deploy Stack',
              pt: 'Implantar Stack'
            }, 
            description: {
              en: 'Upload compose file and deploy services',
              pt: 'Envie arquivo compose e implante serviços'
            }
          },
          { 
            title: {
              en: 'Monitor Services',
              pt: 'Monitorar Serviços'
            }, 
            description: {
              en: 'Track container health and performance',
              pt: 'Acompanhe saúde e performance dos contêineres'
            }
          }
        ],
        gettingStarted: {
          en: 'Portainer provides a web-based interface for managing your Docker deployments. Access it at <a href="http://portainer.brenon.cloud" class="text-blue-400 hover:underline">portainer.brenon.cloud</a> to deploy stacks, monitor services, and manage your containerized applications.',
          pt: 'Portainer fornece uma interface baseada na web para gerenciar suas implantações Docker. Acesse em <a href="http://portainer.brenon.cloud" class="text-blue-400 hover:underline">portainer.brenon.cloud</a> para implantar stacks, monitorar serviços e gerenciar suas aplicações containerizadas.'
        },
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
      },
      {
        id: 'minio',
        category: 'platform',
        title: {
          en: 'MinIO - Object Storage',
          pt: 'MinIO - Armazenamento de Objetos'
        },
        shortName: {
          en: 'MinIO',
          pt: 'MinIO'
        },
        description: {
          en: 'High-performance, S3 compatible object storage that transforms your cloud into a data lake, empowering modern applications with unlimited, cost-effective storage scalability',
          pt: 'Armazenamento de objetos de alta performance compatível com S3 que transforma sua nuvem em um data lake, capacitando aplicações modernas com escalabilidade de armazenamento ilimitada e econômica'
        },
        icon: 'cloudstorage',
        color: 'red',
        learnMoreUrl: '/service?service=minio',
        image: 'https://static.cdnlogo.com/logos/m/74/minio_thumb.png',
        features: [
          {
            en: 'S3-compatible API for seamless integration',
            pt: 'API compatível com S3 para integração perfeita'
          },
          {
            en: 'Multi-cloud and hybrid cloud deployment',
            pt: 'Implantação multi-cloud e nuvem híbrida'
          },
          {
            en: 'Enterprise-grade security and encryption',
            pt: 'Segurança e criptografia de nível empresarial'
          },
          {
            en: 'Built-in data protection and versioning',
            pt: 'Proteção de dados e versionamento integrados'
          },
          {
            en: 'High-performance distributed storage',
            pt: 'Armazenamento distribuído de alta performance'
          },
          {
            en: 'Web-based management console',
            pt: 'Console de gerenciamento baseado na web'
          },
          {
            en: 'Lambda notifications and event-driven workflows',
            pt: 'Notificações Lambda e workflows orientados por eventos'
          },
          {
            en: 'Data lifecycle management and retention policies',
            pt: 'Gerenciamento de ciclo de vida de dados e políticas de retenção'
          }
        ],
        useCases: [
          {
            title: {
              en: 'AI/ML Data Pipeline Storage',
              pt: 'Armazenamento de Pipeline de Dados AI/ML'
            },
            description: {
              en: 'Store massive datasets for machine learning training, model artifacts, and inference results. MinIO integrates seamlessly with TensorFlow, PyTorch, and MLflow workflows deployed on Brenon.Cloud, providing scalable storage for data scientists and AI engineers.',
              pt: 'Armazene conjuntos de dados massivos para treinamento de machine learning, artefatos de modelo e resultados de inferência. MinIO se integra perfeitamente com workflows TensorFlow, PyTorch e MLflow implantados no Brenon.Cloud, fornecendo armazenamento escalável para cientistas de dados e engenheiros de IA.'
            }
          },
          {
            title: {
              en: 'Application Asset Storage',
              pt: 'Armazenamento de Assets de Aplicação'
            },
            description: {
              en: 'Host static assets, user uploads, images, videos, and documents for your web applications. Your Vue.js frontends and Python/Golang APIs can directly upload and serve files through MinIO\'s S3-compatible interface, reducing server load and improving performance.',
              pt: 'Hospede assets estáticos, uploads de usuários, imagens, vídeos e documentos para suas aplicações web. Seus frontends Vue.js e APIs Python/Golang podem fazer upload e servir arquivos diretamente através da interface compatível com S3 do MinIO, reduzindo a carga do servidor e melhorando a performance.'
            }
          },
          {
            title: {
              en: 'Backup and Disaster Recovery',
              pt: 'Backup e Recuperação de Desastres'
            },
            description: {
              en: 'Automated backup storage for databases, application data, and Docker volumes. Integrate with n8n workflows for scheduled backups, retention policies, and disaster recovery procedures. Your PostgreSQL dumps, MongoDB exports, and application logs are safely stored with versioning support.',
              pt: 'Armazenamento automatizado de backup para bancos de dados, dados de aplicação e volumes Docker. Integre com workflows n8n para backups agendados, políticas de retenção e procedimentos de recuperação de desastres. Seus dumps PostgreSQL, exportações MongoDB e logs de aplicação são armazenados com segurança com suporte a versionamento.'
            }
          }
        ],
        integrations: [
          { 
            name: 'n8n Workflows', 
            description: {
              en: 'Automated file processing and data pipelines',
              pt: 'Processamento automatizado de arquivos e pipelines de dados'
            }
          },
          { 
            name: 'Authentik SSO', 
            description: {
              en: 'Secure access control and user authentication',
              pt: 'Controle de acesso seguro e autenticação de usuários'
            }
          },
          { 
            name: 'Kong Gateway', 
            description: {
              en: 'API gateway for secure file access',
              pt: 'Gateway de API para acesso seguro a arquivos'
            }
          },
          { 
            name: 'Grafana Monitoring', 
            description: {
              en: 'Storage metrics and performance monitoring',
              pt: 'Métricas de armazenamento e monitoramento de performance'
            }
          }
        ],
        quickStart: [
          { 
            title: {
              en: 'Access MinIO Console',
              pt: 'Acessar Console MinIO'
            }, 
            description: {
              en: 'Login to MinIO web interface',
              pt: 'Faça login na interface web do MinIO'
            }
          },
          { 
            title: {
              en: 'Create Bucket',
              pt: 'Criar Bucket'
            }, 
            description: {
              en: 'Set up your first storage bucket',
              pt: 'Configure seu primeiro bucket de armazenamento'
            }
          },
          { 
            title: {
              en: 'Configure Access Keys',
              pt: 'Configurar Chaves de Acesso'
            }, 
            description: {
              en: 'Generate API keys for application integration',
              pt: 'Gere chaves de API para integração com aplicações'
            }
          }
        ],
        gettingStarted: {
          en: 'MinIO transforms your infrastructure into an unlimited data lake - like adding infinite storage space to your digital workshop. Every application you build can store, retrieve, and serve files at enterprise scale without complexity. <a href="https://minio.brenon.cloud" class="text-red-400 hover:underline">Start building your data-driven applications here</a>.',
          pt: 'MinIO transforma sua infraestrutura em um data lake ilimitado - como adicionar espaço de armazenamento infinito ao seu workshop digital. Cada aplicação que você constrói pode armazenar, recuperar e servir arquivos em escala empresarial sem complexidade. <a href="https://minio.brenon.cloud" class="text-red-400 hover:underline">Comece a construir suas aplicações orientadas a dados aqui</a>.'
        },
        mermaidDiagram: `
graph TD
    A[Applications] --> B[MinIO Object Storage]
    B --> C[Data Lake]
    
    D[AI/ML Pipeline] --> B
    E[Web Applications] --> B
    F[Backup Systems] --> B
    
    B --> G[S3 Compatible API]
    B --> H[Web Console]
    B --> I[Event Notifications]
    
    J[n8n Workflows] --> I
    K[Authentik SSO] --> H
    L[Kong Gateway] --> G
    
    C --> M[Raw Data Storage]
    C --> N[Processed Data]
    C --> O[Model Artifacts]
    C --> P[User Assets]
    
    style B fill:#dc2626,stroke:#b91c1c,color:#fff
    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style C fill:#059669,stroke:#047857,color:#fff
    
    classDef storage fill:#dc2626,stroke:#b91c1c,stroke-width:2px
    classDef apps fill:#3b82f6,stroke:#2563eb,stroke-width:2px
    classDef data fill:#059669,stroke:#047857,stroke-width:2px
    classDef integration fill:#8b5cf6,stroke:#7c3aed,stroke-width:2px
    
    class B,G,H,I storage
    class A,D,E,F apps
    class C,M,N,O,P data
    class J,K,L integration
    `,
        demoUrl: 'http://minio-console.brenon.cloud'
      },
      {
        id: 'console-air',
        category: 'platform',
        title: {
          en: 'Console Air - Akash Network Self-Custodial Deployments',
          pt: 'Console Air - Deployments Self-Custodial na Akash Network'
        },
        shortName: {
          en: 'Console Air',
          pt: 'Console Air'
        },
        description: {
          en: 'A self-hosted Akash Network Console Air deployment that lets anyone connect a decentralized wallet, swap AKT for ACTs (10 AKT minimum), and run permissionless cloud deployments — no email signup, no credit card required.',
          pt: 'Um deployment self-hosted do Console Air da Akash Network que permite conectar uma carteira descentralizada, trocar AKT por ACTs (mínimo de 10 AKT) e executar deployments permissionless na nuvem — sem cadastro por e-mail, sem cartão de crédito.'
        },
        icon: 'bolt',
        color: 'red',
        learnMoreUrl: '/service?service=console-air',
        image: 'https://avatars.githubusercontent.com/u/41277739?v=4',
        features: [
          {
            en: 'Wallet-only access via Keplr and compatible Cosmos wallets',
            pt: 'Acesso somente por carteira via Keplr e carteiras Cosmos compatíveis'
          },
          {
            en: 'Swap AKT for ACTs in-app (10 AKT minimum) to fund deployments',
            pt: 'Troca de AKT por ACTs no próprio app (mínimo de 10 AKT) para custear deployments'
          },
          {
            en: 'Full SDL editor with provider bidding and lease management',
            pt: 'Editor SDL completo com seleção de providers via bid e gerenciamento de leases'
          },
          {
            en: 'Logs, shell access and live updates for running deployments',
            pt: 'Logs, acesso shell e atualizações ao vivo para deployments ativos'
          },
          {
            en: 'No email, password, KYC or credit card required',
            pt: 'Sem e-mail, senha, KYC ou cartão de crédito'
          },
          {
            en: 'Open to any Akash provider — no gatekeeping layer',
            pt: 'Aberto a qualquer provider Akash — sem camada de gatekeeping'
          },
          {
            en: 'Multi-depositor escrow support (AEP-75)',
            pt: 'Suporte a escrow multi-depositor (AEP-75)'
          },
          {
            en: 'On-chain deployment history tied to your wallet address',
            pt: 'Histórico de deployments on-chain vinculado ao seu endereço de carteira'
          }
        ],
        useCases: [
          {
            title: {
              en: 'Permissionless Cloud for Builders',
              pt: 'Nuvem Permissionless para Builders'
            },
            description: {
              en: 'Spin up containerized workloads on the Akash Network without creating yet another SaaS account. Connect Keplr, fund your wallet with AKT, and deploy in minutes — ideal for indie hackers, OSS maintainers and anyone who wants to ship without a billing relationship.',
              pt: 'Suba workloads containerizados na Akash Network sem criar mais uma conta SaaS. Conecte o Keplr, financie sua carteira com AKT e faça o deploy em minutos — ideal para indie hackers, mantenedores de OSS e qualquer um que queira publicar sem relação de billing.'
            }
          },
          {
            title: {
              en: 'AKT → ACT Swaps for Deployment Credits',
              pt: 'Trocas AKT → ACT para Crédito de Deployment'
            },
            description: {
              en: 'Convert AKT directly into ACTs from inside the app — minimum 10 AKT — to keep your active leases topped up. The whole flow stays self-custodial: every transaction is signed by your wallet against on-chain escrow.',
              pt: 'Converta AKT diretamente em ACTs dentro do app — mínimo de 10 AKT — para manter seus leases ativos abastecidos. Todo o fluxo permanece self-custodial: cada transação é assinada pela sua carteira contra o escrow on-chain.'
            }
          },
          {
            title: {
              en: 'A Public, Free-to-Use Deployment Endpoint',
              pt: 'Um Endpoint de Deployment Público e Gratuito'
            },
            description: {
              en: 'After Akash split Console into a managed (KYC + credit card) platform and Console Air (AEP-84), Brenon.Cloud hosts an open Console Air instance so anyone can keep deploying to Akash with zero registration friction. Currently in testing — feedback welcome.',
              pt: 'Após a Akash dividir o Console em uma plataforma gerenciada (KYC + cartão) e o Console Air (AEP-84), o Brenon.Cloud hospeda uma instância aberta do Console Air para quem quiser continuar fazendo deploy na Akash sem nenhum atrito de cadastro. Atualmente em testes — feedback é bem-vindo.'
            }
          }
        ],
        integrations: [
          {
            name: 'Keplr Wallet',
            description: {
              en: 'Self-custodial signing for every on-chain action',
              pt: 'Assinatura self-custodial para toda ação on-chain'
            }
          },
          {
            name: 'Akash Network',
            description: {
              en: 'Direct connection to providers, escrow and SDL lifecycle',
              pt: 'Conexão direta com providers, escrow e ciclo de vida do SDL'
            }
          },
          {
            name: 'Kong Gateway',
            description: {
              en: 'TLS termination and rate limiting in front of the app',
              pt: 'Terminação TLS e rate limiting na frente do app'
            }
          },
          {
            name: 'Uptime Kuma',
            description: {
              en: 'Availability monitoring for the public endpoint',
              pt: 'Monitoramento de disponibilidade do endpoint público'
            }
          }
        ],
        quickStart: [
          {
            title: {
              en: 'Open Console Air',
              pt: 'Abrir o Console Air'
            },
            description: {
              en: 'Visit the Brenon.Cloud-hosted instance — no signup required',
              pt: 'Acesse a instância hospedada no Brenon.Cloud — sem cadastro'
            }
          },
          {
            title: {
              en: 'Connect Keplr & Fund AKT',
              pt: 'Conectar Keplr e Financiar AKT'
            },
            description: {
              en: 'Approve the Keplr connection and load AKT into your wallet',
              pt: 'Aprove a conexão Keplr e carregue AKT na sua carteira'
            }
          },
          {
            title: {
              en: 'Swap AKT → ACT and Deploy',
              pt: 'Trocar AKT → ACT e Deployar'
            },
            description: {
              en: 'Convert at least 10 AKT to ACTs, paste your SDL and lease a provider',
              pt: 'Converta no mínimo 10 AKT em ACTs, cole seu SDL e arremate um provider'
            }
          }
        ],
        gettingStarted: {
          en: 'Console Air is the permissionless front door to the Akash Network — and Brenon.Cloud now runs a public instance of it. Bring a Keplr wallet, swap a minimum of 10 AKT into ACTs, and ship containers to a real decentralized cloud without ever leaving a custodial account behind. The instance is in testing; expect rapid iterations. Read the rationale for the split in the official Akash <a href="https://akash.network/roadmap/aep-84/" class="text-red-400 hover:underline" target="_blank" rel="noopener noreferrer">AEP-84 roadmap entry</a>.',
          pt: 'O Console Air é a porta de entrada permissionless da Akash Network — e o Brenon.Cloud agora roda uma instância pública dele. Use uma carteira Keplr, troque no mínimo 10 AKT por ACTs e suba containers para uma nuvem realmente descentralizada sem deixar nenhum cadastro custodial pelo caminho. A instância está em testes; espere iterações rápidas. Leia o racional da divisão na entrada oficial <a href="https://akash.network/roadmap/aep-84/" class="text-red-400 hover:underline" target="_blank" rel="noopener noreferrer">AEP-84 do roadmap da Akash</a>.'
        },
        mermaidDiagram: `
graph TD
    A[Keplr Wallet] -->|signs txs| B[Console Air on Brenon.Cloud]
    B -->|AKT to ACT swap| C[On-chain Escrow]
    B -->|SDL submit| D[Akash Network]
    D --> E[Providers Bid]
    E --> F[Lease Created]
    F --> G[Containers Running]
    B --> H[Logs and Shell]
    G --> H
    I[Kong Gateway] --> B
    J[Uptime Kuma] --> B

    style A fill:#3b82f6,stroke:#2563eb,color:#fff
    style B fill:#dc2626,stroke:#b91c1c,color:#fff
    style C fill:#f59e0b,stroke:#d97706,color:#fff
    style D fill:#9333ea,stroke:#7c3aed,color:#fff
    style G fill:#059669,stroke:#047857,color:#fff
        `,
        demoUrl: 'https://akash.brenon.cloud'
      },
      {
        id: 'brnn-ai',
        category: 'product',
        title: {
          en: 'BRNN AI — Developer AI APIs',
          pt: 'BRNN AI — APIs de IA para devs'
        },
        shortName: {
          en: 'BRNN AI',
          pt: 'BRNN AI'
        },
        description: {
          en: 'Our own AI APIs for builders: Speech-to-Text is live (free tier), with TTS and LLMs on the roadmap. Sign up, create a key, try the sandbox.',
          pt: 'Nossas próprias APIs de IA para builders: Speech-to-Text já está no ar (tier grátis), com TTS e LLMs no roadmap. Crie conta, gere uma key e teste no sandbox.'
        },
        icon: 'bolt',
        color: 'purple',
        learnMoreUrl: '/service?service=brnn-ai',
        image: 'https://ai.brenon.cloud/favicon.ico',
        hostname: 'ai.brenon.cloud',
        features: [
          { en: 'Speech-to-Text API live (Whisper STT)', pt: 'API de Speech-to-Text no ar (Whisper STT)' },
          { en: '15 free STT minutes/month, no card required', pt: '15 minutos grátis de STT/mês, sem cartão' },
          { en: 'API keys + sandbox for quick trials', pt: 'API keys + sandbox para testes rápidos' },
          { en: 'TTS and LLMs coming soon', pt: 'TTS e LLMs em breve' },
          { en: 'Built for developers, simple onboarding', pt: 'Feito para desenvolvedores, onboarding simples' },
          { en: 'Hosted on the Brenon.Cloud Swarm', pt: 'Hospedado no Swarm do Brenon.Cloud' }
        ],
        useCases: [
          {
            title: { en: 'Add voice input to your product', pt: 'Adicionar voz ao seu produto' },
            description: {
              en: 'Drop Whisper STT into apps, bots, and agent pipelines with a simple API key — start free and grow as usage grows.',
              pt: 'Encaixe Whisper STT em apps, bots e pipelines de agentes com uma API key simples — comece grátis e cresça conforme o uso.'
            }
          },
          {
            title: { en: 'Agent and automation pipelines', pt: 'Pipelines de agentes e automação' },
            description: {
              en: 'Feed live transcripts into n8n, Hermes agents, or your own backend without wiring a full ML stack yourself.',
              pt: 'Alimente transcripts ao vivo no n8n, agentes Hermes ou no seu backend sem montar um stack ML inteiro sozinho.'
            }
          }
        ],
        integrations: [
          { name: 'Docker Swarm', description: { en: 'Runs as a stack on the home cluster', pt: 'Roda como stack no cluster home' } },
          { name: 'Cloudflare', description: { en: 'Public edge at ai.brenon.cloud', pt: 'Borda pública em ai.brenon.cloud' } },
          { name: 'API keys', description: { en: 'Developer self-serve access', pt: 'Acesso self-serve para devs' } }
        ],
        quickStart: [
          { title: { en: 'Open BRNN AI', pt: 'Abrir BRNN AI' }, description: { en: 'Visit ai.brenon.cloud', pt: 'Acesse ai.brenon.cloud' } },
          { title: { en: 'Create an account', pt: 'Criar conta' }, description: { en: 'Sign up and generate an API key', pt: 'Cadastre-se e gere uma API key' } },
          { title: { en: 'Try the STT sandbox', pt: 'Testar o sandbox STT' }, description: { en: 'Upload a short clip and transcribe', pt: 'Envie um áudio curto e transcreva' } }
        ],
        gettingStarted: {
          en: 'BRNN AI is our developer-facing AI platform. Speech-to-Text is production-ready today; TTS and LLMs are next. <a href="https://ai.brenon.cloud" class="text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">Start free at ai.brenon.cloud</a>.',
          pt: 'BRNN AI é nossa plataforma de IA voltada a devs. Speech-to-Text já está pronto; TTS e LLMs vêm a seguir. <a href="https://ai.brenon.cloud" class="text-purple-400 hover:underline" target="_blank" rel="noopener noreferrer">Comece grátis em ai.brenon.cloud</a>.'
        },
        mermaidDiagram: `
graph LR
    A[Developer App] -->|API key| B[BRNN AI]
    B --> C[Whisper STT]
    B -.-> D[TTS soon]
    B -.-> E[LLMs soon]
    B --> F[Brenon.Cloud Swarm]
    style B fill:#9333ea,stroke:#7c3aed,color:#fff
`,
        demoUrl: 'https://ai.brenon.cloud'
      },
      {
        id: 'oficina-cloud',
        category: 'product',
        title: {
          en: 'OficinaCloud — SaaS for auto repair shops',
          pt: 'OficinaCloud — SaaS para oficinas mecânicas'
        },
        shortName: {
          en: 'OficinaCloud',
          pt: 'OficinaCloud'
        },
        description: {
          en: 'A simple multi-tenant SaaS for small and mid-size auto repair shops: customers, vehicles, service orders, and stock in one place — built to replace spreadsheets and WhatsApp chaos.',
          pt: 'SaaS multi-tenant simples para oficinas de pequeno e médio porte: clientes, veículos, ordens de serviço e estoque num só lugar — feito para substituir planilha e bagunça no WhatsApp.'
        },
        icon: 'settings',
        color: 'orange',
        learnMoreUrl: '/service?service=oficina-cloud',
        image: 'https://oficina.brenon.cloud/favicon.ico',
        hostname: 'oficina.brenon.cloud',
        features: [
          { en: 'Customers, vehicles, and service orders', pt: 'Clientes, veículos e ordens de serviço' },
          { en: 'Inventory / stock management', pt: 'Gestão de estoque' },
          { en: 'Multi-tenant workshops (create your shop free)', pt: 'Oficinas multi-tenant (crie a sua grátis)' },
          { en: 'Open beta with forever trial plan', pt: 'Beta aberto com plano trial para sempre' },
          { en: 'Built for small/medium shops, not enterprise bloat', pt: 'Feito para PME, sem peso de enterprise' },
          { en: 'Hosted on Brenon.Cloud + Cloudflare', pt: 'Hospedado no Brenon.Cloud + Cloudflare' }
        ],
        useCases: [
          {
            title: { en: 'Replace the spreadsheet workshop', pt: 'Substituir a oficina na planilha' },
            description: {
              en: 'Track every service order, vehicle history, and stock movement without juggling notebooks, WhatsApp groups, and Excel files.',
              pt: 'Acompanhe cada OS, histórico de veículo e movimentação de estoque sem malabarismo entre caderninho, WhatsApp e Excel.'
            }
          },
          {
            title: { en: 'Multi-tenant SaaS on home cloud', pt: 'SaaS multi-tenant na home cloud' },
            description: {
              en: 'Each workshop is isolated in a multi-tenant model running on the same Swarm that powers the rest of Brenon.Cloud.',
              pt: 'Cada oficina fica isolada no modelo multi-tenant, rodando no mesmo Swarm que sustenta o resto do Brenon.Cloud.'
            }
          }
        ],
        integrations: [
          { name: 'Docker Swarm', description: { en: 'Production stacks on the home cluster', pt: 'Stacks de produção no cluster home' } },
          { name: 'Cloudflare', description: { en: 'TLS and edge at oficina.brenon.cloud', pt: 'TLS e borda em oficina.brenon.cloud' } }
        ],
        quickStart: [
          { title: { en: 'Open OficinaCloud', pt: 'Abrir OficinaCloud' }, description: { en: 'Visit oficina.brenon.cloud', pt: 'Acesse oficina.brenon.cloud' } },
          { title: { en: 'Create your shop', pt: 'Criar sua oficina' }, description: { en: 'Sign up free — no credit card', pt: 'Cadastre grátis — sem cartão' } },
          { title: { en: 'Add first OS', pt: 'Abrir primeira OS' }, description: { en: 'Register a vehicle and open a service order', pt: 'Cadastre um veículo e abra uma OS' } }
        ],
        gettingStarted: {
          en: 'OficinaCloud is our SaaS for auto repair shops — customers, vehicles, service orders, and stock. <a href="https://oficina.brenon.cloud" class="text-orange-400 hover:underline" target="_blank" rel="noopener noreferrer">Create your shop free</a>.',
          pt: 'OficinaCloud é nosso SaaS para oficinas mecânicas — clientes, veículos, OS e estoque. <a href="https://oficina.brenon.cloud" class="text-orange-400 hover:underline" target="_blank" rel="noopener noreferrer">Crie sua oficina grátis</a>.'
        },
        mermaidDiagram: `
graph TD
    A[Workshop Staff] --> B[OficinaCloud]
    B --> C[Customers]
    B --> D[Vehicles]
    B --> E[Service Orders]
    B --> F[Stock]
    B --> G[Brenon.Cloud Swarm]
    style B fill:#f59e0b,stroke:#d97706,color:#fff
`,
        demoUrl: 'https://oficina.brenon.cloud'
      },
      {
        id: 'tibiapixel',
        category: 'product',
        title: {
          en: 'TibiaPixel — live Tibia-like sim for agents & humans',
          pt: 'TibiaPixel — simulação Tibia-like viva para agentes e humanos'
        },
        shortName: {
          en: 'TibiaPixel',
          pt: 'TibiaPixel'
        },
        description: {
          en: 'An open-source Tibia-style survival/craft simulation where AI agents and humans share the same shard, rules, cities, and dungeons — built to train RL agents and open for humans to play.',
          pt: 'Simulação open-source estilo Tibia com sobrevivência e craft, onde agentes de IA e humanos compartilham o mesmo shard, regras, cidades e dungeons — feita para treinar agentes RL e aberta para humanos jogarem.'
        },
        icon: 'cube',
        color: 'green',
        learnMoreUrl: '/service?service=tibiapixel',
        image: 'https://tibiapixel.brenon.cloud/favicon.ico',
        hostname: 'tibiapixel.brenon.cloud',
        features: [
          { en: 'Same rules for AI agents and humans', pt: 'Mesmas regras para agentes de IA e humanos' },
          { en: 'Survival, craft, cities, and dungeons', pt: 'Sobrevivência, craft, cidades e dungeons' },
          { en: 'Browser-based — no download', pt: 'No browser — sem download' },
          { en: 'Open-source engine and agent CLI', pt: 'Engine open-source e CLI de agente' },
          { en: 'Alpha with multi-server capacity', pt: 'Alpha com capacidade multi-servidor' },
          { en: 'Designed for reinforcement learning research', pt: 'Desenhado para pesquisa de reinforcement learning' }
        ],
        useCases: [
          {
            title: { en: 'Train RL agents in a living world', pt: 'Treinar agentes RL num mundo vivo' },
            description: {
              en: 'Agents face the same economy, combat, and navigation constraints as human players — ideal for multi-agent and survival RL experiments.',
              pt: 'Agentes enfrentam a mesma economia, combate e navegação que jogadores humanos — ideal para experimentos multi-agente e RL de sobrevivência.'
            }
          },
          {
            title: { en: 'Play beside the agents', pt: 'Jogar ao lado dos agentes' },
            description: {
              en: 'Humans join the same shard in the browser, explore cities, craft, and compete or cooperate with autonomous agents.',
              pt: 'Humanos entram no mesmo shard pelo browser, exploram cidades, craftam e competem ou cooperam com agentes autônomos.'
            }
          }
        ],
        integrations: [
          { name: 'Docker Swarm', description: { en: 'Game servers on the home cluster', pt: 'Game servers no cluster home' } },
          { name: 'Cloudflare', description: { en: 'Public edge at tibiapixel.brenon.cloud', pt: 'Borda pública em tibiapixel.brenon.cloud' } },
          { name: 'Agent CLI', description: { en: 'Headless agent clients against the shard', pt: 'Clientes headless de agente no shard' } }
        ],
        quickStart: [
          { title: { en: 'Open TibiaPixel', pt: 'Abrir TibiaPixel' }, description: { en: 'Visit tibiapixel.brenon.cloud', pt: 'Acesse tibiapixel.brenon.cloud' } },
          { title: { en: 'Join the alpha', pt: 'Entrar no alpha' }, description: { en: 'Create a character on a live server', pt: 'Crie um personagem num servidor ao vivo' } },
          { title: { en: 'Or run an agent', pt: 'Ou rode um agente' }, description: { en: 'Use the agent CLI against the same shard', pt: 'Use a CLI de agente no mesmo shard' } }
        ],
        gettingStarted: {
          en: 'TibiaPixel is a living Tibia-like world for agents and humans. <a href="https://tibiapixel.brenon.cloud" class="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">Enter the alpha</a>.',
          pt: 'TibiaPixel é um mundo Tibia-like vivo para agentes e humanos. <a href="https://tibiapixel.brenon.cloud" class="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">Entre no alpha</a>.'
        },
        mermaidDiagram: `
graph TD
    A[Human Player] --> C[TibiaPixel Shard]
    B[AI Agent CLI] --> C
    C --> D[World / Cities]
    C --> E[Survival + Craft]
    C --> F[Brenon.Cloud Swarm]
    style C fill:#10b981,stroke:#059669,color:#fff
`,
        demoUrl: 'https://tibiapixel.brenon.cloud'
      },
      {
        id: 'devdojo-mentoring',
        category: 'product',
        title: {
          en: 'DevDojo Mentoring',
          pt: 'Mentoria DevDojo'
        },
        shortName: {
          en: 'DevDojo Mentoring',
          pt: 'Mentoria DevDojo'
        },
        description: {
          en: 'Gamified technical mentoring for developers — cohorts with schedule, code review, and recognition, connected to GitHub and the DevDojo Discord community.',
          pt: 'Mentoria técnica gamificada para devs — turmas com cronograma, revisão de código e reconhecimento, conectada ao GitHub e à comunidade DevDojo no Discord.'
        },
        icon: 'checkmark',
        color: 'blue',
        learnMoreUrl: '/service?service=devdojo-mentoring',
        image: 'https://mentoria.devdojo.academy/favicon.ico',
        hostname: 'mentoria.devdojo.academy',
        features: [
          { en: 'Cohorts with clear schedules', pt: 'Turmas com cronograma claro' },
          { en: 'Code review and technical guidance', pt: 'Code review e acompanhamento técnico' },
          { en: 'GitHub-connected progress', pt: 'Progresso conectado ao GitHub' },
          { en: 'Discord community integration', pt: 'Integração com a comunidade no Discord' },
          { en: 'Gamified recognition along the path', pt: 'Reconhecimento gamificado no caminho' },
          { en: 'Tracks like Jr → Spec (backend, cloud, AI)', pt: 'Trilhas como Jr → Spec (backend, cloud, IA)' }
        ],
        useCases: [
          {
            title: { en: 'Structured growth for junior/mid devs', pt: 'Crescimento estruturado para Jr/Pleno' },
            description: {
              en: 'Follow a mentored cohort instead of studying alone — real reviews, deadlines, and a community that keeps you accountable.',
              pt: 'Siga uma turma mentoreada em vez de estudar sozinho — reviews reais, prazos e uma comunidade que cobra (no bom sentido).'
            }
          },
          {
            title: { en: 'GitHub-native mentoring loop', pt: 'Loop de mentoria nativo no GitHub' },
            description: {
              en: 'Progress ties back to real repositories and PRs, not just slides — the same craft you use at work.',
              pt: 'O progresso volta para repositórios e PRs de verdade, não só slides — o mesmo ofício do dia a dia.'
            }
          }
        ],
        integrations: [
          { name: 'GitHub OAuth', description: { en: 'Sign-in and progress linked to GitHub', pt: 'Login e progresso ligados ao GitHub' } },
          { name: 'Discord', description: { en: 'DevDojo community channel', pt: 'Canal da comunidade DevDojo' } },
          { name: 'Cloudflare', description: { en: 'Public site at mentoria.devdojo.academy', pt: 'Site público em mentoria.devdojo.academy' } }
        ],
        quickStart: [
          { title: { en: 'Open Mentoring', pt: 'Abrir Mentoria' }, description: { en: 'Visit mentoria.devdojo.academy', pt: 'Acesse mentoria.devdojo.academy' } },
          { title: { en: 'Sign in with GitHub', pt: 'Entrar com GitHub' }, description: { en: 'Connect your developer identity', pt: 'Conecte sua identidade de dev' } },
          { title: { en: 'Join an open cohort', pt: 'Entrar numa turma aberta' }, description: { en: 'Pick a track and start the cycle', pt: 'Escolha a trilha e comece o ciclo' } }
        ],
        gettingStarted: {
          en: 'DevDojo Mentoring is gamified technical mentoring with real cohorts. <a href="https://mentoria.devdojo.academy" class="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">See open classes</a>.',
          pt: 'A Mentoria DevDojo é mentoria técnica gamificada com turmas reais. <a href="https://mentoria.devdojo.academy" class="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Veja turmas abertas</a>.'
        },
        mermaidDiagram: `
graph LR
    A[Dev + GitHub] --> B[DevDojo Mentoring]
    B --> C[Cohorts]
    B --> D[Code Review]
    B --> E[Discord Community]
    style B fill:#3b82f6,stroke:#2563eb,color:#fff
`,
        demoUrl: 'https://mentoria.devdojo.academy'
      },
      {
        id: 'clinicsy',
        category: 'product',
        title: {
          en: 'Clinicsy — practice management off spreadsheets',
          pt: 'Clinicsy — fim das planilhas para home care, consultório e clínica'
        },
        shortName: {
          en: 'Clinicsy',
          pt: 'Clinicsy'
        },
        description: {
          en: 'Live multi-tenant SaaS to get home care, consultórios, and clinics off spreadsheets: smart scheduling, WhatsApp, AI-assisted clinical notes (audio, text, images), finance and sales. Fair pricing that grows with you — 14-day free trial.',
          pt: 'SaaS multi-tenant ao vivo para home care, consultório e clínica saírem da planilha: agendamento inteligente, WhatsApp, evolução com IA (áudio, texto e imagens), financeiro e vendas. Preço justo que cresce com você — 14 dias grátis.'
        },
        icon: 'chart',
        color: 'cyan',
        learnMoreUrl: '/service?service=clinicsy',
        image: 'https://clinicsy.app/favicon.ico',
        hostname: 'clinicsy.app',
        features: [
          { en: 'Smart scheduling with Google Maps travel time', pt: 'Agendamento inteligente com deslocamento no Google Maps' },
          { en: 'Public booking link for patients', pt: 'Agendamento online público para o paciente' },
          { en: 'WhatsApp reminders and confirmations', pt: 'WhatsApp para lembretes e confirmações' },
          { en: 'Clinical notes via audio, text, and images with AI', pt: 'Evolução por áudio, texto e imagens com IA' },
          { en: 'Custom anamnesis and patient dossier', pt: 'Anamnese personalizável e dossiê do paciente' },
          { en: 'Products, session packs, finance, and reports', pt: 'Produtos, pacotes de sessões, financeiro e relatórios' },
          { en: 'Multi-user permissions and per-clinic branding', pt: 'Multi-usuários, permissões e marca por clínica' },
          { en: 'LGPD isolation per clinic · 14-day free trial', pt: 'Isolamento LGPD por clínica · 14 dias grátis' }
        ],
        useCases: [
          {
            title: { en: 'Get the practice off spreadsheets', pt: 'Tirar a clínica da planilha' },
            description: {
              en: 'Agenda, finance, and clinical record in one flow — Maps, WhatsApp, and AI — instead of Excel, personal chat, and paper notes.',
              pt: 'Agenda, financeiro e prontuário no mesmo fluxo — Maps, WhatsApp e IA — em vez de Excel, WhatsApp pessoal e caderno.'
            }
          },
          {
            title: { en: 'Home care, consultório, and clinic', pt: 'Home care, consultório e clínica' },
            description: {
              en: 'The same product covers city-running home care, a single consultório, and a multi-user clinic — price listed from R$ 29.90 to R$ 50.00.',
              pt: 'O mesmo produto atende quem roda a cidade, o consultório e a clínica multi-usuário — preço listado de R$ 29,90 a R$ 50,00.'
            }
          }
        ],
        integrations: [
          { name: 'Google Maps', description: { en: 'Travel-time aware home-care scheduling', pt: 'Deslocamento no agendamento de home care' } },
          { name: 'WhatsApp', description: { en: 'Reminders and appointment confirmations', pt: 'Lembretes e confirmações de consulta' } },
          { name: 'Stripe', description: { en: 'Public trial and subscription billing', pt: 'Trial público e assinatura' } },
          { name: 'Cloudflare / Netlify', description: { en: 'Public edge at clinicsy.app', pt: 'Borda pública em clinicsy.app' } }
        ],
        quickStart: [
          { title: { en: 'Open Clinicsy', pt: 'Abrir Clinicsy' }, description: { en: 'Visit clinicsy.app', pt: 'Acesse clinicsy.app' } },
          { title: { en: 'Start the 14-day trial', pt: 'Começar os 14 dias grátis' }, description: { en: 'Create the clinic — no card required to look around', pt: 'Crie a clínica — sem cartão só para conhecer' } },
          { title: { en: 'Book the first visit', pt: 'Marcar o primeiro atendimento' }, description: { en: 'Add a patient and open the agenda', pt: 'Cadastre um paciente e abra a agenda' } }
        ],
        gettingStarted: {
          en: 'Clinicsy is our live SaaS for home care, consultórios, and clinics — get off spreadsheets. <a href="https://clinicsy.app" class="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">Start 14 days free at clinicsy.app</a>.',
          pt: 'Clinicsy é o nosso SaaS ao vivo para home care, consultório e clínica — sair da planilha. <a href="https://clinicsy.app" class="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">Comece 14 dias grátis em clinicsy.app</a>.'
        },
        mermaidDiagram: `
graph TD
    A[Clinic team] --> B[Clinicsy]
    B --> C[Smart agenda + Maps]
    B --> D[WhatsApp]
    B --> E[AI clinical notes]
    B --> F[Finance and sales]
    B --> G[Per-clinic LGPD data]
    style B fill:#06b6d4,stroke:#0891b2,color:#fff
`,
        demoUrl: 'https://clinicsy.app'
      },
      {
        id: 'vserver',
        category: 'product',
        title: {
          en: 'VServer — operate GPU machines',
          pt: 'VServer — operar máquinas com GPU'
        },
        shortName: {
          en: 'VServer',
          pt: 'VServer'
        },
        description: {
          en: 'Dashboard we built to operate GPU-oriented machines — local AI models or crypto mining — with real-time server monitoring at vserver.brenon.cloud.',
          pt: 'Dashboard que construímos para operar máquinas voltadas a GPU — modelos de IA local ou mineração de criptomoedas — com monitoramento em tempo real em vserver.brenon.cloud.'
        },
        icon: 'cube',
        color: 'red',
        learnMoreUrl: '/service?service=vserver',
        hostname: 'vserver.brenon.cloud',
        features: [
          { en: 'Real-time server monitoring dashboard', pt: 'Dashboard de monitoramento de servidor em tempo real' },
          { en: 'Operate machines aimed at GPU workloads', pt: 'Operar máquinas voltadas a workload em GPU' },
          { en: 'Local AI model workloads', pt: 'Workloads de modelos de IA local' },
          { en: 'Crypto mining workloads', pt: 'Workloads de mineração de criptomoedas' },
          { en: 'Public health API (v2)', pt: 'API pública de health (v2)' },
          { en: 'Authenticated metrics endpoint', pt: 'Endpoint de métricas autenticado' }
        ],
        useCases: [
          {
            title: { en: 'Run local AI on our GPUs', pt: 'Rodar IA local nas nossas GPUs' },
            description: {
              en: 'Use VServer to keep GPU boxes healthy while they serve local models — the same class of machines that already run STT/TTS stacks on the home lab.',
              pt: 'Use o VServer para manter as caixas de GPU saudáveis enquanto servem modelos locais — a mesma classe de máquina que já roda stacks de STT/TTS no lab.'
            }
          },
          {
            title: { en: 'Operate mining / GPU compute', pt: 'Operar mineração / compute de GPU' },
            description: {
              en: 'The same console is how we operate machines dedicated to GPU compute, including crypto mining, without treating them as just another Swarm service card.',
              pt: 'O mesmo console é como operamos máquinas dedicadas a compute de GPU, inclusive mineração, sem tratá-las só como mais um card de serviço Swarm.'
            }
          }
        ],
        integrations: [
          { name: 'GPU hosts', description: { en: 'NVIDIA RTX 3080 and RTX 5080 in the lab', pt: 'NVIDIA RTX 3080 e RTX 5080 no lab' } },
          { name: 'Health API', description: { en: 'Public /api/health on vserver.brenon.cloud', pt: '/api/health público em vserver.brenon.cloud' } },
          { name: 'Cloudflare', description: { en: 'Public edge at vserver.brenon.cloud', pt: 'Borda pública em vserver.brenon.cloud' } }
        ],
        quickStart: [
          { title: { en: 'Open VServer', pt: 'Abrir VServer' }, description: { en: 'Visit vserver.brenon.cloud', pt: 'Acesse vserver.brenon.cloud' } },
          { title: { en: 'Sign in', pt: 'Entrar' }, description: { en: 'The dashboard is gated; metrics need a token', pt: 'O dashboard é autenticado; métricas pedem token' } },
          { title: { en: 'Watch the host', pt: 'Acompanhar o host' }, description: { en: 'Use it to operate GPU AI or mining boxes', pt: 'Use para operar caixas de IA ou mineração' } }
        ],
        gettingStarted: {
          en: 'VServer is our console for GPU-oriented machines — local AI or mining — with live monitoring. <a href="https://vserver.brenon.cloud" class="text-red-400 hover:underline" target="_blank" rel="noopener noreferrer">Open vserver.brenon.cloud</a>.',
          pt: 'VServer é o nosso console para máquinas voltadas a GPU — IA local ou mineração — com monitoramento ao vivo. <a href="https://vserver.brenon.cloud" class="text-red-400 hover:underline" target="_blank" rel="noopener noreferrer">Abra vserver.brenon.cloud</a>.'
        },
        mermaidDiagram: `
graph TD
    A[Operator] --> B[VServer Dashboard]
    B --> C[GPU hosts]
    C --> D[Local AI models]
    C --> E[Crypto mining]
    B --> F[Health + metrics]
    style B fill:#dc2626,stroke:#b91c1c,color:#fff
`,
        demoUrl: 'https://vserver.brenon.cloud'
      },
      {
        id: 'draw',
        category: 'platform',
        title: {
          en: 'Draw — Excalidraw whiteboard',
          pt: 'Draw — whiteboard Excalidraw'
        },
        shortName: {
          en: 'Draw',
          pt: 'Draw'
        },
        description: {
          en: 'A self-hosted Excalidraw whiteboard we operate on Brenon.Cloud for hand-drawn diagrams, architecture sketches, and collaborative whiteboarding — available to any logged-in Brenon.Cloud account via Authentik.',
          pt: 'Whiteboard Excalidraw self-hosted que operamos no Brenon.Cloud para diagramas hand-drawn, rascunhos de arquitetura e colaboração — disponível para qualquer conta logada no Brenon.Cloud via Authentik.'
        },
        icon: 'workflow',
        color: 'cyan',
        learnMoreUrl: '/service?service=draw',
        image: 'https://draw.brenon.cloud/favicon.ico',
        hostname: 'draw.brenon.cloud',
        features: [
          { en: 'Excalidraw virtual whiteboard', pt: 'Whiteboard virtual Excalidraw' },
          { en: 'Hand-drawn style diagrams', pt: 'Diagramas com visual hand-drawn' },
          { en: 'Self-hosted on the home Swarm', pt: 'Self-hosted no Swarm home' },
          { en: 'Public HTTPS via Cloudflare', pt: 'HTTPS público via Cloudflare' },
          { en: 'Authentik SSO — any logged-in Brenon.Cloud account', pt: 'SSO Authentik — qualquer conta logada no Brenon.Cloud' },
          { en: 'Great for architecture and teaching notes', pt: 'Ótimo para arquitetura e anotações de aula' }
        ],
        useCases: [
          {
            title: { en: 'Sketch systems before coding', pt: 'Esboçar sistemas antes de codar' },
            description: {
              en: 'Drop boxes and arrows for Swarm topologies, service maps, and mentoring diagrams without leaving Brenon.Cloud.',
              pt: 'Jogue caixas e setas para topologias Swarm, mapas de serviço e diagramas de mentoria sem sair do Brenon.Cloud.'
            }
          },
          {
            title: { en: 'Teaching and pairing sessions', pt: 'Aulas e pair programming' },
            description: {
              en: 'Share a lightweight canvas during DevDojo sessions or design reviews.',
              pt: 'Compartilhe um canvas leve em sessões DevDojo ou design reviews.'
            }
          }
        ],
        integrations: [
          { name: 'Authentik', description: { en: 'SSO for any logged-in Brenon.Cloud account', pt: 'SSO para qualquer conta logada no Brenon.Cloud' } },
          { name: 'Docker Swarm', description: { en: 'Containerized Excalidraw stack', pt: 'Stack Excalidraw containerizada' } },
          { name: 'Cloudflare', description: { en: 'Edge at draw.brenon.cloud', pt: 'Borda em draw.brenon.cloud' } }
        ],
        quickStart: [
          { title: { en: 'Open Draw', pt: 'Abrir Draw' }, description: { en: 'Visit draw.brenon.cloud', pt: 'Acesse draw.brenon.cloud' } },
          { title: { en: 'Start sketching', pt: 'Começar a desenhar' }, description: { en: 'Use shapes, arrows, and text', pt: 'Use formas, setas e texto' } },
          { title: { en: 'Export if needed', pt: 'Exportar se quiser' }, description: { en: 'Save PNG/SVG from the toolbar', pt: 'Salve PNG/SVG pela toolbar' } }
        ],
        gettingStarted: {
          en: 'Draw is the Excalidraw whiteboard we operate on the home Swarm. Sign in with your Brenon.Cloud account and sketch. <a href="https://draw.brenon.cloud" class="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">Open the whiteboard</a>.',
          pt: 'Draw é o whiteboard Excalidraw que operamos no Swarm home. Entre com sua conta Brenon.Cloud e desenhe. <a href="https://draw.brenon.cloud" class="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">Abra o whiteboard</a>.'
        },
        mermaidDiagram: `
graph LR
    A[Browser] --> B[Authentik SSO]
    B --> C[draw.brenon.cloud]
    C --> D[Excalidraw]
    D --> E[Brenon.Cloud Swarm]
    style C fill:#06b6d4,stroke:#0891b2,color:#fff
    style B fill:#9333ea,stroke:#7c3aed,color:#fff
`,
        demoUrl: 'https://draw.brenon.cloud'
      }

    ]
  }
}

// Export singleton instance
export const servicesApi = new ServicesApiClient()
