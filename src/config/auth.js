/** Authentik OIDC for the public brenon.cloud SPA. Site stays public; auth is optional. */
export const AUTH_ISSUER = 'https://auth.brenon.cloud/application/o/home/'
export const AUTH_CLIENT_ID = 'brenon-cloud'
export const ENROLLMENT_FLOW = 'https://auth.brenon.cloud/if/flow/bankdefi-enrollment-flow/'
export const CONSOLE_ORIGIN = 'https://console.brenon.cloud'
export const CONSOLE_CONTINUE = `${CONSOLE_ORIGIN}/auth/continue`

/** Netlify 301s /console, but a client-side router.replace never hits it and blanks. */
export function consoleHandoff(path) {
  if (path === '/console') return `${CONSOLE_ORIGIN}/`
  if (typeof path === 'string' && path.startsWith('/console/')) {
    return `${CONSOLE_ORIGIN}${path.slice('/console'.length)}`
  }
  return ''
}

export function authRedirectUri() {
  return `${window.location.origin}/auth/callback`
}

/** After logout always land on the public site, never /console (that would log in again). */
export function postLogoutRedirectUri() {
  return `${window.location.origin}/`
}

export function oidcSettings() {
  return {
    authority: AUTH_ISSUER,
    client_id: AUTH_CLIENT_ID,
    redirect_uri: authRedirectUri(),
    post_logout_redirect_uri: postLogoutRedirectUri(),
    response_type: 'code',
    scope: 'openid profile email all_groups',
    loadUserInfo: true,
    automaticSilentRenew: false
  }
}
