<script setup lang="ts">
import { computed, nextTick, ref, watchEffect } from "vue";
import LanguageIcon from "../LanguageIcon.vue";
import type { Code } from "../../types/lang";
import { useCursor } from "../../../../src/vue";

const props = defineProps<{
  codes: Array<Code>;
}>();

const active = ref(0);
const { updateCursor, customCursorStyle } = useCursor();

const activeCode = computed(() => props.codes[active.value]);

watchEffect(() => {
  if (activeCode.value) {
    nextTick(() => updateCursor());
  }
});
</script>

<template>
  <div
    bg-dark-8
    rounded-3
    p2
    class="code-box"
    flex="~ col nowrap gap-2"
    overflow-hidden
  >
    <header flex="~ gap-1" items-center w-full>
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
  </div>
</template>

<style scoped>
.lang-tab {
  opacity: 0.8;
}
.lang-tab--active {
  opacity: 1;
  background-color: rgba(120, 120, 120, 0.3);
}
</style>
