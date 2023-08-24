<template>
  <!-- Header -->
  <app-header />

  <router-view></router-view>

  <!-- Player -->
  <div class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
    <!-- Track Info -->
    <div class="text-center">
      <span class="song-title font-bold">Song Title</span> by
      <span class="song-artist">Artist</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button">
        <i class="fa fa-play text-gray-500 text-xl"></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">00:00</div>
      <!-- Scrub Container  -->
      <div class="w-full h-2 rounded bg-gray-200 relative cursor-pointer">
        <!-- Player Ball -->
        <span class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg" style="left: 50%">
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          style="width: 50%"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">03:06</div>
    </div>
  </div>

  <app-auth />
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppAuth from '@/components/AppAuth.vue'
import { useStore } from '@/stores/index.js'
import { auth } from '@/utils/firebase'
import { storeToRefs } from 'pinia'

// store 的實體要到 useStore() 被呼叫的時候才會建立，實體化之後，就可以存取定義在 state、getters 和 actions 中的屬性
// store 是一個由 reactive 返回的響應式物件 (Proxy)，state 和 getters 不可以直接解構，會失去響應性
// 如果想使用解構，需要將 store 實例傳入 storeToRefs(storeInstance) 再來解構
const { useUser } = useStore()
const { userLoggedIn } = storeToRefs(useUser())

if (auth.currentUser) {
  userLoggedIn.value = true
}
</script>
