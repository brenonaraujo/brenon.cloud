---
title: 20B de tokens a ~US$ 150/mês — ~300× mais barato que Claude ou ChatGPT
description: Os mesmos ~20B: MiniMax + Grok Heavy a ~US$ 149/mês versus ~US$ 46 mil na API do Claude Sonnet 5, ~US$ 92 mil no GPT-5.6 Sol, ~US$ 115 mil no Opus 5.
date: 2026-08-28
author: Brenon Araujo
tags: [ai, tokens, minimax, grok, hermes, agentic, cost, llm, git-meta-harness]
cover: /images/blog/agentic-ops-token-mix-cover.svg
coverFallback: /images/blog/agentic-ops-token-mix-cover.svg
---

# 20B de tokens a ~US$ 150/mês — ~300× mais barato que Claude ou ChatGPT

Nos últimos dois meses a gente empurrou Hermes, subagentes, PRs, deploys e uma fila de experimentos em cima de vários provedores ao mesmo tempo. O heatmap do MiniMax Coding Plan não mente: **16,89 bilhões de tokens** só nesse plano, com pico de **1,74B** em **76 dias ativos**, de junho a agosto de 2026.

O Grok não expõe o mesmo contador de tokens. Somando o pool semanal do Heavy, créditos de OpenRouter, Gemini e modelos locais, o volume total da operação fica na casa dos **~20B de tokens**. No nosso mix, esse volume no cruzeiro custa **~US$ 149/mês** (MiniMax 5B + Grok Heavy promo). Os mesmos 20B na API metered do Claude Sonnet 5 dão **~US$ 46.000**. No GPT-5.6 Sol, **~US$ 92.000**. No Claude Opus 5, **~US$ 115.000**. Isso é **~300×** contra o Sonnet, **~600–770×** contra os flagships — não é erro de arredondamento.

Esses tokens não ficaram no dashboard. Eles sustentam o catálogo que a gente opera na Brenon.Cloud: produtos greenfield que nasceram no loop, e dois projetos que já estavam andando — **Clinicsy** e **Profitt** — que a gente não criou ali. Pegamos em andamento e hoje operamos com Hermes + MiniMax + Grok.

A tese deste post é simples: misturar plano chinês barato em volume com modelo americano caro e competente no ponto certo dá para rodar uma operação empresarial agentica sem pagar tarifa de Claude ou ChatGPT em 100% da esteira.

---

## O que o MiniMax mostrou em 2 meses

Uso do MiniMax M3 Coding Plan (jun–ago 2026):

| Métrica | Valor |
| --- | --- |
| Total de tokens | **16,89B** |
| Pico de tokens | **1,74B** |
| Dias ativos | **76** |
| Janela | junho → agosto 2026 |

![Heatmap de uso diário do MiniMax Coding Plan — últimos 2 meses](/images/blog/agentic-ops-token-mix-minimax-heatmap.png)

O heatmap diário deixa claro o padrão: não foi um spike isolado. Foi uso contínuo, com picos fortes no fim de julho e ao longo de agosto — exatamente quando as automações agenticas e os loops de produto estavam rodando mais pesado. Um **pico de 1,74B** numa janela só é o motivo de a gente ter começado no plano Ultra de 12B: um teto de 5B teria cortado o experimento no meio do sprint.

Dois detalhes importam para quem opera agent:

1. **Prompt >> completion.** Nesse plano, loop de agente é esmagadoramente input: contexto longo, tools, histórico de sessão, re-leituras de repo. Quem precifica só “resposta bonita” subestima o custo real. A comparação abaixo usa o mix que medimos nesse workload (~96% prompt / ~4% completion).
2. **Cache é a maioria silenciosa.** Boa parte do prompt é repetição. Plano com cache bom e modelo barato no volume muda a conta. Os mesmos 20B numa API premium *sem* tratar cache como primeira classe ficam ainda piores.

---

## A escada de planos que a gente subiu (e desceu)

### MiniMax M3

- **Começo:** plano de **US$ 120/mês** com **12B tokens/mês**, com tetos a cada 4h, semana e mês. Foi o motor bruto dos primeiros dois meses de experimento em volume.
- **Agora:** reduzimos para o plano de **5B tokens por US$ 50/mês**. Ainda é o backbone de volume — coding, loops longos, subagentes, refactors em massa.

O ponto não é “o plano caro era ruim”. O ponto é que **volume se compra barato na China**, e depois você calibra o teto quando o padrão de uso já está claro. O Ultra absorveu a janela de 16,89B. O Max é cruzeiro.

### Grok (SuperGrok Heavy)

O Grok **não expõe o total de tokens** no mesmo formato do MiniMax. O que a gente comprou foi capacidade por assinatura:

- Lista: **US$ 300/mês**.
- **Agora em promo:** **US$ 99/mês**, com limite generoso.
- Diferente do MiniMax, o rate limit do Grok é **dividido por semana** — o que encaixa bem em sprints agenticas com picos no meio da semana e folga no fim.

Antes do Grok, o MiniMax sozinho carregava quase tudo. Com o Heavy no ar, o desenho mudou: MiniMax no volume diário, Grok onde raciocínio, pesquisa densa e coding agent importam mais.

### O resto do mix

- **Gemini** — lotes e tarefas onde a cota / qualidade encaixava.
- **OpenRouter** — créditos pontuais para modelos que a gente não queria assinar fixo.
- **Modelos locais** — quando latência de rede ou custo zero importavam mais que frontier.

Nada disso substitui o par MiniMax + Grok. Completa.

---

## Custo real da nossa stack vs. o mesmo volume em API “premium”

Aqui a comparação que importa. Pegamos **20B de tokens** no **mix pesado de input que o MiniMax mediu** (~96% prompt / ~4% completion) e perguntamos: quanto custaria se esse volume inteiro fosse API metered de Claude ou OpenAI?

| Cenário | Custo estimado |
| --- | --- |
| **Nosso stack atual (MiniMax 5B US$50 + Grok Heavy promo US$99)** | **~US$ 149 / mês** (capacidade recorrente, não “20B numa fatura”) |
| MiniMax Ultra US$120 × 2 meses (a janela dos 16,89B) | ~US$ 240 no bimestre |
| MiniMax 5B + Grok Heavy lista US$300 | ~US$ 350 / mês |
| **20B no Claude Sonnet 5** (US$2 / US$10 por 1M in/out) | **~US$ 46.000** |
| **20B no GPT-5.6 Terra** (US$2 / US$12) | **~US$ 47.000** |
| **20B no GPT-5.6 Sol** (US$4 / US$20) | **~US$ 92.000** |
| **20B no Claude Opus 5** (US$5 / US$25) | **~US$ 115.000** |
| 20B no Claude Haiku 4.5 (US$1 / US$5) — baseline barato US | ~US$ 23.000 |

Só os **16,89B medidos no MiniMax**, na mesma proporção, já dariam ~**US$ 39k** no Sonnet 5 e ~**US$ 97k** no Opus 5. A gente pagou **centenas de dólares** de plano, não dezenas de milhares de API.

Números de API usam o card público de 27 de agosto de 2026 ([Anthropic](https://platform.claude.com/docs/en/about-claude/pricing), [OpenAI](https://developers.openai.com/api/docs/pricing) nas linhas standard de contexto curto), sem prompt cache e sem batch. Com cache agressivo a fatura API cai — mas não cai para o patamar de assinatura Coding Plan + SuperGrok Heavy. Até o Haiku, o piso barato americano, continua duas ordens de grandeza acima do mix de assinatura. Um split estilo chat 80/20 deixaria a coluna de API *pior*, não melhor.

```mermaid
flowchart LR
  subgraph volume [Volume barato]
    MM[MiniMax M3 plan]
    Local[Local models]
    OR[OpenRouter credits]
  end
  subgraph frontier [Ponto certo caro]
    Grok[Grok Heavy]
    Build[Grok Build]
    Exp[Experts]
  end
  Hermes[Hermes agentic ops] --> MM
  Hermes --> Grok
  Hermes --> Local
  Hermes --> OR
  Grok --> Build
  Grok --> Exp
  MM --> Ship[PRs · deploys · live products]
  Grok --> Ship
  Ship --> Catalog[BRNN AI · Clinicsy · Mentoring · TibiaPixel]
```

---

## Por que o mix funciona melhor que um único “melhor modelo”

### 1. Volume e inteligência não precisam ser o mesmo SKU

Agente de verdade queima token em:

- reler repo
- rodar tool
- falhar e tentar de novo
- manter sessão longa
- spawnar subagente

Isso é **volume**. Modelo chinês em plano generoso (MiniMax) absorve. Modelo frontier americano (Grok) entra quando a falha custa caro: arquitetura, review denso, PoC que não pode alucinar o caminho.

### 2. Assinatura vs. metered muda o comportamento da equipe

Com API metered, todo mundo hesita em “deixar o agente rodar a noite toda”. Com plano de volume + Heavy semanal, a gente **otimiza o trabalho**, não o medo da fatura. Isso importa mais do que a diferença de 2% de quality bench num leaderboard.

### 3. Rate limit por semana (Grok) vs. fatias de 4h / semana / mês (MiniMax)

Os dois tetos são chatos de formas diferentes — e isso é bom. MiniMax te força a espalhar o volume. Grok te dá um pool semanal alto para sprint. Juntos, raramente a operação inteira para no mesmo instante.

### 4. Grok Heavy: Build e Experts não são “extra de marketing”

No Heavy a gente usa de verdade:

- **Build** — acelera PoC e coding agent no terminal sem montar outro harness do zero.
- **Experts** — multi-agente para pesquisa densa, trade-offs e problemas que um único pass erra.

É por isso que a promo de US$ 99 (US$ 300 na lista) vale a pena ao lado do MiniMax de US$ 50: não porque o Grok seja mais barato por token — não é — mas porque essas duas superfícies aceleram o trabalho que o MiniMax sozinho não deve terminar.

Isso encaixa no que já descrevemos em [Loop Engineering Agentico](/blog/agentic-loop-engineering): o método precisa de modelo barato no loop e modelo forte no checkpoint.

---

## O que esses tokens realmente entregaram

O heatmap não é score de laboratório. É a conta do software que a gente **publica e opera** com loops de entrega agenticos no Hermes — MiniMax no volume, Grok no checkpoint difícil. Humano continua no gate de merge; o loop faz o resto.

Dois formatos. **Greenfield** a gente criou no loop. **Em andamento** a gente não criou: Clinicsy e Profitt já estavam se movendo. Pegamos esses projetos e hoje operamos com o mesmo loop engineering — Hermes + MiniMax + Grok.

### Criados no loop (greenfield)

| Produto | Host ao vivo | O que é |
| --- | --- | --- |
| **BRNN AI** | [ai.brenon.cloud](https://ai.brenon.cloud) | APIs first-party no nosso Swarm. **Whisper STT** e **Chatterbox TTS** estão no ar (15 min/mês de STT, 5 min/mês de TTS, pt-BR + en). LLM first-party ainda não entra no catálogo. |
| **DevDojo Mentoring** | [mentoria.devdojo.academy](https://mentoria.devdojo.academy) | Mentoria técnica gamificada, ligada ao GitHub e ao Discord da DevDojo. |
| **TibiaPixel** | [tibiapixel.brenon.cloud](https://tibiapixel.brenon.cloud) | Simulação open-source estilo Tibia, sobrevivência e craft. Agentes de IA e humanos no mesmo shard, mesmas regras. Alpha, três servidores. |
| **OficinaCloud** | [oficina.brenon.cloud](https://oficina.brenon.cloud) | SaaS multi-tenant para oficinas mecânicas de pequeno e médio porte: clientes, veículos, OS, estoque. |
| **VServer** | [vserver.brenon.cloud](https://vserver.brenon.cloud) | Dashboard que a gente fez para operar máquinas com GPU (IA local ou mineração) com monitoramento ao vivo. |

### Pegos em andamento (não nasceram no loop)

| Produto | Host ao vivo | O que é |
| --- | --- | --- |
| **Clinicsy** | [clinicsy.app](https://clinicsy.app) | SaaS multi-tenant para home care, consultório e clínica saírem da planilha. Já estava em progresso quando entrou no Hermes + MiniMax + Grok. |
| **Profitt** | [profitt.app](https://profitt.app) | Tracker de portfólio — DeFi + mercado tradicional, insights de IA, alertas no WhatsApp/Telegram. Mesma história: em movimento, depois operado pelo loop, não criado por ele. |

Isso não é slide. São hosts públicos: trial, alpha, tenant pagante. Os loops que queimaram 16,89B de tokens são os loops que abrem PR, rodam CI e fazem deploy nesse catálogo — inclusive nos dois que a gente não começou.

### Greenfield precisava de fábrica. Os dois que herdamos, também.

Repo vazio, spec, Swarm, time legado zero: um jeito bom de **testar modelo**. Um jeito ruim de repetir o *mesmo* fluxo no próximo repo — e pior ainda para jogar agente em cima de produto que já tem cliente, que é exatamente Clinicsy e Profitt.

Por isso, além do mix de modelo, a gente construiu o **[git-meta-harness](https://github.com/brenonaraujo/git-meta-harness)** (`gmh`): um framework que materializa o time de entrega — personas, issues/PRs no GitHub, sensores — para o Hermes e outros code agents rodarem o mesmo loop em vez de reinventar no chat. Greenfield ganha `gmh install`. SaaS em andamento ganha `gmh adopt` (Clinicsy é o caso que a gente escreveu). Escrevemos essa fábrica em [git-meta-harness — Do Loop Engineering a um Time que Entrega](/blog/git-meta-harness). Este post é a conta de token. Aquele é como o trabalho se reproduz.

Com MiniMax 5B + Grok Heavy (promo) a gente mantém:

- esses produtos evoluindo no **Hermes** (desktop, gateway, cron, subagentes)
- o loop do git-meta-harness reutilizável no Hermes e em outros coding agents
- experimentos com Gemini, OpenRouter e local sem trocar o backbone
- deploy, review e iteração **sem a ansiedade de estouro de token** como evento diário

Não é “ilimitado”. É **dimensionado**. O Ultra foi para descobrir o ritmo (16,89B, picos de 1,74B) enquanto o catálogo subia. Max + Heavy é cruzeiro: o teto fica acima do ritmo real de trabalho, e o custo mensal cabe em cartão de time pequeno, não em forecast de cloud enterprise.

---

## Lições práticas (sem romance)

1. **Meça o mix input/output.** Agente não é chat. Se o seu painel é 96% prompt, qualquer tabela de preço que ignore isso é ficção.
2. **Compre volume onde o dólar rende.** Coding plan chinês para o miolo do loop.
3. **Compre raciocínio onde a falha dói.** Grok Heavy / Build / Experts no review, na pesquisa e no PoC crítico.
4. **Recalibre o plano depois do spike.** A gente pagou US$ 120 enquanto descobria o ritmo; US$ 50 + Heavy é o regime de cruzeiro.
5. **Não jure fidelidade a um lab.** O mix (MiniMax + Grok + Gemini + OpenRouter + local) é a operação. O “melhor modelo do mês” é só uma peça.
6. **Cache e sessão importam.** Prompt repetido sem cache em API premium é luxo caro. O heatmap acima só é sobrevivível porque boa parte dos 16,89B é repetição que o plano já pagou.

---

## Conclusão

16,89B no MiniMax em dois meses. Grok Heavy no raciocínio, no Build e nos Experts. Hermes no meio, git-meta-harness como a fábrica que repete o loop. Resultado: produtos greenfield **e** dois projetos pegos em andamento (Clinicsy, Profitt) rodando em operação agentica por **~US$ 150/mês**, enquanto os **mesmos ~20B na API do Claude ou do ChatGPT** saem **~US$ 46–115 mil** — da ordem de **300×**.

Não é truque. É arbitragem de preço + desenho de workload. Modelos chineses baratos no volume. Modelos americanos caros e competentes no ponto certo. Juntos, sustentam uma operação empresarial agentica — produto no ar, não reel de demo — sem o drama do estouro de token.

Se você ainda está pagando frontier em 100% do loop, a planilha acima é o convite para repensar o mix — não a qualidade do modelo, o **lugar** dele na esteira.

---

## Referências e Links Úteis

- **[MiniMax Token Plan](https://platform.minimax.io/subscribe/token-plan)**: cotas Plus / Max / Ultra do coding plan (o backbone de volume).
- **[OpenAI API Pricing](https://developers.openai.com/api/docs/pricing)**: card oficial usado na tabela (GPT-5.6 Sol / Terra, agosto de 2026).
- **[Anthropic Claude Pricing](https://platform.claude.com/docs/en/about-claude/pricing)**: Sonnet 5, Opus 5, Haiku 4.5.
- **[xAI Pricing](https://x.ai/pricing)**: planos SuperGrok / Heavy, Build e Experts.
- **[Loop Engineering Agentico](/blog/agentic-loop-engineering)**: o método por trás dos loops que queimaram esses tokens.
- **[git-meta-harness — Do Loop Engineering a um Time que Entrega](/blog/git-meta-harness)**: a fábrica que reproduz o loop no Hermes e em outros coding agents.
- **[git-meta-harness](https://github.com/brenonaraujo/git-meta-harness)**: framework público, MIT, CLI `gmh`.
- **[Hermes Agent](https://hermes-agent.nousresearch.com/docs)**: o runtime agentico que consome o mix no dia a dia.
- **[BRNN AI](https://ai.brenon.cloud)**, **[Clinicsy](https://clinicsy.app)**, **[DevDojo Mentoring](https://mentoria.devdojo.academy)**, **[TibiaPixel](https://tibiapixel.brenon.cloud)**, **[OficinaCloud](https://oficina.brenon.cloud)**, **[VServer](https://vserver.brenon.cloud)**, **[Profitt](https://profitt.app)**: catálogo que a gente opera — greenfield mais Clinicsy e Profitt pegos em andamento.
