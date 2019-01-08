<template>
  <div>
    <div
      v-for="(item, i) in text"
      :key="i"
      class="mt-5"
    >
      <h1 class="display-1">
        {{ item.title }}
      </h1>
      <h2 class="subheading mt-2">
        {{ item.description }}
      </h2>

      <div v-if="popular && item.type === 'popular'">
        <VLayout
          align-start
          justify-center
          row
          wrap
        >
          <VFlex
            v-for="(popularItem,popularIndex) in popular.data.slice(0, 4)"
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
          </VFlex>
        </VLayout>
        <div class="mt-3">
          <v-btn 
            round 
            large 
            color="red--text" 
            to="/trending/hot">
            浏览全部热门游戏
            <v-icon right>
              fab fa-hotjar
            </v-icon>
          </v-btn>
        </div>
      </div>

      <div v-else-if="latest && item.type === 'latest'">
        <VLayout
          v-for="k in 2"
          :key="k"
          align-start
          justify-center
          row
          wrap
        >
          <VFlex
            v-for="(latestItem,latestIndex) in latest.data.slice((k-1)*4,(k) * 4)"
            :key="latestIndex"
            xs12
            sm6
            md3
            xl2
            class="px-3 my-5"
          >
            <reviewtWithSmallCard
              :review.sync="latestItem.game_reviews"
              :price.sync="latestItem.game_prices"
              :data.sync="latestItem"
              :color="'blue'"
            />
          </VFlex>
        </VLayout>
        <div class="mt-3">
          <v-btn 
            round 
            large 
            color="blue--text" 
            to="/trending/latest">
            浏览最近更新游戏
            <v-icon right>
              fas fa-file-medical-alt
            </v-icon>
          </v-btn>
        </div>
      </div>

      <div v-else-if="top_review && item.type === 'top_review'">
        <VLayout
          v-for="k in 2"
          :key="k"
          align-start
          justify-center
          row
          wrap
        >
          <VFlex
            v-for="(reviewItem, reviewIndex) in top_review.data.slice((k-1)*4,(k) * 4)"
            :key="reviewIndex"
            xs12
            sm6
            md3
            xl2
            class="px-3 my-5"
          >
            <reviewtWithSmallCard
              :review.sync="reviewItem.game_reviews"
              :price.sync="reviewItem.game_prices"
              :data.sync="reviewItem"
              :color="'purple'"
            />
          </VFlex>
        </VLayout>
        <div class="mt-3">
          <v-btn 
            round 
            large 
            color="purple--text" 
            to="/trending/review">
            浏览全部好评游戏
            <v-icon right>
              far fa-thumbs-up
            </v-icon>
          </v-btn>
        </div>
      </div>

      <div v-else>
        <VProgressCircular
          indeterminate
          color="primary"
        />
      </div>
    </div>
  </div>
</template>

<script>
import popularWithSmallCard from '~/components/card/trending/popular'
import reviewtWithSmallCard from '~/components/card/trending/review'
export default {
  components: {
    popularWithSmallCard,
    reviewtWithSmallCard
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
    let length_param = 'length=8&simple_paginate=1'
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
