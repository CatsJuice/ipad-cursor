import { onMounted, onBeforeUnmount } from 'vue'
import { init, register } from '..'


export const iCursorPlugin = {
  install(app: any) {
    app.directive('cursor', {})
  },
}

export function useCursor() {
  onMounted(() => register())
  onBeforeUnmount(() => register())
  init()
  return { register }
}