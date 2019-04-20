<template>
  <v-container fluid>
    <div class="mt-5">
      <h2 class="display-3 font-weight-black ">
        <nuxt-link 
          to="/trending/hot" 
          class="accent--text">时下热门</nuxt-link>
      </h2>
      <fullScreenPromotion class="mt-3"/>
    </div>
    <div class="mt-5">
      <h2 class="display-3 font-weight-black">
        <nuxt-link 
          to="/news" 
          class="accent--text">业界新闻</nuxt-link>
      </h2>
    </div>

    <div class="mt-3">
      <swiperWitchLargeCard 
        v-if="news" 
        :news.sync="news.data"/>
    </div>
  </v-container>
</template>

<script>
import loading from '~/components/loading'
import fullScreenPromotion from '~/components/jumbotron/fullScreenPromotion'
import tagWithSmallCard from '~/components/card/tag/small'
import swiperWitchLargeCard from '~/components/card/swiper/large'
export default {
  components: {
    loading,
    fullScreenPromotion,
    tagWithSmallCard,
    swiperWitchLargeCard
  },
  data() {
    return {
      game: null,
      news: null
    }
  },
  async mounted() {
    this.game = await this.fetchSomething(
      'https://v3.steamhub.cn/api/v3/game/list'
    )
    this.news = await this.fetchSomething(
      'https://v3.steamhub.cn/api/v3/game/news?length=16'
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
