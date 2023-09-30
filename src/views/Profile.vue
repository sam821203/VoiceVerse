<template>
  <!-- Main Content -->
  <section class="container max-w-6xl mx-auto mt-20 mb-40">
    <div class="md:grid md:grid-cols-7 md:gap-4">
      <div class="col-span-5 pt-2 px-2 bg-white rounded-xl">
        <div class="px-6 pt-6 pb-5 font-bold">
          <span class="text-2xl">{{ $t('profile.my_songs') }}</span>
          <i class="fa fa-compact-disc float-right text-gray-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <composition-item
            v-for="(song, i) in songs"
            :key="song.docID"
            :song="song"
            :updateSong="updateSong"
            :index="i"
            :removeSong="removeSong"
            :updateUnsavedFlag="updateUnsavedFlag"
          />
        </div>
      </div>
      <div class="col-span-2">
        <div class="mx-auto max-w-6xl bg-white pt-2 pb-10 px-5 rounded-xl">
          <div class="cover-photo relative mb-10">
            <div class="w-44 h-44 mx-auto mb-2">
              <img
                ref="avatarImageDOM"
                src="@/assets/images/default-cover-photo.png"
                alt=""
                class="shadow-xl"
              />
            </div>
            <label for="coverPhoto" class="absolute -bottom-4 right-20 w-10 h-10 bg-gray-700">
              <i class="fas fa-pencil-alt" style="color: #fff"></i>
            </label>
            <input
              id="coverPhoto"
              ref="coverPhoto"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              @change="uploadAvatar"
            />
          </div>
          <ul class="flex justify-between">
            <li class="w-1/3 text-center">
              <span class="text-lg font-medium">{{ $t('profile.user_name') }}</span>
              <p class="mt-1 text-gray-400 break-all">{{ currentUser.displayName }}</p>
            </li>
            <li class="w-1/3 text-center">
              <span class="text-lg font-medium">{{ $t('profile.songs') }}</span>
              <p class="mt-1 text-gray-400 break-all">{{ songsUploaded }}</p>
            </li>
            <li class="w-1/3 text-center">
              <span class="text-lg font-medium">{{ $t('profile.comments') }}</span>
              <p class="mt-1 text-gray-400 break-all">{{ commentsLeft }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script name="profile" setup>
import { ref, reactive, onMounted, computed } from 'vue'
import CompositionItem from '@/components/CompositionItem.vue'
import { auth, dbModular } from '@/utils/firebase'
import { uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { doc, deleteDoc, addDoc, getDoc, collection } from 'firebase/firestore'
import helper from '@/utils/helper'

const songs = reactive([])
const unsavedFlag = ref(false)
const commentsLeft = ref('')
const songsUploaded = ref('')
const currentUser = auth.currentUser
const avatarImageDOM = ref(null)

const removeSong = (i) => songs.splice(i, 1)

const getSongs = async () => {
  const querySnapshot = await helper.getDocuments('songs', 'uid', currentUser.uid)

  querySnapshot.forEach(addSong)
}

const updateSong = (i, values) => {
  songs[i].modified_name = values.modified_name
  songs[i].genre = values.genre
}

const addSong = (document) => {
  const song = reactive({
    ...document.data(),
    docID: document.id
  })

  songs.push(song)
}

const getSongsUploaded = async () => {
  const querySnapshot = await helper.getDocuments('songs', 'uid', currentUser.uid)
  songsUploaded.value = querySnapshot.docs.length
}

const getCommentsLeft = async () => {
  const querySnapshot = await helper.getDocuments('comments', 'uid', currentUser.uid)
  commentsLeft.value = querySnapshot.docs.length
}

const updateUnsavedFlag = (status) => (unsavedFlag.value = status)

const getAvatar = async () => {
  const querySnapshot = await helper.getDocuments('avatars', 'uid', currentUser.uid)

  querySnapshot.forEach((avatar) => {
    avatarImageDOM.value.src = avatar.data().url
  })
}

const deleteAvatar = async (querySnapshot) => {
  querySnapshot.forEach(async (avatar) => {
    const avatarRef = helper.getStorage(`avatars/${avatar.data().image_name}`)

    await deleteObject(avatarRef)
    await deleteDoc(doc(dbModular, 'avatars', avatar.id))
  })
}

const addAvatar = async (uploadTask) => {
  const image = {
    uid: currentUser.uid,
    user_name: currentUser.displayName || 'Anonymous',
    image_name: uploadTask.snapshot.ref.name,
    dateUpload: new Date().toString()
  }

  image.url = await getDownloadURL(uploadTask.snapshot.ref)

  const imageRef = await addDoc(collection(dbModular, 'avatars'), image)
  const imageSnapshot = await getDoc(imageRef)

  avatarImageDOM.value.src = imageSnapshot.data().url
}

const uploadAvatar = async (event) => {
  const imageFile = event.target.files[0]

  if (!imageFile.type.includes('image')) return

  const imageRef = helper.getStorage(`avatars/${imageFile.name}`)

  const uploadTask = uploadBytesResumable(imageRef, imageFile)
  const querySnapshot = await helper.getDocuments('avatars', 'uid', currentUser.uid)

  uploadTask.on(
    'stage_change',
    (snapshot) => {
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused')
          break
        case 'running':
          break
      }
    },
    (error) => {
      console.log(error.message)
    },
    async () => {
      try {
        await deleteAvatar(querySnapshot)
        await addAvatar(uploadTask)
      } catch (error) {
        console.error('上傳和刪除操作錯誤：', error)
      }
    }
  )
}

onMounted(() => {
  getSongs()
  getAvatar()
  getSongsUploaded()
  getCommentsLeft()
})
</script>

<style lang="scss" scoped>
.user-name {
  font-size: 72px;
  font-weight: bold;
}
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

.cover-photo > label {
  display: block;
  padding: 10px 0 12px;
  margin: 10px auto;
  font-size: 0.9rem;
  color: black;
  text-align: center;
  border-radius: 50%;
  cursor: pointer;
  font-weight: 400;
}

.filter__option label {
  font-weight: 400;
  margin-bottom: 1%;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  margin-bottom: 2%;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #a9a9a9 solid 1px;
}

input[type='file'] {
  display: none;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.circle-card {
  padding: 40px;
  width: 400px;
  text-align: center;
  color: #333;
  background-color: #fff;
  border-radius: 15px;
}

.cover-photo img {
  margin-top: 40px;
  margin-bottom: 30px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.form-control.filter__options {
  margin-bottom: 4%;
}

button {
  border: none;
}
</style>
