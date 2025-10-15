<template>
  <div class="min-h-screen bg-gray-900">
    <Navbar />
    <slot></slot>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>