/**
 * Brenon Cloud service registry (v0).
 * As-code catalog of consoles a logged-in human may open.
 * A backend can replace this file later; the page only reads `listForGroups`.
 *
 * groups: ['*'] = any Authentik session
 * otherwise the user needs at least one listed group (from the all_groups claim)
 */
export const CONSOLE_SERVICES = [
  {
    id: 'draw',
    title: { en: 'Draw', pt: 'Draw' },
    description: {
      en: 'Shared whiteboard. Any Brenon Cloud account.',
      pt: 'Quadro compartilhado. Qualquer conta Brenon Cloud.'
    },
    url: 'https://draw.brenon.cloud',
    groups: ['*']
  },
  {
    id: 'grafana',
    title: { en: 'Grafana', pt: 'Grafana' },
    description: {
      en: 'Metrics and dashboards for the lab.',
      pt: 'Métricas e dashboards do lab.'
    },
    url: 'https://grafana.brenon.cloud',
    groups: ['brenon-admins', 'brenon-ops', 'brenon-viewers']
  },
  {
    id: 'n8n',
    title: { en: 'n8n', pt: 'n8n' },
    description: {
      en: 'Workflow automation.',
      pt: 'Automação de fluxos.'
    },
    url: 'https://n8n.brenon.cloud',
    groups: ['brenon-admins', 'brenon-ops', 'brenon-builders']
  },
  {
    id: 'minio',
    title: { en: 'MinIO', pt: 'MinIO' },
    description: {
      en: 'Object storage console. S3 stays on the API.',
      pt: 'Console do object storage. S3 continua na API.'
    },
    url: 'https://minio-console.brenon.cloud',
    groups: ['brenon-admins', 'brenon-ops']
  },
  {
    id: 'portainer',
    title: { en: 'Portainer', pt: 'Portainer' },
    description: {
      en: 'Swarm. Staff only. Local login stays as break-glass.',
      pt: 'Swarm. Só staff. Login local continua como break-glass.'
    },
    url: 'https://portainer.brenon.cloud',
    groups: ['brenon-admins']
  }
]

export function listForGroups(userGroups) {
  const have = new Set((userGroups || []).map((g) => String(g).toLowerCase()))
  return CONSOLE_SERVICES.filter((svc) => {
    if (svc.groups.includes('*')) return true
    return svc.groups.some((g) => have.has(g.toLowerCase()))
  })
}
