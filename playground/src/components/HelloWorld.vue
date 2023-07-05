<script setup lang="ts">
import { ref } from 'vue'
import { useCursor } from '../../../src/vue';

defineProps<{ msg: string }>()

const count = ref(0)
useCursor()
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button data-cursor="rect" type="button" @click="count++">count is {{ count }}</button>
    <p data-cursor="text">
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    <span data-cursor="text">
      Check out
    </span>
    <a data-cursor="rect" class="inline-block" href="https://vuejs.org/guide/quick-start.html#local" target="_blank">
      create-vue
    </a>
    <span data-cursor="text">, the official Vue + Vite starter</span>
  </p>
  <p>
    <span data-cursor="text">Install</span>
    <a data-cursor="rect" class="inline-block" href="https://github.com/vuejs/language-tools" target="_blank">
      Volar
    </a>
    <span data-cursor="text">
      in your IDE for a better DX
    </span>
  </p>
  <p class="read-the-docs" data-cursor="text">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.inline-block {
  display: inline-block;
}
.read-the-docs {
  color: #888;
}
</style>
