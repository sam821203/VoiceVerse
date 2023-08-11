<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-white font-bold uppercase text-2xl mr-4" href="#">Music</a>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal"
              >Login / Register</a
            >
          </li>
          <li>
            <a class="px-2 text-white" href="#">Manage</a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'

/*
- 此步驟創建了名為 useModal 的存儲實例，使用了之前引入的 useStore 函數
- 這是訪問 modalStore 的主要方式
- modalStore 是在 Vuex 或 Pinia 中定義的存儲實例
- 會是個 proxy 物件
*/
const { useModal } = useStore()
const modalStore = useModal()

// 使用 storeToRefs 創建響應式的值
const { isOpen } = storeToRefs(modalStore)

const toggleAuthModal = () => {
  isOpen.value = !isOpen.value
}
</script>

<style lang="scss" scoped></style>
