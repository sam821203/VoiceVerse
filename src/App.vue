<template>
  <!-- Header -->
  <app-header />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

  <!-- 底下音樂播放進度條 -->
  <app-player />

  <app-auth />
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppAuth from '@/components/AppAuth.vue'
import AppPlayer from '@/components/Player.vue'

import { useStore } from '@/stores/index.js'
// import { auth } from '@/utils/firebase'
import { authModular } from '@/utils/firebase'
import { storeToRefs } from 'pinia'

// store 的實體要到 useStore() 被呼叫的時候才會建立，實體化之後，就可以存取定義在 state、getters 和 actions 中的屬性
// store 是一個由 reactive 返回的響應式物件 (Proxy)，state 和 getters 不可以直接解構，會失去響應性
// 如果想使用解構，需要將 store 實例傳入 storeToRefs(storeInstance) 再來解構
const { useUser } = useStore()
const { userLoggedIn } = storeToRefs(useUser())
const currentUser = authModular.currentUser

if (currentUser) {
  userLoggedIn.value = true
}
</script>

<style>
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
