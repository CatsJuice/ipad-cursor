import { onMounted, onBeforeUnmount } from 'vue'
import { initCursor, updateCursor, disposeCursor, IpadCursorConfig, updateConfig } from '..'


export const ipadCursorPlugin = {
  install(app: any) {
    app.directive('cursor', {})
  },
}

export function useCursor(config?: IpadCursorConfig) {
  onMounted(() => updateCursor())
  onBeforeUnmount(() => updateCursor())
  config && updateConfig(config);
  initCursor()
  return { disposeCursor, initCursor, updateCursor }
}