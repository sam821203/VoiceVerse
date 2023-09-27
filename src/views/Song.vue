<template>
  <main>
    <!-- Music Header -->
    <section class="w-full mb-8 py-14 text-center text-white relative">
      <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg bg-slate-400"></div>
      <div class="container mx-auto flex items-center">
        <!-- Play/Pause Button -->
        <button
          type="button"
          class="z-50 h-24 w-24 text-3xl bg-white text-black rounded-full focus:outline-none"
          @click.prevent="newSong(song)"
        >
          <i class="fas fa-play"></i>
        </button>
        <div class="z-50 text-left ml-8">
          <!-- Song Info -->
          <div class="text-3xl font-bold">{{ song.modified_name }}</div>
          <div>{{ song.genre }}</div>
          <div class="song-price">{{ $n(1, 'currency') }}</div>
        </div>
      </div>
    </section>

    <!-- Form -->
    <section class="container mx-auto mt-6" id="comments">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <!-- Comment Count -->
          <span class="card-title">{{
            $t('song.comment_count', song.comment_count, { count: song.comment_count })
          }}</span>
          <i class="fa fa-comments float-right text-green-400 text-2xl"></i>
        </div>
        <div class="p-6">
          <div
            class="text-white text-center font-bold p-4 mb-4"
            :class="comment_alert_variant"
            v-if="comment_show_alert"
          >
            {{ comment_alert_message }}
          </div>
          <vee-form :validation-schema="schema" @submit="addComment" v-if="userLoggedIn">
            <vee-field
              as="textarea"
              name="comment"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded mb-4"
              placeholder="Your comment here..."
            ></vee-field>
            <ErrorMessage class="text-red-600" name="comment" />
            <button
              type="submit"
              class="py-1.5 px-3 rounded text-white bg-green-600 block"
              :disabled="comment_in_submission"
            >
              Submit
            </button>
          </vee-form>
          <!-- Sort Comments -->
          <select
            v-model="sortOrder"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="1">Latest</option>
            <option value="2">Oldest</option>
          </select>
        </div>
      </div>
    </section>
    <!-- Comments -->
    <ul class="container mx-auto">
      <li
        class="p-6 bg-gray-50 border border-gray-200"
        v-for="comment in sortedComments"
        :key="comment.docID"
      >
        <!-- Comment Author -->
        <div class="mb-5">
          <div class="font-bold">{{ comment.name }}</div>
          <time>{{ comment.datePosted }}</time>
        </div>

        <p>{{ comment.content }}</p>
      </li>
    </ul>
  </main>
</template>

<script name="Song" setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { auth, songsCollection, commentsCollection, dbModular } from '@/utils/firebase'
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useStore } from '@/stores/index.js'
import { storeToRefs } from 'pinia'

const { useUser, usePlayer } = useStore()
const { userLoggedIn } = storeToRefs(useUser())
const { newSong } = usePlayer()
const route = useRoute()
const router = useRouter()

const song = ref({})
const comment_in_submission = ref(false)
const comment_show_alert = ref(false)
const comment_alert_variant = ref('bg-blue-500')
const comment_alert_message = ref('Please wait! Your comment is being submitted')
const comments = ref([])
const sortOrder = ref('1')
const schema = reactive({
  comment: 'required|min:3'
})

// 用 slice 來複製出新的陣列，以避免直接修改原陣列
const sortedComments = computed(() =>
  comments.value.slice().sort((a, b) => {
    if (sortOrder.value === '1') {
      return new Date(b.datePosted) - new Date(a.datePosted)
    }

    return new Date(a.datePosted) - new Date(b.datePosted)
  })
)

const getComments = async () => {
  const q = query(collection(dbModular, 'comments'), where('sid', '==', route.params.id))
  const querySnapshot = await getDocs(q)

  // initiate
  comments.value = []

  querySnapshot.forEach((doc) => {
    comments.value.push({
      docID: doc.id,
      ...doc.data()
    })
  })
}

const getSongsCollection = async () => {
  const songsDocRef = doc(dbModular, 'songs', route.params.id)
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
  comment_alert_variant.value = 'bg-blue-500'
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

  const songRef = doc(dbModular, 'songs', route.params.id)

  await updateDoc(songRef, {
    comment_count: song.value.comment_count
  })

  getComments()

  comment_in_submission.value = false
  comment_alert_variant.value = 'bg-green-500'
  comment_alert_message.value = 'Comment added!'
  resetForm()
}

// 用於更新頁面上的狀態
onMounted(() => {
  // 每當觸發了 filter 後，route.query 裡才會有值
  const { sortOrder: sort } = route.query
  sortOrder.value = sort === '1' || sort === '2' ? sort : '1'
})

watch([() => route.params.id, sortOrder], ([newId, newOrder], [oldId, oldOrder]) => {
  // beforeRouteEnter 的替代方案
  // getSongsCollection()

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
// FIXME: 需要更動的地方太多，暫且用其他方式
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

<style lang="scss" scoped></style>
