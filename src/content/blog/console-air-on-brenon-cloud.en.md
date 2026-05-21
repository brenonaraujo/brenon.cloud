---
title: Akash Console Air on Brenon.Cloud — Permissionless Akash Deployments for Everyone
description: We deployed Akash Console Air on Brenon.Cloud and opened it to anyone. Connect a wallet, swap a minimum of 10 AKT for ACTs, and ship to a decentralized cloud — no email, no credit card, no KYC.
date: 2026-05-20
author: Brenon Araujo
tags: [akash, decentralized-cloud, console-air, web3, deployments]
cover: https://logowik.com/content/uploads/images/akash-network-akt1389.jpg
coverFallback: /images/blog/akash-network-akt1389.jpg
---

# Why we put Console Air on Brenon.Cloud

The Akash Network is one of the most interesting things happening in cloud
right now: a permissionless, on-chain marketplace where providers bid for
your container workloads and you pay in AKT directly from your wallet.
Brenon.Cloud has always been about giving individuals access to
enterprise-grade infrastructure on their own terms — so when Akash
formalized the split of its console into two products in
[AEP-84](https://akash.network/roadmap/aep-84/), we paid attention.

## What changed in the official Console

AEP-84 splits Akash Console into **two dedicated applications**, each
optimized for a single identity model:

- **`console.akash.network`** — the **fully managed** platform. Email +
  password (or SSO), credit card billing, no wallet, no on-chain
  signing. Optimized for the broadest possible developer audience.
- **Console Air** — the **fully self-custodial** application. Wallet-only
  (Keplr and compatible Cosmos wallets), AKT paid directly to on-chain
  escrow, no managed billing, no off-chain account state.

The motivation, quoting the AEP, is sound:

> Blending both experiences in a single application has become a
> liability. […] Over 85% of spend on Console today comes from credit
> card users. Keeping the wallet option inside the managed experience
> optimizes the product for a small fraction of actual spend while
> burdening the majority.

It is the right call for the Akash team. But it does mean that the
default front door at `console.akash.network` is now a managed,
KYC-style product: emails, passwords, credit cards. The
**self-custodial path moves to Console Air**, which is intentionally
the canonical reference client — the place where Akash stays
permissionless.

## Why we deployed our own Console Air

Brenon.Cloud’s job is to make this kind of access frictionless. So we
deployed Console Air on our own infrastructure and **opened it to
anyone** at [`akash.brenon.cloud`](https://akash.brenon.cloud).

Our goals:

1. **No registration friction.** No emails, no passwords, no credit
   cards, no KYC. You bring a Keplr wallet, you sign your own
   transactions, you own your deployments.
2. **Lower the on-ramp for builders.** Indie hackers, OSS maintainers,
   students, weekend tinkerers — anyone who wants to ship containers to
   a real decentralized cloud should be able to do it in minutes.
3. **Keep the Akash story permissionless.** Akash without
   self-custodial access stops being Akash. A first-party Console Air
   exists; we just make sure there is also a public, well-monitored
   instance running on community infrastructure.

> ⚠️ The deployment is currently in **testing**. Expect rapid
> iterations, occasional restarts, and rough edges. If you find
> something broken, [open an issue](https://github.com/brenonaraujo)
> — feedback shapes what we ship next.

## What you can do with it

Connect Keplr, fund your wallet with AKT, and:

- **Swap AKT for ACTs** directly inside the app — minimum **10 AKT** —
  to fund deployment escrow.
- **Edit and submit SDLs**, accept provider bids, and create leases.
- **Stream logs, open a shell, and update** running deployments.
- **Pick any Akash provider.** No gatekeeping; the app is just a UI on
  top of the chain.
- **Keep your on-chain history** tied to your wallet address — your
  identity is your address, nothing more.

What you **cannot** do, by design:

- Sign up with an email, password or SSO.
- Pay with a credit card or use managed credits.
- Have us hold your keys, your AKT, or your deployments. We can’t — and
  that is the point.

## How it fits in the Brenon.Cloud stack

Console Air runs as just another container in our Docker Swarm cluster:

- **Kong** sits in front for TLS termination, rate limits, and
  global routing.
- **Authentik** is *not* in the path — Console Air is wallet-only on
  purpose. Authentication happens between you and your Keplr wallet
  signing on-chain transactions.
- **Uptime Kuma** monitors the public endpoint so you can see
  availability at [status.brenon.cloud](https://uptime.brenon.cloud/status/services).
- **Grafana** captures request metrics from Kong so we can spot
  regressions early.

The only thing trust-sensitive on our side is the **transition redirect
behavior described in AEP-84**: any wallet user landing on the managed
console should be redirected only to a verified, first-party domain.
Our instance is community-run, not first-party — so we are clear about
that distinction in the UI and never claim to be the official Akash
endpoint. The official Console Air remains the canonical version; we
just provide an additional public, no-questions-asked entry point.

## Try it

[Open Console Air on Brenon.Cloud →](https://akash.brenon.cloud)

Bring a Keplr wallet, top it up with at least 10 AKT, and you are one
swap and one SDL away from your first decentralized deployment.

If you want the full context behind the split, the AEP itself is the
best read:
[AEP-84 — Console Split: Managed Platform and Self-Custodial Air](https://akash.network/roadmap/aep-84/).
