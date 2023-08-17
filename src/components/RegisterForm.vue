<template>
  <div>
    <div
      class="text-white text-center font-bold p-4 rounded mb-4"
      v-if="reg_show_alert"
      :class="reg_alert_variant"
    >
      {{ reg_alert_msg }}
    </div>
    <vee-form :validation-schema="schema" :initial-values="userData" @submit="register">
      <!-- Name -->
      <div class="mb-3">
        <label class="inline-block mb-2">Name</label>
        <vee-field
          name="name"
          type="text"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Name"
        />
        <ErrorMessage class="text-red-600" name="name" />
      </div>
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block mb-2">Email</label>
        <vee-field
          name="email"
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email"
        />
        <ErrorMessage class="text-red-600" name="email" />
      </div>
      <!-- Age -->
      <div class="mb-3">
        <label class="inline-block mb-2">Age</label>
        <vee-field
          name="age"
          type="number"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        />
        <ErrorMessage class="text-red-600" name="age" />
      </div>
      <!-- Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Password</label>
        <vee-field name="password" :bails="false" v-slot="{ field, errors }">
          <input
            type="password"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Password"
            v-bind="field"
          />
          <div class="text-red-600" v-for="error in errors" :key="error">{{ error }}</div>
        </vee-field>
        <ErrorMessage class="text-red-600" name="password" />
      </div>
      <!-- Confirm Password -->
      <div class="mb-3">
        <label class="inline-block mb-2">Confirm Password</label>
        <vee-field
          name="confirm_password"
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Confirm Password"
        />
        <ErrorMessage class="text-red-600" name="confirm_password" />
      </div>
      <!-- Country -->
      <div class="mb-3">
        <label class="inline-block mb-2">Country</label>
        <vee-field
          as="select"
          name="country"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        >
          <option value="USA">USA</option>
          <option value="Mexico">Mexico</option>
          <option value="Germany">Germany</option>
          <option value="Antarctica">Antarctica</option>
        </vee-field>
        <ErrorMessage class="text-red-600" name="country" />
      </div>
      <!-- TOS -->
      <div class="mb-3 pl-6">
        <vee-field
          name="tos"
          type="checkbox"
          value="1"
          class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        />
        <label class="inline-block">Accept terms of service</label>
        <ErrorMessage class="text-red-600" name="tos" />
      </div>
      <button
        type="submit"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
        :disabled="reg_in_submission"
      >
        Submit
      </button>
    </vee-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { auth, usersCollection } from '@/utils/firebase'
import { mapWritableState, storeToRefs } from 'pinia'
import useStore from '@/stores/index.js'

const reg_in_submission = ref(false)
const reg_show_alert = ref(false)
const reg_alert_variant = ref('bg-blue-500')
const reg_alert_msg = ref('Please wait! Your account is being created.')
const schema = reactive({
  name: 'required|min:2|max:100',
  email: 'required|min:3|max:100|email',
  age: 'required|min_value:18|max_value:120',
  password: 'required|min:6|max:100|excluded:password',
  confirm_password: 'passwords_mismatch:@password',
  country: 'required|country_excluded:Antarctica',
  tos: 'tos'
})
const userData = reactive({
  country: 'USA'
})

const { useUser } = useStore()
const userStore = useUser()
const { userLoggedIn } = storeToRefs(userStore)

const register = async (values) => {
  // reset 變數
  reg_in_submission.value = true
  reg_show_alert.value = true
  reg_alert_variant.value = 'bg-blue-500'
  reg_alert_msg.value = 'Please wait! Your account is being created.'

  let userCred

  try {
    // auth 方法會回傳一個 Promise 物件
    userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)
  } catch (error) {
    reg_in_submission.value = false
    reg_alert_variant.value = 'bg-red-500'
    reg_alert_msg.value = 'This account already exist.'
    return
  }

  try {
    await usersCollection.add({
      name: values.name,
      email: values.email,
      age: values.age,
      country: values.country
    })
  } catch (error) {
    reg_in_submission.value = false
    reg_alert_variant.value = 'bg-red-500'
    reg_alert_msg.value = 'This account already exist.'
    return
  }

  userLoggedIn.value = true

  // 成功時，修改變數
  reg_alert_variant.value = 'bg-green-500'
  reg_alert_msg.value = 'Success! Your account is being created.'
  console.log(userCred)
}
</script>

<style lang="scss" scoped></style>