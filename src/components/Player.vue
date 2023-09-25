<template>
  <div class="fixed bottom-0 left-0 bg-white px-8 py-2 w-full h-20 shadow-2xl">
    <div class="flex justify-between items-center h-full">
      <!-- Basic Info -->
      <div class="flex w-3/12">
        <div class="mr-4 overflow-hidden" style="width: 50px; height: 50px">
          <img
            src="https://imgv3.fotor.com/images/videoImage/wonderland-girl-generated-by-Fotor-ai-art-generator_2023-05-15-104543_ibow.jpg"
            alt=""
            class="w-full h-full rounded-md object-cover"
          />
        </div>
        <div v-if="current_song.modified_name">
          <h6 class="song-title font-bold">{{ current_song.modified_name }}</h6>
          <p class="song-artist">{{ current_song.displayName }}</p>
        </div>
      </div>
      <!-- Player -->
      <div class="flex justify-around w-1/12">
        <div class="flex items-center justify-center">
          <button type="button" class="hidden sm:block lg:hidden xl:block" aria-label="Previous">
            <i class="fas fa-fast-backward"></i>
          </button>
        </div>
        <!-- Play/Pause Button -->
        <button
          class="bg-cyan-400 text-slate-900 transition-all duration-500 dark:bg-slate-100 transition-all duration-500 dark:text-slate-700 -my-2 w-12 h-12 rounded-full ring-1 ring-slate-900/5 shadow-md"
          type="button"
          @click.prevent="toggleAudio"
        >
          <i
            class="fa text-white text-lg"
            :class="{ 'fa-play': !playing, 'fa-pause': playing }"
          ></i>
        </button>
        <div class="flex items-center justify-center">
          <button type="button" aria-label="Skip 10 seconds" class="">
            <i class="fas fa-fast-forward"></i>
          </button>
        </div>
      </div>

      <div class="flex justify-between items-center w-8/12 gap-2">
        <!-- Current Position -->
        <div class="text-center w-1/12">{{ seek }}</div>

        <!-- Scrub Container  -->
        <div
          class="w-9/12 h-1 rounded bg-gray-200 relative cursor-pointer"
          @click.prevent="updateSeek"
        >
          <!-- Player Ball -->
          <span
            class="absolute -top-3 -ml-2.5 text-gray-800 text-lg"
            :style="{ left: playerProgress }"
          >
            <i class="fa fa-circle fa-sm ripple" style="color: rgb(6, 182, 212)"></i>
          </span>
          <!-- Player Progress Bar-->
          <span
            class="block h-1 rounded bg-gradient-to-r from-cyan-400 to-cyan-400"
            :style="{ width: playerProgress }"
          ></span>
        </div>
        <!-- Song Duration -->
        <div class="text-center w-1/12">{{ duration }}</div>

        <div class="flex justify-between items-center w-2/12">
          <i
            class="fas w-1/4 cursor-pointer"
            :class="{
              'fa-volume-up': volumeValue !== '0%',
              'fa-volume-off': volumeValue === '0%'
            }"
            @click.prevent="volumeOff($event)"
          ></i>
          <input
            class="w-3/4 input-range"
            type="range"
            value="1"
            @input="setSoundVolume($event)"
            min="0"
            max="1"
            step="0.01"
            :style="{ background: volumeBackground }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script name="Player" setup>
import { computed, watch } from 'vue'
import { useStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'

const { usePlayer } = useStore()
const { toggleAudio, updateSeek, setSoundVolume, volumeOff } = usePlayer()
const { playing, seek, duration, playerProgress, current_song, volumeValue, inputVolumeValue } =
  storeToRefs(usePlayer())

const volumeBackground = computed(
  () =>
    `linear-gradient(to right, rgb(6, 182, 212) ${volumeValue.value}, rgb(204, 204, 204) ${volumeValue.value})`
)

watch(inputVolumeValue, (newX) => {
  console.log(`x is ${newX}`)
})
</script>

<style lang="scss" scoped>
.fa-circle {
  background-color: white;
  border-radius: 50%;
}
.input-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  cursor: pointer;
  outline: none;
  border-radius: 15px;
  height: 4px;
  background: #ccc;
}

.input-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  width: 15px;
  background-color: $bg-white;
  border-radius: 50%;
  border: 2px solid $bg-cyan-400;
  transition: 0.2s ease-in-out;
}

.input-range::-moz-range-thumb {
  height: 15px;
  width: 15px;
  background-color: $bg-cyan-400;
  border-radius: 50%;
  border: none;
  transition: 0.2s ease-in-out;
}
.input-range::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 10px rgba(6, 182, 212, 0.1);
}
.input-range:active::-webkit-slider-thumb {
  box-shadow: 0 0 0 13px rgba(6, 182, 212, 0.2);
}
.input-range:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 13px rgba(6, 182, 212, 0.2);
}
.input-range::-moz-range-thumb:hover {
  box-shadow: 0 0 0 10px rgba(6, 182, 212, 0.1);
}
.input-range:active::-moz-range-thumb {
  box-shadow: 0 0 0 13px rgba(6, 182, 212, 0.2);
}
.input-range:focus::-moz-range-thumb {
  box-shadow: 0 0 0 13px rgba(6, 182, 212, 0.2);
}
</style>
