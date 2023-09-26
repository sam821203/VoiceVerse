import { defineStore } from 'pinia'

export const useModal = defineStore('modal', {
  state: () => ({
    isOpen: false,
    uploadModalOpen: false
  }),
  getters: {
    hiddenClass(state) {
      return !state.isOpen ? 'hidden' : ''
    },
    hiddenUploadClass(state) {
      return !state.uploadModalOpen ? 'hidden' : ''
    }
  }
})
