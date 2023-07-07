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

const { CursorType, customCursorStyle, initCursor, disposeCursor } = useCursor({
  normalStyle: {
    backdropBlur: 12,
  },
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
  <div flex="~ col" justify-center items-center gap-2>
    <div flex="~ col gap-10" md:flex="~ row" gap-1 items-start justify-between>
      <div
        flex="~ row gap-4"
        h-200px
        md:flex="~ col"
        md:h-360px
        items-start
        justify-between
        min-w-340px
      >
        <!-- icon -->
        <div
          w-100px
          h-100px
          :data-cursor="CursorType.BLOCK"
          :data-cursor-style="customCursorStyle({ radius: 30 })"
        >
          <img w-full h-full src="/ipad-cursor.svg" />
        </div>

        <!-- slog -->
        <div flex="~ col items-start">
          <h2
            my-0
            mt-2
            data-cursor="text"
            :data-cursor-style="
              customCursorStyle({
                background: 'currentColor',
              })
            "
          >
            iPad Cursor
          </h2>
          <div data-cursor="text" opacity-70>
            <div>Hack iPad's mouse effect in browser,</div>
            <div>can be used in any frameworks</div>
          </div>

          <CodeBox mt6 w-full :codes="installCodes" />
        </div>
      </div>

      <div flex="~ col items-center">
        <CodeBox h-360px w-full min-w-200px max-w-500px :codes="showCodes" />
        <div>
          <!-- btns -->
          <div flex="~ gap-2 wrap" justify-center items-center pt4>
            <div
              :data-cursor="CursorType.BLOCK"
              class="btn"
              v-for="btn in btns"
              :key="btn.label"
              :data-cursor-style="btn.style"
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
              :data-cursor="CursorType.BLOCK"
              class="btn"
              @click="disposeCursor()"
            >
              Recover mouse
            </div>

            <div
              :data-cursor="CursorType.BLOCK"
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
