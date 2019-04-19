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
          md4
          xl2
          class="my-3"
        >
          <reviewWithSmallCard
            v-if="reviewItem"
            :review.sync="reviewItem.game_reviews"
            :price.sync="reviewItem.game_prices"
            :data.sync="reviewItem"
            :color="'blue'"
          />
        </v-flex>
      </v-layout>
      <div
        v-if="loading === false && review.data.length <= 100"
        class="text-xs-center my-3">
        <v-btn 
          dark
          color="accent"
          x-large 
          block
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
          md4
          xl2
          class="my-3"
        >
          <loading :loading="loading" />
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
      `${api_domain}list?order=desc&order_field=updated_at&${length_param}`
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
        `https://v3.steamhub.cn/api/v3/game/list?order=desc&order_field=updated_at&length=30&simple_paginate=1&page=${
          this.page
        }`
      )
      this.review.data.push(...fecth_review.data)
      this.loading = false
    }
  },
  head() {
    return {
      title: '最近更新 -- SteamHub',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '在 SteamHub 上查看我们最近更新的游戏数据列表'
        }
      ]
    }
  }
}
</script>
