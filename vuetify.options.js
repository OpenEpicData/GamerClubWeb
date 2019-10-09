import zhHans from 'vuetify/es5/locale/zh-Hans'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

export default {
  // breakpoint: {},
  icons: {
    iconfont: 'mdi'
  },
  lang: {
    locales: { zhHans },
    current: 'zhHans'
  },
  rtl: false,
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#243042',
        secondary: '#3D4A5C',
        tertiary: '#CCCCCC',
        accent: '#FFFAFB',
        error: '#B83737',
        warning: '#B83737',
        info: '#376BBB',
        success: '#33993D',
        white: '#FFFFFF'
      }
    }
  }
}
