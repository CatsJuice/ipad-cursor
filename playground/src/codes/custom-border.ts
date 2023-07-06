import { UNPKG_CDN } from "../constants";
import { Code } from "../types/lang";

export const customBorderCodes: Code[] = [
  {
    lang: "html",
    code: `
<body>
  <div>
    <span data-cursor="text">
      will be text
    </span>
    <button 
      data-cursor="block" 
      data-cursor-style="border: 1px solid currentColor"
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
  border: '1px solid currentColor',
})
</script>
    
<template>
  <div>
    <span data-cursor="text">
      will be text
    </span>
    <button data-cursor="block" :data-cursor-style="style">
      Button
    </button>
  </div>
</template>`,
  },
];
