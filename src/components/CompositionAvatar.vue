<template>
  <div class="cover-photo relative mb-10" v-if="index === 0">
    <div class="w-44 h-44 mx-auto mb-2">
      <!-- <img src="@/assets/images/default-cover-photo.png" alt="" class="shadow-xl" /> -->
      <img ref="avatarImageDOM" :src="resolveMediaUrl(song.user_avatar)" alt="" class="shadow-xl" />
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
        @change="handleFileChange"
      /> -->
    </vee-form>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { db } from '@/utils/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { uploadMedia, resolveMediaUrl } from '@/utils/media'

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

const { song, index, updateAvatar } = toRefs(props)
const showAvatarForm = ref(false)
const uploadedBlob = ref(null)
const avatarImageDOM = ref(null)

const handleFileChange = async (event) => {
  const imageFile = event.target.files[0]

  if (!imageFile || !imageFile.type.includes('image')) return

  try {
    uploadedBlob.value = await uploadMedia('avatars', imageFile)
  } catch (error) {
    console.error('上傳錯誤：', error)
  }
}

const editAvatar = async (values) => {
  if (!uploadedBlob.value) return

  const image = {
    ...values,
    image_name: uploadedBlob.value.pathname,
    user_avatar: uploadedBlob.value.url
  }

  try {
    // 更新音樂的 avatar
    const songDocRef = doc(db, 'songs', song.value.docID)
    await updateDoc(songDocRef, image)
  } catch (error) {
    console.log(error)
    return
  }

  // 更新修改後的資料
  updateAvatar.value(index.value, image)
}
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
