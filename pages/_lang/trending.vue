<template>
  <div class="black">
    <div id="ListGame">
      <v-container fluid grid-list-sm>
        <div class="page-main">
          <v-layout align-start justify-start column fill-height class="mx-2">
            <div>
              <v-radio-group v-model="totalSwitch" row dark class="mx-2">
                <v-radio label="当前趋势" value="totalNow" color="red"></v-radio>
                <v-radio label="今日峰值" value="totalToday" color="red"></v-radio>
                <v-radio label="本周最热" value="totalWeek" color="red"></v-radio>
                <v-tooltip top>
                  <v-btn icon flat slot="activator" :loading="reflash" @click="getTrendingNow(totalSwitch)"><v-icon>autorenew</v-icon></v-btn>
                  <span>刷新</span>
                </v-tooltip>
              </v-radio-group>
            </div>
          </v-layout>
          <v-layout class="px-2" row wrap>
            <v-flex xs12>
              <div>
                <ListGameCardTrending :list.sync="list" :xl2="true" :totalSwitch="totalSwitch" v-if="list"></ListGameCardTrending>
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
    totalSwitch: 'totalNow'
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
    this.$store.commit('DISPLAY_LOADING', false)
  },
  methods: {
    getTrendingNow: async function (val) {
      let link = 'https://rest.steamhub.cn/api/v2/apps/trending'
      if (val === 'totalToday') link = link + '?type=total&count=max&date=today'
      else if (val === 'totalWeek') link = link + '?type=total&count=max&date=week'
      else link = link
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
    async totalSwitch (newVal, oldVal) {
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


