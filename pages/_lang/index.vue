<template>
  <div>
    <div class="grey lighten-4">
      <Parallax :imgPath="'https://compass-ssl.xbox.com/assets/3b/4b/3b4b33d4-2325-4b90-a76a-544181fbf534.jpg'"></Parallax>
      <v-container fluid grid-list-sm class="index-main-container">
        <div class="page-main">
          <div v-for="(item, i) in blockCard" :key="i">
            <div class="px-2 py-3">
              <v-layout align-start justify-space-between row fill-height id="today">
                <v-flex xs12 class="hidden-sm-and-down">
                  <v-progress-linear background-color="g-blue-hydrogen"></v-progress-linear>
                </v-flex>
                <v-flex xs12 class="text-xs-center">
                  <h2 class="g-blue-hydrogen-text display-1">{{ item.title }}</h2>
                </v-flex>
                <v-flex xs12 class="hidden-sm-and-down">
                  <v-progress-linear background-color="g-blue-hydrogen"></v-progress-linear>
                </v-flex>
              </v-layout>
              <v-progress-linear background-color="g-blue-hydrogen" class="hidden-md-and-up"></v-progress-linear>
            </div>
            
            <div>
              <ListGameCardTrending :list.sync="trending.data" v-if="item.title === $t('Most popular games')"></ListGameCardTrending>
              <ListGameCardTopSeller :list.sync="topSeller.data" v-if="item.title === $t('Popular sales game')"></ListGameCardTopSeller>
              <div v-if="item.title === $t('Latest updated app')">
                <div v-for="(item, i) in list" :key="i">
                  <ListGameCard :list.sync="item.data"></ListGameCard>
                </div>
                <v-layout align-start justify-center row fill-height v-if="!$store.state.display.loading">
                  <v-flex xs12 md4><v-btn block outline large @click="loadMore">{{ $t('Load more') }} <v-icon right>fas fa-angle-down</v-icon> </v-btn></v-flex>
                </v-layout>
              </div>
              <ListGameCardLoading></ListGameCardLoading>
            </div>
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import ListGameCard from '~/components/List/Game/Card/Default'
import ListGameCardTrending from '~/components/List/Game/Card/Trending'
import ListGameCardTopSeller from '~/components/List/Game/Card/TopSeller'
import ListGameCardLoading from '~/components/List/Game/Card/Loading'
import Parallax from '~/components/Parallax/Default'
import axios from 'axios'

export default {
  components: {
    ListGameCard,
    ListGameCardLoading,
    ListGameCardTrending,
    ListGameCardTopSeller,
    Parallax
  },
  data () {
    return {
      queue: Number,
      list: String,
      trending: Object,
      topSeller: Object,
      blockCard: [
        { title: this.$t('Most popular games') },
        { title: this.$t('Popular sales game') },
        { title: this.$t('Latest updated app') },
      ]
    }
  },
  methods: {
    loadMore: async function () {
      this.$store.commit('DISPLAY_LOADING', true)
      let [apps] = await Promise.all([
        axios.get('https://rest.steamhub.cn/api/v2/apps/lists?param=36&page=' + (this.page + 1) + '&cc=' + this.$store.state.display.country)
      ])
      this.page = apps.data.current_page
      this.list = this.list.concat(apps.data)
      this.$store.commit('DISPLAY_LOADING', false)
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
    this.queue = queue.data
    this.trending = trending
    this.topSeller = topSeller
    this.list = list.concat(apps.data)
    this.$store.commit('DISPLAY_LOADING', false)
  },
  head () {
    return {
      title: this.$t('global.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('global.description') }
      ]
    }
  }
}
</script>