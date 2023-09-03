import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useStore } from '@/stores/index.js'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Manage from '@/views/Manage.vue'
import Song from '@/views/Song.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about',
    component: About
  },
  {
    name: 'manage',
    // alias: '/manage',
    path: '/manage-music',
    component: Manage,
    beforeEnter: (to, from, next) => {
      next()
    },
    meta: { requiresAuth: true },
  },
  { // redirect from old path to new path
    path: '/manage',
    redirect: { name: 'manage' },
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  }
]

const router = createRouter({
  /*
  import.meta: 包含了目前專案的內容
  env: 是 environment 的簡寫
  BASE_URL: 可以在 vite.config.js 裡做修改
  */
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  // ✅ Always apply useStore() inside functions, that will always run after pinia is installed
  const { useUser } = useStore()
  const { userLoggedIn } = storeToRefs(useUser())

  if (!to.meta.requiresAuth) {
    next()
    return
  }

  if (userLoggedIn.value) next()
  else next({ name: 'home' })
})

export default router