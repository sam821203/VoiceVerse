import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, usersCollection } from '@/utils/firebase'

export const useUser = defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async createUser(values) {
      // auth 方法會回傳一個 Promise 物件
      const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password)

      await usersCollection.doc(userCred.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country
      })

      await userCred.user.updateProfile({
        displayName: values.name
      })

      this.userLoggedIn = true
    },
    async authenticate(values) {
      await signInWithEmailAndPassword(auth, values.email, values.password)

      this.userLoggedIn = true
    },
    async signOut() {
      await signOut(auth)
      this.userLoggedIn = false
    }
  }
})
