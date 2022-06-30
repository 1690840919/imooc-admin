import { createI18n } from 'vue-i18n'
import zhLocale from './language/zh'
import enLocale from './language/en'
import { getItem } from '@/utils/storage.js'
import { LANGUAGE } from '@/constant/index.js'
const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

const locale = getItem(LANGUAGE) || 'zh'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale,
  messages
})

export default i18n
