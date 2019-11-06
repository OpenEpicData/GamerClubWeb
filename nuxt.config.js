export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'EpicData Gamer | 游戏玩家俱乐部',
    htmlAttrs: {
      lang: 'zh-CN'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          '阅览业内新闻，追踪实时报道，在 EpicData Gamer 发现不一样的世界'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: 'https://s2.ax1x.com/2019/06/26/ZmY8vq.png'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#9575CD' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/dayjs'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/vuetify-module
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Vuetify module configuration
   ** See https://github.com/nuxt-community/vuetify-module#optionspath
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    icons: {
      iconfont: 'mdi'
    },
    rtl: false,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#6990ff',
          secondary: '#0681ff',
          tertiary: '#28355c',
          accent: '#49b3ad',
          error: '#B83737',
          warning: '#B83737',
          info: '#376BBB',
          success: '#33993D',
          white: '#FFFFFF'
        }
      }
    },
    treeShake: true
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true
  },
  proxy: {
    '/api': 'http://api.epicdata.net:1234/'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  }
}
