<template>
  <div class="h-screen bg-white overflow-hidden">
    <div class="layout--main mt-28">
      <div class="justify-around md:flex md:gap-6 lg:items-center lg:gap-20">
        <div class="img-wrap mb-6 md:5/12">
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
          <div class="mb-6 text-3xl leading-12 font-bold">
            High quality audio sharing<br />
            Made free and easy with <span class="text-cyan-500">VoiceVerse</span>
          </div>
          <p class="mb-4">
            VoiceVerse is updated reguarly with new features. We listen to our community and
            implement features that are requested. We are always open to suggestions.
          </p>
          <p>
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
.img-wrap {
  width: 400px;
  height: 500px;
}
</style>
