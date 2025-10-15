<template>
  <div class="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800 transition-colors duration-200">
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </div>
</template>