<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, i) in songs"
              :key="song.docID"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script name="manage" setup>
// import { onBeforeRouteLeave } from 'vue-router'
import { reactive, onMounted } from 'vue'
import AppUpload from '@/components/Upload.vue'
import CompositionItem from '@/components/CompositionItem.vue'
import { songsCollection, auth } from '@/utils/firebase'

const songs = reactive([])

const fetchSongs = async () => {
  const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()

  snapshot.forEach(addSong)
}

const updateSong = (i, values) => {
  songs[i].modified_name = values.modified_name
  songs[i].genre = values.genre
}

const removeSong = (i) => {
  songs.splice(i, 1)
}

const addSong = (document) => {
  const song = reactive({
    ...document.data(),
    docID: document.id
  })

  songs.push(song)
}

onMounted(() => {
  fetchSongs()
})

// 需要在 setup 模板中先聲明變數，才會被 Vue 響應式系統追蹤
// const upload = ref(null)

// onBeforeRouteLeave((to, from, next) => {
//   // 調用子組件函式
//   upload.value.cancelUploads()
//   next()
// })
</script>

<style lang="scss" scoped>
// some
</style>
