<template>
  <main>
    <section class="relative w-full mb-8 py-20 text-center text-white">
      <div
        class="absolute inset-0 w-full h-full box-border bg-contain bg-gradient-to-r from-gray-600 from-5% via-gray-500 via-30% to-gray-600 to-90%"
      ></div>
      <div class="layout--main flex">
        <!-- Play/Pause Button -->
        <button
          type="button"
          class="z-10 h-24 w-24 text-3xl bg-white text-gray-500 rounded-full focus:outline-none"
          @click.prevent="newSong(song)"
        >
          <i class="fas fa-play pl-1.5"></i>
        </button>
        <div class="z-10 text-left ml-8">
          <div class="mt-2 mb-1 text-white opacity-75">{{ song.genre }}</div>
          <div class="text-white text-2xl font-bold">{{ song.modified_name }}</div>
        </div>
      </div>
    </section>

    <!-- Form -->
    <section class="layout--main mt-6" id="comments">
      <div class="relative flex flex-col bg-white rounded-t-2xl border border-gray-200">
        <div class="px-6 pt-6 pb-5 leading-8 font-bold border-b border-gray-200">
          <span class="card-title">{{
            $t('song.comment_count', song.comment_count, { count: song.comment_count })
          }}</span>
          <i class="fa fa-comments float-right text-gray-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            class="text-white text-center font-bold p-4 mb-4"
            :class="comment_alert_variant"
            v-if="comment_show_alert"
          >
            {{ comment_alert_message }}
          </div>

          <!-- comment textArea -->
          <vee-form :validation-schema="schema" @submit="addComment" v-if="userLoggedIn">
            <vee-field
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              rows="5"
              placeholder="Your comment here..."
            ></vee-field>
            <div class="flex justify-end items-center mb-10">
              <ErrorMessage class="text-red-600" name="comment" />
              <BaseButton
                type="submit"
                class="text-white ml-auto bg-cyan-500 border-cyan-500 rounded-full focus:outline-gray-300 hover:bg-cyan-600 hover:border-cyan-600"
                :disabled="comment_in_submission"
              >
                {{ $t('song.submit') }}
              </BaseButton>
            </div>
          </vee-form>

          <!-- Sort Comments -->
          <select
            v-model="sortOrder"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">{{ $t('song.latest') }}</option>
            <option value="2">{{ $t('song.oldest') }}</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Comments -->
    <ul class="comments layout--main mb-40">
      <li
        class="pt-10 pb-12 px-6 bg-gray-50 border border-gray-200"
        v-for="comment in sortedComments"
        :key="comment.docID"
      >
        <div class="flex--center mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time class="text-gray-400">{{ helper.formatUtcDate(comment.datePosted) }}</time>
        </div>

        <p class="text-gray-500">{{ comment.content }}</p>
      </li>
    </ul>
  </main>
</template>

<script name="Song" setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth, commentsCollection, db } from '@/utils/firebase'
import { query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'
import helper from '@/utils/helper'

const { useUser, usePlayer } = useStore()
const { userLoggedIn } = storeToRefs(useUser())
const { newSong } = usePlayer()
const route = useRoute()
const router = useRouter()

const song = ref({})
const comment_in_submission = ref(false)
const comment_show_alert = ref(false)
const comment_alert_variant = ref('text-blue-500')
const comment_alert_message = ref('Please wait! Your comment is being submitted')
const comments = ref([])
const sortOrder = ref('1')
const schema = reactive({
  comment: 'required|min:3'
})

const sortedComments = computed(() =>
  comments.value.slice().sort((a, b) => {
    if (sortOrder.value === '1') {
      return new Date(b.datePosted) - new Date(a.datePosted)
    }

    return new Date(a.datePosted) - new Date(b.datePosted)
  })
)

const getComments = async () => {
  const q = query(commentsCollection, where('sid', '==', route.params.id))
  const querySnapshot = await getDocs(q)

  comments.value = []

  querySnapshot.forEach((doc) => {
    comments.value.push({
      docID: doc.id,
      ...doc.data()
    })
  })
}

const getSongsCollection = async () => {
  const songsDocRef = doc(db, 'songs', route.params.id)
  const docSnapshot = await getDoc(songsDocRef)

  if (!docSnapshot.exists()) {
    router.push({ name: 'home' })
    return
  }

  song.value = docSnapshot.data()
  getComments()
}

getSongsCollection()

const addComment = async (commentVal, { resetForm }) => {
  comment_in_submission.value = true
  comment_show_alert.value = true
  comment_alert_variant.value = 'text-blue-500'
  comment_alert_message.value = 'Please wait! Your comment is being submitted'

  const comment = reactive({
    content: commentVal.comment,
    datePosted: new Date().toString(),
    sid: route.params.id,
    name: auth.currentUser.displayName,
    uid: auth.currentUser.uid
  })

  await commentsCollection.add(comment)

  // 更新留言數量
  song.value.comment_count += 1

  const songRef = doc(db, 'songs', route.params.id)

  await updateDoc(songRef, {
    comment_count: song.value.comment_count
  })

  getComments()

  comment_in_submission.value = false
  comment_alert_variant.value = 'text-green-500'
  comment_alert_message.value = 'Comment added!'
  resetForm()
}

onMounted(() => {
  const { sortOrder: sort } = route.query
  sortOrder.value = sort === '1' || sort === '2' ? sort : '1'
})

watch([() => route.params.id, sortOrder], ([newId, newOrder], [oldId, oldOrder]) => {
  if (newOrder !== oldOrder) {
    if (newOrder === route.query.sortOrder) return

    router.push({
      query: {
        sortOrder: newOrder
      }
    })
  }
})
</script>

<script>
// FIXME: 需要更動的地方太多，暫時用其他方式
// composition API 已經刪除了 beforeRouterEnter，需要用 options API 的方式來寫
/*
參考文章1: https://blog.csdn.net/qq_17335549/article/details/127942181
參考文章2: https://github.com/vuejs/rfcs/discussions/302
*/
// import { songsCollection } from '@/utils/firebase'
// export default {
//   beforeRouteEnter: function (to) {
//     const getSongsCollection = async () => {
//       const docSnapshot = await songsCollection.doc(route.params.id).get()

//       if (!docSnapshot.exists) {
//         router.push({ name: 'home' })
//         return
//       }

//       song.value = docSnapshot.data()
//       // getComments()
//     }

//     getSongsCollection()

//     to.meta.data = data
//   }
// }
</script>

<style lang="scss" scoped>
.comments {
  li {
    border-top: none;
    &:last-child {
      border-radius: 0 0 16px 16px;
    }
  }
}
</style>
