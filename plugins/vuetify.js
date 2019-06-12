import Vue from 'vue'
import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'

const opts = {
  theme: {
    dark: true,
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
        primary: '#000',
        secondary: '#fff',
        accent: '#2196F3',
        background: '#131319'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
}

Vue.use(Vuetify)

export default ({ app }) => {
  app.vuetify = new Vuetify(opts)
}
