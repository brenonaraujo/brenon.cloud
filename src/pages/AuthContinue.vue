<template>
  <p class="p-8 text-center text-gray-300">{{ t('auth.continuing') }}</p>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/authStore'

const { t } = useI18n()
const auth = useAuthStore()

onMounted(() => {
  auth.login('/console')
})
</script>
