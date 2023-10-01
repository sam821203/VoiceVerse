<template>
  <div>
    <div
      class="text-white text-center font-bold p-4 mb-4"
      v-if="login_show_alert"
      :class="login_alert_variant"
    >
      {{ login_alert_msg }}
    </div>
    <vee-form :validation-schema="loginSchema" @submit="login">
      <!-- Email -->
      <div class="mb-3">
        <label class="inline-block mb-2">{{ $t('authModal.email') }}</label>
        <vee-field
          name="email"
          type="email"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Enter Email"
        />
        <ErrorMessage class="text-red-600" name="email" />
      </div>
      <!-- Password -->
      <div class="mb-8">
        <label class="inline-block mb-2">{{ $t('authModal.password') }}</label>
        <vee-field
          name="password"
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
        />
        <ErrorMessage class="text-red-600" name="password" />
      </div>
      <BaseButton
        type="submit"
        class="bg-cyan-500 text-white hover:bg-cyan-600 focus:outline-gray-300"
        mode="rounded-square-full"
        :disabled="login_in_submission"
      >
        {{ $t('authModal.submit') }}
      </BaseButton>
    </vee-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from '@/stores/index.js'
const { useUser } = useStore()

const login_in_submission = ref(false)
const login_show_alert = ref(false)
const login_alert_variant = ref('bg-blue-500')
const login_alert_msg = ref('Please wait! We are logging you in.')
const loginSchema = reactive({
  email: 'required|min:3|max:100|email',
  password: 'required|min:6|max:100'
})

const login = async (values) => {
  // reset 變數
  login_in_submission.value = true
  login_show_alert.value = true
  login_alert_variant.value = 'text-blue-500'
  login_alert_msg.value = 'Please wait! We are logging you in.'

  const { authenticate } = useUser()

  try {
    await authenticate(values)
  } catch (error) {
    login_in_submission.value = false
    login_alert_variant.value = 'text-red-500'
    login_alert_msg.value = 'Invalid login details.'
    return
  }

  // 成功時，修改變數
  login_alert_variant.value = 'text-green-500'
  login_alert_msg.value = 'Success! You are now logged in.'

  // 登入成功，重新整理頁面
  window.location.reload()
}
</script>

<style lang="scss" scoped></style>
