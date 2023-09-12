import './assets/base.css'
import './assets/main.css'

import App from './App.vue'
import router from './router'
import VeeValidatePlugin from './utils/validation'
import { auth } from './utils/firebase'
import i18n from '@/utils/i18n'
import Icon from '@/directives/icon'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 在初始化 App 前，先初始化 Firebase Auth
// 每當 user's authentication 的狀態改變時，Firebase 就會觸發事件，比如登入和登出狀態
// 會在 Firebase 載入完成後，至少跑一次，所以可以將 Vue instance 也放進來
let app

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)

    app.use(router)
    app.use(createPinia())
    app.use(VeeValidatePlugin)
    app.use(i18n)
    app.directive('icon', Icon)

    app.mount('#app')
  }
})

