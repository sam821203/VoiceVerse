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
          <div class="cover-photo">
            <div class="img-wrap">
              <img src="@/assets/images/default-cover-photo.png" alt="" />
            </div>
            <label for="coverPhoto">Upload photo</label>
            <input
              id="coverPhoto"
              ref="coverPhoto"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
            />
            <!-- <input
              id="coverPhoto"
              ref="coverPhoto"
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              @change="handleCoverPhotoChange"
              @blur="clearValidity(coverPhoto)"
            /> -->
          </div>
          <div class="user-name">{{ currentUser.displayName }}</div>
          <div class="form-control">
            <label for="description"> Description </label>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam excepturi eos
              natus pariatur hic inventore delectus fugiat sapiente optio sit? Hic repellat nobis
              amet, natus saepe porro aut odit autem.
            </p>
            <!-- <textarea id="description" rows="5" /> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script name="profile" setup>
import { ref, reactive, onMounted } from 'vue'
import CompositionItem from '@/components/CompositionItem.vue'
import { auth, songsCollection } from '@/utils/firebase'

const songs = reactive([])
const unsavedFlag = ref(false)
const currentUser = auth.currentUser

const fetchSongs = async () => {
  const snapshot = await songsCollection.where('uid', '==', currentUser.uid).get()

  snapshot.forEach(addSong)
}

const updateSong = (i, values) => {
  songs[i].modified_name = values.modified_name
  songs[i].genre = values.genre
}

const removeSong = (i) => {
  songs.splice(i, 1)
}

const addSong = (document) => {
  const song = reactive({
    ...document.data(),
    docID: document.id
  })

  songs.push(song)
}

const updateUnsavedFlag = (status) => {
  unsavedFlag.value = status
}

onMounted(() => {
  fetchSongs()
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
  padding: 12px 0;
  margin: 10px auto;
  width: 120px;
  font-size: 0.75rem;
  text-align: center;
  color: #fff;
  background: #000;
  border-radius: 4px;
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
