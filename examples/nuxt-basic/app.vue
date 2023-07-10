<script setup lang="ts">
import useCursor from './composables/cursor'
import { appName } from '~/constants'

useHead({
  title: appName,
})

useCursor({
  blockStyle: {
    radius: 'auto',
  },
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
