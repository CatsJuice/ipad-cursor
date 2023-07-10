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
    <button btn data-cursor="block" @click="toggle">
      toggle
    </button>

    <button v-if="show" btn data-cursor="block" @click="toggle">
      toggle
    </button>

    <div>
      <button btn data-cursor="block" @click="toggle">
        toggle
      </button>
    </div>
  </div>
</template>
