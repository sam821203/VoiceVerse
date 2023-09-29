<template>
  <li
    class="flex justify-between items-center px-3 py-8 mb-4 bg-white shadow-md rounded-lg cursor-pointer transition-all duration-500"
  >
    <div class="flex items-center gap-4">
      <i class="play-icon invisible fas fa-play fa-xs leading-14"></i>
      <div style="width: 60px; height: 60px">
        <img :src="songAvatar" alt="" class="w-full h-full rounded-md object-cover" />
      </div>
      <div>
        <router-link
          :to="{ name: 'song', params: { id: song.docID } }"
          class="font-bold block text-gray-600 hover:underline"
          >{{ song.modified_name }}
        </router-link>
        <span class="text-gray-500 text-sm">{{ song.display_name }}</span>
        <span>{{ audioDuration }}</span>
      </div>
    </div>

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
      <i class="fas fa-download"></i>
    </button>
  </li>
</template>

<script name="SongItem" setup>
import { toRefs, computed, onMounted } from 'vue'
import { ref, getBlob } from 'firebase/storage'
import { storage } from '@/utils/firebase'
import helper from '@/utils/helper'

const props = defineProps({
  song: {
    type: Object,
    required: true
  }
})

const { song } = toRefs(props)
const songUrlDOM = ref(null)
const audioDuration = ref([])

const songAvatar = computed(() =>
  song.value.user_avatar
    ? song.value.user_avatar
    : 'https://discussions.apple.com/content/attachment/592590040'
)

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

const getAudioDuration = (url) => {
  // Create a non-dom allocated Audio element
  var au = document.createElement('audio')

  // Define the URL of the MP3 audio file
  au.src = url

  // Once the metadata has been loaded, display the duration in the console
  au.addEventListener(
    'loadedmetadata',
    function () {
      // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
      var duration = au.duration
      console.log(audioDuration)
      audioDuration.value = helper.formatTime(duration)
    },
    false
  )
}

onMounted(() => {
  getAudioDuration(song.value.url)
})
</script>

<style lang="scss" scoped>
audio {
  display: none;
}
li {
  &:hover {
    background-color: rgb(249, 250, 251);
    .play-icon {
      visibility: visible;
    }
  }
}
</style>
