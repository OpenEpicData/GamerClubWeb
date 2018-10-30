import '@fortawesome/fontawesome-free/css/all.css'
import Vue from 'vue'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    primary: colors.red.base,
    secondary: colors.red.lighten2,
    accent: colors.purple.base,
    error: colors.purple.accent4,
    warning: colors.purple.accent4,
    info: colors.blue.base,
    success: colors.blue.base
  }
})
