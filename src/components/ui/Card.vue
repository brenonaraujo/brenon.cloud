<template>
  <div class="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800 transition-colors duration-200 h-full flex flex-col">
    <slot name="header"></slot>
    <div class="flex-1">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>