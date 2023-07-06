<script setup lang="ts">
import type { Lang } from '../types/lang';


defineProps<{lang: Lang}>()
</script>

<template>
  <div v-if="lang === 'vue'" i-logos:vue />
  <div v-else-if="lang === 'js'" i-logos:javascript />
  <div v-else-if="lang === 'ts'" i-logos:typescript-icon />
  <div v-else-if="lang === 'html'" i-vscode-icons:file-type-html />
  <div v-else-if="lang === 'npm'" i-logos:npm />
  <div v-else-if="lang === 'yarn'" i-logos:yarn />
  <div v-else-if="lang === 'pnpm'" i-logos:pnpm />
</template>