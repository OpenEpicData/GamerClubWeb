<template>
  <v-app 
    dark 
    class="secondary">
    <v-toolbar
      fixed
      color="primary"
      dark
      prominent
    >
      <v-toolbar-title>
        <v-btn 
          text 
          large 
          to="/"
          color="transparent">
          <logo style="width:150px;height:54px"/>
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <div class="hidden-sm-and-down">
        <v-btn
          text
          outline 
          color="accent"
        >
          立即开始
        </v-btn>
      </div>

      <template v-slot:extension>
        <v-tabs
          v-model="toolbar.tab.active"
          class="secondary"
          fixed-tabs
          slider-color="accent"
        >
          <v-tab
            v-for="(item, i) in toolbar.tab.item"
            :key="i"
            :to="item.path"
          >
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <div
      class="mt-5 pt-5 text-xs-center primary"
    >
      <loading />
      <div class="mt-3">
        <h4 class="display-1">
          立即开启你的新旅程
        </h4>
        <h6 class="subheading mt-2">
          加入需要不到一分钟,这将是你一整天中做出的最佳决定.
          <br>SteamHub 是一个非盈利的开源项目,我们也提供开发者付费计划用以支持每月的服务器建设支出.
        </h6>
      </div>
      <div class="py-5">
        <v-layout
          align-center
          justify-center
          fill-height
        >
          <div>
            <v-btn
              slot="append-outer"
               
              large
              dark
              style="top: -12px"
            >
              使用 Steam 登录
            </v-btn>
          </div>
        </v-layout>
      </div>
    </div>
  </v-app>
</template>

<script>
import logo from '~/components/logo'
import loading from '~/components/loading'

export default {
  components: {
    logo,
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
.v-tabs-slider {
  border-bottom: 5px solid #fff;
  border-radius: 9999px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
