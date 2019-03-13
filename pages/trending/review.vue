<template>
  <div>
    <div v-if="review">
      <v-layout
        align-start
        justify-center
        row
        wrap
      >
        <v-flex
          v-for="(reviewItem,reviewIndex) in review.data"
          :key="reviewIndex"
          xs12
          sm6
          md3
          xl2
          class="px-3 my-3"
        >
          <reviewWithSmallCard
            v-if="reviewItem"
            :review.sync="reviewItem.game_reviews"
            :price.sync="reviewItem.game_prices"
            :data.sync="reviewItem"
            :color="'purple'"
          />
        </v-flex>
      </v-layout>
      <div
        v-if="loading === false && review.data.length <= 100"
      >
        <v-btn
          :color="'primary'"
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
      <v-layout
        v-for="n in 5"
        :key="n"
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
          md3
          xl2
          class="px-3 my-3"
        >
          <loading />
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import reviewWithSmallCard from '~/components/card/trending/review'
import loading from '~/components/card/loading'
export default {
  components: {
    loading,
    reviewWithSmallCard
  },
  data() {
    return {
      review: null,
      page: 1,
      loading: true
    }
  },
  async mounted() {
    let length_param = 'length=30&simple_paginate=1'
    let api_domain = 'https://v3.steamhub.cn/api/v3/game/'
    this.review = await this.fetchSomething(
      `${api_domain}list?steam_user_review_score=80,100&order=desc&order_field=updated_at&${length_param}`
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
      let fecth_review = await this.fetchSomething(
        `https://v3.steamhub.cn/api/v3/game/list?steam_user_review_score=80,100&order=desc&order_field=updated_at&length=30&simple_paginate=1&page=${
          this.page
        }`
      )
      this.review.data.push(...fecth_review.data)
      this.loading = false
    }
  },
  head() {
    return {
      title: '广受好评的游戏 -- SteamHub',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '在 SteamHub 上浏览每一位真实玩家给出的好评游戏'
        }
      ]
    }
  }
}
</script>
