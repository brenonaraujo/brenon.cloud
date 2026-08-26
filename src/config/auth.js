/** Authentik OIDC for the public brenon.cloud SPA. Site stays public; auth is optional. */
export const AUTH_ISSUER = 'https://auth.brenon.cloud/application/o/home/'
export const AUTH_CLIENT_ID = 'brenon-cloud'
export const ENROLLMENT_FLOW = 'https://auth.brenon.cloud/if/flow/bankdefi-enrollment-flow/'

export function authRedirectUri() {
  return `${window.location.origin}/auth/callback`
}

export function oidcSettings() {
  return {
    authority: AUTH_ISSUER,
    client_id: AUTH_CLIENT_ID,
    redirect_uri: authRedirectUri(),
    post_logout_redirect_uri: `${window.location.origin}/`,
    response_type: 'code',
    scope: 'openid profile email all_groups',
    loadUserInfo: true,
    automaticSilentRenew: false
  }
}
