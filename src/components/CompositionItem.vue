<template>
  <div class="px-5 py-6 mb-6 border border-gray-200 leading-10 rounded">
    <div class="relative" v-show="!showForm">
      <router-link
        :to="{ name: 'song', params: { id: song.docID } }"
        class="leading-8 font-bold block hover:underline"
        >{{ song.modified_name }}
      </router-link>
      <div class="text-sm text-gray-400">{{ getUploadDate }}</div>
      <button
        class="absolute -top-8 -right-7 ml-1 w-5 h-5 text-sm rounded-full bg-red-500 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times text-white"></i>
      </button>
      <BaseButton
        class="absolute top-1.5 right-1.5 w-20 text-white bg-gray-400 hover:bg-gray-500"
        mode="rounded-square"
        @click.prevent="showForm = !showForm"
      >
        {{ $t('profile.edit') }}
      </BaseButton>
    </div>
    <div v-show="showForm">
      <div
        class="text-xl text-white text-center font-bold p-4 mb-4"
        v-if="show_alert"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <vee-form :validation-schema="schema" :initial-values="song" @submit="edit">
        <div class="mb-3">
          <label class="inline-block">{{ $t('profile.song_title') }}</label>
          <vee-field
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-6">
          <label class="inline-block">{{ $t('profile.genre') }}</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <BaseButton
          type="submit"
          class="px-3 mb-3 mr-2 text-white bg-cyan-500 hover:bg-cyan-600"
          mode="rounded-square"
          :disabled="in_submission"
          @click="showForm = !showForm"
        >
          {{ $t('profile.submit') }}
        </BaseButton>
        <BaseButton
          type="button"
          class="px-3 text-white bg-gray-600 hover:bg-gray-700"
          mode="rounded-square"
          :disabled="in_submission"
          @click.prevent="showForm = false"
        >
          {{ $t('profile.go_back') }}
        </BaseButton>
      </vee-form>
    </div>
  </div>
</template>

<script name="CompositionItem" setup>
import { ref, reactive, toRefs, computed } from 'vue'
import { storage, db } from '@/utils/firebase'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import helper from '@/utils/helper'

// Composition API 中的 props 與 reactive 無法使用 直接透過ES6解構語法 來自動解構，因為這樣會導致 資料失去原本的響應功能
// 需要使用 toRef 與 toRefs 兩個函式來進行 解構後同時保有響應功能 的處理
const props = defineProps({
  song: {
    type: Object,
    required: true
  },
  updateSong: {
    type: Function,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  removeSong: {
    type: Function,
    required: true
  },
  updateUnsavedFlag: {
    type: Function
  }
})
const schema = reactive({
  modified_name: 'required|min:1|max:100',
  genre: 'alpha_spaces'
})
const { song, updateSong, index, removeSong, updateUnsavedFlag } = toRefs(props)
const showForm = ref(false)
const in_submission = ref(false)
const show_alert = ref(false)
const alert_variant = ref('text-blue-500')
const alert_message = ref('Please wait! Updating song info.')

const edit = async (values) => {
  in_submission.value = true
  show_alert.value = true
  alert_variant.value = 'text-blue-500'
  alert_message.value = 'Please wait! Updating song info.'

  try {
    const songDocRef = doc(db, 'songs', song.value.docID)
    await updateDoc(songDocRef, values)
  } catch (error) {
    in_submission.value = false
    alert_variant.value = 'text-red-500'
    alert_message.value = 'Something went wrong! Try again later.'
    return
  }

  updateUnsavedFlag.value(false)

  // 更新修改後的資料
  updateSong.value(index.value, values)

  in_submission.value = false
  alert_variant.value = 'text-green-500'
  alert_message.value = 'Success!'
}

const deleteSong = async () => {
  const songRef = storageRef(storage, `songs/${song.value.original_name}`)

  // Delete from storage & firestore
  await deleteObject(songRef)
  await deleteDoc(doc(db, 'songs', song.value.docID))

  removeSong.value(index.value)
}

const getUploadDate = computed(() => {
  return song.value.dateUploaded
    ? helper.formatUtcDate(song.value.dateUploaded)
    : helper.formatUtcDate(new Date().toString())
})
</script>

<style lang="scss" scoped></style>
