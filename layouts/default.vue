<template>
  <v-app 
    class="background" 
    dark>
    <div>
      <appbar :appbar="appbar"/>
      <banner :banner="banner"/>
      <v-content>
        <nuxt/>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import banner from '~/components/layout/banner'
import appbar from '~/components/layout/appbar'

export default {
  components: {
    banner,
    appbar
  },
  data() {
    return {
      appbar: {
        title: 'SteamHub',
        background: 'background',
        left: {
          items: [
            {
              name: '浏览',
              path: '/'
            },
            {
              name: '热门',
              path: '/trending/hot'
            },
            {
              name: '新闻',
              path: '/news'
            },
            {
              name: '趋势',
              path: '/game/trending'
            }
          ]
        },
        right: {
          items: [
            {
              icon: 'mdi-magnify'
            },
            {
              icon: 'mdi-bell-outline'
            },
            {
              icon: 'mdi-account-circle-outline'
            }
          ]
        }
      },
      banner: {
        class: 'mt-64px background',
        content: 'SteamHub 团队正在逐步重构服务，部分页面可能出现样式丢失。',
        action: {
          href: 'https://next.steamhub.cn/',
          content: '访问全新的 SteamHub Beta 版本'
        }
      }
    }
  }
}
</script>
