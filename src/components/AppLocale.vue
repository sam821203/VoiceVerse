<template>
  <div
    class="fixed bottom-46 right-1/50 w-12 h-12 pt-px leading-11 bg-white border-cyan-500 rounded-md text-center shadow-md cursor-pointer"
    @click.prevent="changeLocale"
  >
    {{ currentLocale }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const currentLocale = computed(() => (locale.value === 'zhTw' ? '繁' : 'EN'))

const changeLocale = () => (locale.value = locale.value === 'zhTw' ? 'en' : 'zhTw')
</script>

<style lang="scss" scoped></style>
