import { type Plugin } from 'vue'
import { vInfiniteScroll } from './v-infinite-scroll'

const useInfiniteScroll = {
  install(app) {
    app.directive('v-infinite-scroll', vInfiniteScroll)
  }
} as Plugin

export { useInfiniteScroll, vInfiniteScroll }
