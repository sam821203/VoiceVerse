import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

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

// modular API 中，getFirestore 函數來初始化 Firestore 實例
// 並自動緩存 database 的資料到使用者端的瀏覽器上
const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage()

const usersCollection = collection(db, 'users')
const songsCollection = collection(db, 'songs')
const commentsCollection = collection(db, 'comments')
const avatarsCollection = collection(db, 'avatars')

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  avatarsCollection,
  storage
}
