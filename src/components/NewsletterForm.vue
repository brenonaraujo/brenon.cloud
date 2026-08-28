<template>
  <div id="newsletter" class="text-sm">
    <p
      v-if="done"
      class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-gray-400"
    >
      <span>{{ t('blog.newsletter.done') }}</span>
      <a :href="feedHref" class="text-blue-400 hover:text-blue-300">{{ t('blog.newsletter.rss') }}</a>
    </p>

    <form
      v-else
      class="relative flex flex-col items-center gap-3"
      @submit.prevent="submit"
    >
      <div class="absolute -left-[10000px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          website
          <input v-model="website" type="text" name="website" tabindex="-1" autocomplete="off">
        </label>
      </div>
      <div class="flex w-full max-w-xl flex-col sm:flex-row gap-2">
        <input
          v-model="email"
          type="email"
          required
          autocomplete="email"
          :placeholder="t('blog.newsletter.email')"
          class="min-h-[44px] flex-1 rounded-lg bg-gray-900/70 border border-gray-700 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500"
        >
        <button
          type="submit"
          :disabled="busy"
          class="min-h-[44px] px-5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-medium whitespace-nowrap"
        >
          {{ busy ? t('common.loading') : t('blog.newsletter.submit') }}
        </button>
      </div>
      <label class="flex items-start gap-2 max-w-xl text-xs text-gray-500 cursor-pointer">
        <input
          v-model="consent"
          type="checkbox"
          required
          class="mt-0.5 rounded border-gray-600 bg-gray-900 text-blue-500"
        >
        <span>{{ t('blog.newsletter.consent') }}</span>
      </label>
      <a :href="feedHref" class="text-xs text-blue-400 hover:text-blue-300">{{ t('blog.newsletter.rss') }}</a>
      <p
        v-if="message"
        class="text-xs"
        :class="tone === 'error' ? 'text-red-400' : 'text-emerald-300'"
      >
        {{ message }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const STORAGE_KEY = 'brenon-newsletter'

const { t, locale } = useI18n()
const route = useRoute()

const email = ref('')
const website = ref('')
const consent = ref(false)
const busy = ref(false)
const message = ref('')
const tone = ref('ok')
const done = ref(false)

const feedHref = computed(() => (locale.value === 'pt' ? '/feed.pt.xml' : '/feed.en.xml'))

function markDone() {
  done.value = true
  try {
    localStorage.setItem(STORAGE_KEY, 'on')
  } catch {
    /* ignore quota / private mode */
  }
}

function setStatus(key, nextTone = 'ok') {
  message.value = t(key)
  tone.value = nextTone
}

function applyQuery(status) {
  if (status === 'confirmed') {
    markDone()
    return
  }
  if (status === 'unsubscribed') {
    done.value = false
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    setStatus('blog.newsletter.unsubscribed')
    return
  }
  if (status === 'invalid') setStatus('blog.newsletter.invalid', 'error')
  else if (status === 'error') setStatus('blog.newsletter.confirmError', 'error')
}

onMounted(() => {
  try {
    if (localStorage.getItem(STORAGE_KEY) === 'on') done.value = true
  } catch {
    /* ignore */
  }
  applyQuery(route.query.newsletter)
})
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
    if (data.already) {
      markDone()
      return
    }
    if (data.pending || data.ignored) {
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
