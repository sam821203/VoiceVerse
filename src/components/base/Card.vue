<template>
  <div class="w-2/5 flex-auto relative z-10 mr-4 rounded-xl shadow-xl">
    <div
      class="bg-white border-slate-100 transition-all duration-500 dark:bg-slate-800 transition-all duration-500 dark:border-slate-500 border-b rounded-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
