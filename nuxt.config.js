
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '%s -- SteamHub',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'SteamHub 是一个全球 Steam 的数据统计社区,每天为开发者和玩家提供实时的 价格,资讯 数据查询 ' },
      { 'http-equiv': 'cache-control', content: 'no-cache' }
    ],
    link: [
      { rel: 'icon', type: 'image/*', href: '/logo_64x64.png' },
      { rel: 'stylesheet', href: 'https://fonts.lug.ustc.edu.cn/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  modules: [
    // Simple usage
    ['@nuxtjs/google-analytics', {
      id: 'UA-122218785-1'
    }]
  ],
  plugins: [
    '~/plugins/vuetify.js',
    '~/plugins/i18n.js',
    { src: '~/plugins/v-charts.js', ssr: false }
  ],
  css: [
    '~/assets/style/app.styl'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#0082c8'
  },
  router: {
    middleware: 'i18n'
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js',
      'axios',
      'dayjs',
      '~/plugins/v-charts.js',
      'lodash'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
