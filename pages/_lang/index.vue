<template>
  <div>
    <div class="grey lighten-4">
      <Parallax :imgPath="'https://compass-ssl.xbox.com/assets/3b/4b/3b4b33d4-2325-4b90-a76a-544181fbf534.jpg'"></Parallax>
      <v-container fluid grid-list-sm class="index-main-container">
        <div class="page-main mt-5">
          <div>
            <div class="px-2 mt-3">
              <v-flex xs3>
                <v-progress-linear :v-model="12" width="12px" background-color="g-blue-hydrogen"></v-progress-linear>
              </v-flex>
              <v-layout row wrap id="today">
                <v-flex xs12 md8>
                  <h2 class="g-blue-hydrogen-text headline">{{ $t('Most popular games') }}</h2>
                </v-flex>
              </v-layout>
            </div>
            
            <div>
              <ListGameCardTrending :list.sync="trending.data"></ListGameCardTrending>
              <ListGameCardLoading></ListGameCardLoading>
            </div>
          </div>

          <div>
            <div class="px-2">
              <v-flex xs3>
                <v-progress-linear :v-model="12" width="12px" background-color="g-blue-hydrogen"></v-progress-linear>
              </v-flex>
              <v-layout row wrap id="today">
                <v-flex xs12 md8>
                  <h2 class="g-blue-hydrogen-text headline">{{ $t('Latest updated app') }}</h2>
                </v-flex>
                <v-flex xs12 md4>
                  <div class="text-xs-right hidden-sm-and-down">
                    <h3>
                      {{ $t('Update items in the queue') }}:
                      <span v-if="$store.state.display.loading">
                        <v-progress-circular :width="3" indeterminate color="purple"></v-progress-circular>
                      </span>
                      <span v-else>{{ queue }}</span>
                    </h3>
                  </div>
                </v-flex>
              </v-layout>
            </div>

            <div>
              <div v-for="(item, i) in list" :key="i">
                <ListGameCard :list.sync="item.data"></ListGameCard>
              </div>
              <v-layout align-start justify-center row fill-height v-if="!$store.state.display.loading">
                <v-flex xs12 md4><v-btn block outline large @click="loadMore">{{ $t('Load more') }} <v-icon right>fas fa-angle-down</v-icon> </v-btn></v-flex>
              </v-layout>
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
import ListGameCardLoading from '~/components/List/Game/Card/Loading'
import Parallax from '~/components/Parallax/Default'
import axios from 'axios'

export default {
  components: {
    ListGameCard,
    ListGameCardLoading,
    ListGameCardTrending,
    Parallax
  },
  data () {
    return {
      queue: Number,
      list: String,
      trending: Object
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
    let [queue, apps, trending] = await Promise.all([
      axios.get('https://rest.steamhub.cn/api/game/search/app/update_queue/count'),
      axios.get('https://rest.steamhub.cn/api/v2/apps/lists?page=1&param=24' + '&cc=' + this.$store.state.display.country),
      axios.get('https://rest.steamhub.cn/api/v2/apps/trending')
    ])
    let list = []
    let page = apps.data.current_page
    this.queue = queue.data
    this.trending = trending
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