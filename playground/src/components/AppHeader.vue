<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div
    class="app-header"
    flex="~"
    gap-3
    justify-end
    items-center
    py7
    px8
  >
    <div rounded-10px v-cursor-block p1 @click="toggleDark()">
      <div v-if="isDark" p0 icon-btn i-carbon:sun text-xl />
      <div v-else p0 icon-btn i-carbon:moon text-xl />
    </div>

    <div rounded-10px v-cursor-block p1>
      <a href="https://twitter.com/cats_juice" text-xl>
        <div p0 icon-btn i-carbon:logo-twitter />
      </a>
    </div>

    <div rounded-10px v-cursor-block p1>
      <a href="https://github.com/CatsJuice/ipad-cursor" text-xl>
        <div p0 icon-btn i-carbon:logo-github />
      </a>
    </div>
  </div>
</template>
