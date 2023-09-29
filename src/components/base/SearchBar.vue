<template>
  <form>
    <div class="flex mb-4">
      <div class="relative w-full">
        <input
          type="search"
          class="block p-3 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border-l-2 border border-gray-300 focus:outline-none"
          autocomplete="off"
          placeholder="Search Songs..."
          required
          v-model="search"
        />
        <button
          type="submit"
          class="absolute top-0 right-0 flex justify-center items-center p-2.5 text-sm font-medium w-24 h-full text-white bg-cyan-500 rounded-r border border-cyan-500 hover:bg-cyan-600 focus:outline-none"
          @click.prevent="searchList"
        >
          <i class="fas fa-search fa-lg" style="color: #ffffff"></i>
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, toRefs, defineExpose } from 'vue'

const props = defineProps({
  songs: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['filterChanged'])

const search = ref('')
const filteredList = reactive([])
const { songs } = toRefs(props)

const searchList = () => {
  const result = songs.value.filter((song) => {
    return song.modified_name.toLowerCase().includes(search.value.toLowerCase())
  })

  filteredList.push(result)

  // 'filterChanged' 是自己定義的事件名稱，會用在父組件
  // filteredList 則是傳遞的參數
  emits('filterChanged', filteredList)
  // filteredList[0].forEach((list) => {
  //   console.log(list.docID)
  // })
}

// defineExpose({ filteredList })

// const filteredList = computed(() => {
//   return songs.value.filter((song) => {
//     return song.modified_name.toLowerCase().includes(search.value.toLowerCase())
//   })
// })

// const update = ($event) => {
//   emits('update:songs', filteredList($event.target.value))
// }
</script>

<style lang="scss" scoped></style>
