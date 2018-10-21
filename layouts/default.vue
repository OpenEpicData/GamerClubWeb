<template>
  <v-app class="grey lighten-4">
    <ToolBar :ToolBar.sync="ToolBar"></ToolBar>
    <BottomNav :BottomNav.sync="BottomNav" class="hidden-md-and-up pt-5"></BottomNav>
  </v-app>
</template>

<script>
import ToolBar from '~/components/ToolBar/Default'
import BottomNav from '~/components/BottomNav/Default'

export default {
  components: {
    ToolBar,
    BottomNav
  },
  data: () => ({
    ToolBar: [
      { icon: 'home', text: 'home', link: '' },
      { icon: 'whatshot', text: 'Trending', link: 'trending' },
      { icon: 'far fa-newspaper', text: 'global.page.topic.default.title', link: 'topic' },
      { divider: true },
      { icon: 'settings', text: 'Settings', link: 'setting' },
      { icon: 'help', text: 'Help', link: 'help' },
      { icon: 'feedback', text: 'Send feedback', link: 'feadback' },
    ],
    BottomNav: {
      items: [
        { value: 'search', icon: 'search', link: 'search', key: 0 },
        { value: 'home', icon: 'list', link: '' },
        { value: 'Join the community', icon: 'add_circle_outline', click: true }
      ]
    },
    languge: String
  }),
  props: {
    source: String
  },
  created () {
    if (this.$store.state.locale === 'zh-cn') this.languge = 'zh-cmn-Hans'
    if (this.$store.state.locale === 'en-us') this.languge = 'en-US'
  },
  head () {
    return {
      htmlAttrs: {
        lang: this.languge
      }
    }
  }
}
</script>