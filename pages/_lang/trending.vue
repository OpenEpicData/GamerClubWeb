<template>
  <div class="black">
    <div id="ListGame">
      <v-container fluid grid-list-sm>
        <div class="page-main">
          <v-layout class="px-2" row wrap>
            <div class="px-2">
              <vs-button type="line" icon="apps" size="large" color="danger">
                {{ $t('Trending') }}
              </vs-button>
              <vs-button type="line" size="large" color="white">
                {{ updateTime }} 秒后自动刷新
              </vs-button>
            </div>
            <v-flex xs12>
              <div>
                <ListGameCardTrending :list.sync="list" :xl2="true" v-if="list"></ListGameCardTrending>
              </div>
            </v-flex>
          </v-layout>
          <ListGameCardLoading></ListGameCardLoading>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import ListGameCardTrending from '~/components/List/Game/Card/Trending'
import ListGameCardLoading from '~/components/List/Game/Card/Loading'
import axios from 'axios'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'

dayjs.extend(relativeTime)

export default {
  components: {
    ListGameCardTrending,
    ListGameCardLoading
  },
  data: () => ({
    dialogAPI: false,
    page: 1,
    list: null,
    updateTime: 60
  }),
  async asyncData () {
    let [apps] = await Promise.all([
      axios.get('https://rest.steamhub.cn/api/v2/apps/trending')
    ])
    let list = []
    return {
      list: apps.data
    }
  },
  mounted: function () {
    this.todo()
  },
  methods: {
    todo: function () {  
      let self = this         
      setInterval(function () {
        self.updateTime > 1 ? self.updateTime-- : self.updateTime = 60
      }, 1000)
      setInterval(async function () {
        self.$store.commit('DISPLAY_LOADING', true)
        self.list = null
        let [apps] = await Promise.all([
          axios.get('https://rest.steamhub.cn/api/v2/apps/trending')
        ])
        self.list = apps.data
        self.$store.commit('DISPLAY_LOADING', false)
      }, 60000)
    }
  },
  watch: {
    dialogAPI (val) {
      if (!val) return
      setTimeout(() => (this.dialogAPI = false), 1000)
    }
  },
  filters: {
    time: function (value) {
      return dayjs().from(dayjs(value))
    }
  },
  head () {
    return {
      title: this.$t('global.page.game.title'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('global.page.game.description') }
      ]
    }
  }
}
</script>


