<template>
  <main>
    <section class="relative"></section>
    <BaseSearchBar ref="songItemDOM" :songs="songs" />
  </main>
</template>

<script name="Home" setup></script>

<style scoped>
section {
  width: 100%;
  height: 396px;
  margin-bottom: 40px;
  background-image: url('@/assets/images/bg-hero.png');
  background-size: cover;
  background-position: 67% center;
}
</style>
