import { ipadCursorPlugin } from '../../../src/vue/index'

export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.use(ipadCursorPlugin, {
    blockStyle: {
      radius: 'auto',
    },
  })
})
