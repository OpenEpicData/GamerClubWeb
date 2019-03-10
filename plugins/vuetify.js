import Vue from 'vue'
import Vuetify from 'vuetify'

const opts = {
  theme: {
    dark: true,
    themes: {
      dark: true,
      dark: {
        primary: '#263238',
        secondary: '#37474F',
        accent: '#84FFFF'
      }
    }
  },
  icons: {
    iconfont: 'fa'
  }
}

Vue.use(Vuetify)

export default ({ app }) => {
  app.vuetify = new Vuetify(opts)
}
