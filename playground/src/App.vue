<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
import { useCursor } from "../../src/vue/index";
import { watchEffect } from "vue";
import { useDark } from "@vueuse/core";
import { useHead } from "@unhead/vue";

const isDark = useDark();
const { updateConfig } = useCursor();

const appName = "ipad-cursor";
const appDesc = "iPad Cursor Effect in Browser";
useHead({
  title: appName,
  link: [{ rel: "icon", href: "/ipad-cursor.svg", sizes: "any" }],
  meta: [
    { name: "description", content: appDesc },
    { property: "og:title", content: appName },
    { property: "og:description", content: appDesc },
    { property: "og:image", content: "/og-image.jpg" },
  ],
});

watchEffect(() =>
  updateConfig({
    blockStyle: {
      border: `1px solid ${isDark.value ? "#ffffff80" : "#00000020"}`,
    },
  })
);
</script>

<template>
  <AppHeader fixed top-0 right-0 />
  <router-view w-full px4 max-w-960px mx-auto />
</template>

<style>
* {
  box-sizing: border-box;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
}

a,
a:hover {
  color: inherit;
  text-decoration: none;
}

html {
  --dark: #222;
  --light: #fff;
  --dark30: rgba(0, 0, 0, 0.3);
  --light30: rgba(255, 255, 255, 0.3);
  --bg: var(--light);
  --front: var(--dark);

  background-color: var(--bg) !important;
  color: var(--front) !important;
}
html.dark {
  --bg: var(--dark);
  --front: var(--light);
}

#app {
  min-height: 100%;
}
</style>
