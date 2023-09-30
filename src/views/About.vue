<template>
  <div class="about max-h-screen bg-white overflow-hidden">
    <div class="container mx-auto max-w-6xl mt-28 px-6 text-gray-600 md:px-12 xl:px-6">
      <div class="space-y-6 justify-around md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-20">
        <div class="img-wrap md:5/12">
          <img
            src="https://images.unsplash.com/photo-1529602266431-5e205a27eb68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
            alt="image"
            loading="lazy"
            width=""
            height=""
            class="rounded-xl shadow-lg w-full h-full object-cover"
          />
        </div>
        <div class="md:7/12 lg:w-6/12">
          <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">
            High quality audio sharing, made free and easy with VoiceVerse
          </h2>
          <p class="mt-6 text-gray-600">
            VoiceVerse is updated reguarly with new features. We listen to our community and
            implement features that are requested. We are always open to suggestions.
          </p>
          <p class="mt-4 text-gray-600">
            It is free to use. We do offer a premium plan with additional features, but it is not
            required to use the site. Free users can upload audio files up to 8 minutes / 25MB.
            Premium users can upload audio files up to 5 hours / 250MB. Listeners can always listen
            for free.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  height: calc(100vh - 84px);
  .img-wrap {
    width: 400px;
    height: 500px;
  }
}
</style>
