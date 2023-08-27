<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div
        class="text-white text-center font-bold p-4 mb-4"
        v-if="show_alert"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <vee-form :validation-schema="schema" :initial-values="song" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="in_submission"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="in_submission"
          @click.prevent="showForm = false"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script name="CompositionItem" setup>
import { ref, reactive, toRefs } from 'vue'
import { songsCollection, storage } from '@/utils/firebase'

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
const alert_variant = ref('bg-blue-500')
const alert_message = ref('Please wait! Updating song info.')

const edit = async (values) => {
  in_submission.value = true
  show_alert.value = true
  alert_variant.value = 'bg-blue-500'
  alert_message.value = 'Please wait! Updating song info.'

  try {
    // .doc 會回傳一個物件
    await songsCollection.doc(song.value.docID).update(values)
  } catch (error) {
    in_submission.value = false
    alert_variant.value = 'bg-red-500'
    alert_message.value = 'Something went wrong! Try again later.'
    return
  }

  updateUnsavedFlag.value(false)

  // 更新修改後的資料
  updateSong.value(index.value, values)

  in_submission.value = false
  alert_variant.value = 'bg-green-500'
  alert_message.value = 'Success!'
}

const deleteSong = async () => {
  const storageRef = storage.ref()
  const songRef = storageRef.child(`songs/${song.value.original_name}`)

  await songRef.delete()
  await songsCollection.doc(song.value.docID).delete()
  removeSong.value(index.value)
}
</script>

<style lang="scss" scoped></style>
