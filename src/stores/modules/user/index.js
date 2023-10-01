import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { auth, usersCollection } from '@/utils/firebase'

export const useUser = defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async createUser(values) {
      const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password)

      await usersCollection.doc(userCred.user.uid).set({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country
      })

      await updateProfile(userCred.user, {
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
