
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '全球 Steam 数据统计分析 -- SteamHub',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'SteamHub 是一个全球 Steam 的数据统计社区,每天为开发者和玩家提供实时的 价格,资讯 数据查询 ' },
      { 'http-equiv': 'cache-control', content: 'max-age=300' },
      { 'http-equiv': 'expires', content: '300' }
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
    '@/plugins/element-ui',
    { src: '~/plugins/v-charts.js', ssr: false }
  ],
  css: [
    '~/assets/style/app.styl',
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      '~/plugins/vuetify.js',
      '@/plugins/element-ui',
      'axios',
      'dayjs',
      '~/components/GameListCard',
      '~/components/PageHeader',
      'dayjs/plugin/relativeTime',
      '~/plugins/v-charts.js',
      'lodash'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
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
