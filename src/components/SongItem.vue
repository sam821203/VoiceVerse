<template>
  <li
    class="flex--center pl-5 pr-6 py-10 mb-4 bg-white rounded-xl cursor-pointer select-none transition-all duration-300"
    :class="{ active: checkCurrentSong }"
    @dblclick="newSong(song, $event.target)"
  >
    <div class="flex items-center gap-4">
      <i
        class="play-icon opacity-10 fas fa-play fa-xs leading-14"
        style="color: rgb(107, 114, 128)"
      ></i>
      <div class="w-16 h-16">
        <img
          :src="songAvatar"
          alt=""
          class="w-full h-full rounded object-cover"
          @error="useDefaultCover"
        />
      </div>
      <div>
        <router-link
          :to="{ name: 'song', params: { id: song.docID } }"
          class="font-bold block hover:underline"
          >{{ song.modified_name }}
        </router-link>
        <span class="text-gray-400 text-sm">{{ song.display_name }}</span>
      </div>
    </div>

    <div class="flex items-center gap-16">
      <div class="flex gap-4">
        <div class="text-lg hover:underline">
          <router-link
            custom
            :to="{ name: 'song', params: { id: song.docID }, hash: '#comments' }"
            v-slot="{ navigate }"
          >
            <span class="comments" @click="navigate">
              <i class="fa fa-comments"></i>
              {{ song.comment_count }}
            </span>
          </router-link>
        </div>
        <audio controls>
          <source :src="songUrl" ref="songUrlDOM" type="audio/mp3" />
        </audio>
        <button @click.prevent="downloadSong()">
          <i class="fas fa-arrow-alt-circle-down fa-lg" style="color: rgb(75, 85, 99)"></i>
        </button>
      </div>
      <div class="w-12 text-right text-gray-400">{{ songDuration }}</div>
    </div>
  </li>
</template>

<script name="SongItem" setup>
import { ref, toRefs, computed } from 'vue'
import { auth } from '@/utils/firebase'
import { resolveMediaUrl } from '@/utils/media'
import { useStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'
import helper from '@/utils/helper'
import defaultCover from '@/assets/images/default-cover-photo.png'

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
const currentUser = auth.currentUser

const songUrlDOM = ref(null)
const avatarImageDOM = ref(null)

const songAvatar = computed(() => {
  return song.value.user_avatar ? resolveMediaUrl(song.value.user_avatar) : defaultCover
})

const useDefaultCover = (event) => {
  if (event.target.src !== defaultCover) event.target.src = defaultCover
}

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
    const response = await fetch(resolveMediaUrl(song.value.url))
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const blob = await response.blob()
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
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.04);
    .play-icon {
      // visibility: visible;
      opacity: 1;
    }
  }
}
</style>
