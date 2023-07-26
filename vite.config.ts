import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// Plugins
import pagesPlugin from 'vite-plugin-pages'
import layoutPlugin from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    pagesPlugin({
      dirs: [{ dir: 'src/views', baseRoute: '', filePattern: '**/*.vue' }],
      exclude: ['**/components/*.vue'],
      routeStyle: 'nuxt'
    }),
    layoutPlugin({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'index'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
