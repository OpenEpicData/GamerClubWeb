<template>
  <v-app id="inspire" class="grey lighten-4">
    <ToolBar :ToolBar.sync="ToolBar"></ToolBar>
    <div class="grey lighten-4">
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
            { value: '浏览', link: '/' },
            { value: '游戏', link: '/apps/pages/' },
            { value: '搜索', link: '/search', key: 0 }
          ]
        }
      },
      BottomNav: {
        items: [
          { value: '搜索', icon: 'search', link: '/search', key: 0 },
          { value: '浏览', icon: 'list', link: '/' },
          { value: '加入社区', icon: 'add_circle_outline', click: true }
        ]
      }
    }),
    props: {
      source: String
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