# Hermes as a Service — SPEC funcional

Brenon Cloud vende **uma instância Hermes só sua**, não o chat público.
Este documento descreve o produto. Detalhe de implementação:
`~/Projects/brenon-cloud-control/AGENTS.md`.

## Visão

Quem paga Basic ou Pro cria **um** agente Hermes isolado, acessível em
`https://<nome-publico>.brenon.cloud`, com o mesmo login Authentik da
console. O nome público é escolhido na criação (padrão: username da
conta) e pode ser mudado depois. Webhooks e canais (Telegram e o que o
membro conectar) já nascem ligados a esse host. Free não cria instância.

## Personas

| Persona | Objetivo |
|---------|----------|
| Assinante (Basic / Pro) | Criar a instância, abrir o dashboard, colar token do Telegram, apontar webhooks |
| Free | Ver a página travada e o caminho para Billing |
| Operador (`hermes-owner` / `brenon-admins`) | Ver todas as instâncias, abrir qualquer uma depois do login, nunca é um plano Stripe |

## Glossário

- **Instância** — um Hermes só daquela conta (disco, memória, skills, gateway).
- **Subdomínio** — `{nome}.brenon.cloud`, escolhido na criação (padrão: username Authentik).
- **Nome reservado** — host já usado pela plataforma (`auth`, `control`, `hermes`, …).
- **Webhook público** — URL HTTPS no subdomínio do membro para GitHub, Stripe, Telegram, etc.

## Regras

1. Free não provisiona. Basic (5 GB) e Pro (20 GB) sim. Operador pode
   provisionar para operar, Stripe nunca grava `hermes-owner`.
2. Uma instância viva por conta. O subdomínio é o nome público escolhido
   na criação (padrão: username sanitizado); se colidir com nome
   reservado, a criação é recusada. Dá para mudar depois; o endereço
   antigo para de abrir.
3. Login humano é **só Authentik**. Sem formulário Hermes, sem Nous Portal
   como identidade do cliente. Depois do SSO, o host tem de pertencer
   àquela conta (operador pode impersonar, com auditoria).
4. Landings públicas continuam públicas. A **raiz** de
   `username.brenon.cloud` é a página do membro (padrão Brenon Cloud,
   HTML próprio, ou 404). Pode exigir login Brenon Cloud. Hermes e
   webhooks **não** são essa página — ficam em `/hermes` e `/hermes/hooks`.
5. Cancelar o plano remove o direito de uso; o disco não vaza para outro
   membro.
6. A console **não inventa** lista de agents. Só mostra o que o control
   plane devolve.
7. Webhook e gateway nascem ligados ao host público. O membro ainda cola
   o token do Telegram (e equivalentes) — isso é segredo dele.

## Fluxo

1. Membro paga Basic/Pro (já existe).
2. Abre `/console/hermes` → escolhe o nome público (padrão: username) → Criar instância.
3. Em poucos minutos o host `https://<nome>.brenon.cloud` resolve,
   pede o login Authentik (sessão da console costuma bastar) e abre o
   dashboard Hermes com webhooks no ar.
4. Membro conecta Telegram (e o que quiser) no dashboard.

## Critérios de aceite

- Free vê a página travada e o link de Billing. O botão Criar não existe.
- Basic/Pro autenticado cria **uma** instância; a segunda tentativa é
  recusada com mensagem clara.
- O host criado é o nome público escolhido (padrão: username) e resolve
  na internet (não só no lab). Nomes da plataforma (`auth`, `control`, …)
  são recusados. Dá para mudar o nome depois.
- Abrir o host sem login redireciona para Authentik. Outro membro logado
  não entra na instância alheia. Operador entra.
- A tabela da console lista nome, status, plano e abre `/hermes` quando
  `running`. Não mostra instância inventada.
- O dono (ou operador) pode apagar a instância. A UI avisa que tudo
  some para sempre. Depois o slug pode ser criado de novo.
- Webhook inbound no mesmo host não exige login (assinatura HMAC).

## Fora desta versão

- Domínio customizado do cliente (`agente.empresa.com`).
- Várias instâncias por conta.
- Enforcement rígido de cota de disco no filesystem (o plano já declara 5/20 GB).
- White-label / agência.
