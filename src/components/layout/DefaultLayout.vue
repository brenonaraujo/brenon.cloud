<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <Navbar />
    <slot></slot>
    <footer class="bg-gray-800 text-center py-8 mt-auto">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p class="text-gray-400">&copy; {{ currentYear }} Brenon.Cloud - All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Navbar from '../Navbar.vue'

const currentYear = computed(() => new Date().getFullYear())
</script>