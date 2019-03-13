<template>
  <div>
    <div
      v-for="(item, i) in text"
      :key="i"
    >
      <div class="my-3">
        <h1 class="display-1">
          {{ item.title }}
        </h1>
        <h2 class="subheading mt-2">
          {{ item.description }}
        </h2>
      </div>

      <div 
        v-if="popular && item.type === 'popular'" 
      >
        <v-layout
          align-start
          justify-center
          row
          wrap
        >
          <v-flex
            v-for="(popularItem,popularIndex) in popular.data.slice(0, 6)"
            :key="popularIndex"
            xs12
            sm6
            md4
            xl2
            class="px-3 my-3"
          >
            <popularWithSmallCard
              v-if="popularItem"
              :popular.sync="popularItem"
            />
          </v-flex>
        </v-layout>

        <div class="mb-5">
          <v-btn
            dark
            large
            color="red"
            to="/trending/hot"
          >
            浏览全部热门游戏
            <v-icon right>
              fab fa-hotjar
            </v-icon>
          </v-btn>
        </div>
      </div>

      <div v-else-if="item.type === 'popular'">
        <v-layout
          align-start
          justify-center
          row
          wrap
        >
          <v-flex
            v-for="i in 6"
            :key="i"
            xs12
            sm6
            md4
            xl2
            class="px-3 my-3"
          >
            <loading />
          </v-flex>
        </v-layout>
      </div>

      <div v-if="latest && item.type === 'latest'">
        <v-layout
          align-start
          justify-center
          row
          wrap
        >
          <v-flex
            v-for="(latestItem,latestIndex) in latest.data"
            :key="latestIndex"
            xs12
            sm6
            md4
            xl2
            class="px-3 my-3"
          >
            <reviewtWithSmallCard
              :review.sync="latestItem.game_reviews"
              :price.sync="latestItem.game_prices"
              :data.sync="latestItem"
              :color="'blue'"
            />
          </v-flex>
        </v-layout>
        <div class="mb-5">
          <v-btn
            dark
            large
            color="blue"
            to="/trending/latest"
          >
            浏览最近更新游戏
            <v-icon right>
              fas fa-file-medical-alt
            </v-icon>
          </v-btn>
        </div>
      </div>

      <div v-else-if="item.type === 'latest'">
        <v-layout
          align-start
          justify-center
          row
          wrap
        >
          <v-flex
            v-for="i in 12"
            :key="i"
            xs12
            sm6
            md4
            xl2
            class="px-3 my-3"
          >
            <loading />
          </v-flex>
        </v-layout>
      </div>

      <div v-if="top_review && item.type === 'top_review'">
        <v-layout
          align-start
          justify-center
          row
          wrap
        >
          <v-flex
            v-for="(reviewItem, reviewIndex) in top_review.data"
            :key="reviewIndex"
            xs12
            sm6
            md4
            xl2
            class="px-3 my-3"
          >
            <reviewtWithSmallCard
              :review.sync="reviewItem.game_reviews"
              :price.sync="reviewItem.game_prices"
              :data.sync="reviewItem"
              :color="'purple'"
            />
          </v-flex>
        </v-layout>
        <div class="mb-5">
          <v-btn
            dark
            large
            color="purple"
            to="/trending/review"
          >
            浏览全部好评游戏
            <v-icon right>
              far fa-thumbs-up
            </v-icon>
          </v-btn>
        </div>
      </div>

      <div v-else-if="item.type === 'top_review'">
        <v-layout
          align-start
          justify-center
          row
          wrap
        >
          <v-flex
            v-for="i in 12"
            :key="i"
            xs12
            sm6
            md4
            xl2
            class="px-3 my-3"
          >
            <loading />
          </v-flex>
        </v-layout>
      </div>
    </div>
  </div>
</template>

<script>
import popularWithSmallCard from '~/components/card/trending/popular'
import reviewtWithSmallCard from '~/components/card/trending/review'
import loading from '~/components/card/loading'
export default {
  components: {
    popularWithSmallCard,
    reviewtWithSmallCard,
    loading
  },
  data() {
    return {
      popular: null,
      latest: null,
      top_review: null,
      text: [
        {
          title: '时下热门',
          description: '你身边的大多数朋友都可能在玩',
          type: 'popular'
        },
        {
          title: '好评如潮',
          description: '来自每一位真实用户的评测,他们可不会说假话',
          type: 'top_review'
        },
        {
          title: '最近更新',
          description: '我们的后端数据程序正源源不断的拉取最新内容',
          type: 'latest'
        }
      ]
    }
  },
  async mounted() {
    let length_param = 'length=12&simple_paginate=1'
    let api_domain = 'https://v3.steamhub.cn/api/v3/game/'
    this.latest = await this.fetchSomething(
      `${api_domain}list?order=desc&order_field=updated_at&${length_param}`
    )
    this.top_review = await this.fetchSomething(
      `${api_domain}list?steam_user_review_score=80,100&order=desc&order_field=updated_at&${length_param}`
    )
    this.popular = await this.fetchSomething(
      `${api_domain}hot?order=desc&order_field=created_at&${length_param}`
    )
  },
  methods: {
    async fetchSomething(url) {
      return await this.$axios.$get(encodeURI(url))
    }
  },
  head() {
    return {
      title: '玩家趋势 -- SteamHub',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'SteamHub 提供实时的 Steam 玩家游玩,游戏销售等趋势'
        }
      ]
    }
  }
}
</script>

<style>
.v-card,
.v-image__image {
  border-radius: 0.5rem;
}
</style>
