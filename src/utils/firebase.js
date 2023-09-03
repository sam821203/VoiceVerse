import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAQRo4Fr8Ip7LSk2lep8bpurQsBIJ3mIzY",
  authDomain: "voice-verse.firebaseapp.com",
  projectId: "voice-verse",
  storageBucket: "voice-verse.appspot.com",
  appId: "1:291241387631:web:18a31c4f6f6e4378040f9a"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()

const usersCollection = db.collection('users')
const songsCollection = db.collection('songs')
const commentsCollection = db.collection('comments')

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage
}