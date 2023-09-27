<template>
  <main>
    <!-- Introduction -->
    <section class="introduction relative text-white">
      <!-- <img class="block mx-auto w-auto max-w-full" src="@/assets/images/bg-hero.png" /> -->
      <div class="container mx-auto max-w-6xl">
        <div class="w-3/5">
          <div class="text-black">
            <BaseSearchBar />
            <!-- Tags -->
            <BaseTag v-for="tag in tagList" :key="tag.name" />
          </div>
        </div>
      </div>
    </section>

    <!-- <AppRecommendation /> -->

    <!-- Main Content -->
    <section class="container mx-auto max-w-6xl">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div
          class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon-secondary="{ icon: 'headphones-alt', right: true }"
        >
          <span class="card-title">Songs</span>
          <!-- Icon -->
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <app-song-item v-for="song in songs" :key="song.docID" :song="song" />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script name="Home" setup>
import { ref, reactive, onBeforeUnmount } from 'vue'
import { songsCollection } from '@/utils/firebase'
// import { query, orderBy, limit, startAt, getDocs, doc } from 'firebase/firestore'
import AppSongItem from '@/components/SongItem.vue'
import AppRecommendation from '@/components/Recommendation.vue'
import vIconSecondary from '@/directives/icon-secondary'

const songs = reactive([])
const tagList = reactive([
  {
    name: 'Tag list1'
  },
  {
    name: 'Tag list2'
  },
  {
    name: 'Tag list3'
  }
])
const perPageSongsMax = ref(8)
const pendingRequest = ref(false)

const getSongs = async () => {
  if (pendingRequest.value) return

  pendingRequest.value = true

  let snapshots

  if (songs.length) {
    const lastDocument = await songsCollection.doc(songs[songs.length - 1].docID).get()
    // const lastDocument = await doc(songsCollection, songs[songs.length - 1].docID)

    // 建立查詢
    // const querySongs = query(
    //   songsCollection,
    //   orderBy('modified_name'),
    //   startAt(lastDocument),
    //   limit(perPageSongsMax.value)
    // )

    // 執行查詢
    // snapshots = await getDocs(querySongs)

    snapshots = await songsCollection
      .orderBy('modified_name')
      .startAfter(lastDocument)
      .limit(perPageSongsMax.value)
      .get()
  } else {
    // const querySongs = query(
    //   songsCollection,
    //   orderBy('modified_name'),
    //   limit(perPageSongsMax.value)
    // )

    // snapshots = await getDocs(querySongs)

    snapshots = await songsCollection.orderBy('modified_name').limit(perPageSongsMax.value).get()
  }

  snapshots.forEach((document) => {
    songs.push({
      docID: document.id,
      ...document.data()
    })
  })

  pendingRequest.value = false
}

const handleScroll = () => {
  // 解構底下方法的步驟可以省略
  const { scrollTop, offsetHeight } = document.documentElement
  const { innerHeight } = window

  const bottomOfWindow = Math.round(scrollTop) + innerHeight - 100 === offsetHeight - 100

  if (bottomOfWindow) {
    getSongs()
  }
}

getSongs()

window.addEventListener('scroll', handleScroll)

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.introduction {
  width: 100%;
  padding-top: 8%;
  padding-bottom: 8%;
  margin-bottom: 32px;
  background-image: url('@/assets/images/bg-hero.png');
  background-size: cover;
  background-position: 67% center;
}
</style>
