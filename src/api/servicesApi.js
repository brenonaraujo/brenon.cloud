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
        title: {
          en: 'Docker Swarm Orchestration',
          pt: 'Orquestração Docker Swarm'
        },
        shortName: {
          en: 'Docker',
          pt: 'Docker'
        },
        description: {
          en: 'The infrastructure building block that provides enterprise-grade container orchestration using commodity hardware, delivering 90% cost savings compared to managed Kubernetes platforms',
          pt: 'O bloco de construção de infraestrutura que fornece orquestração de contêineres de nível empresarial usando hardware comum, entregando 90% de economia de custos comparado a plataformas Kubernetes gerenciadas'
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
              en: 'Run 10+ microservices on 2 mini PCs using efficient resource allocation. Each Golang service uses ~50MB RAM, Python APIs use ~100MB. Docker Swarm automatically schedules containers across nodes for optimal resource utilization.',
              pt: 'Execute mais de 10 microsserviços em 2 mini PCs usando alocação eficiente de recursos. Cada serviço Golang usa ~50MB de RAM, APIs Python usam ~100MB. Docker Swarm agenda automaticamente contêineres entre nós para utilização otimizada de recursos.'
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
      }
    ]
  }
}

// Export singleton instance
export const servicesApi = new ServicesApiClient()
