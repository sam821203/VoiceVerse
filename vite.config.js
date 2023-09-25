import { fileURLToPath, URL } from 'node:url'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
// import { visualizer } from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueSetupExtend(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'VoiceVerse',
        theme_color: '#ff5e3a',
        icons: [
          {
            src: 'assets/img/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,}']
      }
    })
    // visualizer({ open: true })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/utils/_variable.scss";`
      }
    }
  }
})
