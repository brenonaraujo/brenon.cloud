<!--
This is a layout component that provides a consistent structure across pages.
It includes the Navbar and wraps the content in a container.
-->
<template>
  <div class="min-h-screen bg-gray-900">
    <Navbar />
    <slot></slot>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>