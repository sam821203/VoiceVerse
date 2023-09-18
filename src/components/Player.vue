<template>
  <div class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
    <!-- Track Info -->
    <div class="text-center" v-if="current_song.modified_name">
      <span class="song-title font-bold">{{ current_song.modified_name }}</span> by
      <span class="song-artist">{{ current_song.displayName }}</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button" @click.prevent="toggleAudio">
        <i
          class="fa text-gray-500 text-xl"
          :class="{ 'fa-play': !playing, 'fa-pause': playing }"
        ></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">{{ seek }}</div>
      <!-- Scrub Container  -->
      <div
        class="w-full h-2 rounded bg-gray-200 relative cursor-pointer"
        @click.prevent="updateSeek"
      >
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
          :style="{ left: playerProgress }"
        >
          <i class="fas fa-circle"></i>
        </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          :style="{ width: playerProgress }"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">{{ duration }}</div>
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
</template>

<script name="Player" setup>
import { useStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'

const { usePlayer } = useStore()
const { toggleAudio, updateSeek } = usePlayer()
const { playing, seek, duration, playerProgress, current_song } = storeToRefs(usePlayer())
</script>

<style lang="scss" scoped></style>
