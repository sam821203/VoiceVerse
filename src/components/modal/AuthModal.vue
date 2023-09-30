<template>
  <!-- Auth Modal -->
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal" :class="hiddenClass">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75" @click="isOpen = false"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="pt-8 pb-10 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">{{ $t('authModal.yourAccount') }}</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click="isOpen = false">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                href="#"
                @click.prevent="tab = 'login'"
                :class="{
                  'hover:text-white text-white bg-gray-400': tab === 'login',
                  'hover:text-gray-500': tab === 'register'
                }"
                >{{ $t('header.login') }}</a
              >
            </li>
            <li class="flex-auto text-center">
              <a
                class="block rounded py-3 px-4 transition"
                href="#"
                @click.prevent="tab = 'register'"
                :class="{
                  'hover:text-white text-white bg-gray-400': tab === 'register',
                  'hover:text-gray-500': tab === 'login'
                }"
                >{{ $t('header.register') }}</a
              >
            </li>
          </ul>

          <app-login-form v-show="tab === 'login'" />
          <app-register-form v-show="tab === 'register'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
// import { useForm, useField } from 'vee-validate'

import { useStore } from '@/stores/index.js'

import AppLoginForm from '@/components/LoginForm.vue'
import AppRegisterForm from '@/components/RegisterForm.vue'

const { useModal } = useStore()
const modalStore = useModal()
const { hiddenClass, isOpen } = storeToRefs(modalStore)

const tab = ref('login')
</script>

<style lang="scss" scoped></style>
