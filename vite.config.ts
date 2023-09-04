import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// Plugins
import pagesPlugin from 'vite-plugin-pages'
import layoutPlugin from 'vite-plugin-vue-layouts'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    pagesPlugin({
      dirs: [{ dir: 'src/views', baseRoute: '', filePattern: '**/*.vue' }],
      exclude: ['**/components/*.vue']
    }),
    layoutPlugin({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'MainLayout'
    }),
    UnoCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: './types/auto-imports.d.ts',
      dirs: ['./src/stores']
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      dts: './types/components.d.ts'
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/scss/element-plus.scss" as *;`
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    hmr: true,
    proxy: {
      '/server/api': {
        target: 'https://dev-ldm-m.xdp8.cn'
      }
    }
  }
})
