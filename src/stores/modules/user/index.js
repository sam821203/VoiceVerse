import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => ({
    userLoggedIn: false,
  })
})