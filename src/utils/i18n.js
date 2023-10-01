import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import zhTw from '@/locales/zhTw'

export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    zhTw
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD'
      }
    },
    zhTw: {
      currency: {
        style: 'currency',
        currency: 'TWD'
      }
    }
  }
})
