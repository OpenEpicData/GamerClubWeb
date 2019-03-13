import Vue from 'vue'
import Vuetify from 'vuetify'

const opts = {
  theme: {
    dark: true,
    themes: {
      dark: true,
      dark: {
        primary: '#131418',
        secondary: '#2d303a',
        accent: '#0ebeff'
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
