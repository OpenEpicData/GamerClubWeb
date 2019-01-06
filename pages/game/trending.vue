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
            v-for="(popularItem,popularIndex) in popular.slice(0, 4)"
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
            />
          </VFlex>
        </VLayout>
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
            />
          </VFlex>
        </VLayout>
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
    await this.fetchTrending()
    this.turnChartData(this.top_review.data)
  },
  methods: {
    async fetchSomething(url) {
      return await this.$axios.$get(encodeURI(url))
    },
    async fetchTrending() {
      let length_param = 'length=8&simple_paginate=1'
      let api_domain = 'https://v3.steamhub.cn/api/v3/game/list'
      let [popular, latest, top_review] = await Promise.all([
        await this.fetchSomething(
          'https://rest.steamhub.cn/api/v2/apps/trending'
        ),
        await this.fetchSomething(
          `${api_domain}?order=desc&order_field=updated_at&length=8&${length_param}`
        ),
        await this.fetchSomething(
          `${api_domain}?steam_user_review_score=80,100&order=desc&order_field=steam_user_review_score&${length_param}`
        )
      ])
      this.popular = popular
      this.latest = latest
      this.top_review = top_review
    },
    turnChartData: function(value) {
      for (let k in value.data) {
        for (let i in value[k]['game_prices']) {
          value[k]['game_prices'][i]['final'] =
            value[k]['game_prices'][i]['final'] / 100
          value[k]['game_prices'][i]['initial'] =
            value[k]['game_prices'][i]['initial'] / 100
        }
      }
      return value.reverse()
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
