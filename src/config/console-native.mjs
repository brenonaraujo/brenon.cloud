/**
 * First-party consoles that are not (yet) on the live catalog.
 * Merged by id so a later control-plane row wins.
 */
export const NATIVE_CONSOLE_APPS = [
  {
    id: 'authentik',
    title: { en: 'Authentik', pt: 'Authentik' },
    description: {
      en: 'Identity provider admin. Brenon admins only.',
      pt: 'Admin do provedor de identidade. Só admins Brenon.'
    },
    url: 'https://auth.brenon.cloud/if/admin/',
    groups: ['brenon-admins'],
    icon: 'settings',
    color: 'orange',
    kind: 'platform'
  }
]

export function mergeCatalog(services, extras = NATIVE_CONSOLE_APPS) {
  const seen = new Set((services || []).map((svc) => svc.id))
  return [...(services || []), ...(extras || []).filter((svc) => svc.id && !seen.has(svc.id))]
}
