<template>
  <!-- Header -->
  <header id="header" class="bg-zinc-100 border-b border-zinc-300 mx-auto">
    <nav class="container mx-auto max-w-9.6/10 flex justify-between items-center py-4">
      <!-- App Name -->
      <router-link
        class="logo-text text-cyan-500 text-logo"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
        >VoiceVerse</router-link
      >
      <ul class="flex justify-between items-center gap-2">
        <li>
          <router-link class="px-2 text-black" :to="{ name: 'about' }">{{
            $t('header.about')
          }}</router-link>
        </li>
        <li
          class="w-36 py-2.5 text-center border border-gray-500 rounded-full"
          v-if="!userLoggedIn"
        >
          <a class="px-2 text-black" href="#" @click.prevent="toggleAuthModal">{{
            $t('header.login_register')
          }}</a>
        </li>
        <template v-else>
          <li>
            <router-link class="px-2 mr-1.5 text-black" :to="{ name: 'profile' }">{{
              $t('header.profile')
            }}</router-link>
          </li>
          <li
            class="items-center py-2.5 w-36 text-center border bg-cyan-500 border-cyan-500 rounded-full"
          >
            <a href="#" class="text-white font-bold" @click.prevent="toggleUploadModal">{{
              $t('header.upload')
            }}</a>
          </li>
          <li class="w-36 py-2.5 text-center border border-gray-500 rounded-full">
            <a class="px-2 text-black" href="#" @click.prevent="signingOut">{{
              $t('header.logout')
            }}</a>
          </li>
        </template>
        <!-- <li class="flex justify-end items-center w-12">
            <div class="w-20 text-center">
              <a href="#" class="text-black">
                <img
                  ref="avatarImageDOM"
                  src="@/assets/images/default-cover-photo.png"
                  class="rounded-full"
                  alt=""
                />
              </a>
            </div>
          </li> -->
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { auth } from '@/utils/firebase'
import helper from '@/utils/helper'

/*
- 此步驟創建了名為 useModal 的存儲實例，使用了之前引入的 useStore 函數
- 這是訪問 modalStore 的主要方式。modalStore 是在 Vuex 或 Pinia 中定義的存儲實例
- 會是個 proxy 物件
*/
const { useModal, useUser } = useStore()
const { signOut } = useUser()
const modalStore = useModal()
const router = useRouter()
const route = useRoute()

// 使用 storeToRefs 創建響應式的值
// FIXME: 為何一個要 () 執行，一個不用?
const { userLoggedIn } = storeToRefs(useUser())
const { isOpen, uploadModalOpen } = storeToRefs(modalStore)
const avatarImageDOM = ref(null)
const currentUser = auth.currentUser

const toggleAuthModal = () => (isOpen.value = !isOpen.value)
const toggleUploadModal = () => (uploadModalOpen.value = !uploadModalOpen.value)

const signingOut = () => {
  signOut()

  if (route.meta.requiresAuth) router.push({ name: 'home' })
}

const getAvatar = async () => {
  const querySnapshot = await helper.getDocuments('avatars', 'uid', currentUser.uid)

  querySnapshot.forEach((avatar) => {
    avatarImageDOM.value.src = avatar.data().url
  })
}

// onMounted(() => {
//   getAvatar()
// })
</script>

<style lang="scss" scoped>
.logo-text {
  font-family: 'Pacifico', sans-serif;
}
</style>
