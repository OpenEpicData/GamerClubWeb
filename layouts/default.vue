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

<style>
  .v-navigation-drawer__border {
    display: none;
  }
  .text {
    font-weight: 400;
  }
  .v-overlay--active:before {
    opacity: 1;
  }
  .v-overlay:before {
    background-color: #f5f5f5;
  }
  @media (min-width: 1264px) {
    .index-main-container {
      width: 1700px;
      max-width: 90%;
    }
  }
  @media (max-width: 960px) {
    .page-main {
      margin: 20px 0 10px 0
    }
  }
  @media (max-width: 600px) {
    .page-main {
      margin: 10px 0 0 0
    }
    .v-toolbar__content {
      height: 0 !important;
    }
  }
</style>