// Medição de uso pelo Umami da casa (mesmo contrato do Profitt, ADR-0049).
// Desligada quando VITE_ANALYTICS_URL ou VITE_ANALYTICS_WEBSITE_ID está
// vazio: nenhum script é carregado e nada é enviado.
//
// O coletor à mão (control plane, visitor_id no browser, tempo visível)
// não volta. O Umami não usa cookie e não guarda identificador aqui.
// ?nocount=1 continua desligando a contagem neste browser.

const OFF = 'brenon-analytics-off'

const allowed = /^\/(?:$|blog(?:\/[a-z0-9][a-z0-9._-]{0,120})?|service|path|games(?:\/[a-z0-9][a-z0-9._-]{0,80})?)$/

export function allowPath(path) {
  return typeof path === 'string' && !path.includes('..') && allowed.test(path)
}

export function applyOptOut(search, storage) {
  const q = new URLSearchParams(search)
  if (q.get('nocount') === '1') storage.setItem(OFF, '1')
  if (q.get('nocount') === '0') storage.removeItem(OFF)
  return storage.getItem(OFF) === '1'
}

/**
 * Configuração efetiva. Qualquer um dos dois vazio desliga a medição.
 */
export function resolveAnalyticsConfig(url, websiteId) {
  const base = typeof url === 'string' ? url.trim().replace(/\/+$/, '') : ''
  const id = typeof websiteId === 'string' ? websiteId.trim() : ''
  if (!id || !/^https?:\/\//.test(base)) return null
  return { scriptUrl: `${base}/script.js`, websiteId: id }
}

export function doNotTrackEnabled(nav) {
  if (!nav) return false
  return nav.doNotTrack === '1' || nav.msDoNotTrack === '1'
}

/**
 * O que pode sair do browser. `null` = não envia.
 * Nunca leva query, identificador ou página fora da lista pública.
 */
export function trackingDecision({ path, optedOut, doNotTrack, host }) {
  if (optedOut || doNotTrack) return null
  if (host === 'localhost' || host === '127.0.0.1' || host === '::1' || host === '[::1]') return null
  if (!allowPath(path)) return null
  return { url: path }
}

/** Tira query e fragmento. Página interna fora da lista pública não sai. */
export function cleanReferrer(value, origin) {
  if (typeof value !== 'string' || !value) return ''
  const cut = value.split('#')[0].split('?')[0]
  if (!origin) return cut
  let url
  try {
    url = new URL(cut, origin)
  } catch {
    return ''
  }
  if (url.origin !== origin) return `${url.origin}${url.pathname}`
  return allowPath(url.pathname) ? url.pathname : ''
}

export function installAnalytics(router, env) {
  try {
    wireAnalytics(router, env || readViteEnv())
  } catch (err) {
    console.error('analytics install:', err)
  }
}

function readViteEnv() {
  return import.meta.env
}

function wireAnalytics(router, env) {
  const config = resolveAnalyticsConfig(env && env.VITE_ANALYTICS_URL, env && env.VITE_ANALYTICS_WEBSITE_ID)
  applyOptOut(location.search, localStorage)
  stripNocount()
  if (!config) return

  let script
  let lastUrl = ''
  let lastPath

  function loadScript() {
    script ??= new Promise((resolve) => {
      const tracker = () => globalThis.umami ?? null
      const el = document.createElement('script')
      el.defer = true
      el.src = config.scriptUrl
      el.dataset.websiteId = config.websiteId
      // Quem decide o que é enviado é este módulo, não o script.
      el.dataset.autoTrack = 'false'
      el.dataset.doNotTrack = 'true'
      el.onload = () => resolve(tracker())
      el.onerror = () => resolve(null)
      document.head.appendChild(el)
    })
    return script
  }

  function decide(path) {
    return trackingDecision({
      path,
      optedOut: localStorage.getItem(OFF) === '1',
      doNotTrack: doNotTrackEnabled(navigator),
      host: location.hostname
    })
  }

  async function track(path) {
    try {
      if (!decide(path) || lastPath === path) return
      const umami = await loadScript()
      // Opt-out ou DNT no meio do carregamento: o envio que já estava
      // a caminho não sai.
      const decision = decide(path)
      if (!decision || lastPath === path) return
      if (!umami || typeof umami.track !== 'function') return
      lastPath = path
      const referrer = lastUrl || cleanReferrer(document.referrer, location.origin)
      lastUrl = decision.url
      umami.track((defaults) => ({
        ...defaults,
        url: decision.url,
        referrer: referrer || cleanReferrer(defaults.referrer || '', location.origin)
      }))
    } catch (err) {
      console.error('analytics track:', err)
    }
  }

  router.afterEach((to) => {
    try {
      applyOptOut(location.search, localStorage)
      stripNocount()
      track(to.path)
    } catch (err) {
      console.error('analytics track:', err)
    }
  })
  track(router.currentRoute.value.path)
}

function stripNocount() {
  if (!location.search.includes('nocount=')) return
  const url = new URL(location.href)
  url.searchParams.delete('nocount')
  history.replaceState({}, '', url.pathname + url.search + url.hash)
}
