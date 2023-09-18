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

    <!-- Recommendations -->
    <section class="flex container mx-auto mb-8 max-w-6xl">
      <BaseCard>
        <div class="flex items-center space-x-4">
          <img
            src="https://tailwindcss.com/_next/static/media/full-stack-radio.afb14e4e.png"
            loading="lazy"
            decoding="async"
            alt=""
            class="flex-none rounded-lg bg-slate-100"
            width="88"
            height="88"
          />
          <div class="min-w-0 flex-auto space-y-1 font-semibold">
            <p class="text-slate-900 transition-all duration-500 dark:text-slate-50 text-lg">
              This is What You Came For
            </p>
            <h2
              class="text-slate-500 transition-all duration-500 dark:text-slate-400 text-sm leading-6 truncate"
            >
              Scaling CSS at Heroku with Utility Classes
            </h2>
            <p
              class="text-cyan-500 transition-all duration-500 dark:text-cyan-400 text-sm leading-6"
            >
              <abbr title="Episode">Ep.</abbr> 128
            </p>
          </div>
        </div>
      </BaseCard>

      <ul class="w-3/5 flex-auto ml-4 text-xs sm:text-base divide-y border-t cursor-default">
        <BaseItemList />
        <BaseItemList />
        <BaseItemList />
      </ul>
    </section>

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
import AppSongItem from '@/components/SongItem.vue'
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
    snapshots = await songsCollection
      .orderBy('modified_name')
      .startAfter(lastDocument)
      .limit(perPageSongsMax.value)
      .get()
  } else {
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
