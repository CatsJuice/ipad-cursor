import { Code } from '../types/lang';

export const basicCodes: Code[] = [
  {
    lang: "html",
    code: `// index.html
<body>
  <div>
  <span data-cursor="text">
    will be text
  </span>
  <button data-cursor="block">
    Button
  </button>
  </div>

  <script type="module">
    import { initCursor } from "https://unpkg.com/ipad-cursor@latest/index.mjs";
    initCursor();
  </script>
</body>;
    `
  },
  {
    lang: 'vue',
    code: `<script setup>
import { useCursor } from "ipad-cursor/vue";

useCursor()
</script>
    
<template>
  <div>
    <span data-cursor="text">
      will be text
    </span>
    <button data-cursor="block">
      Button
    </button>
  </div>
</template>
    `
  }
]