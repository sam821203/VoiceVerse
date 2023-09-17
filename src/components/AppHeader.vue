<template>
  <!-- Header -->
  <header id="header" class="bg-zinc-100 border-b border-zinc-300 mx-auto">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4 max-w-6xl">
      <!-- App Name -->
      <router-link
        class="text-black font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
        >Music</router-link
      >
      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <li>
            <router-link class="px-2 text-black" :to="{ name: 'about' }">About</router-link>
          </li>
          <!-- Navigation Links -->
          <li v-if="!userLoggedIn">
            <a class="px-2 text-black" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-black" :to="{ name: 'manage' }">Manage</router-link>
            </li>
            <li>
              <a class="px-2 text-black" href="#" @click.prevent="signingOut">Logout</a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <li>
            <a href="#" class="px-2 text-black" @click.prevent="changeLocale">{{
              currentLocale
            }}</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

/*
- 此步驟創建了名為 useModal 的存儲實例，使用了之前引入的 useStore 函數
- 這是訪問 modalStore 的主要方式。modalStore 是在 Vuex 或 Pinia 中定義的存儲實例
- 會是個 proxy 物件
*/
const { useModal, useUser } = useStore()
const { signOut } = useUser()
const { locale } = useI18n()
const modalStore = useModal()
const router = useRouter()
const route = useRoute()

// 使用 storeToRefs 創建響應式的值
// FIXME: 為何一個要 () 執行，一個不用?
const { userLoggedIn } = storeToRefs(useUser())
const { isOpen } = storeToRefs(modalStore)

const currentLocale = computed(() => (locale.value === 'zhTw' ? '繁體中文' : 'English'))

const toggleAuthModal = () => (isOpen.value = !isOpen.value)
const changeLocale = () => (locale.value = locale.value === 'zhTw' ? 'en' : 'zhTw')

const signingOut = () => {
  signOut()

  if (route.meta.requiresAuth) router.push({ name: 'home' })
}
</script>

<style lang="scss" scoped>
// some
</style>
