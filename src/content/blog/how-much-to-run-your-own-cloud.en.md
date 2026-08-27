---
title: How much does it cost to build and operate your own cloud with custom services?
description: A 3-node house Swarm, two mining GPUs that pay their own power, Cloudflare at US$ 0, Netlify Personal at US$ 9, Akash for cents, GitHub at US$ 10, AI at ~US$ 150 — and Clinicsy already returning ~US$ 100/month.
date: 2026-08-29
author: Brenon Araujo
tags: [home-cloud, cost, self-hosting, cloudflare, netlify, akash, docker-swarm, mining]
cover: /images/blog/how-much-to-run-your-own-cloud-cover.svg
coverFallback: /images/blog/how-much-to-run-your-own-cloud-cover.svg
---

# How much does it cost to build and operate your own cloud with custom services?

Brenon.Cloud is not a hyperscaler invoice. It is a house cluster that stays on 24/7, a handful of cheap public-cloud pieces in front of it, and a catalog we actually use: study, family, mentoring, and products with real customers.

The question in the title is the whole post. What does it cost to keep all of that running — and is it a lab, a provider, or both?

---

## Hardware we already had

We did not buy a rack for this. We reused a mini PC and the old crypto mining RIG. The RIG is now the vserver box: the machine with the two NVIDIA cards, [vserver.brenon.cloud](https://vserver.brenon.cloud).

Today that is a 3-node Docker Swarm, wired with ethernet, each node in a different room of the house:

| Node | Role | CPU | RAM | What it is |
| --- | --- | --- | --- | --- |
| Server 1 | manager | 4 | 16.7 GB | reused mini PC |
| Server 2 | worker | 12 | 67.4 GB | former mining RIG / vserver |
| Server 3 | worker | 2 | 8.1 GB | small worker |

Snapshot of the cluster (Portainer, not a live API): **3 nodes, 18 CPU, 92.2 GB RAM, 2 GPUs (RTX 3080 + RTX 5080), 23 stacks, 38 services, 120 containers**.

Three rooms is not a datacenter. It is heat, noise, and power spread across the house, plus Swarm still able to schedule if one box is having a bad day. The WAN is still one home ISP. Resilience at the edge is what Cloudflare, Netlify, and Akash are for. Resilience inside the house is copper between rooms and a manager that is not sitting on top of the GPUs.

---

## The GPUs pay the electricity

Without the vserver, keeping the rest of the cluster on costs **less than US$ 1/month** in energy. It is a couple of small machines.

Turn the vserver on with both GPUs at 100% around the clock and the energy line jumps. **~US$ 80/month** is easy to hit. That is the number that used to make “just leave it off” look rational.

We do not leave it off. The same cards mine on the PRL network (we will write about PRL in another post). In recent months that mining has paid **~US$ 90/month**. Net of energy, the hungry machine is **~US$ 10 in profit** for staying on 24/7.

That is the important part. We are not mining as a personality. We are paying the electricity of a capable box so it can keep serving everything else with some headroom: Swarm workloads, [vserver](https://vserver.brenon.cloud) itself, and local models when we need them. The RIG stopped being a sunk hobby and became the fat node of the cloud.

---

## Models and software that are not a demo

On that same roof we run speech models as real APIs, not a notebook on a laptop.

[ai.brenon.cloud](https://ai.brenon.cloud) is live: Whisper STT (`brnn/whisper-stt`) and Chatterbox TTS (`brnn/chatterbox-tts`). Catalog is public at `/api/v1/models`. How we put that on the Swarm is in [STT and TTS on our cluster](/blog/audio-apis-on-our-cluster).

And this is not only a lab. [Clinicsy](https://clinicsy.app) is a live SaaS for home care, consultório, and clinic — scheduling, WhatsApp, AI clinical notes, finance. It already brings in **~US$ 100/month** from real services, not a fictional tenant. [Profitt](https://profitt.app) is in the same family of products we operate. Mentoring runs at [mentoria.devdojo.academy](https://mentoria.devdojo.academy). Family uses the same identity and the same hosts.

The cloud is the study environment. It is also the provider those products stand on.

---

## Cheap cloud in front, not instead

On-prem compute is the expensive-looking part until you look at the bill. The trick is not “host everything at home”. The trick is to **decouple** what must be in the house from what must not.

**Cloudflare** is DNS, TLS, and the tunnel into `*.brenon.cloud`. I pulled the last 30 days on the `brenon.cloud` zone (Cloudflare GraphQL, 27 August 2026): **~419k requests, ~2.5 GB**. The zone is on the **Free Website** plan. At this traffic, **Cloudflare costs US$ 0**. Clinicsy, the garage domain, and the clinic domain sit on the same Free plan.

**Netlify** is the CDN and the deploy path for product frontends. We pay the basic **Personal** plan — **US$ 9/month** — so we can keep many projects there. More than 15 frontends live on that plane: [clinicsy.app](https://clinicsy.app), this site, and the rest of the catalog. Netlify is not the API. It is the edge for the SPAs.

**Akash** holds what must not die with the house: [Uptime Kuma](https://uptime.brenon.cloud), on an isolated container, **cents of a dollar, under US$ 1/month**. If the Swarm, the tunnel, or the lab power goes away, the monitor is still somewhere else. That deploy is in [Uptime Kuma on Akash](/blog/uptime-kuma-on-akash).

Put together: the house does compute and state. Cloudflare terminates the public names. Netlify ships frontends. Akash watches from outside. That is enough decoupling, enough resilience, and enough scale for our traffic — at a price that is not a cloud-credit religion.

---

## This is not for everyone

It is also not a sermon against AWS.

Most people should not run a three-node Swarm in the living rooms and then argue with a tunnel at 2 a.m. Most products should pay a vendor and sleep.

But if you build systems for a living, doing this **once** is a different kind of course. You feel DNS, TLS, identity, scheduling, disks, power, and the invoice in the same week. You reuse open-source pieces until they become a platform. You learn why “free tier” is a product decision and why a monitor cannot live on the cluster it watches.

We did not invent a new cloud. We combined things that already existed until the cost-benefit stopped looking like a hobby.

---

## The monthly line items

Figures below are operating cost in **US$ / month**, as of late August 2026. Hardware is already ours (mini PC + RIG). Capex is not in this table.

| Line | Cost | Note |
| --- | --- | --- |
| Cloudflare | **0** | Free Website. ~419k req / ~2.5 GB in 30 days on `brenon.cloud` |
| Netlify Personal | **9** | CDN + deploys, 15+ frontends |
| Uptime Kuma on Akash | **< 1** | cents, isolated from the Swarm |
| GitHub | **10** | we use it constantly, so we pay |
| Firebase (Clinicsy + Profitt) | **0** | free tier — Firestore and friends, still inside quota |
| Energy without vserver | **< 1** | mini PC + small worker |
| Energy with vserver, 2 GPUs 100% 24/7 | **~80** | the real power bill |
| Mining on PRL | **~90 credit** | pays the GPUs; PRL post later |
| AI models (MiniMax + Grok, etc.) | **~150** | luxury of evolving the catalog with agents — [the token post](/blog/agentic-ops-token-mix) |
| Clinicsy revenue | **~100 credit** | real MRR, real clinics |

Read it in three layers, not one blob:

1. **The cloud itself** (Cloudflare + Netlify + Akash + GitHub + Firebase + energy without GPUs) is **~US$ 20/month**, and energy is pocket change.
2. **Turn the vserver on** and energy becomes **~US$ 80**, currently more than covered by **~US$ 90** of mining — **~US$ 10 left over** for leaving the capable machine up.
3. **The expensive line is not the cluster.** It is the **~US$ 150** we spend to keep building with models. That bill is a choice. The cluster does not require it.

Net of mining, keeping the whole platform on — without counting AI, without counting Clinicsy — lands around **~US$ 10/month**.

---

## How it is actually wired

![On-prem Swarm in three rooms, with Cloudflare, Netlify, Akash, and Firebase at the edge](/images/blog/how-much-to-run-your-own-cloud-architecture.svg)

```mermaid
flowchart TB
  Users["Users · family · mentees · SaaS"] --> CF["Cloudflare Free · DNS TLS tunnel"]
  Users --> NF["Netlify Personal · CDN and deploys"]
  Kuma["Uptime Kuma on Akash"] -->|"HTTP checks"| CF
  CF -->|"tunnel"| LAN["House LAN · 3 rooms · ethernet"]
  NF --> SPA["Product frontends"]
  SPA --> FB["Firebase free tier · Clinicsy · Profitt"]
  subgraph onprem ["On-prem Swarm"]
    S1["Server 1 · manager · mini PC"]
    S2["Server 2 · vserver · former RIG"]
    S3["Server 3 · small worker"]
    GPU["RTX 3080 + RTX 5080"]
    SVC["Authentik · Kong · Whisper · Chatterbox"]
  end
  LAN --> S1
  LAN --> S2
  LAN --> S3
  S2 --> GPU
  GPU --> Mine["PRL mining ~US$ 90"]
  S1 --> SVC
  S2 --> SVC
  S3 --> SVC
```

Frontends can live on Netlify and still talk to Firebase or to APIs that enter the house through Cloudflare. The Swarm does not have to own every byte. That is the point of the cheap edge.

---

## The two lines we almost forgot

**Firebase.** Clinicsy and Profitt still run on the free tier — Firestore and the rest of that console. We use it a lot. It has not become a line item yet. When it does, it goes on this table.

**GitHub.** We live there: repos, Actions, packages, the loop that ships this site. **US$ 10/month**. Not infrastructure in the Swarm sense. Still part of operating a cloud you actually build on.

---

## What it returns

We share this platform with family. We use it in mentoring. We use it to study. And we use it to run software that already has monthly revenue: Clinicsy at **~US$ 100/month**, used by real home-care and clinic operations.

So the balance is not “a lab that costs US$ 20”. It is a lab that is also a small provider.

- **To operate the cloud:** ~US$ 20 in paid SaaS, energy under a dollar without the GPU box, or ~US$ 80 with both GPUs — currently paid by mining, with ~US$ 10 left over.
- **To keep evolving it at our pace:** + ~US$ 150 in models. We already wrote that receipt.
- **Coming back in:** ~US$ 100 from Clinicsy, plus whatever the GPUs over-pay in mining, plus the non-invoice returns (study, family, mentoring, [OficinaCloud](https://oficina.brenon.cloud), [TibiaPixel](https://tibiapixel.brenon.cloud), identity at [auth.brenon.cloud](https://auth.brenon.cloud)).

Count AI as optional and Clinicsy as the first real customer of the whole setup, and the cloud is not a vanity bill. It is a cheap factory with a product that already pays a large slice of the lights.

That is the honest answer to the title: **your own cloud with custom services, in this shape, costs about twenty dollars a month to keep online, about eighty in electricity if you insist on two GPUs at 100%, and about a hundred and fifty more if you want the same building speed we have been using. Mining currently covers the GPUs. Clinicsy currently covers most of the rest.**

---

## References and Useful Links

- **[20B tokens at ~US$ 150/month](/blog/agentic-ops-token-mix)**: the AI line we did not rehash here.
- **[STT and TTS on our cluster](/blog/audio-apis-on-our-cluster)**: Whisper + Chatterbox on the Swarm.
- **[Uptime Kuma on Akash](/blog/uptime-kuma-on-akash)**: why the monitor is not in the house.
- **[Akash Network: the Airbnb of cloud computing](/blog/akash-network-cloud-marketplace)**: the marketplace behind that container.
- **[Console Air on Brenon.Cloud](/blog/console-air-on-brenon-cloud)**: how we deploy to Akash without a credit card.
- **[Authentik SSO on Brenon.Cloud](/blog/authentik-sso-on-brenon-cloud)**: identity for the same hosts.
- **[clinicsy.app](https://clinicsy.app)**: the SaaS that already returns ~US$ 100/month.
- **[ai.brenon.cloud](https://ai.brenon.cloud)**: STT/TTS APIs.
- **[uptime.brenon.cloud](https://uptime.brenon.cloud)**: public monitor.
- **[Netlify pricing](https://www.netlify.com/pricing/)**: Personal plan, US$ 9/month.
- **[Cloudflare](https://www.cloudflare.com/)**: the Free plan we are still on.
