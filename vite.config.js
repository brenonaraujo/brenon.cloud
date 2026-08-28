import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { rssPlugin } from './lib/rss-plugin.mjs'

export default defineConfig({
  plugins: [vue(), rssPlugin()],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  server: {
    historyApiFallback: true
  }
})