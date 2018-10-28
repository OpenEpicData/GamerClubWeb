<template>
  <v-tabs v-model="trendingTab" color="grey lighten-4" slider-color="g-blue-hydrogen">
    <v-flex xs4 md2>
      <h2 style="line-height: 56px">
        <span style="border-left: 4px #1da6ba solid;" class="mr-3 border-side"></span>
        {{ $t('Trending') }}
      </h2>
    </v-flex>
    <v-tab v-for="(item, i) in blockCard" :key="i" ripple>
      <h4 class="g-blue-hydrogen-text">
        {{ item.title }}
      </h4>
    </v-tab>
    <v-tab-item v-for="(item, i) in blockCard" :key="i">
      <v-card flat color="grey lighten-4">
        <ListGameCardTrending :list.sync="trending.data.slice(0, 4)" v-if="item.title === $t('Most popular games') && trending.data"></ListGameCardTrending>
        <ListGameCardTopSeller :list.sync="topSeller.data.slice(0, 4)" v-if="item.title === $t('Popular sales game') && topSeller.data"></ListGameCardTopSeller>
        <div v-if="item.title === $t('Latest updated app') && list">
          <div v-for="(item, i) in list" :key="i">
            <ListGameCard :list.sync="item.data.slice(0, 4)"></ListGameCard>
          </div>
        </div>
        <ListGameCardLoading></ListGameCardLoading>
      </v-card>
    </v-tab-item>
    <v-flex class="text-xs-right">
      <v-btn flat :to="loadMoreTrendingLink" class="btn-hover-icon-right">
        <h4 class="g-blue-hydrogen-text">
          更多
          <v-icon right small class="g-blue-hydrogen-text">fas fa-long-arrow-alt-right</v-icon>
        </h4>
      </v-btn>
    </v-flex>
  </v-tabs>
</template>

<script>
import axios from 'axios'
import ListGameCard from '~/components/List/Game/Card/Default'
import ListGameCardTrending from '~/components/List/Game/Card/Trending'
import ListGameCardTopSeller from '~/components/List/Game/Card/TopSeller'
import ListGameCardLoading from '~/components/List/Game/Card/Loading'

export default {
  components: {
    ListGameCard,
    ListGameCardLoading,
    ListGameCardTrending,
    ListGameCardTopSeller,
  },
  data: function () {
    return {
      list: String,
      trending: Object,
      topSeller: Object,
      blockCard: [
        { title: this.$t('Most popular games') },
        { title: this.$t('Popular sales game') },
        { title: this.$t('Latest updated app') },
      ],
      trendingTab: 0,
      loadMoreTrendingLink: this.$i18n.path('trending')
    }
  },
  mounted: async function () {
    let [queue, apps, trending, topSeller] = await Promise.all([
      axios.get('https://rest.steamhub.cn/api/game/search/app/update_queue/count'),
      axios.get('https://rest.steamhub.cn/api/v2/apps/lists?page=1&param=24' + '&cc=' + this.$store.state.display.country),
      axios.get('https://rest.steamhub.cn/api/v2/apps/trending'),
      axios.get('https://rest.steamhub.cn/api/v2/apps/topsellers?cc=' + this.$store.state.display.country)
    ])
    let list = []
    let page = apps.data.current_page
    this.trending = trending
    this.topSeller = topSeller
    this.list = list.concat(apps.data)
    this.$store.commit('DISPLAY_LOADING', false)
  },
  methods: {
    trendingLink: function (val) {
      const trendingTab = parseInt(val)
      return trendingTab == 2
        ? this.$i18n.path('apps/pages')
        : this.$i18n.path('trending')
    }
  },
  watch: {
    trendingTab: function (newVal, oldVal) {
      this.loadMoreTrendingLink = this.trendingLink(newVal)
    }
  },
}
</script>
