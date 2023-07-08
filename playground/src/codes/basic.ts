import { UNPKG_CDN } from "../constants";
import { Code } from "../types/lang";

export const basicCodes: Code[] = [
  {
    lang: "html",
    code: `
<body>
  <div>
    <span>
      will be text
    </span>
    <button data-cursor="block">
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

useCursor()
</script>
    
<template>
  <div>
    <span>
      will be text
    </span>
    <button data-cursor="block">
      Button
    </button>
  </div>
</template>`,
  },
];
