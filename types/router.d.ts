import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    logined?: boolean
    cacheable?: false
    static?: true
    alias?: string
  }
}
