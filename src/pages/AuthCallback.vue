<template>
  <p class="p-8 text-center text-gray-300">{{ t('auth.completing') }}</p>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { consoleHandoff } from '../config/auth'
import { useAuthStore } from '../stores/authStore'

const { t } = useI18n()
const router = useRouter()
const auth = useAuthStore()

onMounted(async () => {
  try {
    const to = await auth.completeLogin()
    const handoff = consoleHandoff(to)
    if (handoff) {
      window.location.replace(handoff)
      return
    }
    router.replace(to)
  } catch {
    router.replace('/')
  }
})
</script>
