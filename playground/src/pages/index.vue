<script setup lang="ts">
import { ref, computed } from "vue";

import CodeBox from "../components/CodeBox/index.vue";

import { basicCodes } from "../codes/basic";
import { installCodes } from "../codes/install";
import { useCursor } from "../../../src/vue/index";
import { customBgCodes } from "../codes/custom-bg";
import { blurEffectCodes } from "../codes/blur-effect";
import { customBorderCodes } from "../codes/custom-border";
import { customAnimeSpeedCodes } from "../codes/custom-anime-speed";
import { useDark } from "@vueuse/core";

const isDark = useDark();
const { customCursorStyle, initCursor, disposeCursor } = useCursor({
  normalStyle: { backdropBlur: 12 },
});

const btns = [
  { label: "Default" },
  { label: "CustomBg", style: customCursorStyle({ background: "#ff204020" }) },
  {
    label: "Blur Effect",
    style: customCursorStyle({
      backdropBlur: 0,
      durationBackdropFilter: 1000,
    }),
  },
  {
    label: "Custom Border",
    style: customCursorStyle({
      border: "1px solid currentColor",
      radius: 0,
    }),
  },
  {
    label: "Custom Animation Speed",
    style: customCursorStyle({
      durationBase: 2000,
    }),
  },
];

const activeBtn = ref(btns[0].label);

const showCodes = computed(() => {
  return (
    {
      default: basicCodes,
      CustomBg: customBgCodes,
      "Blur Effect": blurEffectCodes,
      "Custom Border": customBorderCodes,
      "Custom Animation Speed": customAnimeSpeedCodes,
    }[activeBtn.value] || basicCodes
  );
});
</script>

<template>
  <div  flex="~ col" items-center h-auto md:h-full md:justify-center py-100px md:py0>
    <div w-full flex="~ col" md:flex="~ row" gap-10 items-center md:justify-between md:items-start>
      <!-- logo, info -->
      <div
        flex="~ col gap-4"
        items-center
        md:items-start
        md:h-360px
        items-start
        justify-between
        min-w-340px
      >
        <!-- icon -->
        <div
          w-100px
          h-100px
          v-cursor-block
          rounded-26px
        >
          <img w-full h-full :src="isDark ? '/ipad-cursor-dark.svg' : '/ipad-cursor.svg'" />
        </div>
  
        <!-- slog -->
        <div flex="~ col" items-center text-center md:items-start md:text-left>
          <h2
            my-0
            mt-2
            v-cursor-text="{ background: 'currentColor' }"
          >
            iPad Cursor
          </h2>
          <div opacity-70>
            <div>Hack iPad's mouse effect in browser,</div>
            <div>can be used in any frameworks</div>
          </div>
  
          <CodeBox mt6 w-full :codes="installCodes" />
        </div>
      </div>
  
      <!-- demo -->
      <div w-full md:w0 md:flex-1 flex="~ col items-center">
        <CodeBox h-360px w-full min-w-200px max-w-500px :codes="showCodes" />
        <div>
          <!-- btns -->
          <div flex="~ gap-2 wrap" justify-center items-center pt4>
            <div
              class="btn"
              v-for="btn in btns"
              :key="btn.label"
              v-cursor-block="btn.style"
              :class="
                activeBtn === btn.label ? ['outline'] : ['border-transparent']
              "
              @click="activeBtn = btn.label"
            >
              {{ btn.label }}
            </div>
          </div>
  
          <!-- actions -->
          <div flex="~ gap-1 wrap" flex-center pt10>
            <div
              v-cursor-block
              class="btn"
              @click="disposeCursor()"
            >
              Recover mouse
            </div>
  
            <div
              v-cursor-block
              class="btn"
              @click="initCursor()"
            >
              Enable iPad Mouse
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
