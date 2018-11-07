<template>
  <div class="black">
    <div id="ListGame">
      <v-container fluid grid-list-sm>
        <div class="page-main">
          <v-layout align-start justify-start column fill-height class="mx-2">
            <div>
              <vs-button type="line" size="large" color="white">
                {{ updateTime }} 秒后自动刷新
              </vs-button>
              <vs-button type="line" icon="apps" size="large" color="danger">
                {{ $t('Trending') }}
              </vs-button>
            </div>
            <div>
              <v-switch
                label="今日峰值"
                color="red"
                dark
                v-model="totalMaxTodaySwitch"
                class="mx-2"
              ></v-switch>
            </div>
          </v-layout>
          <v-layout class="px-2" row wrap>
            <v-flex xs12>
              <div>
                <ListGameCardTrending :list.sync="list" :xl2="true" :totalMaxTodaySwitch="totalMaxTodaySwitch" v-if="list"></ListGameCardTrending>
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
    updateTime: 60,
    totalMaxTodaySwitch: false
  }),
  async asyncData () {
    let [apps] = await Promise.all([
      axios.get('https://rest.steamhub.cn/api/v2/apps/trending')
    ])
    return {
      list: apps.data
    }
  },
  mounted: function () {
    this.todo(this.totalMaxTodaySwitch)
    this.$store.commit('DISPLAY_LOADING', false)
  },
  methods: {
    todo: function (val) {  
      let link = ''
      if (val) link = 'https://rest.steamhub.cn/api/v2/apps/trending?type=total&count=max&date=today'
      else link = 'https://rest.steamhub.cn/api/v2/apps/trending'
      let self = this         
      setInterval(function () {
        self.updateTime > 1 ? self.updateTime-- : self.updateTime = 60
      }, 1000)
      setInterval(async function () {
        self.$store.commit('DISPLAY_LOADING', true)
        self.list = null
        let [apps] = await Promise.all([
          axios.get(link)
        ])
        self.list = apps.data
        self.$store.commit('DISPLAY_LOADING', false)
      }, 60000)
    },
    getTrendingNow: async function (val) {
      let link = ''
      if (val) link = 'https://rest.steamhub.cn/api/v2/apps/trending?type=total&count=max&date=today'
      else link = 'https://rest.steamhub.cn/api/v2/apps/trending'
      let [apps] = await Promise.all([
        axios.get(link)
      ])
      this.list = apps.data
    }
  },
  watch: {
    dialogAPI (val) {
      if (!val) return
      setTimeout(() => (this.dialogAPI = false), 1000)
    },
    async totalMaxTodaySwitch (newVal, oldVal) {
      this.getTrendingNow(newVal)
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


