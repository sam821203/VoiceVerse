// compat packages are API compatible with namespaced code
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// import {
//   getAuth,
//   setPersistence,
//   browserSessionPersistence,
//   signInWithEmailAndPassword
// } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAQRo4Fr8Ip7LSk2lep8bpurQsBIJ3mIzY',
  authDomain: 'voice-verse.firebaseapp.com',
  projectId: 'voice-verse',
  storageBucket: 'voice-verse.appspot.com',
  appId: '1:291241387631:web:18a31c4f6f6e4378040f9a'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

// namespaced API
const db = firebase.firestore()

// modular API
const auth = getAuth(firebaseApp)
const dbModular = getFirestore(firebaseApp)
const storage = getStorage()

// 使 firebase 能夠存放 database 的資料到使用者端的瀏覽器上
db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error: ${error.code}`)
})
// setPersistence(auth, browserSessionPersistence)
//   .then(() => {
//     // Existing and future Auth states are now persisted in the current session only. Closing the window would clear any existing state even if a user forgets to sign out.

//     // New sign-in will be persisted with session persistence.
//     return signInWithEmailAndPassword(auth, email, password)
//   })
//   .catch((error) => {
//     console.log(`Firebase persistence error: ${error.code}`)
//   })

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

// const usersCollection = collection(dbModular, 'users')
// const songsCollection = collection(dbModular, 'songs')
// const commentsCollection = collection(dbModular, 'comments')

export { auth, db, dbModular, usersCollection, songsCollection, commentsCollection, storage }
