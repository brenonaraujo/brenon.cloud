---
title: Akash Console Air no Brenon.Cloud — Deployments Permissionless da Akash para Todo Mundo
description: Subimos o Akash Console Air no Brenon.Cloud e liberamos para qualquer pessoa. Conecte uma carteira, troque no mínimo 10 AKT por ACTs e faça deploy em uma nuvem descentralizada — sem e-mail, sem cartão de crédito, sem KYC.
date: 2026-05-20
author: Brenon Araujo
tags: [akash, nuvem-descentralizada, console-air, web3, deployments]
cover: https://logowik.com/content/uploads/images/akash-network-akt1389.jpg
coverFallback: /images/blog/akash-network-akt1389.jpg
---

# Por que colocamos o Console Air no Brenon.Cloud

A Akash Network é uma das coisas mais interessantes acontecendo no
mundo de cloud hoje: um marketplace permissionless e on-chain onde
providers fazem lances pelas suas cargas containerizadas e você paga em
AKT direto da sua carteira. Brenon.Cloud sempre foi sobre dar a
indivíduos acesso a infraestrutura de nível empresarial nos próprios
termos deles — então, quando a Akash formalizou a divisão do console em
dois produtos pela [AEP-84](https://akash.network/roadmap/aep-84/),
prestamos atenção.

## O que mudou no Console oficial

A AEP-84 divide o Akash Console em **duas aplicações dedicadas**, cada
uma otimizada para um único modelo de identidade:

- **`console.akash.network`** — a plataforma **totalmente gerenciada**.
  E-mail + senha (ou SSO), pagamento por cartão de crédito, sem
  carteira, sem assinatura on-chain. Pensada para o público mais amplo
  possível de desenvolvedores.
- **Console Air** — a aplicação **totalmente self-custodial**. Apenas
  carteira (Keplr e carteiras Cosmos compatíveis), AKT pago direto ao
  escrow on-chain, sem billing gerenciado, sem estado de conta off-chain.

A motivação, citando a própria AEP:

> Misturar as duas experiências em uma única aplicação se tornou um
> passivo. […] Mais de 85% do gasto no Console hoje vem de usuários de
> cartão. Manter a opção de carteira dentro da experiência gerenciada
> otimiza o produto para uma fração pequena do gasto real enquanto
> sobrecarrega a maioria.

É a decisão certa para o time da Akash. Mas isso significa que a porta
de entrada padrão em `console.akash.network` agora é um produto
gerenciado, com cara de KYC: e-mails, senhas, cartões de crédito. O
**caminho self-custodial migra para o Console Air**, que é
intencionalmente o cliente de referência canônico — o lugar onde a
Akash continua sendo permissionless.

## Por que subimos nosso próprio Console Air

O trabalho do Brenon.Cloud é tornar esse tipo de acesso sem atrito.
Então subimos o Console Air na nossa própria infraestrutura e
**liberamos para qualquer pessoa** em
[`akash.brenon.cloud`](https://akash.brenon.cloud).

Nossos objetivos:

1. **Zero atrito de cadastro.** Sem e-mails, sem senhas, sem cartões
   de crédito, sem KYC. Você usa uma carteira Keplr, assina suas
   próprias transações e é dono dos seus deployments.
2. **Reduzir a barreira para builders.** Indie hackers, mantenedores de
   OSS, estudantes, gente que mexe nos finais de semana — qualquer um
   que queira subir containers em uma nuvem realmente descentralizada
   deve conseguir fazer isso em minutos.
3. **Manter a história da Akash permissionless.** Akash sem acesso
   self-custodial deixa de ser Akash. O Console Air oficial existe; nós
   só garantimos que também exista uma instância pública e bem
   monitorada rodando em infraestrutura comunitária.

> ⚠️ O deployment está atualmente **em testes**. Espere iterações
> rápidas, reinícios eventuais e arestas para serem aparadas. Se algo
> quebrar, [abra uma issue](https://github.com/brenonaraujo) — feedback
> guia o que vem em seguida.

## O que dá pra fazer

Conecte o Keplr, financie sua carteira com AKT e:

- **Troque AKT por ACTs** direto no app — mínimo de **10 AKT** — para
  abastecer o escrow do deployment.
- **Edite e submeta SDLs**, aceite lances de providers e crie leases.
- **Acesse logs, abra shell e atualize** deployments rodando.
- **Escolha qualquer provider Akash.** Sem gatekeeping; o app é só uma
  UI sobre a chain.
- **Tenha seu histórico on-chain** vinculado ao endereço da sua
  carteira — sua identidade é seu endereço, nada além disso.

O que você **não** consegue fazer, por design:

- Cadastrar e-mail, senha ou SSO.
- Pagar com cartão de crédito ou usar créditos gerenciados.
- Pedir para a gente custodiar suas chaves, seu AKT ou seus
  deployments. Não dá — e esse é o ponto.

## Como ele se encaixa na stack do Brenon.Cloud

O Console Air roda como mais um container no nosso cluster Docker
Swarm:

- **Kong** fica na frente para terminação TLS, rate limit e roteamento
  global.
- **Authentik** *não* está no caminho — o Console Air é wallet-only de
  propósito. A autenticação acontece entre você e a sua carteira Keplr
  assinando transações on-chain.
- **Uptime Kuma** monitora o endpoint público — dá pra ver
  disponibilidade em
  [status.brenon.cloud](https://uptime.brenon.cloud/status/services).
- **Grafana** capta métricas de requisição do Kong para que a gente
  detecte regressões cedo.

A única coisa sensível do nosso lado é o **comportamento de redirect de
transição descrito na AEP-84**: usuários de carteira chegando ao
console gerenciado devem ser redirecionados apenas para um domínio de
primeira parte verificado. Nossa instância é mantida pela comunidade,
não é first-party da Akash — então deixamos isso claro na UI e nunca
afirmamos ser o endpoint oficial. O Console Air oficial continua sendo
a versão canônica; nós só fornecemos um ponto de entrada público
adicional, sem perguntas.

## Experimente

[Abrir o Console Air no Brenon.Cloud →](https://akash.brenon.cloud)

Use uma carteira Keplr, abasteça com pelo menos 10 AKT e você está a
um swap e um SDL do seu primeiro deployment descentralizado.

Se quiser o contexto completo da divisão, a própria AEP é a melhor
leitura:
[AEP-84 — Console Split: Managed Platform and Self-Custodial Air](https://akash.network/roadmap/aep-84/).
