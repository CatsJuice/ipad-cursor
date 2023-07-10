<script setup lang='ts'>
import useCursor from '../composables/cursor'

const { count, inc, dec } = useCount()

useCursor({})
</script>

<template>
  <div inline-flex m="y-3">
    <button data-cursor="block" rounded-full p-2 btn @click="dec()">
      <div i-carbon-subtract />
    </button>
    <div data-cursor="text" font="mono" w="15" m-auto inline-block>
      {{ count }}
    </div>
    <button data-cursor="block" rounded-full p-2 btn @click="inc()">
      <div i-carbon-add />
    </button>
  </div>
</template>
