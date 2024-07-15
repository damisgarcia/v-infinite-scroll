import vue from 'rollup-plugin-vue'
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        format: 'esm',
        file: 'dist/v-infinite-scroll.mjs'
      },
      {
        format: 'cjs',
        file: 'dist/v-infinite-scroll.js'
      }
    ],
    plugins: [typescript(), vue(), peerDepsExternal()]
  }
]
