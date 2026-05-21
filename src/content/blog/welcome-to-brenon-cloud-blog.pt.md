---
title: Bem-vindo ao Blog do Brenon.Cloud
description: Inaugurando o blog do Brenon.Cloud — o que esperar, como ele é construído e como publicar seus próprios artigos via issues do GitHub.
date: 2026-05-20
author: Brenon Araujo
tags: [anuncio, plataforma, brenon-cloud]
cover: /brenon-cloud-logo.png
---

# Sejam bem-vindos

O blog do **Brenon.Cloud** está no ar. Este é o lugar onde vamos compartilhar
mergulhos técnicos, lições aprendidas e guias práticos sobre rodar uma nuvem
pessoal em hardware comum.

## O que esperar

- **Mergulhos de arquitetura** dos serviços que compõem o Brenon.Cloud
- **Tutoriais** de Docker Swarm, Kong, Authentik, n8n, Grafana e companhia
- **Post-mortems** e notas de incidentes reais
- **Experimentos** com automação de borda e IA self-hosted

## Como os posts são publicados

Cada artigo é um arquivo Markdown em `src/content/blog/`. O site carrega
todos no build, lê o frontmatter, renderiza o conteúdo e adiciona à
listagem automaticamente.

Você também pode propor um post abrindo uma Issue com o template
**"📝 New blog post"** — preencha os campos, envie, e um mantenedor
converte em arquivo Markdown.

```yaml
---
title: Meu artigo incrível
description: Resumo curto usado nos cards e em SEO
date: 2026-05-20
tags: [docker, swarm]
---
```

### Múltiplos idiomas

O nome do arquivo define o idioma do post:

- `meu-post.md` → válido para qualquer idioma
- `meu-post.en.md` → versão em inglês
- `meu-post.pt.md` → versão em português

A página escolhe automaticamente a variante do idioma ativo e cai para
outra disponível quando a tradução ainda não existir.

Fique ligado!
