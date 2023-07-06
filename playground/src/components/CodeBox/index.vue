<script setup lang="ts">
import { computed, nextTick, ref, watchEffect } from "vue";
import LanguageIcon from "../LanguageIcon.vue";
import type { Code } from "../../types/lang";
import { useCursor } from "../../../../src/vue";
import { useClipboard } from "@vueuse/core";

const props = defineProps<{
  codes: Array<Code>;
}>();

const active = ref(0);
const { updateCursor, customCursorStyle } = useCursor();
const { copy } = useClipboard();

const activeCode = computed(() => props.codes[active.value]);

watchEffect(() => {
  if (activeCode.value) {
    nextTick(() => updateCursor());
  }
});

function onCopy(e: MouseEvent) {
  const el = e.target as HTMLElement;
  const tooltip = document.createElement("div");
  const rect = el.getBoundingClientRect();
  tooltip.textContent = "Copied!";
  tooltip.classList.add("tooltip");
  tooltip.style.position = "fixed";
  tooltip.style.top = `${rect.top + rect.height + 12}px`;
  tooltip.style.left = `${rect.left + rect.width / 2}px`;
  tooltip.style.transform = "translate(-50%, 0)";
  document.body.appendChild(tooltip);

  copy(activeCode.value.code);

  setTimeout(() => {
    tooltip.remove();
  }, 1000);
}
</script>

<template>
  <div
    bg-dark-8
    rounded-3
    p2
    class="code-box"
    flex="~ col nowrap gap-2"
    overflow-hidden
    relative
  >
    <header relative flex="~ gap-3" items-center w-full>
      <div v-for="({ lang, title }, index) in codes" :key="title || lang">
        <div
          data-cursor="block"
          :class="{ 'lang-tab--active': active === index }"
          class="lang-tab"
          flex="~ gap-2"
          flex-center
          rounded-2
          transition="~ all"
          @click="active = index"
          px4
          py1
          font-500
          text-white
          :data-cursor-style="
            customCursorStyle({
              background: 'rgba(255, 255, 255, 0.2)',
            })
          "
        >
          <LanguageIcon :lang="lang" />
          <div v-if="title">{{ title }}</div>
          <div v-else capitalize>{{ lang }}</div>
        </div>
      </div>
    </header>

    <main
      v-auto-animate
      bg="#2b2b2b"
      h-0
      flex="~ 1"
      w-full
      overflow-auto
      rounded-2
    >
      <highlightjs
        data-cursor="text"
        :key="activeCode.lang"
        :language="activeCode.lang"
        :code="activeCode.code"
      />
    </main>

    <div
      backdrop-blur-12px
      right-12px
      top-54px
      absolute
      w-36px
      h-36px
      class="icon-btn"
      data-cursor="block"
      p="1"
      text-sm
      flex-center
      @click="onCopy"
      text-white
    >
      <div i-carbon:copy />
    </div>
  </div>
</template>

<style>
.tooltip {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px) saturate(180%);
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}
.lang-tab {
  opacity: 0.8;
}
.lang-tab--active {
  opacity: 1;
  background-color: rgba(120, 120, 120, 0.3);
}
</style>
