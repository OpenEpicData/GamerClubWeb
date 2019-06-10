<template>
  <div>
    <carousel :carousel="carousel"/>
    <div 
      v-if="game.latest" 
      class="mt-5">
      <v-layout justify-space-between>
        <div>
          <h2 class="font-weight-black">最新更新</h2>
        </div>
        <div>
          <nuxt-link 
            class="white--text" 
            to="/trending/latest">显示所有</nuxt-link>
        </div>
      </v-layout>
      <v-layout 
        row 
        wrap 
        class="mt-3">
        <v-flex 
          v-for="(item, k) in game.latest.data" 
          :key="k" 
          xs6 
          class="zoom" 
          md4 
          xl2>
          <v-card
            :to="`/${item.appid}`"
            height="100%"
            max-height="200"
            color="background"
            class="mx-auto"
          >
            <v-img
              :src="`https://cdn.steamstatic.com.8686c.com/steam/apps/${item.appid}/header.jpg`"
              class="white--text"
              height="200px"
              gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.5), rgba(0,0,0,.7), rgba(0,0,0,.9)"
            >
              <v-layout 
                align-end 
                fill-height>
                <div>
                  <v-card-title>{{ item.name }}</v-card-title>
                </div>
              </v-layout>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </div>

    <div 
      v-if="game.hot" 
      class="mt-5">
      <v-layout justify-space-between>
        <div>
          <h2 class="font-weight-black">时下流行</h2>
        </div>
        <div>
          <nuxt-link 
            class="white--text" 
            to="/trending/latest">显示所有</nuxt-link>
        </div>
      </v-layout>
      <v-layout 
        row 
        wrap 
        class="mt-3">
        <v-flex
          v-for="(item, k) in game.hot.data"
          :key="k"
          :xl6="k === 0"
          :xl2="k !== 0"
          md6
          class="zoom"
          xs6
        >
          <v-card
            :to="`/${item.appid}`"
            height="100%"
            max-height="300"
            color="background"
            class="mx-auto"
          >
            <v-img
              :src="`https://cdn.steamstatic.com.8686c.com/steam/apps/${item.appid}/header.jpg`"
              class="white--text"
              height="300px"
              gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.5), rgba(0,0,0,.7), rgba(0,0,0,.9)"
            >
              <v-layout 
                align-end 
                fill-height>
                <div>
                  <v-card-title>{{ item.name }}</v-card-title>
                  <v-card-text 
                    v-if="item.game_list" 
                    class="text-no-wrap text-truncate">
                    <span
                      v-if="'short_description' in item.game_list && k === 0"
                    >
                      {{ item.game_list.short_description }}
                    </span>
                  </v-card-text>
                </div>
              </v-layout>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </div>

    <div 
      v-if="news" 
      class="mt-5">
      <v-layout justify-space-between>
        <div>
          <h2 class="font-weight-black">业界新闻</h2>
        </div>
        <div>
          <nuxt-link 
            class="white--text" 
            to="/news">显示所有</nuxt-link>
        </div>
      </v-layout>

      <v-layout 
        row 
        wrap 
        class="mt-3">
        <v-flex 
          v-for="(item, k) in news.data" 
          :key="k" 
          class="zoom" 
          xs6>
          <v-card 
            :href="item.Link" 
            target="_black" 
            class="mx-auto">
            <v-img
              :src="item.Image"
              aspect-ratio="16/9"
              gradient="to bottom, rgba(0,0,0,.3), rgba(0,0,0,.5), rgba(0,0,0,.7), rgba(0,0,0,.9)"
              height="300px"
            >
              <v-layout 
                align-end 
                fill-height>
                <div>
                  <v-card-title>{{ item.Title }}</v-card-title>
                  <v-card-text>
                    <span>{{ item.Description }}</span>
                  </v-card-text>
                </div>
              </v-layout>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import loading from '~/components/loading'
import carousel from '~/components/layout/carousel'
export default {
  components: {
    loading,
    carousel
  },
  data() {
    return {
      game: {
        latest: null,
        hot: null
      },
      news: null,
      carousel: [
        {
          href: 'https://store.steampowered.com/app/1091500/',
          content: {
            title: '赛博朋克 2077',
            desc: '扮演一名野心勃勃的雇佣兵，探索包罗万象的城市。'
          },
          img: {
            src: 'https://s2.ax1x.com/2019/06/10/VyMssO.jpg'
          }
        }
      ]
    }
  },
  async mounted() {
    this.game.latest = await this.fetchSomething(
      'https://v3.steamhub.cn/api/v3/game/list?length=6&order_field=updated_at&order=desc&simple_paginate=1'
    )
    this.game.hot = await this.fetchSomething(
      'https://v3.steamhub.cn/api/v3/game/hot?length=4&order_field=updated_at&order=desc&simple_paginate=1'
    )
    this.news = await this.fetchSomething(
      'https://v3.steamhub.cn/api/v3/game/news?length=2&simple_paginate=1'
    )
  },
  methods: {
    async fetchSomething(url) {
      return await this.$axios.$get(encodeURI(url))
    }
  },
  head() {
    return {
      title: '全球 Steam 数据统计分析 -- SteamHub',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'SteamHub 是一个全球 Steam 的数据统计社区,每天为开发者和玩家提供实时的 价格,资讯 数据查询。'
        }
      ]
    }
  }
}
</script>
