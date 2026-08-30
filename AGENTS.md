# brenon.cloud — contexto para agentes

> Site público (Vue 3 + Vite + Tailwind + vue-i18n) **e** console de membro
> (`/console`). Identidade = Authentik. Catálogo e billing = control plane.
> Dinheiro = Stripe conta **brenon.cloud**. Staff ≠ cliente.

Ler isto **antes** de tocar console, planos, SSO ou catálogo.
Skills: `brenon-cloud-site`, `brenon-cloud-sso`. Memória de decisões:
`docs/CONSOLE.md`.

## Repos irmãos (não misturar)

| Repo | Host / papel |
|------|----------------|
| `~/Projects/brenon.cloud` (este) | https://brenon.cloud — Netlify SPA |
| `~/Projects/brenon-cloud-control` | https://control.brenon.cloud — catálogo + billing |
| `~/Projects/brenon-cloud-identity` | Authentik as-code (`apply.py`) |
| `~/Projects/akash/akash-console-air` | https://akash.brenon.cloud — oauth2-proxy |

Control e identity **não têm remote GitHub**. Commits locais. Deploy Swarm
via Portainer (endpoint **3**, manager `192.168.1.101`).

## Dois catálogos

| Superfície | Fonte | Não é |
|------------|--------|--------|
| Home Products / Platform | `src/api/servicesApi.js` (marketing) | console |
| `/console` tiles + AuthMenu | `GET https://control.brenon.cloud/api/v1/catalog` | `servicesApi.js` |

Tile novo = `PUT /api/v1/services/{id}` no control plane. **Proibido**
inventar tile na SPA (`NATIVE_CONSOLE_APPS` / `mergeCatalog` foram
apagados). Fallback `src/config/console-registry.js` é só offline e
não pode criar ids que o catálogo live não tem.

`groups: ['*']` = qualquer sessão Authentik (Draw, Console Air).
Staff: `brenon-admins` / ops / viewers / builders / `api-owner`.
Authentik admin: só `brenon-admins`.

## Planos (membro)

| Plano | Preço | Hermes | Disco | Grupos Authentik |
|-------|-------|--------|-------|------------------|
| Free | R$ 0 | não | — | `plan-free` |
| Basic | R$ 29,90/mês | instância sua | 5 GB | `plan-basic` + `plan-hermes` (+ keep `plan-free`) |
| Pro | R$ 79,90/mês | instância sua | 20 GB | `plan-pro` + `plan-hermes` |

- Stripe merchant: `acct_1U9vRvDqpqiMC1rh` (**brenon.cloud**). Nunca Clinicsy, nunca brnnai.
- Prices: `price_1U9w2mDqpqiMC1rhF5fM9qYK` / `price_1U9w2xDqpqiMC1rhXYLTYm3U`.
- **Display** do chip/home: `displayPlan(groups, billing)` ← `GET /api/v1/billing/me` se `active|trialing|past_due`. JWT `all_groups` congela até re-login — **não** é SoT da etiqueta.
- Cache 24h: `localStorage` `brenon-console-plan:${email}` (`src/config/console-entitlement.mjs`). Primeiro paint já é o plano pago. `force` só em `?checkout=success`.
- `hermes-owner` é staff. Stripe **nunca** escreve isso.
- Cards de billing: não imprimir nomes de grupo. Promessa: instância Hermes **sua**, não o chat público.

## Console — arquivos

| Arquivo | Papel |
|---------|--------|
| `src/config/auth.js` | OIDC `home` / `brenon-cloud`, PKCE |
| `src/stores/authStore.js` | `oidc-client-ts` |
| `src/stores/consoleStore.js` | catálogo live as-is |
| `src/stores/entitlementStore.js` | plano Stripe + cache |
| `src/config/console-taxonomy.mjs` | `displayPlan`, staff vs customer, Hermes disk |
| `src/pages/console/Home.vue` | overview da **conta**, não billboard |
| `src/pages/console/Billing.vue` | Free/Basic/Pro; lê entitlement store; cards = `FALLBACK_PLANS` |
| `src/pages/console/Hermes.vue` | HaaS nativo (`/console/hermes`), não tile |
| `src/pages/console/Service.vue` | fatos reais (`console-service-facts.mjs`) |
| `src/layouts/ConsoleLayout.vue` | shell AWS; **sem** `transition mode="out-in"` |

Nav pública: um CTA **Acessar console**. Signup no Authentik. **Voltar ao site** no topbar, menu e sidebar.

## i18n

- Sempre `en.json` **e** `pt.json`.
- **Nunca `@` em string de `t()`** — vue-i18n linked message, componente vira `<!---->`.
- **Nunca `|` em string de `t()`** — pluralização; listas = JSON array + `tm()`.

## Git (este repo)

`feat/console-*` / `fix/console-*` a partir de `main` atualizado.
HTTPS `https://github.com/brenonaraujo/brenon.cloud.git`.
Não stagear games / path-to-glory / blog alheio.
Teste: `node --test test/*.test.mjs`.

## Regras de ouro

1. Catálogo do console = control plane. Sem bypass na SPA.
2. Authentik = IdP. Stripe = dinheiro. Control = cola (webhook → grupos + e-mail).
3. Uma conta Stripe por produto. Brenon Cloud ≠ brnnai ≠ Clinicsy.
4. Experiência fluida: sem tela vazia → pulo; sem `out-in`; plano vem do cache.
5. Não bannerar `Load failed` / `Failed to fetch` no billing.
6. Console Air exige login (oauth2-proxy `client_id=akash`). Anônimo bloqueado. Keplr depois.
7. Landings / TibiaPixel play / status / apex **públicos**. Não pôr oauth2-proxy no SPA.
8. Não inventar copy de produto — scrape o host live.
9. Segredos: `~/.hermes/secrets/brenon-control.env` + env do Swarm. Mesma cadência dos outros projetos. Nunca ecoar `sk_live`.
10. Deploy do control: imagem **linux/amd64**, `docker save` → Portainer `images/load` → PUT stack → `ForceUpdate++`. Tag `brenon-cloud-control:latest`. Stack id **185**.
