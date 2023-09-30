<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">{{ $t('uploadModal.upload') }}</span>
      <i class="fas fa-upload float-right text-cyan-500 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="upload($event)"
      >
        <h5>{{ $t('uploadModal.drop_file') }}</h5>
      </div>
      <input type="file" multiple @change="upload($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i> {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar"
            :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script name="upload" setup>
import { ref, reactive, onBeforeUnmount, toRefs } from 'vue'
import { storage, songsCollection, dbModular } from '@/utils/firebase'
import { ref as storageRef, uploadBytesResumable, getDownloadURL, listAll } from 'firebase/storage'
import { collection, query } from 'firebase/firestore'

import { auth } from '@/utils/firebase'
import helper from '@/utils/helper'

const props = defineProps({
  addSong: {
    type: Function,
    required: true
  }
})

const { addSong } = toRefs(props)
const is_dragover = ref(false)
const uploads = reactive([])
const currentUser = auth.currentUser

const getAudioDuration = (url) => {
  return new Promise((resolve, reject) => {
    var au = document.createElement('audio')
    au.src = url

    au.addEventListener(
      'loadedmetadata',
      () => {
        var duration = au.duration
        resolve(helper.formatTime(duration))
      },
      false
    )

    au.addEventListener(
      'error',
      (error) => {
        reject(error)
      },
      false
    )
  })
}

const addTimeStamp = (string) => {
  console.log(string)
  if (string.includes('.mp3')) {
    return `${string.split('.')[0]}_${Date.now()}.mp3`
  } else {
    console.log('Not mp3 file!')
  }
}

const upload = ($event) => {
  is_dragover.value = false
  // dataTransfer 只有 drag & drop event 有
  const files = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files]

  files.forEach(async (file) => {
    // 確認檔案類型
    if (file.type !== 'audio/mpeg') return

    // 確認是否登入
    if (!navigator.onLine) {
      uploads.push({
        uploadTask: {},
        current_progress: 100,
        name: file.name,
        variant: 'bg-red-400',
        icon: 'fas fa-times',
        text_class: 'text-red-400'
      })

      return
    }

    /*
    會顯示出 storageBucket 裡的 "voice-verse.appspot.com"
    這能告訴 firebase 要在哪裡上傳檔案
    */
    const songsCollectionRef = storageRef(storage, `songs`)
    const listAllSongs = await listAll(songsCollectionRef)
    let modifiedFileName = file.name

    for (const song of listAllSongs.items) {
      if (file.name === song.name) {
        modifiedFileName = addTimeStamp(file.name)
        break
      }
    }

    const modifiedSongsRef = storageRef(storage, `songs/${modifiedFileName}`)
    const uploadTask = uploadBytesResumable(modifiedSongsRef, file)

    // -1 來矯正 length 出來的數值
    const uploadIndex =
      uploads.push({
        uploadTask,
        current_progress: 0,
        name: modifiedFileName,
        variant: 'bg-blue-400',
        icon: 'fas fa-spinner fa-spin',
        text_class: ''
      }) - 1

    uploadTask.on(
      'stage_change',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        uploads[uploadIndex].current_progress = progress
      },
      (error) => {
        uploads[uploadIndex].variant = 'bg-red-400'
        uploads[uploadIndex].icon = 'fas fa-times'
        uploads[uploadIndex].text_class = 'text-red-400'
        console.log(error.message)
      },
      async () => {
        const querySnapshot = await helper.getDocuments('avatars', 'uid', currentUser.uid)

        const song = {
          uid: currentUser.uid,
          display_name: currentUser.displayName || 'Anonymous',
          original_name: modifiedFileName,
          modified_name: modifiedFileName,
          genre: '',
          comment_count: 0,
          dateUploaded: new Date().toString()
        }

        song.url = await getDownloadURL(uploadTask.snapshot.ref)
        song.duration = await getAudioDuration(song.url)

        querySnapshot.forEach((avatar) => {
          song.user_avatar = avatar.data().url
        })

        const songRef = await songsCollection.add(song)
        const songSnapshot = await songRef.get()

        // 一上傳檔案時，立即更新在頁面上的檔案
        addSong.value(songSnapshot)

        uploads[uploadIndex].variant = 'bg-green-400'
        uploads[uploadIndex].icon = 'fas fa-check'
        uploads[uploadIndex].text_class = 'text-green-400'
      }
    )
  })
}

onBeforeUnmount(() => {
  uploads.forEach((upload) => upload.task.cancel())
})
</script>
