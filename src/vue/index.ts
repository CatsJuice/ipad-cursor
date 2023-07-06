import { onMounted, onBeforeUnmount } from "vue";
import {
  CursorType,
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
  onBeforeUnmount(() => updateCursor());
  config && updateConfig(config);
  initCursor();
  return {
    CursorType,
    disposeCursor,
    initCursor,
    updateCursor,
    updateConfig,
    customCursorStyle,
  };
}
