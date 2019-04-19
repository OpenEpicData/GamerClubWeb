import Vue from 'vue'
import Vuetify from 'vuetify'

const opts = {
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#F5F5F5',
        secondary: '#E0E0E0',
        accent: '#000',
        error: '#F44336',
        warning: '#FFEB3B',
        info: '#2196F3',
        success: '#4CAF50'
      },
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
