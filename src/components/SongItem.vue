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
    <button @click.prevent="downloadSong">download</button>
    <!-- <a
      href="https://firebasestorage.googleapis.com/v0/b/voice-verse.appspot.com/o/songs%2Fsample-3s.mp3?alt=media&token=3b7d02e5-9fa0-4436-9915-94bbc7ea4eea"
      download
    >
      <span>download</span>
    </a> -->
  </li>
</template>

<script name="SongItem" setup>
import { toRefs } from 'vue'
import { storage } from '@/utils/firebase'

const props = defineProps({
  song: {
    type: Object,
    required: true
  }
})

const { song } = toRefs(props)

// FIXME: 會有同源政策問題
const downloadSong = async () => {
  const storageRef = storage.ref('songs/sample-3s.mp3')
  // const songRef = storageRef.child('songs/sample-3s.mp3')

  storageRef.getDownloadURL().then((res) => {
    console.log(url)
  })

  // converts url into a 'blob' via XMLHttpRequest()
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'blob'

  xhr.onload = function () {
    const blob = xhr.response
    const link = document.createElement('a')

    link.href = URL.createObjectURL(blob)
    link.download = 'sample-3s.mp3'
    link.click()

    URL.revokeObjectURL(link.href)
  }

  xhr.open('GET', url)
  xhr.send()
}

// const downloadSong = async () => {
//   const storageRef = storage.ref()
//   const songRef = storageRef.child('songs/sample-3s.mp3')
//   const url = await songRef.getDownloadURL()

//   // converts url into a 'blob' via XMLHttpRequest()
//   const xhr = new XMLHttpRequest()
//   xhr.responseType = 'blob'

//   xhr.onload = function () {
//     const blob = xhr.response
//     const link = document.createElement('a')

//     link.href = URL.createObjectURL(blob)
//     link.download = 'sample-3s.mp3'
//     link.click()

//     URL.revokeObjectURL(link.href)
//   }

//   xhr.open('GET', url)
//   xhr.send()
// }
</script>

<style lang="scss" scoped></style>
