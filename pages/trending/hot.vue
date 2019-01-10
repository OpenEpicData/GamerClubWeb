<template>
  <div>
    <div v-if="popular">
      <v-layout
        v-for="k in popular.data.length / 4"
        :key="k"
        align-start
        justify-center
        row
        wrap
      >
        <v-flex
          v-for="(popularItem,popularIndex) in popular.data.slice((k-1)*4,(k) * 4)"
          :key="popularIndex"
          xs12
          sm6
          md3
          xl2
          class="px-3 my-5"
        >
          <popularWithSmallCard
            v-if="popularItem"
            :popular.sync="popularItem"
          />
        </v-flex>
      </v-layout>
      <div
        v-if="loading === false && popular.data.length <= 100"
        class="mt-5"
      >
        <v-btn
          :color="'red--text'"
          round
          large
          @click="load_more(page)"
        >
          加载更多
          <v-icon right>
            fas fa-level-down-alt
          </v-icon>
        </v-btn>
      </div>
    </div>
    <div v-if="loading === true">
      <loading class="primary--text" />
    </div>
  </div>
</template>

<script>
import popularWithSmallCard from '~/components/card/trending/popular'
import loading from '~/components/loading'
export default {
  components: {
    loading,
    popularWithSmallCard
  },
  data() {
    return {
      popular: null,
      page: 1,
      loading: true
    }
  },
  async mounted() {
    let length_param = 'length=16&simple_paginate=1'
    let api_domain = 'https://v3.steamhub.cn/api/v3/game/'
    this.popular = await this.fetchSomething(
      `${api_domain}hot?order=desc&order_field=created_at&${length_param}`
    )
    this.loading = false
  },
  methods: {
    async fetchSomething(url) {
      return await this.$axios.$get(encodeURI(url))
    },
    async load_more(page) {
      this.loading = true
      this.page++
      let fecth_popular = await this.fetchSomething(
        `https://v3.steamhub.cn/api/v3/game/hot?order=desc&order_field=created_at&length=16&simple_paginate=1&page=${
          this.page
        }`
      )
      this.popular.data.push(...fecth_popular.data)
      this.loading = false
    }
  },
  head() {
    return {
      title: '热门游戏 -- SteamHub',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '在 SteamHub 上浏览此时大多数正在游玩的游戏'
        }
      ]
    }
  }
}
</script>
