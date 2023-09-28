<template>
  <div
    class="fixed bottom-32 right-1/50 w-12 h-12 pt-px leading-11 bg-cyan-500 rounded-md text-center shadow-md cursor-pointer"
    @click="scrollToTop"
  >
    <i class="fas fa-chevron-up" style="color: #ffffff"></i>
  </div>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}
</script>

<style lang="scss" scoped></style>
