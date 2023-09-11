import { defineStore } from 'pinia'
import { Howl } from 'howler'
import { info } from 'autoprefixer'
import helper from '@/utils/helper'

export const usePlayer = defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%'
  }),
  actions: {
    async newSong(song) {
      // 如果有歌曲播放中，銷毀目前曲目
      if (this.sound instanceof Howl) {
        this.sound.unload()
      }

      // 如果目前有曲目，
      // if (this.current_song !== undefined)

      this.current_song = song

      this.sound = new Howl({
        src: [song.url],
        html5: true
      })

      // 播放歌曲
      this.sound.play()

      // 監聽 play 方法
      this.sound.on('play', () => {
        requestAnimationFrame(this.progress)
      })
    },
    async toggleAudio() {
      // 檢查是否為 Howl 物件
      if (!this.sound.playing) return

      if (this.sound.playing()) {
        this.sound.pause()
      } else {
        this.sound.play()
      }
    },
    progress() {
      this.seek = helper.formatTime(this.sound.seek())
      this.duration = helper.formatTime(this.sound.duration())
      this.playerProgress = `${(this.sound.seek() / this.sound.duration()) * 100}%`

      if (this.sound.playing()) {
        requestAnimationFrame(this.progress)
      }
    },
    updateSeek(event) {
      if (!this.sound.playing) {
        return
      }

      // 這裡的 x 代表者 document 到 player 的距離
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
