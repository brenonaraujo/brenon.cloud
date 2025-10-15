/* Simple client-side i18n for Brenon.Cloud */
(function () {
  const storeKey = 'lang';
  const supported = ['en', 'pt-br', 'es'];

  const translations = {
    en: {
      nav: {
        how: 'How it works',
        services: 'Services',
        status: 'Status',
      },
      hero: {
        title: 'Welcome to Brenon.Cloud',
        subtitle: 'Your gateway to a secure, minimal, and integrated personal cloud.',
        ctaStart: 'Get started',
        ctaExplore: 'Explore services',
      },
      sections: {
        how: {
          title: 'Deploy, deliver, and self‑manage your services',
          intro: 'Use Brenon.Cloud building blocks to run personal services end‑to‑end with security, routing, automation, and observability.',
          learnMore: 'Learn more',
          flow: ['Auth', 'Edge', 'Deploy', 'Monitor', 'Dashboards', 'Automate'],
          cards: {
            authentikTitle: 'Identity & Access (Authentik)',
            authentikDesc: 'Centralize login with SSO, MFA, and fine‑grained policies for your apps and services.',
            kongTitle: 'API & Edge (Kong)',
            kongDesc: 'Secure and route traffic, apply auth and rate‑limits, and expose services safely to the web.',
            dockerTitle: 'Deployments (Docker)',
            dockerDesc: 'Package services as containers or Compose stacks and run them reliably on Brenon.Cloud.',
            kumaTitle: 'Monitoring (Uptime Kuma)',
            kumaDesc: 'Track availability and response times with alerts to your preferred channels.',
            grafanaTitle: 'Dashboards (Grafana)',
            grafanaDesc: 'Visualize metrics and logs across services with reusable, shareable dashboards.',
            n8nTitle: 'Automation (n8n)',
            n8nDesc: 'Automate tasks with visual workflows that connect APIs, databases, and services.',
          },
        },
        services: { title: 'Open Source Services' },
        docker: {
          title: 'Deploy Any Service with Docker',
          intro: 'We run Docker Swarm on a cluster of mini‑computer nodes and manage it with Portainer. Deploy Compose stacks, scale replicas, and roll out zero‑downtime updates from a simple UI.',
          card1Title: 'Managed with Portainer',
          card1Desc: 'Visual UI to deploy and manage Swarm stacks, networks, volumes, and secrets across nodes.',
          card2Title: 'Swarm Stacks',
          card2Desc: 'Compose v3 with deploy policies, health checks, and rolling updates for reliable releases.',
          card3Title: 'Scalable & Resilient',
          card3Desc: 'Scale replicas per service and leverage node failover to keep apps available.',
          ctaDocker: 'Learn more about Docker deployments',
          ctaPortainer: 'How we use Portainer',
          ctaOpenPortainer: 'Open Portainer',
          flow: ['Write compose', 'Deploy as Swarm stack', 'Scale replicas', 'Rolling update', 'Monitor & dashboards'],
        },
        about: {
          title: 'About',
          text: 'Brenon.Cloud is your launchpad for building a powerful, private, and reliable personal cloud. What started with a vision of affordable technological freedom on just two mini computers is now evolving. We\'re expanding to include robust services like identity management with Authentik and API orchestration with Kong, empowering you to create a truly integrated and secure digital ecosystem. Join us in shaping the future of decentralized, fast, and dependable personal cloud solutions.',
        },
      },
      cards: {
        n8nDesc: 'Workflow Automation Tool',
        kumaDesc: 'Monitoring and Uptime Checks',
        grafanaDesc: 'Analytics and Monitoring Platform',
      },
      footer: { rights: 'All rights reserved.' },
      ui: {
        back: 'Back to Home',
        whatIs: 'What is {name}?',
        howItWorks: 'How it works',
        deployWithDocker: 'Deploy with Docker',
        keyFeatures: 'Key features',
        relatedLinks: 'Related links',
        officialDocs: 'Official Docs',
        statusPage: 'Brenon.Cloud Status',
        launchService: 'Launch Service',
        documentation: 'Documentation',
        serviceStatus: 'Service Status',
        available: 'Available',
        planned: 'Coming soon',
        unknown: 'Unknown',
        notFoundTitle: 'Service not found',
        notFoundSubtitle: 'Choose a service from the list below.',
        tryThese: 'Try one of these:',
      },
      service: {
        n8n: {
          tagline: 'Workflow automation for your stack',
          what: 'n8n is an extensible workflow automation platform. Connect APIs, databases, and services to orchestrate tasks with triggers and nodes.',
          how: [
            'Build flows visually with nodes for common services and protocols.',
            'Trigger via schedules, webhooks, or events and pass data through steps.',
            'Self-hosted for full control over data and integrations.',
          ],
          features: ['Hundreds of prebuilt nodes', 'Webhooks and cron triggers', 'Secrets and credentials management', 'Scales horizontally'],
        },
        'uptime-kuma': {
          tagline: 'Uptime monitoring and alerts',
          what: 'Uptime Kuma is a self-hosted monitoring tool that tracks service availability, latency, and incidents with notifications.',
          how: ['Create monitors for HTTP(S), TCP, Ping, and more.', 'Receive alerts via Telegram, Discord, email, and other channels.', 'Visualize historic uptime and response times.'],
          features: ['Multiple monitor types', 'Notification integrations', 'Status pages', 'Lightweight and self-hosted'],
        },
        grafana: {
          tagline: 'Dashboards and analytics',
          what: 'Grafana visualizes metrics and logs from many data sources to build interactive dashboards and alerts.',
          how: ['Connect data sources like Prometheus, Loki, InfluxDB, and PostgreSQL.', 'Build dashboards with panels, queries, and variables.', 'Set alert rules and notifications for critical signals.'],
          features: ['Rich panels and plugins', 'Alerting and annotations', 'User and team permissions'],
        },
        authentik: {
          tagline: 'Identity Provider (IdP) and SSO',
          what: 'Authentik is an open-source identity provider offering Single Sign-On, MFA, and access policies for modern applications.',
          how: ['Integrates with apps using OIDC, SAML, and LDAP.', 'Manages users, groups, and policies centrally.', 'Supports MFA and device trust for better security.'],
          features: ['OIDC/SAML support', 'MFA and policies', 'Self-service portal'],
        },
        kong: {
          tagline: 'Secure, manage, and observe APIs',
          what: 'Kong Gateway provides routing, authentication, rate limiting, and observability for APIs and microservices.',
          how: ['Proxy inbound requests to upstream services with plugins for auth and policies.', 'Manage configuration declaratively or via Admin API.', 'Collect metrics and logs to monitor API traffic.'],
          features: ['High-performance proxy', 'Rich plugin ecosystem', 'Declarative config'],
        },
        docker: {
          tagline: 'Bring your own container to Brenon.Cloud',
          what: 'Deploy any containerized application on Brenon.Cloud. We support Docker and Docker Compose for consistent, repeatable deployments.',
          how: ['Package your app as a Docker image locally or from a registry.', 'Define services, networks, and volumes using Docker Compose.', 'Integrate with our monitoring (Uptime Kuma) and dashboards (Grafana).'],
          features: ['Fast rollouts and rollbacks', 'Isolated runtime per service', 'Easy observability integrations'],
        },
        portainer: {
          tagline: 'UI to manage Docker Swarm and deploy stacks',
          what: 'Portainer provides a simple UI to operate our Docker Swarm cluster: deploy Compose stacks, manage networks/volumes/secrets, and control access.',
          how: ['Create and update Swarm stacks using Compose files with deploy policies.', 'Scale services and perform rolling updates directly from the UI.', 'Manage registries, secrets, configs, and node placement constraints.'],
          features: ['Multi-node Swarm management', 'Stack templates and versioning', 'RBAC, teams, and audit-friendly operations'],
        },
      },
    },
    'pt-br': {
      nav: { how: 'Como funciona', services: 'Serviços', status: 'Status' },
      hero: {
        title: 'Bem-vindo ao Brenon.Cloud',
        subtitle: 'Seu portal para uma nuvem pessoal segura, minimalista e integrada.',
        ctaStart: 'Começar',
        ctaExplore: 'Explorar serviços',
      },
      sections: {
        how: {
          title: 'Implemente, entregue e auto‑gerencie seus serviços',
          intro: 'Use os blocos do Brenon.Cloud para executar serviços pessoais de ponta a ponta com segurança, roteamento, automação e observabilidade.',
          learnMore: 'Saiba mais',
          flow: ['Autenticação', 'Borda', 'Deploy', 'Monitorar', 'Dashboards', 'Automatizar'],
          cards: {
            authentikTitle: 'Identidade e Acesso (Authentik)',
            authentikDesc: 'Centralize o login com SSO, MFA e políticas detalhadas para seus apps e serviços.',
            kongTitle: 'API e Borda (Kong)',
            kongDesc: 'Proteja e roteie tráfego, aplique autenticação e limites, e exponha serviços com segurança.',
            dockerTitle: 'Implantações (Docker)',
            dockerDesc: 'Empacote serviços como contêineres ou pilhas Compose e execute com confiabilidade no Brenon.Cloud.',
            kumaTitle: 'Monitoramento (Uptime Kuma)',
            kumaDesc: 'Acompanhe disponibilidade e tempo de resposta com alertas para seus canais preferidos.',
            grafanaTitle: 'Dashboards (Grafana)',
            grafanaDesc: 'Visualize métricas e logs com dashboards reutilizáveis e compartilháveis.',
            n8nTitle: 'Automação (n8n)',
            n8nDesc: 'Automatize tarefas com fluxos visuais conectando APIs, bancos de dados e serviços.',
          },
        },
        services: { title: 'Serviços Open Source' },
        docker: {
          title: 'Implemente qualquer serviço com Docker',
          intro: 'Executamos Docker Swarm em um cluster de mini‑computadores e gerenciamos com o Portainer. Faça deploy de pilhas Compose, escale réplicas e realize atualizações sem downtime por uma UI simples.',
          card1Title: 'Gerenciado com Portainer',
          card1Desc: 'UI visual para implantar e gerenciar pilhas Swarm, redes, volumes e segredos entre nós.',
          card2Title: 'Pilhas Swarm',
          card2Desc: 'Compose v3 com políticas de deploy, health checks e atualizações rolling para releases confiáveis.',
          card3Title: 'Escalável e Resiliente',
          card3Desc: 'Escale réplicas por serviço e use failover de nós para manter os apps disponíveis.',
          ctaDocker: 'Saiba mais sobre implantações Docker',
          ctaPortainer: 'Como usamos o Portainer',
          ctaOpenPortainer: 'Abrir Portainer',
          flow: ['Escrever compose', 'Deploy como pilha Swarm', 'Escalar réplicas', 'Rolling update', 'Monitorar e dashboards'],
        },
        about: {
          title: 'Sobre',
          text: 'O Brenon.Cloud é sua plataforma para construir uma nuvem pessoal poderosa, privada e confiável. O que começou com o objetivo de liberdade tecnológica acessível em apenas dois mini computadores está evoluindo. Estamos expandindo com serviços robustos como gestão de identidade com o Authentik e orquestração de APIs com o Kong, permitindo um ecossistema digital realmente integrado e seguro. Junte‑se a nós para moldar o futuro de soluções de nuvem pessoal descentralizadas, rápidas e confiáveis.',
        },
      },
      cards: {
        n8nDesc: 'Ferramenta de automação de fluxos',
        kumaDesc: 'Monitoramento e verificação de uptime',
        grafanaDesc: 'Análise e plataforma de monitoramento',
      },
      footer: { rights: 'Todos os direitos reservados.' },
      ui: {
        back: 'Voltar para a Home',
        whatIs: 'O que é {name}?',
        howItWorks: 'Como funciona',
        deployWithDocker: 'Implantar com Docker',
        keyFeatures: 'Principais recursos',
        relatedLinks: 'Links relacionados',
        officialDocs: 'Documentação oficial',
        statusPage: 'Status Brenon.Cloud',
        launchService: 'Abrir serviço',
        documentation: 'Documentação',
        serviceStatus: 'Status do serviço',
        available: 'Disponível',
        planned: 'Em breve',
        unknown: 'Desconhecido',
        notFoundTitle: 'Serviço não encontrado',
        notFoundSubtitle: 'Escolha um serviço na lista abaixo.',
        tryThese: 'Tente um destes:',
      },
      service: {
        n8n: {
          tagline: 'Automação de fluxos para seu stack',
          what: 'n8n é uma plataforma extensível de automação de fluxos. Conecte APIs, bancos de dados e serviços para orquestrar tarefas com gatilhos e nós.',
          how: ['Monte fluxos visualmente com nós para serviços e protocolos comuns.', 'Dispare por agendamentos, webhooks ou eventos e passe dados entre etapas.', 'Hospedagem própria para controle total de dados e integrações.'],
          features: ['Centenas de nós prontos', 'Webhooks e cron', 'Gestão de segredos e credenciais', 'Escala horizontal'],
        },
        'uptime-kuma': {
          tagline: 'Monitoramento e alertas de disponibilidade',
          what: 'Uptime Kuma é uma ferramenta auto-hospedada que acompanha disponibilidade, latência e incidentes com notificações.',
          how: ['Crie monitores HTTP(S), TCP, Ping e mais.', 'Receba alertas por Telegram, Discord, e-mail e outros canais.', 'Veja histórico de uptime e tempos de resposta.'],
          features: ['Vários tipos de monitor', 'Integrações de notificação', 'Páginas de status', 'Leve e auto-hospedado'],
        },
        grafana: {
          tagline: 'Dashboards e análises',
          what: 'Grafana visualiza métricas e logs de várias fontes para criar dashboards e alertas.',
          how: ['Conecte Prometheus, Loki, InfluxDB, PostgreSQL e outros.', 'Monte dashboards com painéis, queries e variáveis.', 'Defina alertas e notificações para sinais críticos.'],
          features: ['Painéis e plugins ricos', 'Alertas e anotações', 'Permissões por usuário e equipe'],
        },
        authentik: {
          tagline: 'Provedor de Identidade (IdP) e SSO',
          what: 'Authentik é um IdP open source com SSO, MFA e políticas de acesso para apps modernos.',
          how: ['Integra com OIDC, SAML e LDAP.', 'Gerencia usuários, grupos e políticas centralmente.', 'Suporta MFA e confiança de dispositivo.'],
          features: ['Suporte a OIDC/SAML', 'MFA e políticas', 'Portal de autoatendimento'],
        },
        kong: {
          tagline: 'Proteja, gerencie e observe APIs',
          what: 'Kong Gateway fornece roteamento, autenticação, rate limiting e observabilidade para APIs e microsserviços.',
          how: ['Proxy de requisições com plugins para autenticação e políticas.', 'Gerencie via configuração declarativa ou Admin API.', 'Colete métricas e logs para monitorar o tráfego.'],
          features: ['Proxy de alta performance', 'Ecossistema de plugins', 'Configuração declarativa'],
        },
        docker: {
          tagline: 'Traga seu próprio contêiner ao Brenon.Cloud',
          what: 'Implante qualquer aplicativo conteinerizado no Brenon.Cloud. Suportamos Docker e Docker Compose para deploys consistentes e repetíveis.',
          how: ['Empacote sua app como imagem local ou do registro.', 'Defina serviços, redes e volumes com Compose.', 'Integre com nosso monitoramento (Uptime Kuma) e dashboards (Grafana).'],
          features: ['Releases e rollbacks rápidos', 'Isolamento por serviço', 'Integrações de observabilidade'],
        },
        portainer: {
          tagline: 'UI para gerenciar Swarm e implantar pilhas',
          what: 'Portainer oferece uma UI simples para operar nosso cluster Docker Swarm: implantar pilhas Compose, gerenciar redes/volumes/segredos e controlar acesso.',
          how: ['Crie e atualize pilhas Swarm com Compose e políticas de deploy.', 'Escale serviços e faça rolling updates pela própria UI.', 'Gerencie registros, segredos, configs e restrições de posicionamento.'],
          features: ['Gestão de múltiplos nós', 'Modelos e versionamento de pilhas', 'RBAC e operações auditáveis'],
        },
      },
    },
    es: {
      nav: { how: 'Cómo funciona', services: 'Servicios', status: 'Estado' },
      hero: {
        title: 'Bienvenido a Brenon.Cloud',
        subtitle: 'Tu puerta de entrada a una nube personal segura, minimalista e integrada.',
        ctaStart: 'Comenzar',
        ctaExplore: 'Explorar servicios',
      },
      sections: {
        how: {
          title: 'Implementa, entrega y autogestiona tus servicios',
          intro: 'Usa los bloques de Brenon.Cloud para operar servicios personales de extremo a extremo con seguridad, enrutamiento, automatización y observabilidad.',
          learnMore: 'Saber más',
          flow: ['Autenticación', 'Perímetro', 'Desplegar', 'Monitorizar', 'Tableros', 'Automatizar'],
          cards: {
            authentikTitle: 'Identidad y Acceso (Authentik)',
            authentikDesc: 'Centraliza el inicio de sesión con SSO, MFA y políticas detalladas para tus apps y servicios.',
            kongTitle: 'API y Perímetro (Kong)',
            kongDesc: 'Asegura y enruta el tráfico, aplica autenticación y límites, y expón servicios de forma segura.',
            dockerTitle: 'Despliegues (Docker)',
            dockerDesc: 'Empaqueta servicios como contenedores o pilas Compose y ejecútalos de forma confiable en Brenon.Cloud.',
            kumaTitle: 'Monitoreo (Uptime Kuma)',
            kumaDesc: 'Controla disponibilidad y tiempos de respuesta con alertas a tus canales preferidos.',
            grafanaTitle: 'Tableros (Grafana)',
            grafanaDesc: 'Visualiza métricas y logs con tableros reutilizables y compartibles.',
            n8nTitle: 'Automatización (n8n)',
            n8nDesc: 'Automatiza tareas con flujos visuales que conectan APIs, bases de datos y servicios.',
          },
        },
        services: { title: 'Servicios de Código Abierto' },
        docker: {
          title: 'Despliega cualquier servicio con Docker',
          intro: 'Ejecutamos Docker Swarm en un clúster de mini‑computadoras y lo gestionamos con Portainer. Despliega pilas Compose, escala réplicas y realiza actualizaciones sin interrupciones desde una interfaz simple.',
          card1Title: 'Gestionado con Portainer',
          card1Desc: 'Interfaz visual para desplegar y gestionar pilas Swarm, redes, volúmenes y secretos entre nodos.',
          card2Title: 'Pilas Swarm',
          card2Desc: 'Compose v3 con políticas de despliegue, health checks y actualizaciones continuas para lanzamientos confiables.',
          card3Title: 'Escalable y Resiliente',
          card3Desc: 'Escala réplicas por servicio y aprovecha el failover de nodos para mantener las apps disponibles.',
          ctaDocker: 'Saber más sobre despliegues Docker',
          ctaPortainer: 'Cómo usamos Portainer',
          ctaOpenPortainer: 'Abrir Portainer',
          flow: ['Escribir compose', 'Desplegar como pila Swarm', 'Escalar réplicas', 'Actualización continua', 'Monitoreo y tableros'],
        },
        about: {
          title: 'Acerca de',
          text: 'Brenon.Cloud es tu plataforma para construir una nube personal potente, privada y confiable. Lo que empezó con una visión de libertad tecnológica asequible en solo dos mini computadoras ahora está evolucionando. Estamos ampliando con servicios sólidos como gestión de identidad con Authentik y orquestación de APIs con Kong, para crear un ecosistema digital verdaderamente integrado y seguro. Únete a nosotros para dar forma al futuro de soluciones de nube personal descentralizadas, rápidas y confiables.',
        },
      },
      cards: {
        n8nDesc: 'Herramienta de automatización de flujos',
        kumaDesc: 'Monitoreo y verificación de disponibilidad',
        grafanaDesc: 'Plataforma de análisis y monitoreo',
      },
      footer: { rights: 'Todos los derechos reservados.' },
      ui: {
        back: 'Volver al Inicio',
        whatIs: '¿Qué es {name}?',
        howItWorks: 'Cómo funciona',
        deployWithDocker: 'Desplegar con Docker',
        keyFeatures: 'Funciones clave',
        relatedLinks: 'Enlaces relacionados',
        officialDocs: 'Documentación oficial',
        statusPage: 'Estado de Brenon.Cloud',
        launchService: 'Abrir servicio',
        documentation: 'Documentación',
        serviceStatus: 'Estado del servicio',
        available: 'Disponible',
        planned: 'Próximamente',
        unknown: 'Desconocido',
        notFoundTitle: 'Servicio no encontrado',
        notFoundSubtitle: 'Elige un servicio de la lista abajo.',
        tryThese: 'Prueba uno de estos:',
      },
      service: {
        n8n: {
          tagline: 'Automatización de flujos para tu stack',
          what: 'n8n es una plataforma extensible de automatización. Conecta APIs, bases de datos y servicios para orquestar tareas con disparadores y nodos.',
          how: ['Crea flujos visualmente con nodos para servicios y protocolos comunes.', 'Dispara por horarios, webhooks o eventos y pasa datos entre pasos.', 'Autoalojado para control total de datos e integraciones.'],
          features: ['Cientos de nodos listos', 'Webhooks y cron', 'Gestión de secretos y credenciales', 'Escala horizontalmente'],
        },
        'uptime-kuma': {
          tagline: 'Monitoreo y alertas de disponibilidad',
          what: 'Uptime Kuma es una herramienta autoalojada que rastrea disponibilidad, latencia e incidentes con notificaciones.',
          how: ['Crea monitores HTTP(S), TCP, Ping y más.', 'Recibe alertas por Telegram, Discord, correo y otros.', 'Visualiza histórico de disponibilidad y tiempos de respuesta.'],
          features: ['Varios tipos de monitores', 'Integraciones de notificación', 'Páginas de estado', 'Ligero y autoalojado'],
        },
        grafana: {
          tagline: 'Tableros y analítica',
          what: 'Grafana visualiza métricas y logs de muchas fuentes para construir tableros interactivos y alertas.',
          how: ['Conecta Prometheus, Loki, InfluxDB, PostgreSQL, etc.', 'Construye tableros con paneles, consultas y variables.', 'Define alertas y notificaciones para señales críticas.'],
          features: ['Paneles y plugins ricos', 'Alertas y anotaciones', 'Permisos por usuario y equipo'],
        },
        authentik: {
          tagline: 'Proveedor de Identidad (IdP) y SSO',
          what: 'Authentik es un IdP de código abierto con SSO, MFA y políticas de acceso para apps modernas.',
          how: ['Se integra con OIDC, SAML y LDAP.', 'Gestiona usuarios, grupos y políticas centralmente.', 'Soporta MFA y confianza de dispositivo.'],
          features: ['Soporte OIDC/SAML', 'MFA y políticas', 'Portal de autoservicio'],
        },
        kong: {
          tagline: 'Asegura, gestiona y observa APIs',
          what: 'Kong Gateway proporciona enrutamiento, autenticación, limitación de tasa y observabilidad para APIs y microservicios.',
          how: ['Proxy de solicitudes con plugins para autenticación y políticas.', 'Gestiona por configuración declarativa o Admin API.', 'Recolecta métricas y logs para monitorear el tráfico.'],
          features: ['Proxy de alto rendimiento', 'Ecosistema de plugins', 'Configuración declarativa'],
        },
        docker: {
          tagline: 'Trae tu propio contenedor a Brenon.Cloud',
          what: 'Despliega cualquier aplicación contenedorizada en Brenon.Cloud. Soportamos Docker y Docker Compose para despliegues consistentes y repetibles.',
          how: ['Empaqueta tu app como imagen local o del registro.', 'Define servicios, redes y volúmenes con Compose.', 'Integra con nuestro monitoreo (Uptime Kuma) y tableros (Grafana).'],
          features: ['Lanzamientos y reversiones rápidas', 'Ejecución aislada por servicio', 'Integraciones de observabilidad'],
        },
        portainer: {
          tagline: 'UI para gestionar Swarm y desplegar pilas',
          what: 'Portainer ofrece una interfaz simple para operar nuestro clúster Docker Swarm: desplegar pilas Compose, gestionar redes/volúmenes/secretos y controlar acceso.',
          how: ['Crea y actualiza pilas Swarm con Compose y políticas de despliegue.', 'Escala servicios y realiza actualizaciones continuas desde la UI.', 'Gestiona registros, secretos, configs y restricciones de ubicación.'],
          features: ['Gestión multinodo', 'Plantillas y versionado de pilas', 'RBAC y operaciones auditables'],
        },
      },
    },
  };

  function getLangFromEnv() {
    if (typeof window !== 'undefined' && window.__forceLang && supported.includes(window.__forceLang)) {
      return window.__forceLang;
    }
    const urlLang = new URL(window.location.href).searchParams.get('lang');
    if (urlLang && supported.includes(urlLang.toLowerCase())) return urlLang.toLowerCase();
    const saved = localStorage.getItem(storeKey);
    if (saved && supported.includes(saved)) return saved;
    const nav = (navigator.language || 'en').toLowerCase();
    if (nav.startsWith('pt')) return 'pt-br';
    if (nav.startsWith('es')) return 'es';
    return 'en';
  }

  function setHtmlLang(lang) {
    document.documentElement.setAttribute('lang', lang);
  }

  function get(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
  }

  function format(str, params) {
    if (!params) return str;
    return str.replace(/\{(\w+)\}/g, (_, k) => (params[k] != null ? params[k] : ''));
  }

  const i18n = {
    lang: 'en',
    t(key, params) {
      const val = get(translations[this.lang] || {}, key);
      const fallback = get(translations['en'], key);
      const out = val !== undefined ? val : fallback !== undefined ? fallback : key;
      if (Array.isArray(out)) return out; // arrays returned as-is
      return typeof out === 'string' ? format(out, params) : out;
    },
    apply(root = document) {
      root.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        const nameParam = el.getAttribute('data-i18n-name') || '';
        const value = this.t(key, nameParam ? { name: nameParam } : undefined);
        if (value != null && !Array.isArray(value)) el.textContent = value;
      });
    },
    init() {
      this.lang = getLangFromEnv();
      setHtmlLang(this.lang);
      this.apply();
      const sel = document.getElementById('lang-select');
      if (sel) {
        sel.value = this.lang;
        sel.addEventListener('change', (e) => {
          const lang = e.target.value;
          if (!supported.includes(lang)) return;
          this.setLang(lang);
        });
      }
    },
    setLang(lang) {
      this.lang = lang;
      localStorage.setItem(storeKey, lang);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lang);
      window.history.replaceState({}, '', url.toString());
      setHtmlLang(lang);
      this.apply();
      window.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang } }));
    },
  };

  window.i18n = i18n;
})();
