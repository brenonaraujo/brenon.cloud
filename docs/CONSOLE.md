# Console Brenon Cloud — memória de decisões

Consolidado após o ciclo console-as-cloud-provider (planos, Stripe, Air, UX).
Regras de trabalho no dia a dia: `AGENTS.md` na raiz. Isto é o **porquê**.

## Forma

Console de membro no estilo access portal (AWS): um login Authentik, tiles
pelo catálogo, billing e conta no mesmo shell. Site público continua público.

Home do console = overview da **conta** (saudação, plano, billing, alertas,
recents/favorites). User rejeitou billboard de produto / card gigante Hermes.

## Fontes de verdade

| Pergunta | Resposta |
|----------|----------|
| Quais tiles o membro vê? | `GET https://control.brenon.cloud/api/v1/catalog` + ACL de grupos |
| Qual o plano **escrito na UI**? | Stripe via `GET /api/v1/billing/me` (cache 24h) |
| Quais apps o OIDC libera? | Grupo Authentik + binding deny-by-default |
| Quem pagou? | Stripe `acct_1U9vRvDqpqiMC1rh` (brenon.cloud) |
| Quem é staff? | `brenon-admins` / ops / viewers / builders / `api-owner` / `hermes-owner` |

JWT `all_groups` **congela** até re-login. Depois do Checkout o chip tem que
mostrar Basic/Pro mesmo com `plan-free` no token. Por isso o display não
espera o IdP.

## O que não fazer (já quebramos)

- Inventar tile na SPA (`NATIVE_CONSOLE_APPS`). User: tudo vem do control.
- Features de plano com `"a|b|c"` no i18n — vue-i18n come tudo menos o último.
- Bannerar Safari `Load failed` quando billing/me 401 (oauth2-proxy).
- Deixar Checkout morto porque o scanner bloqueou a primeira escrita da sk —
  mesma cadência dos outros produtos: gravar em `brenon-control.env` **e** Swarm.
- `transition mode="out-in"` no router-view do console — tela em branco.
- Buscar `/billing/me` de novo em todo clique em Faturamento — pulo Free→Basic.
- Forçar re-login Authentik só para pintar o plano.
- Imprimir `plan-hermes` nos cards. Promessa: instância **sua**.
- Stripe Clinicsy / brnnai para este produto.
- `hermes-owner` no webhook.

## Hermes as a Service

Página nativa `/console/hermes`. Basic **5 GB**, Pro **20 GB**.
O membro cria **uma** instância; o host é `username.brenon.cloud`.
Edge Traefik (`haas-edge`, `:19080`) e túnel `*.brenon.cloud` já existem.
A API `GET/POST /api/v1/hermes/instances` está no repo do control plane —
precisa da imagem nova + skip-auth `api/v1/hermes/` no oauth2-proxy live.

## Console Air

Host `akash.brenon.cloud`. Qualquer plano logado (Free inclusive). Anônimo
bloqueado (oauth2-proxy, `client_id=akash`, porta host **13001**). Keplr
depois do Authentik. Tunnel CF → `192.168.1.102:13001`.

## E-mail

Boas-vindas no webhook `checkout.session.completed` via Resend,
`from` = `NEWSLETTER_FROM` (`Brenon.Cloud <news@brenon.cloud>`).
Não usar SendGrid/Clinicsy. Falha de e-mail **não** deve falhar o webhook
depois dos grupos.

## Deploy control (o que funciona)

1. `docker build --platform linux/amd64 -t brenon-cloud-control:latest` no Mac.
2. `docker save` → Portainer `POST /api/endpoints/3/docker/images/load`.
3. PUT stack **185** (não colar `stack.yml` do git se `DATABASE_URL` estiver
   interpolado — preservar Env live).
4. `ForceUpdate++` no service `brenon-control_api`.
5. Smoke: `GET /healthz` 200, `GET /api/v1/catalog` 200,
   `GET /api/v1/billing/plans` 200 (skip-auth).

Skip-auth live: `^/(healthz|api/v1/catalog|api/v1/billing/(webhook|plans|checkout|me|portal))`.
SSO `--allowed-group=brenon-admins`. Replica no manager. Porta publicada
**18088** (host mode no manager). CF 502 = origem down, não “código errado”.

Build **aarch64** no Docker Desktop quebra no Swarm amd64.

## Segredos

`~/.hermes/secrets/brenon-control.env`: DB, OIDC control, Authentik, Portainer,
Stripe sk/webhook/prices, Resend.
`brenon-cloud-stripe.env`: mirror Stripe.
Nunca commit. Nunca print `sk_live`.

## Próximo (ainda não feito)

- Enforcement de cota de disco 5/20 GB no volume.
- Policy Authentik hostname == username (hoje o OIDC do dashboard aceita o app `hermes-haas`).
- Re-login / silent renew para `all_groups` depois do pagamento.
- Customer Portal Stripe (configs estavam vazias na conta nova).
- Rotacionar sk se vazou em chat.
