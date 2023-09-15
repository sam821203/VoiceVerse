<template>
  <input
    type="email"
    class="form-control"
    placeholder="E-mail"
    :class="{
      'is-valid': validateEmail(email),
      'is-invalid': !validateEmail(email)
    }"
    :value="email"
    @input="update($event)"
  />
</template>

<script setup>
import { validateEmail } from '../validate-email'

const props = defineProps(['email'])
const emits = defineEmits(['update:email'])
const update = ($event) => {
  emits('update:email', $event.target.value)
}
</script>

<style lang="scss" scoped></style>
