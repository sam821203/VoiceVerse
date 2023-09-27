<template>
  <!-- Main Content -->
  <section class="container mx-auto max-w-6xl mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-8">
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t('profile.my_songs') }}</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
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
      </div>
      <div class="col-span-1">
        <div class="profile mx-auto max-w-6xl">
          <div class="cover-photo relative mb-6">
            <div class="img-wrap">
              <img ref="avatarImageDOM" src="@/assets/images/default-cover-photo.png" alt="" />
            </div>
            <label for="coverPhoto" class="absolute -bottom-4 right-28 w-10 h-10 bg-gray-300">
              <i class="fas fa-pencil-alt fa-lg"></i>
            </label>
            <input
              id="coverPhoto"
              ref="coverPhoto"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              @change="uploadAvatar"
            />
          </div>
          <div class="text-4xl font-bold text-center">{{ currentUser.displayName }}</div>
          <div class="form-control">
            <label for="description"> Description </label>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam excepturi eos
              natus pariatur hic inventore delectus fugiat sapiente optio sit? Hic repellat nobis
              amet, natus saepe porro aut odit autem.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script name="profile" setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import CompositionItem from '@/components/CompositionItem.vue'
import { auth, storage, songsCollection, avatarsCollection, dbModular } from '@/utils/firebase'
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import { getDocs, query, where, collection, doc, deleteDoc } from 'firebase/firestore'

const songs = reactive([])
const unsavedFlag = ref(false)
const currentUser = auth.currentUser
const avatarImageDOM = ref(null)
// const uploadImages = reactive([])

const fetchSongs = async () => {
  const snapshot = await songsCollection.where('uid', '==', currentUser.uid).get()

  snapshot.forEach(addSong)
}

const updateSong = (i, values) => {
  songs[i].modified_name = values.modified_name
  songs[i].genre = values.genre
}

const removeSong = (i) => songs.splice(i, 1)

const addSong = (document) => {
  const song = reactive({
    ...document.data(),
    docID: document.id
  })

  songs.push(song)
}

const updateUnsavedFlag = (status) => (unsavedFlag.value = status)

const getAvatar = async () => {
  const q = query(collection(dbModular, 'avatars'), where('uid', '==', currentUser.uid))
  const querySnapshot = await getDocs(q)

  // if (querySnapshot.empty !== true) {
  //   querySnapshot.forEach(async (avatar) => {
  //     const avatarRef = storageRef(storage, `avatars/${avatar.data().image_name}`)

  //     await deleteObject(avatarRef)
  //     await deleteDoc(doc(dbModular, 'avatars', avatar.data().uid))
  //   })
  // }
  // FIXME: 重新整理後，都會是第一張圖片，因為是陣列裡的最後一個
  querySnapshot.forEach((avatar) => {
    console.log('getAvatar: ', avatar.data().image_name)
    avatarImageDOM.value.src = avatar.data().url
  })
}

const uploadAvatar = async (event) => {
  const imageFile = event.target.files[0]

  if (!imageFile.type.includes('image')) return

  const imageRef = storageRef(storage, `avatars/${imageFile.name}`)
  const uploadTask = uploadBytesResumable(imageRef, imageFile)

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
      // 刪除目前的圖片
      const q = query(collection(dbModular, 'avatars'), where('uid', '==', currentUser.uid))
      const querySnapshot = await getDocs(q)
      const deletePromises = []

      // 第一次不會跑這個步驟，因為 querySnapshot 還沒有東西
      querySnapshot.forEach(async (avatar) => {
        console.log('uploadAvatar: ', avatar.data().image_name)
        const avatarRef = storageRef(storage, `avatars/${avatar.data().image_name}`)
        console.log(avatar.data().url)
        const deletePromise = Promise.all([
          deleteObject(avatarRef),
          deleteDoc(doc(dbModular, 'avatars', avatar.data().url))
        ])
        console.log('1', deletePromises)
        deletePromises.push(deletePromise)
        console.log('2', deletePromises)
        console.log(1)
      })

      // 等待所有刪除操作完成
      await Promise.all(deletePromises)

      console.log(querySnapshot.empty ? 'empty' : 'not empty')

      // 如果 querySnapshot 為空
      if (querySnapshot.empty === true) {
        const image = {
          uid: currentUser.uid,
          user_name: currentUser.displayName || 'Anonymous',
          image_name: uploadTask.snapshot.ref.name,
          dateUpload: new Date().toString()
        }

        image.url = await getDownloadURL(uploadTask.snapshot.ref)

        const imageRef = await avatarsCollection.add(image)
        const imageSnapshot = await imageRef.get()

        avatarImageDOM.value.src = imageSnapshot.data().url
        console.log(2)
      }

      // const isDefault = avatarImageDOM.value.src.includes('default-cover-photo.png')

      // await nextTick(async () => {
      //   const isDefault = avatarImageDOM.value.src.includes('default-cover-photo.png')

      //   if (!isDefault) {
      //     const regex = /avatars%2F(.*?)\?alt/
      //     const currentURL = avatarImageDOM.value.src
      //     const matchArr = currentURL.match(regex)
      //     const currentImageName = matchArr[1]

      //     const avatarRef = storageRef(storage, `avatars/${currentImageName}`)

      //     await deleteObject(avatarRef)
      //     await deleteDoc(doc(dbModular, 'avatars', currentUser.uid))
      //   }
      // })
    }
  )
}

onMounted(() => {
  fetchSongs()
  getAvatar()
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

.cover-photo .img-wrap {
  margin-bottom: 2%;
  margin-left: auto;
  margin-right: auto;
  width: 180px;
  height: 180px;
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
