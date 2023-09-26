<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
  >
    <div>
      <router-link
        :to="{ name: 'song', params: { id: song.docID } }"
        class="font-bold block text-gray-600"
        >{{ song.modified_name }}</router-link
      >
      <span class="text-gray-500 text-sm">{{ song.display_name }}</span>
    </div>

    <div class="text-gray-600 text-lg">
      <router-link
        custom
        :to="{ name: 'song', params: { id: song.docID }, hash: '#comments' }"
        v-slot="{ navigate }"
      >
        <span class="comments" @click="navigate">
          <i class="fa fa-comments text-gray-600"></i>
          {{ song.comment_count }}
        </span>
      </router-link>
    </div>
    <audio controls>
      <source :src="songUrl" ref="songUrl" type="audio/mp3" />
    </audio>
    <button @click.prevent="downloadSong">download</button>
  </li>
</template>

<script name="SongItem" setup>
import { toRefs } from 'vue'
import { ref, getBlob } from 'firebase/storage'
import { storage } from '@/utils/firebase'

const props = defineProps({
  song: {
    type: Object,
    required: true
  }
})

const { song } = toRefs(props)

const downloadSong = async () => {
  try {
    // Create a reference with an initial file path and name
    const targetSong = song.value.modified_name
    const songRef = ref(storage, `songs/${targetSong}`)
    const blob = await getBlob(songRef)
    const objectURL = URL.createObjectURL(blob)

    // 創建一個 URL 對象，以便在 <a> 標籤中使用
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = objectURL
    link.download = targetSong
    link.click()

    // 釋放 URL 對象，以避免內存泄露
    URL.revokeObjectURL(objectURL)
  } catch (error) {
    console.error('下載音頻失敗：', error)
  }
}
</script>

<style lang="scss" scoped>
audio {
  display: none;
}
</style>
