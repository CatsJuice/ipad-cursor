import { UNPKG_CDN } from "../constants";
import { Code } from "../types/lang";

export const customBgCodes: Code[] = [
  {
    lang: "html",
    code: `
<body>
  <div>
    <span>
      will be text
    </span>
    <button data-cursor="block" data-cursor-style="background: rgba(255, 0, 0, 0.2)">
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
    <button data-cursor="block"  data-cursor-style="background: rgba(255, 0, 0, 0.2)">
      Button
    </button>
  </div>
</template>`,
  },
  {
    lang: "react",
    code: `// app.tsx
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
import type { IpadCursorConfig } from "ipad-cursor";

function App() {
  const config: IpadCursorConfig = {};
  useIPadCursor();

  return (
    <IPadCursorProvider config={config}>
      <span>
        will be text
      </span>
      <button data-cursor="block"  data-cursor-style="background: rgba(255, 0, 0, 0.2)">
        Button
      </button>
    </IPadCursorProvider>
  )
}
`,
  },
];
