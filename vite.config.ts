import { fileURLToPath, URL } from 'node:url'

import { resolve } from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      cleanVueFileName: true,
      outDir: resolve(__dirname, 'dist'),
      entryRoot: 'src',
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json')
    }),
    vueDevTools()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vInfiniteScroll',
      formats: ['es', 'umd'],
      fileName: 'v-infinite-scroll'
    },
    rollupOptions: {
      input: './src/index.ts',
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  root: '.',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: resolve(__dirname, 'node_modules/vue'),
      '@vueuse/core': resolve(__dirname, 'node_modules/@vueuse/core')
    }
  }
})
