import { type Plugin } from 'vue'
import { vInfiniteScroll } from './v-infinite-scroll'

export const useInfiniteScroll = {
  install(app) {
    app.directive('v-infinite-scroll', vInfiniteScroll)
  }
} as Plugin

export default { useInfiniteScroll, vInfiniteScroll }
