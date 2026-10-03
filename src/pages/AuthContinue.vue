<template>
  <p class="p-8 text-center text-gray-300">{{ t('auth.continuing') }}</p>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { CONSOLE_CONTINUE } from '../config/auth'

const { t } = useI18n()

onMounted(() => {
  window.location.replace(CONSOLE_CONTINUE)
})
</script>
