<template>
  <div class="w-full mx-auto max-w-6xl">
    <div class="search-wrap absolute top-56 w-2/5">
      <input
        type="search"
        class="z-20 block p-3 w-full h-14 mb-4 text-sm text-gray-900 bg-gray-50 rounded border-l-2 border border-gray-300 focus:outline-none"
        autocomplete="off"
        :placeholder="$t('home.search_songs')"
        required
        v-model="search"
      />
      <Transition name="slide-fade">
        <i
          class="absolute top-3 right-4 fas fa-search text-2xl"
          style="color: rgb(6, 182, 212)"
          v-if="!search"
        ></i>
      </Transition>
      <BaseTag
        v-for="tag in tagList"
        :key="tag.name"
        :name="tag.name"
        :search="search"
        @click.prevent="insertSearch(tag.name)"
      />
    </div>
    <div class="list-wrap container">
      <div class="rounded relative flex flex-col">
        <!-- <div
          class="px-1 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon-secondary="{ icon: 'headphones-alt', right: true }"
        > -->
        <div class="px-1 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="text-2xl">{{ $t('home.songs') }}</span>
        </div>
        <ol id="playlist">
          <AppSongItem v-for="song in filteredList" :key="song.docID" :song="song" />
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeUnmount, computed, watch, toRefs, defineExpose } from 'vue'
import { songsCollection } from '@/utils/firebase'

import AppSongItem from '@/components/SongItem.vue'
import vIconSecondary from '@/directives/icon-secondary'

const songs = reactive([])
const search = ref('')
const perPageSongsMax = ref(8)
const pendingRequest = ref(false)
const tagList = reactive([
  {
    name: 'Harry Potter'
  },
  {
    name: 'British'
  },
  {
    name: '01'
  }
])

const props = defineProps({
  songs: {
    type: Object,
    required: true
  }
})

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

getSongs()

const insertSearch = (tagName) => {
  search.value = tagName
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

const filteredList = computed(() => {
  return songs.filter((song) => {
    return song.modified_name.toLowerCase().includes(search.value.toLowerCase())
  })
})

// watch(search, (newValue) => {
//   console.log(`x is ${newValue}`)
// })

window.addEventListener('scroll', handleScroll)

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
/* clears the X from Internet Explorer */
input[type='search']::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}
input[type='search']::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}
/* clears the X from Chrome */
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  display: none;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
