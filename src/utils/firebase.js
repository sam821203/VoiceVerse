// compat packages are API compatible with namespaced code
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAQRo4Fr8Ip7LSk2lep8bpurQsBIJ3mIzY',
  authDomain: 'voice-verse.firebaseapp.com',
  projectId: 'voice-verse',
  storageBucket: 'voice-verse.appspot.com',
  appId: '1:291241387631:web:18a31c4f6f6e4378040f9a'
}

const app = firebase.initializeApp(firebaseConfig)

// namespaced API
const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

// modular API
const authModular = getAuth(app)
const storageModular = getStorage()

// 該方法會使 firebase 能夠儲存 database 的資料在使用者端的瀏覽器上
db.enablePersistence().catch((error) => {
  console.log(`Firebase persistence error: ${error.code}`)
})

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export {
  storageModular,
  authModular,
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage
}
