import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import en from 'vuetify/es5/locale/en'

Vue.use(Vuetify, {
  iconfont: 'fa',
  lang: {
    locales: { zhHans, en },
    current: 'zhHans'
  }
})
