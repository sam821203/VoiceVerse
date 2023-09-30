<template>
  <section class="flex container mx-auto mb-8 max-w-6xl">
    <BaseCard>
      <div class="flex items-center space-x-4">
        <img
          src="https://tailwindcss.com/_next/static/media/full-stack-radio.afb14e4e.png"
          loading="lazy"
          decoding="async"
          alt=""
          class="flex-none rounded-xl bg-slate-100"
          width="88"
          height="88"
        />
        <div class="min-w-0 flex-auto space-y-1 font-semibold">
          <p class="text-slate-900 transition-all duration-500 dark:text-slate-50 text-lg">
            This is What You Came For
          </p>
          <h2
            class="text-slate-500 transition-all duration-500 dark:text-slate-400 text-sm leading-6 truncate"
          >
            Scaling CSS at Heroku with Utility Classes
          </h2>
          <p class="text-cyan-500 transition-all duration-500 dark:text-cyan-400 text-sm leading-6">
            <abbr title="Episode">Ep.</abbr> 128
          </p>
        </div>
      </div>
    </BaseCard>

    <ul class="w-3/5 flex-auto ml-4 text-xs sm:text-base divide-y border-t cursor-default">
      <BaseItemList />
      <BaseItemList />
      <BaseItemList />
    </ul>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped></style>
