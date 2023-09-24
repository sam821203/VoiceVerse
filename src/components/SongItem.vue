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

// FIXME: 將拿到的連結轉成 mp3 檔
const downloadSong = async () => {
  // Create a reference with an initial file path and name
  const storageRef = storage.ref()
  const songRef = storageRef.child('songs/sample-3s.mp3')

  // Create a reference from a Google Cloud Storage URI
  // const gsReference = ref(storage, 'gs://voice-verse/songs/sample-3s.mp3')

  try {
    // const downloadURL = await songRef.getDownloadURL()
    // const blob = await getBlob(songRef)

    console.log(blob)

    // export declare function getBlob(ref: StorageReference, maxDownloadSizeBytes?: number): Promise<Blob>;
    // export declare function getDownloadURL(ref: StorageReference): Promise<string>;

    // const link = document.createElement('a')
    // link.style.display = 'none'
    // link.href = url
    // link.download = 'sample-3s.mp3'
    // document.body.appendChild(link)
    // link.click()

    // 释放URL对象，以避免内存泄漏
    // window.URL.revokeObjectURL(url)

    // let file = new File([blob], 'sample-3s.mp3', { type: 'audio/mp3' })

    // 创建一个URL对象，以便在<a>标签中使用
    // const objectURL = URL.createObjectURL(blob)
    // const link = document.createElement('a')
    // link.href = objectURL
    // link.download = 'sample-3s.mp3'
    // link.click()

    // // 释放URL对象，以避免内存泄漏
    // URL.revokeObjectURL(objectURL)
  } catch (error) {
    console.error('下载音频文件失败：', error)
  }
}
</script>

<style lang="scss" scoped>
audio {
  display: none;
}
</style>
