<template>
  <main>
    <!-- Introduction -->
    <section class="introduction relative text-white">
      <!-- <img class="block mx-auto w-auto max-w-full" src="@/assets/images/bg-hero.png" /> -->
      <div class="container mx-auto max-w-6xl">
        <div class="w-3/5">
          <div class="text-black">
            <!-- Search Form -->
            <form>
              <div class="flex">
                <label
                  for="search-dropdown"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >Your Email</label
                >
                <button
                  id="dropdown-button"
                  data-dropdown-toggle="dropdown"
                  class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                  type="button"
                >
                  All categories
                  <svg
                    class="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdown"
                  class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdown-button"
                  >
                    <li>
                      <button
                        type="button"
                        class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Mockups
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Templates
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Design
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Logos
                      </button>
                    </li>
                  </ul>
                </div>
                <div class="relative w-full">
                  <input
                    type="search"
                    id="search-dropdown"
                    class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    placeholder="Search Songs..."
                    required
                  />
                  <button
                    type="submit"
                    class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <svg
                      class="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span class="sr-only">Search</span>
                  </button>
                </div>
              </div>
            </form>

            <!-- Tags -->
            <a
              href="#"
              class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center"
              >Badge link</a
            >
            <a
              href="#"
              class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center"
              >Badge link</a
            >
          </div>
        </div>
      </div>
    </section>

    <section class="flex container mx-auto max-w-6xl">
      <div class="w-2/5 mt-6 sm:mt-10 relative z-10 rounded-xl shadow-xl">
        <div
          class="bg-white border-slate-100 transition-all duration-500 dark:bg-slate-800 transition-all duration-500 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8"
        >
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
              <p
                class="text-cyan-500 transition-all duration-500 dark:text-cyan-400 text-sm leading-6"
              >
                <abbr title="Episode">Ep.</abbr> 128
              </p>
              <h2
                class="text-slate-500 transition-all duration-500 dark:text-slate-400 text-sm leading-6 truncate"
              >
                Scaling CSS at Heroku with Utility Classes
              </h2>
              <p class="text-slate-900 transition-all duration-500 dark:text-slate-50 text-lg">
                Full Stack Radio
              </p>
            </div>
          </div>
          <div class="space-y-2">
            <div class="relative">
              <div
                class="bg-slate-100 transition-all duration-500 dark:bg-slate-700 rounded-full overflow-hidden"
              >
                <div
                  class="bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 w-1/2 h-2"
                  role="progressbar"
                  aria-label="music progress"
                  aria-valuenow="1456"
                  aria-valuemin="0"
                  aria-valuemax="4550"
                ></div>
              </div>
              <div
                class="ring-cyan-500 transition-all duration-500 dark:ring-cyan-400 ring-2 absolute left-1/2 top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow"
              >
                <div
                  class="w-1.5 h-1.5 bg-cyan-500 transition-all duration-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"
                ></div>
              </div>
            </div>
            <div class="flex justify-between text-sm leading-6 font-medium tabular-nums">
              <div class="text-cyan-500 transition-all duration-500 dark:text-slate-100">24:16</div>
              <div class="text-slate-500 transition-all duration-500 dark:text-slate-400">
                75:50
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-slate-50 text-slate-500 transition-all duration-500 dark:bg-slate-600 transition-all duration-500 dark:text-slate-200 rounded-b-xl flex items-center"
        >
          <div class="flex-auto flex items-center justify-evenly">
            <button type="button" aria-label="Add to favorites">
              <svg width="24" height="24">
                <path
                  d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <button type="button" class="hidden sm:block lg:hidden xl:block" aria-label="Previous">
              <svg width="24" height="24" fill="none">
                <path
                  d="m10 12 8-6v12l-8-6Z"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M6 6v12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <button type="button" aria-label="Rewind 10 seconds">
              <svg width="24" height="24" fill="none">
                <path
                  d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M5 5v3.111c0 .491.398.889.889.889H9"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
          <button
            type="button"
            class="bg-white text-slate-900 transition-all duration-500 dark:bg-slate-100 transition-all duration-500 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
            aria-label="Pause"
          >
            <svg width="30" height="32" fill="currentColor">
              <rect x="6" y="4" width="4" height="24" rx="2"></rect>
              <rect x="20" y="4" width="4" height="24" rx="2"></rect>
            </svg>
          </button>
          <div class="flex-auto flex items-center justify-evenly">
            <button type="button" aria-label="Skip 10 seconds" class="">
              <svg width="24" height="24" fill="none">
                <path
                  d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M19 5v3.111c0 .491-.398.889-.889.889H15"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <button type="button" class="hidden sm:block lg:hidden xl:block" aria-label="Next">
              <svg width="24" height="24" fill="none">
                <path
                  d="M14 12 6 6v12l8-6Z"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M18 6v12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              class="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 transition-all duration-500 dark:text-slate-100 transition-all duration-500 dark:ring-0 transition-all duration-500 dark:bg-slate-500"
            >
              1x
            </button>
          </div>
        </div>
      </div>

      <ul class="w-3/5 text-xs sm:text-base divide-y border-t cursor-default">
        <li class="flex items-center space-x-3 hover:bg-gray-100">
          <button class="p-3 hover:bg-green-500 group focus:outline-none">
            <svg
              class="w-4 h-4 group-hover:text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
          <div class="flex-1">Artist - Title</div>
          <div class="text-xs text-gray-400">2:58</div>
          <button class="focus:outline-none pr-4 group">
            <svg
              class="w-4 h-4 group-hover:text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
            </svg>
          </button>
        </li>
        <li class="flex items-center space-x-3 hover:bg-gray-100">
          <button class="p-3 hover:bg-green-500 group focus:outline-none">
            <svg
              class="w-4 h-4 group-hover:text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
          <div class="flex-1">Artist - Title</div>
          <div class="text-xs text-gray-400">2:58</div>
          <button class="focus:outline-none pr-4 group">
            <svg
              class="w-4 h-4 group-hover:text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
            </svg>
          </button>
        </li>
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
  background-image: url('@/assets/images/bg-hero.png');
  background-size: cover;
  background-position: 67% center;
}
</style>
