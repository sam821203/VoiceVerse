<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal" :class="hiddenUploadClass">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75" @click="uploadModalOpen = false"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
      >
        <div class="modal pt-8 pb-10 text-left px-6 overflow-y-auto">
          <!--Title-->
          <div class="flex--center pb-4">
            <p class="text-2xl font-bold">{{ $t('uploadModal.upload_song') }}</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click="uploadModalOpen = false">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <div>
            <app-upload :addSong="addSong" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useStore } from '@/stores/index.js'

import AppUpload from '@/components/Upload.vue'

const { useModal } = useStore()
const modalStore = useModal()
const { hiddenUploadClass, uploadModalOpen } = storeToRefs(modalStore)

const songs = reactive([])
const unsavedFlag = ref(false)

const addSong = (document) => {
  const song = reactive({
    ...document.data(),
    docID: document.id
  })

  songs.push(song)
}

onBeforeRouteLeave((to, from, next) => {
  if (!unsavedFlag.value) {
    next()
  } else {
    const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
    next(leave)
  }
})
</script>

<style lang="scss" scoped>
.modal {
  height: 560px;
}
</style>
