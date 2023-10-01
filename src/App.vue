<template>
  <AppHeader />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

  <!-- 音樂播放進度條 -->
  <AppPlayer />

  <!-- bottom right -->
  <AppLocale />
  <AppScrollToTop />

  <!-- 彈跳視窗 -->
  <AuthModal />
  <UploadModal />
</template>

<script setup>
import { useStore } from '@/stores/index.js'
import { auth } from '@/utils/firebase'
import { storeToRefs } from 'pinia'

import AppHeader from '@/components/AppHeader.vue'
import AppLocale from '@/components/AppLocale.vue'
import AppScrollToTop from '@/components/AppScrollToTop.vue'
import AuthModal from '@/components/modal/AuthModal.vue'
import UploadModal from '@/components/modal/UploadModal.vue'
import AppPlayer from '@/components/Player.vue'

// store 是一個由 reactive 返回的響應式物件 (Proxy)，state 和 getters 不可以直接解構，會失去響應性
// 如果想使用解構，需要將 store 實例傳入 storeToRefs(storeInstance) 來解構
const { useUser } = useStore()
const { userLoggedIn } = storeToRefs(useUser())
const currentUser = auth.currentUser

if (currentUser) {
  userLoggedIn.value = true
}
</script>

<style lang="scss">
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s linear;
}
.fade-leave-to {
  opacity: 0;
  transition: all 0.3s linear;
}
</style>
