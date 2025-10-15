# Brenon.Cloud

[![Status](https://img.shields.io/website?down_message=offline&label=Status&up_message=online&url=https%3A%2F%2Fuptime.brenon.cloud%2Fstatus%2Fservices)](https://uptime.brenon.cloud/status/services)

Bem-vindo ao Brenon.Cloud, seu portal para uma nuvem pessoal segura e integrada! Este projeto é dedicado a construir um ecossistema de nuvem pessoal poderoso, privado e confiável.

## Sobre o Projeto

Brenon.Cloud começou com a visão de liberdade tecnológica acessível, inicialmente rodando em apenas dois minicomputadores. Agora, está evoluindo para incluir serviços robustos, capacitando você a criar um ecossistema digital verdadeiramente integrado e seguro. Junte-se a nós na definição do futuro de soluções de nuvem pessoal descentralizadas, rápidas e confiáveis.

O objetivo é fornecer um launchpad para construir uma nuvem pessoal poderosa, privada e confiável, expandindo para incluir gerenciamento de identidade com Authentik e orquestração de API com Kong.

## Serviços Hospedados

Atualmente, o Brenon.Cloud hospeda os seguintes serviços de código aberto:

### Serviços Atuais
* **n8n**: Ferramenta de Automação de Fluxo de Trabalho.
    * Acesse em: `https://n8n.brenon.cloud`
* **Uptime Kuma**: Monitoramento e Verificações de Uptime.
    * Acesse em: `https://uptime.brenon.cloud`
    * Página de status: `https://uptime.brenon.cloud/status/services`
* **Grafana**: Plataforma de Análise e Monitoramento.
    * Acesse em: `https://grafana.brenon.cloud`

### Novos Serviços em Implantação
* **Authentik**: Provedor de Identidade (IDP) centralizado para gerenciamento de identidade e acesso, habilitando Single Sign-On (SSO).
* **Kong API**: Gateway de API para gerenciar, proteger e orquestrar APIs, facilitando a integração entre serviços e fornecendo controle de tráfego robusto.

## Visão

A visão do Brenon.Cloud é expandir e incluir serviços robustos como gerenciamento de identidade e orquestração de APIs, capacitando os usuários a criar um ecossistema digital verdadeiramente integrado e seguro. O projeto visa moldar o futuro das soluções de nuvem pessoal descentralizadas, rápidas e confiáveis.

## Acesso e Contato

* **Website Principal**: [https://brenon.cloud](https://brenon.cloud)
* **Página de Status dos Serviços**: [https://uptime.brenon.cloud/status/services](https://uptime.brenon.cloud/status/services)
* **Repositório GitHub**: [https://github.com/brenonaraujo/brenon.cloud](https://github.com/brenonaraujo/brenon.cloud)
* **LinkedIn do Autor**: [https://www.linkedin.com/in/brenonaraujo](https://www.linkedin.com/in/brenonaraujo)

## Tecnologias da Aplicação Web

Esta landing page é construída usando tecnologias modernas de desenvolvimento web:

* **Vue 3** - Framework JavaScript progressivo com Composition API
* **Vite** - Ferramenta de build rápida com Hot Module Replacement
* **Pinia** - Gerenciamento de estado oficial do Vue
* **Vue Router** - Roteamento SPA
* **Vue I18n** - Internacionalização (Português/Inglês)
* **Tailwind CSS** - Framework CSS utility-first
* **Mermaid** - Renderização de diagramas

### Arquitetura
O projeto implementa **Clean Architecture** com separação de responsabilidades em camadas, injeção de dependências e princípios SOLID. 

📖 **Para detalhes completos da arquitetura, consulte [ARCHITECTURE.md](./ARCHITECTURE.md)**

## Desenvolvimento Local

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação e Execução

```bash
# Clone o repositório
git clone https://github.com/brenonaraujo/brenon.cloud.git
cd brenon.cloud

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev

# Ou use a task configurada (inclui watch do Tailwind)
npm run tailwind:watch
```

A aplicação estará disponível em `http://localhost:5173`

### Scripts Disponíveis

```bash
npm run dev        # Servidor de desenvolvimento com HMR
npm run build      # Build para produção
npm run preview    # Preview do build de produção
```

## Deploy

### Netlify (Atual)
Este projeto está configurado para deploy automático no Netlify:

- **URL de Produção**: [https://brenon.cloud](https://brenon.cloud)
- **Configuração**: `netlify.toml` na raiz do projeto
- **Deploy**: Automático via integração GitHub
- **Redirects**: SPA routing configurado para `/index.html`

### Deploy Manual
Para fazer deploy em outros provedores:

```bash
# Build para produção
npm run build

# Arquivos estáticos gerados em ./dist/
# Faça upload da pasta dist/ para seu provedor de hospedagem
```

### Variáveis de Ambiente
Configure as seguintes variáveis conforme necessário:
- `VITE_API_BASE_URL` - URL base da API (quando implementada)

---

&copy; 2024 Brenon.Cloud - Todos os direitos reservados.
