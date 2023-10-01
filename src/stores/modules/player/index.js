import { defineStore } from 'pinia'
import { Howl } from 'howler'
import helper from '@/utils/helper'

export const usePlayer = defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {},
    seek: '-:--',
    duration: '-:--',
    playerProgress: '0%',
    volumeValue: '100%',
    activeSong: null
  }),
  actions: {
    async newSong(song, target) {
      // 如果有歌曲播放中，銷毀目前曲目
      if (this.sound instanceof Howl) {
        this.sound.unload()
      }

      this.current_song = song

      this.sound = new Howl({
        src: [song.url],
        html5: true,
        volume: 1
      })

      // 播放歌曲
      this.sound.play()
      this.activeSong = song

      this.sound.on('play', () => {
        requestAnimationFrame(this.progress)
      })
    },
    async toggleAudio() {
      if (!this.sound.playing) return

      if (this.sound.playing()) {
        this.sound.pause()
      } else {
        this.sound.play()
      }
    },
    async setSoundVolume(event) {
      if (!this.sound.playing) return
      if (this.sound.playing()) {
        this.sound.volume(event.target.value)
        this.volumeValue = `${(event.target.value / 1) * 100}%`
      }
    },
    volumeOff(event) {
      this.sound.volume(0)
      this.volumeValue = '0%'
      event.target.nextSibling.value = '0'
    },
    progress() {
      this.seek = helper.formatTime(this.sound.seek())
      this.duration = helper.formatTime(this.sound.duration())
      this.playerProgress = `${(this.sound.seek() / this.sound.duration()) * 100}%`
      if (this.sound.playing()) {
        requestAnimationFrame(this.progress)
      }
    },
    fastSeek(move) {
      let currentMove
      const currentSeek = this.sound.seek()

      if (move === 'backward') {
        currentMove = currentSeek - 5
      } else if (move === 'forward') {
        currentMove = currentSeek + 5
      }

      if (
        this.sound.seek(currentMove) <= 5 ||
        this.sound.seek(currentMove) >= this.sound.duration()
      ) {
        this.seek = helper.formatTime(this.sound.seek(0))
        this.playerProgress = '0%'
      } else {
        this.seek = helper.formatTime(currentSeek)
        this.playerProgress = `${(currentSeek / this.sound.duration()) * 100}%`
      }
    },
    updateSeek(event) {
      if (!this.sound.playing) {
        return
      }

      // x 為 document 到 player 的距離
      const { x, width } = event.currentTarget.getBoundingClientRect()
      const clickX = event.clientX - x
      const percentage = clickX / width
      const seconds = this.sound.duration() * percentage

      this.sound.seek(seconds)
      this.sound.once('seek', this.progress)
    }
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing()
      }

      return false
    }
  }
})
