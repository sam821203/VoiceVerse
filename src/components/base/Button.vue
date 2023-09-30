<template>
  <button class="base" :class="mode" v-if="!link">
    <slot />
  </button>
  <router-link class="base" :to="to" :class="mode" v-else>
    <slot />
  </router-link>
</template>

<script setup>
const props = defineProps({
  link: {
    type: Boolean,
    required: false,
    default: false
  },
  to: {
    type: String,
    required: false,
    default: '/'
  },
  mode: {
    type: String,
    required: false,
    default: null
  }
})
</script>

<style lang="scss" scoped>
.base {
  width: 9rem;
  height: 46px;
  text-align: center;
  border-width: 1px;
}
.rounded-square {
  width: 6rem;
  border-radius: $rounded;
}
.rounded-square-full {
  width: 100%;
  height: 48px;
  border-radius: $rounded;
}
</style>
