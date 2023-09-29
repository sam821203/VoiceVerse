<template>
  <a
    href="#"
    class="hover:bg-gray-500 text-gray-500 hover:text-gray-100 text-sm font-medium mr-4 px-4 py-2.5 rounded border border-gray-500 inline-flex items-center justify-center"
    >{{ name }}</a
  >
</template>

<script setup>
// import { toRefs, watch } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
