<template>
  <div class="cover-photo relative mb-10" v-if="index === 0">
    <div class="w-44 h-44 mx-auto mb-2">
      <!-- <img src="@/assets/images/default-cover-photo.png" alt="" class="shadow-xl" /> -->
      <img ref="avatarImageDOM" :src="song.user_avatar" alt="" class="shadow-xl" />
      <!-- <div>{{ song }}</div> -->
    </div>
    <label
      for="coverPhoto"
      class="absolute -bottom-4 right-20 w-10 h-10 bg-gray-600 hover:bg-gray-700"
    >
      <i class="fas fa-pencil-alt text-white"></i>
    </label>
    <button @click.prevent="showAvatarForm = !showAvatarForm">
      {{ $t('profile.edit') }}
    </button>
  </div>
  <div v-show="showAvatarForm">
    <vee-form :initial-values="song" @submit="editAvatar">
      <vee-field
        name="user_avatar"
        type="file"
        ref="fileInput"
        accept="image/jpeg, image/png, image/jpg"
        @change="handleFileChange"
      />
      <button type="submit" @click="showAvatarForm = !showAvatarForm">update</button>
      <!-- <input
        id="coverPhoto"
        ref="coverPhoto"
        type="file"
        accept="image/jpeg, image/png, image/jpg"
        @change="uploadAvatar"
      /> -->
    </vee-form>
  </div>
</template>

<script setup>
import { ref, toRefs, onMounted, reactive } from 'vue'
import { db, auth } from '@/utils/firebase'
import { getDownloadURL, deleteObject, uploadBytesResumable } from 'firebase/storage'
import { doc, updateDoc, deleteDoc, addDoc, getDoc, setDoc } from 'firebase/firestore'
import { avatarsCollection } from '@/utils/firebase'
import helper from '@/utils/helper'

const props = defineProps({
  song: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  updateAvatar: {
    type: Function,
    required: true
  }
})

const selectedFile = ref(null)
const { song, index, updateAvatar } = toRefs(props)
const showAvatarForm = ref(false)
const uploadTaskRef = ref(null)
const currentUser = auth.currentUser
const avatarImageDOM = ref(null)

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
        // await deleteAvatar(querySnapshot)
        // await addAvatar(uploadTask)
        console.log('success')
        // 成功時 update 按鈕才會可以點擊
      } catch (error) {
        console.error('上傳或刪除操作錯誤：', error)
      }
    }
  )
}

const addAvatar = async () => {
  const image = {
    uid: currentUser.uid,
    user_name: currentUser.displayName || 'Anonymous',
    image_name: uploadTaskRef.value.snapshot.ref.name,
    dateUpload: new Date().toString()
  }

  image.url = await getDownloadURL(uploadTaskRef.value.snapshot.ref)

  const imageRef = await addDoc(avatarsCollection, image)
  const imageSnapshot = await getDoc(imageRef)

  avatarImageDOM.value.src = imageSnapshot.data().url
  updateAvatar.value(imageSnapshot.data().url)
}

const handleFileChange = async (event) => {
  const imageFile = event.target.files[0]

  if (!imageFile.type.includes('image')) return

  const imageRef = helper.getStorage(`avatars/${imageFile.name}`)
  const uploadTask = uploadBytesResumable(imageRef, imageFile)
  // const querySnapshot = await helper.getDocuments('avatars', 'uid', currentUser.uid)

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
        console.log('success')
        uploadTaskRef.value = uploadTask
      } catch (error) {
        console.error('上傳或刪除操作錯誤：', error)
      }
    }
  )
  selectedFile.value = imageFile
}

// const getAvatar = async () => {
//   const querySnapshot = await helper.getDocuments('avatars', 'uid', currentUser.uid)

//   querySnapshot.forEach((avatar) => {
//     avatarImageDOM.value.src = avatar.data().url
//   })
// }

const editAvatar = async (values) => {
  // console.log(values)
  const querySnapshot = await helper.getDocuments('avatars', 'uid', currentUser.uid)
  const avatarDocRef = doc(db, 'avatars', currentUser.uid)
  // const imageSnapshot = await getDoc(imageRef)
  const avatarDocSnapshot = await getDoc(avatarDocRef)

  // const image = {
  //   uid: currentUser.uid,
  //   user_name: currentUser.displayName || 'Anonymous',
  //   image_name: uploadTaskRef.value.snapshot.ref.name,
  //   dateUpload: new Date().toString()
  // }

  const image = {
    user_name: currentUser.displayName || 'Anonymous',
    image_name: uploadTaskRef.value.snapshot.ref.name,
    ...values
  }

  image.user_avatar = await getDownloadURL(uploadTaskRef.value.snapshot.ref)
  console.log(image)

  try {
    // 更新音樂的 avatar
    const songDocRef = doc(db, 'songs', song.value.docID)
    await updateDoc(songDocRef, image)

    // 更新 user 的 avatar
  } catch (error) {
    console.log(error)
    return
  }

  // const imageRef = await addDoc(avatarsCollection, image)
  // await addDoc(avatarsCollection, image)

  // avatarImageDOM.value.src = imageSnapshot.data().url

  // 更新修改後的資料
  updateAvatar.value(index.value, image)
  // }

  // else {
  //   console.log('Has avatar')
  //   const image = {
  //     uid: currentUser.uid,
  //     user_name: currentUser.displayName || 'Anonymous',
  //     image_name: uploadTaskRef.value.snapshot.ref.name,
  //     dateUpload: new Date().toString()
  //   }

  //   image.url = await getDownloadURL(uploadTaskRef.value.snapshot.ref)

  //   await updateDoc(avatarDocRef, image)

  //   const imageRef = await addDoc(avatarsCollection, image)
  //   const imageSnapshot = await getDoc(imageRef)

  //   avatarImageDOM.value.src = imageSnapshot.data().url
  //   updateAvatar.value(imageSnapshot.data().url)
  // }

  // updateAvatar.value(false)
}

// onMounted(() => {
//   getAvatar()
// })
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

input {
  display: block;
  margin-bottom: 2%;
  width: 100%;
  border: 1px solid #ccc;
  height: 40px;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #a9a9a9 solid 1px;
}

// input[type='file'] {
//   display: none;
// }

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
