import { onMounted, nextTick, onUnmounted } from "vue";
import {
  CursorType,
  resetCursor,
  initCursor,
  updateCursor,
  disposeCursor,
  IpadCursorConfig,
  updateConfig,
  customCursorStyle,
} from "..";

export const ipadCursorPlugin = {
  install(app: any) {
    app.directive("cursor", {});
  },
};

export function useCursor(config?: IpadCursorConfig) {
  onMounted(() => updateCursor());
  onUnmounted(() => updateCursor());
  config && updateConfig(config);
  initCursor();
  return {
    CursorType,
    resetCursor,
    disposeCursor,
    initCursor,
    updateCursor,
    updateConfig,
    customCursorStyle,
  };
}
