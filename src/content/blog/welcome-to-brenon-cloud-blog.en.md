---
title: Welcome to the Brenon.Cloud Blog
description: Kicking off the Brenon.Cloud blog — what to expect, how it is built, and how to publish your own articles via GitHub issues.
date: 2026-05-20
author: Brenon Araujo
tags: [announcement, platform, brenon-cloud]
cover: /brenon-cloud-logo.png
---

# Welcome aboard

The **Brenon.Cloud** blog is now live. This is the place where we will share
deep dives, lessons learned, and practical guides about running a personal
cloud on commodity hardware.

## What you can expect

- **Architecture deep-dives** of the services that power Brenon.Cloud
- **How-tos** for Docker Swarm, Kong, Authentik, n8n, Grafana and friends
- **Post-mortems** and notes from real incidents
- **Experiments** with edge automation and self-hosted AI

## How posts are published

Every article is just a Markdown file under `src/content/blog/`. The site
loads them at build time, parses the frontmatter, renders the body, and
adds them to this listing automatically.

You can author a new post from a GitHub Issue using the
**"📝 New blog post"** issue template — fill the fields, hit submit, and a
maintainer turns it into a Markdown file in this folder.

```yaml
---
title: My great article
description: A short summary used in cards and SEO
date: 2026-05-20
tags: [docker, swarm]
---
```

### Multi-language posts

The filename decides which language a post belongs to:

- `my-post.md` → fallback for every language
- `my-post.en.md` → English version
- `my-post.pt.md` → Portuguese version

The site automatically picks the variant for the active language and
falls back to another available locale when a translation is missing.

That is all you need to get started. Stay tuned!
