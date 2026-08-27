---
title: Quanto custa construir e operar sua própria cloud com serviços customizados?
description: Swarm de 3 nós em casa, duas GPUs de mineração que pagam a própria energia, Cloudflare a US$ 0, Netlify Personal a US$ 9, Akash por centavos, GitHub a US$ 10, IA a ~US$ 150, e o Clinicsy já devolvendo ~US$ 100/mês.
date: 2026-08-29
author: Brenon Araujo
tags: [home-cloud, cost, self-hosting, cloudflare, netlify, akash, docker-swarm, mining]
cover: /images/blog/how-much-to-run-your-own-cloud-cover.svg
coverFallback: /images/blog/how-much-to-run-your-own-cloud-cover.svg
---

# Quanto custa construir e operar sua própria cloud com serviços customizados?

Brenon.Cloud não é fatura de hyperscaler. É um cluster na minha casa, ligado 24/7, com um pouco de cloud barata na frente, e um catálogo que eu realmente uso: estudo, família, mentoria e produto com cliente de verdade.

A pergunta do título é o post. Quanto custa manter isso no ar? Isso é lab, é provedor, ou os dois?

---

## Hardware que eu já tinha

Eu não comprei rack pra isso. Reaproveitei um mini computador e a RIG velha de mineração de criptomoedas. A RIG hoje é o hardware do vserver: a máquina das duas NVIDIA, [vserver.brenon.cloud](https://vserver.brenon.cloud).

O manager do Swarm é o mini PC. Mitsushiba, Intel inside, no quadro de rede, colado num switch de cinco portas. Quatro cabos acesos. Eu mesmo passo o cabo. Não é Wi-Fi entre os nós. É ethernet de verdade, cada máquina num cômodo diferente da casa.

![Mini PC Mitsushiba no quadro de rede, switch de cinco portas ao lado, cabo amarelo na mão](/images/blog/how-much-to-run-your-own-cloud-minipc-switch.jpg)

O vserver é o outro extremo. Gabinete Superframe aberto, cooler Aorus, memória RGB, fonte XPG. Uma RTX MSI dentro do case. A Colorful RTX pendurada fora, no riser, porque as duas juntas não cabem direito nesse gabinete. Quem já montou RIG reconhece o desenho na hora: placa de fora, cabo em excesso, mesa virando bancada.

![vserver: gabinete Superframe aberto, RTX MSI dentro e Colorful RTX pendurada fora no riser](/images/blog/how-much-to-run-your-own-cloud-vserver.jpg)

Hoje isso é um Docker Swarm de 3 nós:

| Nó | Papel | CPU | RAM | O que é |
| --- | --- | --- | --- | --- |
| Server 1 | manager | 4 | 16,7 GB | mini PC Mitsushiba |
| Server 2 | worker | 12 | 67,4 GB | RIG / vserver, RTX 3080 + RTX 5080 |
| Server 3 | worker | 2 | 8,1 GB | worker pequeno, outro mini PC |

Snapshot do cluster (Portainer, não é API ao vivo): **3 nós, 18 CPU, 92,2 GB de RAM, 2 GPUs, 23 stacks, 38 serviços, 120 containers**.

Três cômodos não é datacenter. É calor, barulho e tomada espalhados pela casa. Se um box tiver um dia ruim, o Swarm ainda tenta agendar no que sobrou. A WAN continua sendo um único ISP residencial. Resiliência de verdade, a de quem está fora da minha rua, é Cloudflare, Netlify e Akash. Dentro de casa a resiliência é cabo entre os cômodos e um manager que não está sentado em cima das GPUs.

---

## As GPUs pagam a luz

Sem o vserver, manter o resto do cluster ligado custa **menos de US$ 1/mês** de energia. São dois mini PCs e um switch.

Quando eu ligo o vserver com as duas GPUs em 100% o dia inteiro, a linha de energia sobe. **~US$ 80/mês** é fácil de alcançar. Era o número que fazia desligar a máquina parecer a decisão certa.

Eu não desligo. As mesmas placas mineram na rede PRL (vou escrever sobre a PRL noutro post). Nos últimos meses essa mineração tem pago **~US$ 90/mês**. Líquido de energia, a máquina pesada dá **~US$ 10 de lucro** por ficar ligada 24/7.

Eu não minero por identidade. Eu pago a luz de uma máquina capaz pra ela continuar servindo o resto com folga: workloads do Swarm, o próprio [vserver](https://vserver.brenon.cloud), e modelo local quando precisa. A RIG parou de ser hobby encostado no canto e virou o nó gordo da cloud.

---

## Modelo e software que não são demo

No mesmo teto eu rodo modelo de áudio como API de verdade, não notebook no colo.

[ai.brenon.cloud](https://ai.brenon.cloud) está no ar: Whisper STT (`brnn/whisper-stt`) e Chatterbox TTS (`brnn/chatterbox-tts`). O catálogo é público em `/api/v1/models`. Como isso entrou no Swarm está em [STT e TTS no nosso cluster](/blog/audio-apis-on-our-cluster).

E não é só lab. O [Clinicsy](https://clinicsy.app) é SaaS ao vivo pra home care, consultório e clínica: agenda, WhatsApp, evolução com IA, financeiro. Já entra **~US$ 100/mês** de serviço real, não tenant de ficção. O [Profitt](https://profitt.app) é da mesma família de produto. Mentoria roda em [mentoria.devdojo.academy](https://mentoria.devdojo.academy). A família usa a mesma identidade e os mesmos hosts.

A cloud é o ambiente de estudo. Também é o provedor em cima do qual esses produtos ficam de pé. Só que cada um não mora no mesmo lugar: Clinicsy e Profitt estão no Firebase e no Netlify. STT, TTS, Authentik, Kong, Oficina e o vserver estão no Swarm, atrás do túnel. Eu não finjo que o Clinicsy roda na RIG.

---

## Cloud barata na frente, não no lugar

Compute em casa parece a parte cara até você olhar a fatura. O truque não é hospedar tudo aqui. O truque é separar o que precisa estar na casa do que não pode morrer com ela.

**Cloudflare** é DNS, TLS e o túnel pra `*.brenon.cloud`. Puxei os últimos 30 dias da zona `brenon.cloud` (GraphQL da Cloudflare, 27 de agosto de 2026): **~419 mil requests, ~2,5 GB**. A zona está no plano **Free Website**. Com esse tráfego, **Cloudflare custa US$ 0**. Clinicsy, o domínio da garage e o da clínica estão no mesmo plano Free.

**Netlify** é a CDN e o caminho de deploy dos frontends. Eu pago o plano básico **Personal**, **US$ 9/mês**, justamente pra caber vários projetos. São mais de 15 frontends nesse plano: [clinicsy.app](https://clinicsy.app), este site, e o resto do catálogo. Netlify não é a API. É a borda das SPAs.

**Akash** segura o que não pode morrer com a casa: o [Uptime Kuma](https://uptime.brenon.cloud), num container isolado, **centavos de dólar, menos de US$ 1/mês**. Se o Swarm, o túnel ou a luz do lab cair, o monitor continua noutro lugar. Esse deploy está em [Uptime Kuma na Akash](/blog/uptime-kuma-on-akash).

A casa faz compute e estado. Cloudflare termina os nomes públicos. Netlify entrega frontend. Akash observa de fora. Desacoplamento, resiliência e escala o suficiente pro tráfego que eu tenho, por um preço que ainda cabe no mês.

---

## Isso não é pra todo mundo

Também não é sermão contra AWS.

A maioria das pessoas não deveria rodar um Swarm de três nós em casa e discutir com túnel às duas da manhã. A maioria dos produtos deveria pagar um vendor e dormir.

Mas se você vive de montar sistema, fazer isso **uma vez** é outro tipo de curso. Você sente DNS, TLS, identidade, agendamento, disco, energia e fatura na mesma semana. Reaproveita peça open-source até virar plataforma. Aprende por que free tier é decisão de produto, e por que o monitor não pode morrer no cluster que ele observa.

Eu não inventei cloud nova. Juntei o que já existia até o custo-benefício parar de parecer hobby.

---

## As linhas do mês

Os números abaixo são custo de operação em **US$ / mês**, fim de agosto de 2026. O hardware já é meu (mini PC + RIG). Capex não entra nessa tabela.

| Linha | Custo | Nota |
| --- | --- | --- |
| Cloudflare | **0** | Free Website. ~419 mil req / ~2,5 GB em 30 dias em `brenon.cloud` |
| Netlify Personal | **9** | CDN + deploys, mais de 15 frontends |
| Uptime Kuma na Akash | **< 1** | centavos, isolado do Swarm |
| GitHub | **10** | eu uso o tempo todo, então pago |
| Firebase (Clinicsy + Profitt) | **0** | free tier, Firestore e o resto, ainda dentro da cota |
| Energia sem o vserver | **< 1** | mini PCs + switch |
| Energia com vserver, 2 GPUs 100% 24/7 | **~80** | a conta de luz de verdade |
| Mineração na PRL | **~90 crédito** | paga as GPUs; post da PRL depois |
| Modelos de IA (MiniMax + Grok, etc.) | **~150** | o luxo de continuar evoluindo o catálogo com agente, [o post dos tokens](/blog/agentic-ops-token-mix) |
| Receita do Clinicsy | **~100 crédito** | MRR real, clínica real |

Leia em três camadas, não num bolo só:

1. **A cloud em si** (Cloudflare + Netlify + Akash + GitHub + Firebase + energia sem GPU) dá **~US$ 20/mês**, e energia é troco.
2. **Liga o vserver** e a energia vira **~US$ 80**, hoje mais do que coberta por **~US$ 90** de mineração. Sobra **~US$ 10** por deixar a máquina capaz ligada.
3. **A linha cara não é o cluster.** É o **~US$ 150** que eu gasto pra continuar construindo com modelo. Essa fatura é escolha. O cluster não exige.

Líquido da mineração, manter a plataforma inteira no ar, sem contar IA e sem contar Clinicsy, cai na casa de **~US$ 10/mês**.

---

## Como isso está de fato ligado

![Swarm on-prem em três cômodos, com Cloudflare, Netlify, Akash e Firebase na borda](/images/blog/how-much-to-run-your-own-cloud-architecture.svg)

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

O switch ao lado do Mitsushiba é o ponto em que os três cômodos viram um cluster. Frontend pode viver no Netlify e ainda falar com Firebase, ou com API que entra em casa pelo Cloudflare. O Swarm não precisa ser dono de cada byte. Esse é o ponto da borda barata.

---

## As duas linhas que eu quase esqueço

**Firebase.** Clinicsy e Profitt ainda rodam no free tier: Firestore e o resto daquele console. Eu uso bastante. Ainda não virou linha de fatura. Quando virar, entra nessa tabela.

**GitHub.** Eu vivo lá: repo, Actions, package, o loop que publica este site. **US$ 10/mês**. Não é infra no sentido de Swarm. Continua sendo parte de operar uma cloud em cima da qual você realmente constrói.

---

## O que isso devolve

Eu divido essa plataforma com a família. Uso nas mentorias. Uso pra estudar. E uso pra rodar software que já tem receita mensal: Clinicsy a **~US$ 100/mês**, usado por operação real de home care e clínica.

O balanço não é "um lab que custa US$ 20". É um lab que também é um provedor pequeno.

- **Pra operar a cloud:** ~US$ 20 de SaaS pago, energia abaixo de um dólar sem a caixa de GPU, ou ~US$ 80 com as duas GPUs, hoje pagas pela mineração, com ~US$ 10 de sobra.
- **Pra continuar evoluindo no meu ritmo:** + ~US$ 150 de modelo. Esse recibo eu já escrevi.
- **Entrando:** ~US$ 100 do Clinicsy, mais o que as GPUs pagam a mais na mineração, mais o que não vira fatura (estudo, família, mentoria, [OficinaCloud](https://oficina.brenon.cloud), [TibiaPixel](https://tibiapixel.brenon.cloud), identidade em [auth.brenon.cloud](https://auth.brenon.cloud)).

Se você conta a IA como opcional e o Clinicsy como o primeiro cliente de verdade, a cloud não é conta de vaidade. É barata de manter, e já tem produto pagando um pedaço grande da luz.

A resposta honesta do título: **sua própria cloud com serviços customizados, neste formato, custa uns vinte dólares por mês pra ficar no ar, uns oitenta de energia se você insiste em duas GPUs a 100%, e mais uns cento e cinquenta se quiser a mesma velocidade de construção que eu tenho usado. A mineração hoje cobre as GPUs. O Clinicsy hoje cobre a maior parte do resto.**

---

## Referências e Links Úteis

- **[20B de tokens a ~US$ 150/mês](/blog/agentic-ops-token-mix)**: a linha de IA que eu não reabri aqui.
- **[STT e TTS no nosso cluster](/blog/audio-apis-on-our-cluster)**: Whisper + Chatterbox no Swarm.
- **[Uptime Kuma na Akash](/blog/uptime-kuma-on-akash)**: por que o monitor não mora na casa.
- **[Akash Network: o Airbnb da computação em nuvem](/blog/akash-network-cloud-marketplace)**: o marketplace atrás desse container.
- **[Console Air na Brenon.Cloud](/blog/console-air-on-brenon-cloud)**: como eu subo na Akash sem cartão.
- **[SSO com Authentik na Brenon.Cloud](/blog/authentik-sso-on-brenon-cloud)**: identidade dos mesmos hosts.
- **[clinicsy.app](https://clinicsy.app)**: o SaaS que já devolve ~US$ 100/mês.
- **[ai.brenon.cloud](https://ai.brenon.cloud)**: APIs de STT/TTS.
- **[uptime.brenon.cloud](https://uptime.brenon.cloud)**: monitor público.
- **[Preço da Netlify](https://www.netlify.com/pricing/)**: plano Personal, US$ 9/mês.
- **[Cloudflare](https://www.cloudflare.com/)**: o plano Free em que eu ainda estou.
