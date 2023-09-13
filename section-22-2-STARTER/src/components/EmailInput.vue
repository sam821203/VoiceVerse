<template>
  <input
    type="email"
    class="form-control"
    placeholder="E-mail"
    :value="modelValue"
    @input="update($event)"
    :class="{
      'is-valid': value.length >= 4 && value.length > 0,
      'is-invalid': value.length < 4 && value.length > 0
    }"
  />
</template>

<script setup>
const props = defineProps(['modelValue'])
const emits = defineEmits(['update'])

const update = ($event) => {
  emits('update:modelValue', $event.target.value)
}
</script>

<style lang="scss" scoped></style>
