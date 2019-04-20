<template>
  <v-app class="primary px-5">
    <div class="hidden-sm-and-down">
      <v-toolbar tabs>
        <v-toolbar-title>
          <h1 class="display-1">SteamHub</h1>
        </v-toolbar-title>
        <v-spacer/>
        <div class="hidden-sm-and-down">
          <v-btn color="accent">立即开始</v-btn>
        </div>

        <template v-slot:extension>
          <v-tabs 
            v-model="toolbar.tab.active" 
            class="secondary" 
            slider-color="accent">
            <v-tab
              v-for="(item, i) in toolbar.tab.item"
              :key="i"
              :to="item.path"
              class="accent--text"
            >{{ item.name }}</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-banner single-line>
        因为侦测到 SteamHub 爬取程序数据一致性出现较大故障,开发团队正在尝试重写服务.
        <template #actions>
          <v-btn
            text
            outline
            color="accent"
            href="https://github.com/InGaming/Steamhub.Spider"
            target="_black"
          >
            GitHub 上查看最新进度
          </v-btn>
        </template>
      </v-banner>
      <v-content>
        <nuxt/>
      </v-content>
    </div>
    <div class="hidden-md-and-up">
      <h1 class="display-3">
        请使用电脑浏览器访问
      </h1>
    </div>
  </v-app>
</template>

<script>
import loading from '~/components/loading'

export default {
  components: {
    loading
  },
  data() {
    return {
      toolbar: {
        tab: {
          active: this.$route.fullPath,
          item: [
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
        }
      }
    }
  }
}
</script>

<style>
a {
  text-decoration: #f44336 underline;
}
.container {
  padding: 0;
}
</style>
