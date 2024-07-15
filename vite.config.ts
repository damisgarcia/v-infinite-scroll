import { fileURLToPath, URL } from 'node:url'

import * as path from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'vInfiniteScroll',
      fileName: 'v-infinite-scroll'
    },
    rollupOptions: {
      external: ['vue', 'peerDepsExternal'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [vue(), dts(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
