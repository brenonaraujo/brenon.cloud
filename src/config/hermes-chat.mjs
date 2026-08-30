/** Live chat on the tenant is the dashboard Chat tab, which spawns `hermes --tui`. */
export function hermesChatUrl(hostname) {
  const host = String(hostname || '')
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
  if (!host) return ''
  return `https://${host}/hermes/chat`
}
