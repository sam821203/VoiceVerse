import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  state: () => ({
    isOpen: false
  }),
  actions: {
    async login({ account, password, memoryAccount }) {
      try {
        const res = await loginApi({ account, password })
      } catch {}
    }
  },
  getters: {}
})
