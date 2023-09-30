<template>
  <li
    class="flex justify-between items-center pl-5 pr-6 py-10 mb-4 bg-white rounded-xl cursor-pointer select-none transition-all duration-300"
    :class="{ active: checkCurrentSong }"
    @dblclick="newSong(song, $event.target)"
  >
    <div class="flex items-center gap-4">
      <i
        class="play-icon opacity-10 fas fa-play fa-xs leading-14"
        style="color: rgb(107, 114, 128)"
      ></i>
      <div class="w-16 h-16">
        <img :src="songAvatar" alt="" class="w-full h-full rounded object-cover" />
      </div>
      <div>
        <router-link
          :to="{ name: 'song', params: { id: song.docID } }"
          class="font-bold block text-gray-600 hover:underline"
          >{{ song.modified_name }}
        </router-link>
        <span class="text-gray-400 text-sm">{{ song.display_name }}</span>
      </div>
    </div>

    <div class="flex items-center gap-16">
      <div class="flex gap-4">
        <div class="text-gray-600 text-lg hover:underline">
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
          <source :src="songUrl" ref="songUrlDOM" type="audio/mp3" />
        </audio>
        <button @click.prevent="downloadSong()">
          <!-- <i class="fas fa-download"></i> -->
          <!-- <i class="far fa-arrow-alt-circle-down fa-lg"></i> -->
          <i class="fas fa-arrow-alt-circle-down fa-lg" style="color: rgb(75, 85, 99)"></i>
        </button>
      </div>
      <div class="text-gray-400">{{ songDuration }}</div>
    </div>
  </li>
</template>

<script name="SongItem" setup>
import { toRefs, computed } from 'vue'
import { ref, getBlob } from 'firebase/storage'
import { storage } from '@/utils/firebase'
import { useStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'

const props = defineProps({
  song: {
    type: Object,
    required: true
  }
})

const { usePlayer } = useStore()
const { newSong } = usePlayer()
const { activeSong } = storeToRefs(usePlayer())
const { song } = toRefs(props)
const songUrlDOM = ref(null)

const songAvatar = computed(() =>
  song.value.user_avatar
    ? song.value.user_avatar
    : 'https://discussions.apple.com/content/attachment/592590040'
)

const songDuration = computed(() => {
  return song.value.duration ? song.value.duration : '0:00'
})

const checkCurrentSong = computed(() => {
  if (activeSong.value !== null) {
    return activeSong.value.docID === song.value.docID ? true : false
  }
})

const downloadSong = async () => {
  try {
    const targetSong = song.value.original_name
    const songRef = ref(storage, `songs/${targetSong}`)
    const blob = await getBlob(songRef)
    const objectURL = URL.createObjectURL(blob)

    // 創建一個 URL 對象，以便在 <a> 標籤中使用
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = objectURL
    link.download = song.value.modified_name
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
li {
  &.active {
    .play-icon {
      opacity: 1;
    }
  }
  &:hover {
    // background-color: rgb(243, 243, 243);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.04);
    .play-icon {
      // visibility: visible;
      opacity: 1;
    }
  }
}
</style>
