import { UNPKG_CDN } from "../constants";
import { Code } from "../types/lang";

export const customAnimeSpeedCodes: Code[] = [
  {
    lang: "html",
    code: `
<body>
  <div>
    <span>
      will be text
    </span>
    <button 
      data-cursor="block" 
      data-cursor-style="durationBase: 2000"
    >
      Button
    </button>
  </div>

  <script type="module">
    import { initCursor } from "${UNPKG_CDN}";
    initCursor();
  </script>
</body>`,
  },
  {
    lang: "vue",
    code: `<script setup>
import { useCursor } from "ipad-cursor/vue";

const { customCursorStyle } = useCursor()
const style = customCursorStyle({
  durationBase: 2000,
})
</script>
    
<template>
  <div>
    <span>
      will be text
    </span>
    <button data-cursor="block" :data-cursor-style="style">
      Button
    </button>
  </div>
</template>`,
  },
];
