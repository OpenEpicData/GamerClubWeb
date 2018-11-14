import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'


import _6f6c098b from '..\\src\\layouts\\default.vue'

const layouts = { "_default": _6f6c098b }



export default {
  head: {"title":"SteamHub Next","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"SteamHub Next"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Flogo_64x64.png"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fvuetify@1\u002Fdist\u002Fvuetify.min.css"},{"rel":"styleshell","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fcombine\u002Fnpm\u002Fvuetify@1\u002Fdist\u002Fvuetify.min.css,npm\u002Fmaterial-icons@0.2.3"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fmaterial-icons@0.2.3\u002Ficonfont\u002Fmaterial-icons.min.css"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002F@fortawesome\u002Ffontawesome-free@5\u002Fcss\u002Fall.min.css"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Ffont-awesome-animation@0.2.1\u002Fdist\u002Ffont-awesome-animation.min.css"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdn.jsdelivr.net\u002Fnpm\u002Fswiper@4\u002Fdist\u002Fcss\u002Fswiper.min.css"}],"style":[],"script":[]},
  render(h, props) {
    const loadingEl = h('nuxt-loading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [ templateEl ])

    return h('div',{
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
      
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  
  methods: {
    
    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },
    
    
    setLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
    
  },
  components: {
    NuxtLoading
  }
}
