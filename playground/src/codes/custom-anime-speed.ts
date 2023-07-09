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

  {
    lang: "react",
    code: `// app.tsx
import { IPadCursorProvider, useIPadCursor } from "ipad-cursor/react";
import type { IpadCursorConfig } from "ipad-cursor";

function App() {
  const config: IpadCursorConfig = {};
  const { customCursorStyle } = useIPadCursor();
  const style = customCursorStyle({
    durationBase: 2000,
  });

  return (
    <IPadCursorProvider config={config}>
      <span>
        will be text
      </span>
      <button data-cursor="block" data-cursor-style={style}>
        Button
      </button>
    </IPadCursorProvider>
  )
}
`,
  },
];
