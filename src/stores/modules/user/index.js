import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, usersCollection } from '@/utils/firebase'

export const useUser = defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async createUser(values) {
      const userCred = await createUserWithEmailAndPassword(auth, values.email, values.password)
      const userDocRef = doc(usersCollection, userCred.user.uid)

      const userData = {
        name: values.name,
        email: values.email,
        age: values.age
      }

      await setDoc(userDocRef, userData)

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
