<template>
  <main>
    <!-- Introduction -->
    <section class="introduction relative text-white">
      <div class="container mx-auto max-w-6xl"></div>
    </section>

    <div class="">
      <BaseSearchBar ref="songItemDOM" :songs="songs" />
    </div>

    <!-- <AppRecommendation /> -->
  </main>
</template>

<script name="Home" setup>
import { ref, reactive, onBeforeUnmount, computed, watch } from 'vue'
import { songsCollection } from '@/utils/firebase'
// import AppRecommendation from '@/components/Recommendation.vue'
</script>

<style scoped>
.introduction {
  width: 100%;
  height: 396px;
  margin-bottom: 40px;
  background-image: url('@/assets/images/bg-hero.png');
  background-size: cover;
  background-position: 67% center;
}
</style>
