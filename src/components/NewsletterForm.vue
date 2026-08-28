<template>
  <section id="newsletter" class="relative rounded-2xl border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm p-6 sm:p-8">
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
      <div>
        <h2 class="text-xl font-semibold text-white">{{ t('blog.newsletter.title') }}</h2>
        <p class="mt-2 text-sm text-gray-300 leading-relaxed max-w-xl">
          {{ t('blog.newsletter.blurb') }}
        </p>
      </div>
      <a
        :href="feedHref"
        class="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 whitespace-nowrap"
      >
        {{ t('blog.newsletter.rss') }}
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.18 15.64a2.18 2.18 0 11.04 4.36 2.18 2.18 0 01-.04-4.36zm-2.2-5.7v2.15c3.7 0 7.2 1.5 9.82 4.12l1.52-1.52A15.95 15.95 0 003.98 9.94zm0-5.66v2.16c7.1 0 12.86 5.76 12.86 12.86h2.16C18.99 10.08 11.9 3 3.98 3z"/>
        </svg>
      </a>
    </div>

    <form class="space-y-4" @submit.prevent="submit">
      <div class="absolute -left-[10000px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          website
          <input v-model="website" type="text" name="website" tabindex="-1" autocomplete="off">
        </label>
      </div>
      <div class="flex flex-col sm:flex-row gap-3">
        <input
          v-model="email"
          type="email"
          required
          autocomplete="email"
          :placeholder="t('blog.newsletter.email')"
          class="flex-1 rounded-lg bg-gray-900/70 border border-gray-700 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
        >
        <button
          type="submit"
          :disabled="busy"
          class="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium whitespace-nowrap"
        >
          {{ busy ? t('common.loading') : t('blog.newsletter.submit') }}
        </button>
      </div>
      <label class="flex items-start gap-3 text-sm text-gray-400 cursor-pointer">
        <input
          v-model="consent"
          type="checkbox"
          required
          class="mt-1 rounded border-gray-600 bg-gray-900 text-blue-500 focus:ring-blue-500"
        >
        <span>{{ t('blog.newsletter.consent') }}</span>
      </label>
    </form>

    <p
      v-if="message"
      class="mt-4 text-sm"
      :class="tone === 'error' ? 'text-red-400' : 'text-emerald-300'"
    >
      {{ message }}
    </p>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const route = useRoute()

const email = ref('')
const website = ref('')
const consent = ref(false)
const busy = ref(false)
const message = ref('')
const tone = ref('ok')

const feedHref = computed(() => (locale.value === 'pt' ? '/feed.pt.xml' : '/feed.en.xml'))

function setStatus(key, nextTone = 'ok') {
  message.value = t(key)
  tone.value = nextTone
}

function applyQuery(status) {
  if (status === 'confirmed') setStatus('blog.newsletter.confirmed')
  else if (status === 'unsubscribed') setStatus('blog.newsletter.unsubscribed')
  else if (status === 'invalid') setStatus('blog.newsletter.invalid', 'error')
  else if (status === 'error') setStatus('blog.newsletter.error', 'error')
}

onMounted(() => applyQuery(route.query.newsletter))
watch(() => route.query.newsletter, applyQuery)

async function submit() {
  if (!consent.value) return
  busy.value = true
  message.value = ''
  try {
    const res = await fetch('/.netlify/functions/newsletter-subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        locale: locale.value === 'pt' ? 'pt' : 'en',
        website: website.value
      })
    })
    const data = await res.json().catch(() => ({}))
    if (res.status === 503 || data.error === 'not_configured') {
      setStatus('blog.newsletter.notConfigured', 'error')
      return
    }
    if (data.ignored) {
      setStatus('blog.newsletter.pending')
      email.value = ''
      consent.value = false
      return
    }
    if (data.already) {
      setStatus('blog.newsletter.already')
      return
    }
    if (data.pending) {
      setStatus('blog.newsletter.pending')
      email.value = ''
      consent.value = false
      return
    }
    setStatus('blog.newsletter.error', 'error')
  } catch {
    setStatus('blog.newsletter.error', 'error')
  } finally {
    busy.value = false
  }
}
</script>
