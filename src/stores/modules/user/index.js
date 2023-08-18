import { defineStore } from 'pinia'
import { auth, usersCollection } from '@/utils/firebase'

export const useUser = defineStore('user', {
  state: () => ({
    userLoggedIn: false,
  }),
  actions: {
    async createUser(values) {
      // auth 方法會回傳一個 Promise 物件
      const userCred = await auth.createUserWithEmailAndPassword(
        values.email,
        values.password
      )

      await usersCollection.doc(userCred.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country
      })

      await userCred.user.updateProfile({
        displayName: values.name,
      })

      this.userLoggedIn = true
    },
    async authenticate(values) {
      await auth.signInWithEmailAndPassword(
        values.email,
        values.password
      )

      this.userLoggedIn = true
    }
  }
})