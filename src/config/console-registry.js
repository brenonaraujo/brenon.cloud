/**
 * Offline fallback for the member console.
 * Live catalog: GET https://control.brenon.cloud/api/v1/catalog
 * ACL: src/config/console-acl.mjs
 *
 * groups: ['*'] = any Authentik session
 * otherwise the user needs at least one listed group (all_groups claim)
 */
import { visibleForGroups } from './console-acl.mjs'

export const CONSOLE_SERVICES = [
  {
    id: 'draw',
    title: { en: 'Draw', pt: 'Draw' },
    description: {
      en: 'Shared whiteboard. Any Brenon Cloud account.',
      pt: 'Quadro compartilhado. Qualquer conta Brenon Cloud.'
    },
    url: 'https://draw.brenon.cloud',
    groups: ['*'],
    icon: 'draw',
    color: 'blue'
  },
  {
    id: 'grafana',
    title: { en: 'Grafana', pt: 'Grafana' },
    description: {
      en: 'Metrics and dashboards for the lab.',
      pt: 'Métricas e dashboards do lab.'
    },
    url: 'https://grafana.brenon.cloud',
    groups: ['brenon-admins', 'brenon-ops', 'brenon-viewers'],
    icon: 'chart',
    color: 'orange'
  },
  {
    id: 'n8n',
    title: { en: 'n8n', pt: 'n8n' },
    description: {
      en: 'Workflow automation.',
      pt: 'Automação de fluxos.'
    },
    url: 'https://n8n.brenon.cloud',
    groups: ['brenon-admins', 'brenon-ops', 'brenon-builders'],
    icon: 'workflow',
    color: 'purple'
  },
  {
    id: 'minio',
    title: { en: 'MinIO', pt: 'MinIO' },
    description: {
      en: 'Object storage console. S3 stays on the API.',
      pt: 'Console do object storage. S3 continua na API.'
    },
    url: 'https://minio-console.brenon.cloud',
    groups: ['brenon-admins', 'brenon-ops'],
    icon: 'cloudstorage',
    color: 'cyan'
  },
  {
    id: 'portainer',
    title: { en: 'Portainer', pt: 'Portainer' },
    description: {
      en: 'Swarm. Staff only. Local login stays as break-glass.',
      pt: 'Swarm. Só staff. Login local continua como break-glass.'
    },
    url: 'https://portainer.brenon.cloud',
    groups: ['brenon-admins'],
    icon: 'settings',
    color: 'green'
  }
]

export function listForGroups(userGroups) {
  return visibleForGroups(CONSOLE_SERVICES, userGroups)
}

export { visibleForGroups }
