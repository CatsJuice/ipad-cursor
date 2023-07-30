<script lang="ts" setup>
import useCursor from '../composables/cursor'

const show = ref(false)
const { updateCursor } = useCursor()

function toggle() {
  show.value = !show.value
  nextTick(() => updateCursor())
}
</script>

<template>
  <div h-50px>
    <button v-cursor-block btn @click="toggle">
      toggle
    </button>

    <button v-if="show" v-cursor-block btn @click="toggle">
      toggle
    </button>

    <div>
      <button v-cursor-block btn @click="toggle">
        toggle
      </button>
    </div>
  </div>
</template>
