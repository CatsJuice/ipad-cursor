import { onMounted, onUnmounted } from "vue";
import type { App, Directive, Plugin } from "vue";
import {
  CursorType,
  initCursor,
  resetCursor,
  updateCursor,
  updateConfig,
  disposeCursor,
  IpadCursorStyle,
  IpadCursorConfig,
  customCursorStyle,
} from "..";

export const ipadCursorPlugin: Plugin = {
  install(app: App, options?: IpadCursorConfig): any {    
    initCursor();
    options && updateConfig(options);

    function createDirective(type: "block" | "text") {
      return {
        mounted: (el, binding) => {
          el.setAttribute("data-cursor", type);
          if (binding.value) {
            el.setAttribute(
              "data-cursor-style",
              typeof binding.value === "string"
                ? binding.value
                : customCursorStyle(binding.value)
            );
          }
          updateCursor();
        },
        unmounted: () => updateCursor(),
      } as Directive<any, (IpadCursorStyle & Record<string, any>) | string>
    }

    app.directive("cursor-block", createDirective('block'));
    app.directive("cursor-text", createDirective('text'));
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
