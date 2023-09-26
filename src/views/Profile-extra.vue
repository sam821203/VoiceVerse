<template>
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
      <textarea id="description" rows="5" />
      <!-- <textarea
        id="description"
        v-model.trim="description.val"
        rows="5"
        @blur="clearValidity(description)"
      />
      <p v-if="!description.isValid">Description must not be empty!</p> -->
    </div>
  </div>
</template>

<script name="Profile" setup>
import { auth } from '@/utils/firebase'

const currentUser = auth.currentUser
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
