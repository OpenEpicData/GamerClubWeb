<template>
  <v-app id="inspire" class="grey lighten-4">
    <ToolBar :ToolBar.sync="ToolBar"></ToolBar>
    <div class="grey lighten-4 my-5">
      <nuxt />
    </div>
    <BottomNav :BottomNav.sync="BottomNav"></BottomNav>
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
    ToolBar: {
      title: 'SteamHub',
      items: {
        left: [
          { value: 'home', link: '' },
          { value: 'game', link: 'apps/pages/' },
          { value: 'search', link: 'search', key: 0 }
        ]
      }
    },
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