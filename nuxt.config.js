module.exports = {
  /*
  ** Set source directory
  */
  srcDir: 'src/',
  /*
  ** Headers of the page
  */
  head: {
    title: 'SteamHub Next',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'SteamHub Next' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo_64x64.png' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/vuetify@1/dist/vuetify.min.css' },
      { rel: 'styleshell', href: 'https://cdn.jsdelivr.net/combine/npm/vuetify@1/dist/vuetify.min.css,npm/material-icons@0.2.3' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/material-icons@0.2.3/iconfont/material-icons.min.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5/css/all.min.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/font-awesome-animation@0.2.1/dist/font-awesome-animation.min.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/swiper@4/dist/css/swiper.min.css'}
    ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Loading plugins
  */
  plugins: [
    { src: '~/plugins/vuetify.js' },
    { src: '~/plugins/swiper.js', ssr: false }
  ],
  /**
   * Modules
   */
  modules: [
    '@nuxtjs/axios',
  ],
  /*
  ** Build configuration
  */
  build: {
    babel: {
      presets: ['@vue/app']
    }
  }
}
